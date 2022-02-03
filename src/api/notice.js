import request from "utils/request";

export default {
  received: (studentId) => request({
    url: '/web/student/notice/send',
    method: 'post',
    params: {studentId}
  })
}
