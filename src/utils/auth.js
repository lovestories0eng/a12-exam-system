// 此文件用于封装权限数据

const TokenKey = 'examSystemToken'
const userIdKey = 'examSystemUserId'

export function getUserId() {
  return localStorage.getItem(userIdKey)
}

export function setUserId(userId) {
  return localStorage.setItem(userIdKey, userId)
}

export function removeUserId() {
  // 销毁userId
  return localStorage.removeItem(userIdKey)
}

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // 销毁token
  return localStorage.removeItem(TokenKey)
}

