import { serviceTwo } from "utils/request"

export function createExam(data) {
  return serviceTwo({
    url: '/exam/setExam',
    method: 'post',
    data
  })
}
