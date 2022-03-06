<template>
  <div>
    <div v-show="getExam"
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

export default {
  name: "index",
  props: {
    examChosen: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
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
    }
  },
  methods: {
    checkFaceInfo (row) {
      this.face_token = this.$store.getters.faceToken
      if (this.face_token === '' || this.face_token === undefined || this.face_token === null) {
        this.$message.error('您还未注册人脸信息，请前往注册人脸信息')
        return
      }
      //打开摄像头
      this.getCompetence();
      this.compareFaceInfo(row)
    },
    getCompetence () {
      let _this = this;
      _this.getExam = true;
      _this.thisCanvas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCanvas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          let getUserMedia =
              navigator.webkitGetUserMedia ||
              navigator.mozGetUserMedia ||
              navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {//不存在则报错
            return Promise.reject(
                new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      let constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = e => {
            _this.thisVideo.play();
            // canvas画图
            _this.thisContext.drawImage(
                _this.thisVideo,
                0,
                0,
                _this.videoWidth,
                _this.videoHeight
            );
          };
          _this.camera = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 与人脸集信息进行比较
    async compareFaceInfo (row) {
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
            if (res.data.confidence > 85) {
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
              // window.open(routeUrl.href, '_blank');
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
    stopNavigator () {
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
