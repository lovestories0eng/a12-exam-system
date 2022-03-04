import { faceService } from "utils/request";
let api_key = 'f9S-zYrsYIU9-BsjpycpVgjfLl3R_fpH';
let api_secret = 'U7yQA_cR8IsIwrdfGt5YFHGPePZyNyAL'
// 传图片解析faceinfo
export function detectFaceInfo (data) {
  return faceService({
    url: `/detect`,
    method: 'POST',
    params: {
      api_key,
      api_secret
    },
    data
  })
}

//给人脸集添加faceToken
export function createFaceSet (outer_id, face_tokens) {
  return faceService({
    url: `/faceset/create`,
    method: 'POST',
    params: {
      api_key,
      api_secret,
      outer_id,
      face_tokens,
      force_merge: 1
    },
  })
}

//人脸比对
export function compareFaceInfo (outer_id, data) {
  return faceService({
    url: `/search`,
    method: 'POST',
    params: {
      api_key,
      api_secret,
      outer_id,
    },
    data,
  })
}


