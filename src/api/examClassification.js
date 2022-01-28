import request from "utils/request";

export function examClassification(studentId) {
  return request({
    url: '/web/student/classification',
    method: 'post',
    params: {studentId}
  })
}
