import { serviceFive } from "utils/request"

export function getExercciseAllitem(data) {
  return serviceFive({
    url: '/exercise/allItem',
    method: 'post',
    data: data
  })
}
