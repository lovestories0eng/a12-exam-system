import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

// vuex模块---登录，获取用户信息，登出模块--user.js

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  role: '',
  studentId: '',
  imgUrl: '',
  phoneNumber: 0,
  address: "",
  email: '',
  className: ''
}

// 注册所有的mutation方法
const mutations = {
  // //将函数赋值给变量
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_STUDENTID: (state, studentId) => {
    state.studentId = studentId
  },
  SET_IMGURL: (state, imgUrl) => {
    state.imgUrl = imgUrl
  },
  SET_PHONE_NUMBER: (state, phoneNumber) => {
    state.phoneNumber = phoneNumber
  },
  SET_ADDRESS: (state, address) => {
    state.address = address
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_CLASS_NAME: (state, className) => {
    state.className = className
  }
}

// action存在的意义就是执行异步操作
// 注册所有的action方法
const actions = {
  // 登录
  // commit为VueX中自带的方法
  // 将commit 从 context 中结构出来
  // Promise封装的组合式action
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      // trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
      // utils里的login
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  // 获取用户信息
  // 将commit,state从 context 中结构出来
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { role, name, avatar, introduction, studentId, imgUrl, phoneNumber, address, email, className } = data
        commit('SET_ROLE', role)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_STUDENTID', studentId)
        commit('SET_IMGURL', imgUrl)
        commit('SET_PHONE_NUMBER', phoneNumber)
        commit('SET_ADDRESS', address)
        commit('SET_EMAIL', email)
        commit('SET_CLASS_NAME', className)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // 登出
  // 将commit, state, dispatch 从 context 中结构出来
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', [])
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  // 清除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLE', [])
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
