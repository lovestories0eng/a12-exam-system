import {serviceOne} from "utils/request"

export function changeIdentity(data) {
  return serviceOne({
    url: '/user/identify/change',
    method: 'post',
    data
  })
}
