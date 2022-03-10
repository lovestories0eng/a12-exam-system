import {serviceFour, serviceThree} from "utils/request"

export function getMajorList() {
  return serviceFour({
    url: '/major/list',
    method: 'get'
  })
}

export function getChapterByMajorId(data) {
  return serviceFour({
    url: '/major/chapter',
    method: 'post',
    data
  })
}

export function getClassList() {
  return serviceThree({
    url: '/class/list',
    method: 'get'
  })
}

export function getClassStudentList(data) {
  return serviceThree({
    url: '/class/classStudent',
    method: 'post',
    data: data
  })
}
