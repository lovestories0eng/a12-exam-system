import {serviceOne} from "utils/request"

export function addUser(data) {
  return serviceOne({
    url: '/user/addUser',
    method: 'post',
    data
  })
}
