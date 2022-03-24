<template>
  <div class="functionsTable">
    <div class="checkPictures">
      <div class="bar" @click="factory(getEl('.checkPictures .content'),oCheckPicturesHeight)()">比对照片</div>
      <div class="content">
        <comparePictures></comparePictures>
      </div>
    </div>
    <hr>
    <div class="checkAllPictures">
      <div class="bar" @click="factory(getEl('.checkAllPictures .content'),oAllPicturesHeight)()">查看所有照片</div>
      <div class="content">
      </div>
    </div>
    <hr>
    <div class="warningStudent">
      <div class="bar" @click="factory(getEl('.warningStudent .content'),oWarningStudentHeight)()">警告学生</div>
      <div class="content">
        <warningStudent :name="$props.name" :user-id="$props.userId" @confirmWarning="confirmWarning"></warningStudent>
      </div>
    </div>
    <hr>
    <div class="forceStudentOutExam">
      <div class="bar" @click="factory(getEl('.forceStudentOutExam .content'),oForceStudentOutExamHeight)()">强制结束考试</div>
      <div class="content">
        <forceQuitExam :name="$props.name" :user-id="$props.userId" @confirmForceQuit="confirmForceQuit">
        </forceQuitExam>
      </div>
    </div>
    <hr>
    <div class="quit">
      <el-button plain @click="quit">退出</el-button>
    </div>
  </div>
</template>

<script>
import AllPictures from "views/teacher/examSpot/AllPictures";
import warningStudent from "views/teacher/examSpot/warningStudent";
import forceQuitExam from "views/teacher/examSpot/forceQuitExam"
import comparePictures from "views/teacher/examSpot/comparePictures";
import addAnimation from "@/api/cheatData/addAnimation";
import sendWarning from "@/api/cheatData/sendWarning";
export default {
  name: "FunctionsTables",
  components:{warningStudent,forceQuitExam,comparePictures,AllPictures},
  props:{
    name:{
      type:String,
      default(){
        return ''
      }
    },
    userId:{
      type:Number,
      default() {
        return 0;
      }
    },
    examId:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data(){
    return {
      oWarningStudentHeight:0,
      oForceStudentOutExamHeight:0,
      oCheckPicturesHeight:0,
      oAllPicturesHeight:0
    }
  },
  mounted() {
    this.oWarningStudentHeight = this.getEl('.warningStudent .content').clientHeight
    this.oForceStudentOutExamHeight = this.getEl('.forceStudentOutExam .content').clientHeight
    this.oCheckPicturesHeight = this.getEl('.checkPictures .content').clientHeight
    this.oAllPicturesHeight = this.getEl('.checkAllPictures .content')
    document.querySelectorAll('.bar').forEach((item)=>{
      item.click()
    })
  },
  methods:{
    factory(el,height){
      console.log(el)
      return function (){
        el.style.height = el.clientHeight > 0 ? 0: height + 'px'
      }
    },
    quit(){
      this.$emit('functionalQuit')
    },
    getEl(name){
      return document.querySelector(name)
    },
    async confirmWarning(message){
      try{
        await sendWarning(this.$props.examId,this.$props.userId,message)
        this.$message.success('提醒成功')
      }catch (e) {
        console.log(e.message)
      }

    },
    async confirmForceQuit(message){
      try {
        await sendWarning(this.$props.examId,this.$props.userId,message + 'immediate quit')
      }catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">

.functionsTable{

  width: 100%;
  height: 100%;
  position: relative;
  //left: 50%;
  //top: 50%;
  //transform: translateX(-50%;
  //transform: translateX(-50%) translateY(-50%);
  background-color: white;
  overflow-x: hidden;
  overflow-y: scroll;
  .warningStudent{
    overflow:hidden;
    width: 100%;
    .content{
      display: flex;
      flex-direction: column;
    }
  }
  .forceStudentOutExam{
    width: 100%;
    overflow:hidden;
  }
  .checkPictures{
    width: 100%;
    overflow:hidden;
  }
  .quit{
    width: 100%;
    button{
      display: block;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
}

.bar{
  width: 80%;
  height:50px;
  background-color:white;
  box-shadow: whitesmoke 4px 3px 2px 1px;
  text-align:center;
  line-height:50px;
  margin: 0 auto;
  margin-top: 50px;
  &:hover{
    cursor: pointer;
  }
}
.content{
  transition-duration: .5s;
  transition-property: all;
  transition-timing-function: ease;
  transition-delay: 0s;
}

hr {
  height: 30px;
  width: 80%;
  border-style: solid;
  border-color: #8c8b8b;
  border-width: 1px 0 0 0;
  border-radius: 20px;
}
hr:before {
  display: block;
  content: "";
  height: 30px;
  margin-top: -31px;
  border-style: solid;
  border-color: #8c8b8b;
  border-width: 0 0 1px 0;
  border-radius: 20px;
}
</style>
