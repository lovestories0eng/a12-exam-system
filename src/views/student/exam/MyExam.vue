<template>
  <div>
    <div v-show="getExam"
         class="camera_outer">
      <video id="videoCamera"
             :width="videoWidth"
             :height="videoHeight"
             autoplay></video>
      <canvas id="canvasCamera"
              style="display:none;"
              :width="videoWidth"
              :height="videoHeight"></canvas>
    </div>
    <Screen ref="screen"
            @filterExamLists="filterExamLists">
      <template v-if="device!=='mobile'">
        <div class="right-menu">
          <search class="right-menu-item"
                  :search-pool="allExams"
                  :searcher-key="searcherKey"
                  :searcher-label="searcherLabel"
                  :searcher-method="searcherMethod"
                  :fuse-keys="fuseKeys"
                  @change="searcherMethod">
          </search>
        </div>
      </template>
    </Screen>
    <div v-for="(item, index) in tags"
         :key="item">
      <el-card v-if="examsShow[index].length !== 0">
        <span>
          <strong>{{ item }}</strong>
        </span>
        <!-- 不同种类（进行中、待开始、已完成）的考试点击的事件不同 -->
        <ExamClassification :operation="operations[index]"
                            :handle-click="rowClicks[index]"
                            :exam-list="examsShow[index]">
        </ExamClassification>
      </el-card>
    </div>
  </div>
</template>

<script>
import { compareFaceInfo } from '@/api/face/face.js';
import Screen from "views/student/exam/myexam/Screen";
import ExamClassification from "views/student/exam/myexam/ExamClassification";
import Search from "components/HeaderSearch"

import { Dialog, Message } from 'element-ui'

import { examClassification } from "@/api/user";
import { mapGetters } from "vuex";

import { formatDate } from "utils/timeFormat";

export default {
  name: "MyExam",
  components: {
    Screen,
    ExamClassification,
    Search
  },
  data () {
    return {
      tags: ["进行中", "待开始", "已完成"],
      operations: ["进入考试", "", "查看原卷"],
      show: [true, true, false],
      // 生成1x3的空二维数组
      examLists: [[], [], []],
      examsShow: [[], [], []], // 筛选后的数据
      allExams: [],
      currentTime: (new Date).getTime(),
      fuseKeys: [{
        name: 'examName',
        weight: 0.7
      }, {
        name: 'examId',
        weight: 0.3
      }],
      dialogVisible: false,
      videoWidth: 270,
      videoHeight: 270,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      camera: false,
      getExam: false,
      isfaceCompared: false,
      time: 0,
      searcherKey: (item) => item.examId,
      searcherLabel: (item) => item.examName,
      searcherMethod: (value) => {
        this.examsShow = [[], [], []]
        for (let i in this.examLists) {
          for (let j in this.examLists[i]) {
            if (value.examId === this.examLists[i][j].examId) {
              this.examsShow[i].push(value)
              this.$refs.screen.selectedRadio = this.$refs.screen.radioData[parseInt(i) + 1]
              return
            }
          }
        }
      },
      // 点击进行中、待开始、已完成的考试分别触发的回调函数
      rowClicks: [
        (row) => {
          this.checkFaceInfo(row)
        },
        () => {
          Message.error('考试未开始，无法查看')
        },
        (row) => {
          let routeUrl = this.$router.resolve({
            path: '/exam/read',
            query: {
              examId: row.examId
            }
          })
          window.open(routeUrl.href, '_blank')
        }]
    }
  },
  computed: {
    ...mapGetters([
      'device',
    ])
  },
  created () {
    examClassification().then(response => {
      this.allExams = response.data
      for (let i of this.allExams) {
        i.processedBeginTime = formatDate(new Date(i.examBeginTime), 'yyyy-MM-dd hh:ss')
        i.processedEndTime = formatDate(new Date(i.examEndTime), 'yyyy-MM-dd hh:ss')
        let index = this.parseCategory(i.examBeginTime, i.examEndTime)
        this.examLists[index].push(i)
      }
      this.examsShow = this.examLists
    }
    )
  },
  methods: {
    parseCategory (start, end) {
      start = new Date(start).getTime()
      end = new Date(end).getTime()
      // 0代表进行中，1代表未开始，2代表已结束
      if (start <= this.currentTime && this.currentTime <= end) {
        return 0
      } else if (this.currentTime < start) {
        return 1
      } else if (this.currentTime > end) {
        return 2
      }
    },
    filterExamLists (index) {
      this.examsShow = [[], [], []]
      if (index !== 0) {
        this.examsShow[index - 1] = this.examLists[index - 1]
      } else {
        this.examsShow = this.examLists
      }
    },
    checkFaceInfo (row) {
      //打开摄像头
      this.getCompetence();
      //每1s拍照一次检验
      let timer = setInterval(() => {
        this.compareFaceInfo(timer, row)
      }, 1000)
    },
    getCompetence () {
      var _this = this;
      _this.getExam = true;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
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
          var getUserMedia =
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
      var constraints = {
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
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play();
          };
          _this.camera = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //与人脸集信息进行比较
    compareFaceInfo (timer, row) {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      this.$notify.info({
        title: '人脸校验',
        message: '正在进行人脸校验，请开启相机访问权限并对准相机。'
      })
      //轮询对比人脸
      setTimeout(() => {
        let face = new FormData()
        face.append('image_file', this.dataURLtoBlob(image))
        //请求接口进行比对
        compareFaceInfo(this.$store.getters.userId, face)
          .then((res) => {
            //可信度大于94则进入考试
            if (res.data.results[0].confidence > 94) {
              _this.isfaceCompared = true;
              clearInterval(timer)
              this.thisVideo.srcObject.getTracks()[0].stop();
              this.camera = false;
              this.getExam = false;
            }
            if (this.isfaceCompared) {
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
              });
              window.open(routeUrl.href, '_blank');
            } else {
              this.$notify.info({
                title: '人脸校验',
                message: '正在进行人脸校验，请开启相机访问权限并将头对准相机。'
              })
            }
          })
          .catch((error) => console.log(error))
        this.time++;
        if (this.time > 5) {
          clearInterval(timer)
          this.thisVideo.srcObject.getTracks()[0].stop();
          this.camera = false;
          this.getExam = false;
          this.$notify.error({
            title: '人脸校验',
            message: '您尚未通过人脸校验，请重试，若无法正常使用请重新上传人脸信息'
          })
          this.time = 0;
        }
      }, 0)
    },
    //base64转二进制文件
    dataURLtoBlob (dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    },
    stopNavigator () {
      this.thisVideo.srcObject.getTracks()[0].stop();
      this.camera = false;
    },
  },
}
</script>

<style scoped>
.camera_outer {
  position: fixed;
  z-index: 999;
}
</style>
