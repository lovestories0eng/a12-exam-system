import {serviceOne} from 'utils/request'
import {getToken, getUserId} from "utils/auth";

export function login(data) {
  return serviceOne({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

// 登录成功返回数据
export function getInfo() {
  return serviceOne({
    url: '/user/information/info',
    method: 'post',
    data: {
      userId: getUserId(),
      token: getToken()
    }
  })
}

// 登出
export function logout() {
  return serviceOne({
    url: '/user/logout',
    method: 'post',
    data: {
      token: getToken()
    }
  })
}

export function getNotice() {
  return serviceOne({
    url: '/user/message',
    method: 'post',
    data: {
      userId: getUserId(),
      token: getToken()
    }
  })
}

export function changeExamReadStatus(data) {
  return serviceOne({
    url: '/user/message/exam/read',
    method: 'post',
    data
  })
}

export function changeGradeReadStatus(data) {
  return serviceOne({
    url: '/user/message/grade/read',
    method: 'post',
    data
  })
}

export function examClassification() {
  return serviceOne({
    url: '/user/exam',
    method: 'post',
    data: {
      userId: getUserId(),
      token: getToken()
    }
  })
}


export function getFlowSweeper() {
  return serviceOne({
    url: '/user/flawsweeper',
    method: 'post',
    data: {
      userId: getUserId(),
      token: getToken()
    }
  })
}

export function updateInfo(data) {
  data.userId = getUserId()
  data.token = getToken()
  return serviceOne({
    url: '/user/information',
    method: 'post',
    data
  })
}

export function updateImage(formData, onUploadProgress) {
  formData.append('userId', getUserId())
  formData.append('token', getToken())
  return serviceOne({
    url: '/user/information/image',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data: formData,
    onUploadProgress: onUploadProgress
  })
}
