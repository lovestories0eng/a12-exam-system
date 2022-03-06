import { faceService } from "utils/request"
const api_key = 'f9S-zYrsYIU9-BsjpycpVgjfLl3R_fpH'
const api_secret = 'U7yQA_cR8IsIwrdfGt5YFHGPePZyNyAL'
const outer_id = 'panshihuang'
let faceInfo = new window.FormData()

// 传图片解析faceInfo
export function detectFaceInfo (image_base64) {
  let formData = new window.FormData()
  formData.append('api_key', api_key)
  formData.append('api_secret', api_secret)
  formData.append('outer_id', outer_id)
  formData.append('image_base64', image_base64)
  return faceService({
    url: '/detect',
    method: 'post',
    data: formData
  })
}

// 给人脸集添加faceToken
export function addFace (face_tokens) {
  let formData = new window.FormData()
  formData.append('api_key', api_key)
  formData.append('api_secret', api_secret)
  formData.append('outer_id', outer_id)
  formData.append('face_tokens', face_tokens)
  return faceService({
    url: '/faceset/addface',
    method: 'post',
    data: formData
  })
}

// 删除人脸信息
export function removeFace (face_tokens) {
  let formData = new window.FormData()
  formData.append('api_key', api_key)
  formData.append('api_secret', api_secret)
  formData.append('outer_id', outer_id)
  formData.append('face_tokens', face_tokens)
  return faceService({
    url: '/faceset/removeface',
    method: 'post',
    data: formData
  })
}

// 在人脸库中搜索人脸
export function searchFaceInfo (image_base64) {
  let formData = new window.FormData()
  formData.append('api_key', api_key)
  formData.append('api_secret', api_secret)
  formData.append('outer_id', outer_id)
  formData.append('image_base64', image_base64)
  return faceService({
    url: '/search',
    method: 'post',
    data: formData
  })
}

// 比较人脸
export function compareFaceInfoByImageBase64 (image_base64, image_base64_history) {
  let formData = new window.FormData()
  formData.append('api_key', api_key)
  formData.append('api_secret', api_secret)
  formData.append('outer_id', outer_id)
  formData.append('image_base64_1', image_base64_history)
  formData.append('image_base64_2', image_base64)
  return faceService({
    url: '/compare',
    method: 'post',
    data: formData
  })
}

// 比较人脸
export function compareFaceInfoByFaceToken (face_token1, face_token2) {
  let formData = new window.FormData()
  formData.append('api_key', api_key)
  formData.append('api_secret', api_secret)
  formData.append('outer_id', outer_id)
  formData.append('face_token1', face_token1)
  formData.append('face_token2', face_token2)
  return faceService({
    url: '/compare',
    method: 'post',
    data: formData
  })
}



