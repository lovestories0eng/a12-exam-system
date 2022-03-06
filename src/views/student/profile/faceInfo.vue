<template>
  <div class="camera_outer">
    <div v-show="openCamera">
      <video id="videoCamera"
             :width="videoWidth"
             :height="videoHeight"
             autoplay
      ></video>
      <canvas id="canvasCamera"
              style="display:block;"
              :width="videoWidth"
              :height="videoHeight"
      ></canvas>
    </div>
    <div class="vButton">
      <span>
        <el-button @click="upload()">录入人脸信息</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import {detectFaceInfo, addFace, compareFaceInfoByImageBase64} from '@/api/face/face.js';
export default {
  data () {
    return {
      videoWidth: 200,
      videoHeight: 200,
      imgSrc: "",
      thisCanvas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      dialogVisible: false,
      openCamera: false,
      time: 0,
      // 是否位第一次上传图片
      faceFirstAdded: true,
      imageBase64: '',
      imageBase64History: '',
      face_token: '',
      face_token_history: '',
      // 图片是否上传成功
      faceUploadSuccess: false
    };
  },
  methods: {
    // 人脸信息上传整体逻辑：
    // 先上传一张照片到服务器上面，然后在拍一张照片进行比对，如果能够识别则上传成功，否则重新上传
    upload() {
      this.time = 0
      //打开摄像头
      this.getCompetence();
      this.$notify.info({
        title: '消息',
        message: '人脸信息录入中，请稍候'
      })
      this.uploadFaceInfo()
    },
    async uploadFaceInfo() {
      setTimeout(async () => {
        if (this.faceUploadSuccess) {
          this.faceUploadSuccess = false
          this.thisVideo.srcObject.getTracks()[0].stop()
          this.camera = false
          this.openCamera = false
          this.time = 0
          this.faceFirstAdded = true
          return
        }
        if (this.time >= 5) {
          this.thisVideo.srcObject.getTracks()[0].stop()
          this.camera = false
          this.openCamera = false
          this.time = 0
          this.$message.error('人脸校验失败，请对准屏幕')
          this.faceFirstAdded = true
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

        let image = document.createElement('img')
        image.src = this.thisCanvas.toDataURL("image/png")
        // 如果不是第一次上传图片
        if (!this.faceFirstAdded) {
          // 存储上一张照片和上一张图片的face_token
          this.face_token_history = this.face_token
          this.imageBase64History = this.imageBase64
        }
        this.imageBase64 = this.thisCanvas.toDataURL("image/png")

        // 解析faceToken
        await detectFaceInfo(this.imageBase64)
        .then(async (res) => {
          let face_token = res.data.faces[0].face_token
          this.face_token = face_token
          if (this.imageBase64History !== '' && this.face_token_history !== '') {
            await compareFaceInfoByImageBase64(this.imageBase64History, this.imageBase64)
            .then(async res => {
              if (res.data.confidence >= 85) {
                // 将faceToken存入人脸集以供验证
                await addFace(face_token)
                .then((res) => {
                  localStorage.setItem(this.$store.getters.userId + "face_token", face_token)
                  this.faceUploadSuccess = true
                  if (res.data.face_added === 1) {
                    _this.$notify({
                      title: '成功',
                      message: '人脸上传成功',
                      type: 'success'
                    })
                  }
                })
                .catch((error) => {
                  this.$message.error('服务器异常，人脸添加失败，请稍后重试')
                  this.time = 1000
                })
              } else {
                this.$message.warning('人脸比对失败，请将人脸对准屏幕')
              }
            })
          }
        })
        .catch((error) => {
          this.$message.error('服务器异常，人脸检测失败，请稍后重试')
          this.time = 1000
        });

        this.faceFirstAdded = false
        this.time++
        await this.uploadFaceInfo()
      }, 5000)
    },


    // 调用权限（打开摄像头功能）
    async getCompetence () {
      let _this = this;
      _this.openCamera = true;
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
          // transform: "scaleX(-1)"
        }
      };
      await navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
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
        _this.$notify.error({
          title: '错误',
          message: '相机调用失败' + err
        })
      });
    },
    // 关闭摄像头
    stopNavigator () {
      this.thisVideo.srcObject.getTracks()[0].stop();
      this.camera = false;
      this.openCamera = false;
    },
  }
};
</script>

<style>
.camera_outer {
  margin: 16px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
