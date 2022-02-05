import request from "utils/request";

export function getChartData (studentId) {
  return request({
    url: '/web/student/exam-data/chartdata',
    method: 'post',
    params: {studentId}
  })
}
