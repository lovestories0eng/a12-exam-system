import {serviceTwo, serviceThree, serviceFour} from "utils/request"

// 教师发布考试
export function publishPaper(data) {
  return serviceTwo({
    url: '/exam/setExam',
    method: 'post',
    data
  })
}

// 教师获取班级列表
export function getClassList() {
  return serviceThree({
    url: '/class/list',
    method: 'get',
  })
}

// testing
export function getClassStudentInfo() {
  return serviceThree({
    url: '/class/classStudent',
    method: 'get'
  })
}

//教师获取学科科目列表
export function getSubjectList() {
  return serviceFour({
    url: '/major/list',
    method: 'get'
  })
}

// 教师获取章节信息
export function getChapterInfo() {
  return serviceFour({
    url: '/major/chapter',
    method: 'post'
  })
}
