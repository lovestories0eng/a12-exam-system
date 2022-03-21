import {serviceFour} from "utils/request"

export function addSubject(data) {
  return serviceFour({
    url: '/major/add',
    method: 'post',
    data
  })
}
