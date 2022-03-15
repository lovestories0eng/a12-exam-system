import {serviceFive} from "utils/request"

export function getExerciseByMajorIdAndChapterId(data) {
  return serviceFive({
    url: '/exercise/allItem',
    method: 'post',
    data
  })
}

export function createExercise(data) {
  return serviceFive({
    url: '/exercise/add',
    method: 'post',
    data
  })
}

export function createExercisePicture(data) {
  return serviceFive({
    url: '/exercise/picture',
    method: 'post',
    data
  })
}
