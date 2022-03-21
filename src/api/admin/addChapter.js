import {serviceFour} from "utils/request"

export function addChapter(data) {
  return serviceFour({
    url: '/major/chapter/add',
    method: 'post',
    data
  })
}
