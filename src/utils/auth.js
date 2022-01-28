// 此文件用于封装权限数据
import Cookies from 'js-cookie'

const TokenKey = 'myToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // 销毁cookie
  return Cookies.remove(TokenKey)
}

// console.log(document.cookie)打印当前的cookie
