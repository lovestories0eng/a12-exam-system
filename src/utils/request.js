import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import {getToken} from "utils/auth";

const serviceOne = axios.create({
  baseURL: 'http://8.136.87.235:8085',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

const serviceTwo = axios.create({
  baseURL: 'http://8.136.87.235:8083',
  timeout: 5000 // request timeout
})

const serviceThree = axios.create({
  baseURL: 'http://8.136.87.235:8084',
  timeout: 5000
})

const serviceFour = axios.create({
  baseURL: 'http://8.136.87.235:8082',
  timeout: 5000
})

setInterceptor(serviceOne)
setInterceptor(serviceTwo)
setInterceptor(serviceThree)
setInterceptor(serviceFour)

function setInterceptor(Obj) {
  Obj.interceptors.request.use(
      config => {
        // 在网络请求发送之前为请求头设置token
        config.headers['token'] = getToken()
        return config
      },
      error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
      }
  )

  Obj.interceptors.response.use(
      response => {
        const res = response.data
        // 设置发送成功的status为100，具体的设置以自己用的后台为准
        if (res.status !== 100) {
          Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
          })

          if (res.status === 200) {
            MessageBox.confirm('密码错误或者token失效', '强制登出', {
              confirmButtonText: '请重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            })
          } else if (res.status === 300) {
            Message.error('查询失败（数据不存在）')
          } else if (res.status === 400) {
            Message.error('意外失败')
          }

          return Promise.reject(new Error(res.message || 'Error'))
        } else {
          return res
        }
      },
      error => {
        console.log('err:' + error) // for debug
        Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
  )
}

export { serviceOne, serviceTwo, serviceThree, serviceFour }
