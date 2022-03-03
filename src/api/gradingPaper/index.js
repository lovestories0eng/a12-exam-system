import {serviceTwo} from "utils/request"

// 老师端的消息提醒
export function getMessageAlerts() {
  return serviceTwo({
    url: '/exam/waitforcorrect',
    method: 'get'
  })
}

// 老师获取学生答案
export function getStudentAnswer(data) {
  return serviceTwo({
    url: 'exam/point',
    method: 'post',
    data
  })
}

// 上传老师批分结果
export function uploadGradingScore(data) {
  return serviceTwo({
    url: '/exam/correct',
    method: 'post',
    data
  })
}
