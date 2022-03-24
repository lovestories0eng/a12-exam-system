<template>
  <div>
    <div v-show="getExam"
         id="do-camera"
         class="camera_outer"
    >
      <video id="videoCamera"
             :width="videoWidth"
             :height="videoHeight"
             autoplay
      ></video>
      <canvas id="canvasCamera"
              style="display:none;"
              :width="videoWidth"
              :height="videoHeight"
      ></canvas>
    </div>
  </div>
</template>

<script>
import {compareFaceInfoByFaceToken, detectFaceInfo} from "@/api/face/face";
import sendCheatPicture from "@/api/cheatData/sendCheatPicture";
import openCamera from "utils/openCamera";
import {serviceTwo} from "utils/request";

export default {
  name: "index",
  props: {
    examId: {
      type: Number,
      default() {
        return 123
      }
    },
    examChosen: {
      type: Object,
      default() {
        return {}
      }
    },
    isOpenCamera: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      showNotice: false,
      videoWidth: 200,
      videoHeight: 200,
      imgSrc: "",
      thisCanvas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      camera: false,
      getExam: false,
      isFaceCompared: false,
      // 人脸比对成功
      faceComparedSuccess: false,
      face_token: '',
      imageBase64: ''
    }
  },
  watch: {
    examChosen(newValue) {
      if (Object.keys(newValue).length === 0)
        return
      this.checkFaceInfo(newValue)
    },
    isOpenCamera(newValue) {
      if (newValue) {
        let v = document.querySelector('#do-camera')
        v.style.visibility = 'hidden'
        this.getCompetence()
        setTimeout(async () => {
          this.draw()
          // await sendCheatPicture(this.dataURLtoFile(this.imageBase64, new Date().getTime()), this.$props.examId).then(res => {
          //   console.log(res)
          // })
        }, 5000)
      }
    }
  },
  methods: {
    draw(){
      let _this = this;
      // canvas画图
      _this.thisContext.drawImage(
          _this.thisVideo,
          0,
          0,
          _this.videoWidth,
          _this.videoHeight
      );
      this.imageBase64 = this.thisCanvas.toDataURL("image/png")
    },
    dataURLtoFile(dataUrl, filename) {
      let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type: mime});
    },
    checkFaceInfo(row) {
      this.face_token = this.$store.getters.faceToken
      if (this.face_token === '' || this.face_token === undefined || this.face_token === null) {
        this.$message.error('您还未注册人脸信息，请前往注册人脸信息')
        return
      }
      //打开摄像头
      this.getCompetence();
      this.compareFaceInfo(row)
    },
    getCompetence: openCamera,
    // 与人脸集信息进行比较
    async compareFaceInfo(row) {
      // 递归对比人脸
      setTimeout(async () => {
        if (this.faceComparedSuccess) {
          this.faceComparedSuccess = false
          this.thisVideo.srcObject.getTracks()[0].stop();
          this.camera = false;
          this.getExam = false;
          this.time = 0;
          return
        }

        if (this.time > 5) {
          this.thisVideo.srcObject.getTracks()[0].stop();
          this.camera = false;
          this.getExam = false;
          this.$notify.error({
            title: '人脸校验',
            type: 'error',
            message: '您尚未通过人脸校验，请重试，若无法正常使用请重新上传人脸信息'
          })
          this.time = 0;
          return
        }

        let _this = this;
        // canvas画图
        _this.thisContext.drawImage(
            _this.thisVideo,
            0,
            0,
            _this.videoWidth,
            _this.videoHeight
        );
        // 获取图片base64链接
        this.imageBase64 = this.thisCanvas.toDataURL("image/png")
        this.$notify.info({
          title: '人脸校验',
          message: '正在进行人脸校验，请开启相机访问权限并对准相机。'
        })
        await detectFaceInfo(this.imageBase64)
            .then(async res => {
              let resultFaceToken = res.data.faces[0].face_token
              //请求接口进行比对
              await compareFaceInfoByFaceToken(resultFaceToken, this.face_token)
                  .then((res) => {
                    //可信度大于85则进入考试
                    if (res.data.confidence > 20) {
                      _this.faceComparedSuccess = true;
                      this.thisVideo.srcObject.getTracks()[0].stop();
                      this.camera = false;
                      this.getExam = false;
                    }
                    if (_this.faceComparedSuccess) {
                      this.$notify({
                        title: '成功',
                        message: '您已通过人脸校验，请等待跳转考试界面',
                        type: 'success'
                      })
                      let routeUrl = this.$router.resolve({
                        path: "/exam/do",
                        query: {
                          examId: row.examId
                        }
                      })
                      window.location.href = routeUrl.href
                    } else {
                      this.$notify.info({
                        title: '人脸校验',
                        message: '人脸比对置信度过低，请将头对准摄像头。'
                      })
                    }
                  })
                  .catch((error) => {
                    this.$message.error('服务器异常，人脸比对失败，请稍后再试')
                  })
            })

        this.time++;
        await this.compareFaceInfo(row)
      }, 3000)
    },
    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
      this.camera = false;
    },
  }
}
</script>

<style scoped>
.camera_outer {
  position: fixed;
  z-index: 999;
}
</style>
