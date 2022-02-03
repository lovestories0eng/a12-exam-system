import request from "utils/request";

export default {
  select: (id, studentId) => request({
    url: '/web/student/exam/paper/select',
    method: 'post',
    params: { id, studentId }
  }),
  answerSubmit: form => request({
    url: '/web/student/exam/paper/answer/answerSubmit',
    method: 'post',
    data: form
  }),
  read: (id, studentId) => request({
    url: '/web/student/exampaper/answer/read',
    method: 'post',
    params: { id, studentId }
  })
}
