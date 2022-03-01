import { faceService } from "utils/request";
let api_key = 'kyI1fEFtdNyAMVbJiCCh6s3JwUvBTo19';
let api_secret = 'RebXttV4Lw3tQ4cO8DhHudr8f_Q2kEVb'
// 传图片解析faceinfo
export function detectFaceInfo (data) {
  return faceService({
    url: `/facepp/v3/detect`,
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
    url: `/facepp/v3/faceset/create`,
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
    url: `/facepp/v3/search`,
    method: 'POST',
    params: {
      api_key,
      api_secret,
      outer_id,
    },
    data,
  })
}


