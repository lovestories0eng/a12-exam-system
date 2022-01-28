import request from 'utils/request'

export function login(data) {
  return request({
    url: '/web/user/login',
    method: 'post',
    data
  })
}

// 登录成功返回数据
export function getInfo(token) {
  return request({
    url: '/web/user/info',
    method: 'get',
    params: { token }
  })
}

// 登出
export function logout() {
  return request({
    url: '/web/user/logout',
    method: 'post'
  })
}
