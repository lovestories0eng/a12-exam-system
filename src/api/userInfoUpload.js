import request from "utils/request";

export function uploadImage(data) {
  return request({
    url: "/web/sutdent/profile/image",
    methods: 'post',
    data,
    headers: {'Content-Type': 'multipart/form-data'},
    onUploadProgress: progressEvent => {
      // progressEvent.loaded:已上传文件大小
      // progressEvent.total:被上传文件的总大小
      this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
    }
  })
}

export function uploadInfo(data) {
  return request({
    url: '/web/student/profile/info',
    method: 'post',
    data
  })
}
