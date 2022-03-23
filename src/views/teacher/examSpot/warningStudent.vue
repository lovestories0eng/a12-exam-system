<template>
  <div class="warning_vue">
    <showStudentInfo
      :name="$props.name"
      :user-id="$props.userId"
    ></showStudentInfo>
    <div class="input-wrapper">
      提示语:&nbsp;&nbsp;&nbsp;&nbsp;<input v-model="warningContent" type="text">
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
  name: "warningStudent",
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
      warningContent:''
    }
  },
  methods:{
    myConfirm(){
      this.$emit('confirmWarning',this.warningContent)
      this.warningContent = ""
    }
  }
}
</script>

<style scoped lang="scss">
.warning_vue{
  width: 100%;
  .input-wrapper{
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
  }
  button{
    margin: 0 auto;
    display: block;
    margin-top: 20px;
  }
}

</style>
