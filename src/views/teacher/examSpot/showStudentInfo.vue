<template>
  <div class="studentInfo">
    <div class="studentName">
      学生姓名:<el-input id="show_name" v-model="$props.name" type="text" class="name" disabled></el-input>
    </div>
    <div class="studentId">
      学生学号:<el-input v-model="$props.userId" type="text" class="id" disabled></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "showStudentInfo",
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
  }
}
</script>

<style scoped lang="scss">
.studentInfo{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  div{
    //width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    .el-input{
      width: 80%;
    }
  }
}
</style>
