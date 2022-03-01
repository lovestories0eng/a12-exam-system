import { serviceOne } from "utils/request";

// 学生端单科成绩曲线
export function getSingleSubjectPerformanceCurve(data) {
  return serviceOne({
    url: '/user/grade/major',
    method: 'post',
    data: data
  })
}

export function getGeneralExaminationData() {
  return serviceOne({
    url: '/user/grade/general',
    method: 'get'
  })
}

export function getSubjectGrades(data) {
  return serviceOne({
    url: '/user/grade/majors',
    method: 'post',
    data
  })
}
