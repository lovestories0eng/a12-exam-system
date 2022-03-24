<template>
  <div class="container">
    <FaceDetection
      ref="faceDetection"
      :is-open-camera="isOpenCamera"
      :exam-id="examId"
    ></FaceDetection>
    <span>Microphone</span>
    <div class="volumen-wrapper">
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
      <div class="led"></div>
    </div>

    <div class="control-audio-wrapper">
      <div id="audio" class="audio-control" style="visibility: hidden" @click="openSoundTest">&#127908;</div>
    </div>
  </div>
</template>

<script>
import detectionLargeSound from "utils/detectionLargeSound";
import {Message} from "element-ui";
import FaceDetection from '../FaceDetection/index'
import sendSwitchTimes from "@/api/cheatData/sendSwitchTimes";
import modifyStatus from "@/api/cheatData/modifyStatus";
import sendCheatPicture from "@/api/cheatData/sendCheatPicture";
export default {
  name: "index",
  components:{FaceDetection},
  props:{
    examId:{
      type:Number,
      default: ()=> 123
    }
  },
  inject:['reload'],
  data() {
    return {
      leftTimes:5,
      switchTimes:0,
      isOpenCamera:false,
      leadColor: [
        "#064dac",
        "#064dac",
        "#064dac",
        "#06ac5b",
        "#15ac06",
        "#4bac06",
        "#80ac06",
        "#acaa06",
        "#ac8b06",
        "#ac5506",
      ],
      isFirstClick: true,
      listening: false,
      audioContext: null
    }
  },
  async mounted() {
    document.getElementById('audio').addEventListener('click', () => {
      this.activeSound()
    })
    let e = document.querySelector('#audio')
    e.click()
    // await sendSwitchTimes(this.$props.examId,0)
  },
  beforeDestroy() {
    document.removeEventListener('visibilitychange',this.switchListener)
  },
  methods: {
    activeSound () {
      try {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia(
          { audio: true, video: false },
          this.onMicrophoneGranted,
          this.onMicrophoneDenied
        );
      } catch(e) {
        alert(e)
      }
    },
    onMicrophoneDenied() {
      console.log('denied')
    },
    leads(vol) {
      let leads = [...document.getElementsByClassName('led')]
      let range = leads.slice(0, Math.round(vol))
      for (let i = 0; i < leads.length; i++) {
        leads[i].style.boxShadow = "-2px -2px 4px 0px #a7a7a73d inset, 2px 2px 4px 0px #0a0a0e5e inset";
      }
      for (let i = 0; i < range.length; i++) {
        range[i].style.boxShadow = `5px 2px 5px 0px #0a0a0e5e inset, -2px -2px 1px 0px #a7a7a73d inset, -2px -2px 30px 0px ${this.leadColor[i]} inset`;
      }
    },
    async onMicrophoneGranted(stream) {
      if (this.isFirstClick) {
        this.audioContext = new AudioContext()
        await this.audioContext.audioWorklet.addModule('vumeter.js')
        let microphone = this.audioContext.createMediaStreamSource(stream)

        const node = new AudioWorkletNode(this.audioContext, 'vumeter')
        node.port.onmessage = event => {
          let _volume = 0
          let _sensibility = 5
          if (event.data.volume)  _volume = event.data.volume;
          if(this.judgeLargeSound(_volume * 100)){
            Message.error('请保持安静')
          }

          this.leads((_volume * 100) / _sensibility)
        }
        microphone.connect(node).connect(this.audioContext.destination)

        this.isFirstClick = false
      }

      let audioButton = document.getElementsByClassName('audio-control')[0]
      if (this.listening) {
        await this.audioContext.suspend()
        audioButton.style.boxShadow = "-2px -2px 4px 0px #a7a7a73d, 2px 2px 4px 0px #0a0a0e5e"
        audioButton.style.fontSize = "25px"
      } else {
        await this.audioContext.resume()
        audioButton.style.boxShadow = "5px 2px 5px 0px #0a0a0e5e inset, -2px -2px 1px 0px #a7a7a73d inset"
        audioButton.style.fontSize = "24px"
      }

      this.listening = !this.listening
    },
    judgeLargeSound:detectionLargeSound(.1),
    openSoundTest(){
      this.isOpenCamera = true
      this.switchTimes = 0
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", ()=>{this.reload()},false)

      window.addEventListener('visibilitychange',this.switchListener)
    },
    async switchListener (){
      function CloseWebPage(){
        if (navigator.userAgent.indexOf("Firefox") !== -1 || navigator.userAgent.indexOf("Chrome") !==-1) {
          window.location.href="about:blank";
          window.close();
        } else {
          window.opener = null;
          window.open("", "_self");
          window.close();
        }
      }
      this.switchTimes++;
      if(this.switchTimes <= 5)  {
        try {
          await sendSwitchTimes(this.$props.examId,this.switchTimes)
        }catch (e) {
          console.log(e.message)
        }
      }
      if(document.visibilityState === 'hidden' && this.leftTimes>=0)
        Message.error(`考试途中请勿切屏，超过5次将视作作弊！！还剩${--this.leftTimes}次`)
      await sendCheatPicture()
      if(this.leftTimes<0 && document.visibilityState === 'hidden'){
        Message.error('您已被记为作弊，5S后将自动关闭页面')
        //发送作弊信息
        await modifyStatus(this.$props.examId,'作弊取消考试资格')
        setTimeout(()=>{
          CloseWebPage()
        },5000)
      }
    }
  }
}
</script>

<style scoped>
  .container {
    position: relative;
    width: 100%;
    background-color: #292a38;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 150px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
    color: #ffffff;
  }
  .volumen-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .led {
    width: 40px;
    height: 25px;
    background-color: #292a38;
    border-radius: 4px;

    box-shadow: -2px -2px 4px 0 #a7a7a73d inset, 2px 2px 4px 0 #0a0a0e5e inset;
    margin: 0 5px;
  }
  .audio-control {
    cursor: pointer;
    color: #fff;

    box-shadow: -2px -2px 4px 0 #a7a7a73d, 2px 2px 4px 0 #0a0a0e5e;
    padding: 8px;

    font-size: 25px;
    border-radius: 50%;
  }
</style>
