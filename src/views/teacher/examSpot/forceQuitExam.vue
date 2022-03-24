<template>
  <div class="forQuitExam">
    <showStudentInfo :name="$props.name" :user-id="$props.userId"></showStudentInfo>
    <div class="input-wrapper">
      理由:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="reason" placeholder="请输入内容"></el-input>
    </div>
    <el-popconfirm
      title="此操作将直接影响学生，是否继续？"
      @confirm="myConfirm"
    >
      <el-button slot="reference">执行</el-button>
    </el-popconfirm>
  </div>
</template>

<script>
import showStudentInfo from "views/teacher/examSpot/showStudentInfo";
export default {
  name: "forceQuitExam",
  components:{showStudentInfo},
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
        return 111;
      }
    }
  },
  data(){
    return {
      reason:""
    }
  },
  methods:{
    myConfirm(){
      if(this.reason){
        this.$emit('confirmForceQuit',this.reason)
        this.reason = ""
      }else{
        alert('不可无故取消考生成绩，请输入理由')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.forceStudentOutExam{
  width: 80%;
  .input-wrapper{
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    .el-input{
      width: 500px;
      display: block;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
  button{
    margin: 0 auto;
    display: block;
    margin-top: 20px;
  }
}
</style>
