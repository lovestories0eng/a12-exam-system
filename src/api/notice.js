import request from "utils/request";

export default {
  received: (studentId) => request({
    url: '/web/student/notice/received',
    method: 'post',
    params: {studentId}
  }),
  sent: (studentId) => request({
    url: '/web/student/notice/sent',
    method: 'post',
    params: {studentId}
  })
}
