<template>
  <div class="oneStudentItem">
    <img :id="studentInfo.id" v-lazy="studentInfo.avatar" alt="" class="avatar" @click="$emit('tryToDo',$props.studentInfo)">
    <div class="basicInfo">
      <div class="studentName">
        {{ "名字: "+studentInfo.name }}
      </div>
      <div class="studentId">
        {{ "学号: "+studentInfo.id }}
      </div>
      <div class="operation">
        <el-button type="warning" plain size="mini" @click="warning">警告学生</el-button>
      </div>
    </div>
    <div class="status">
      <span
        v-if="studentInfo.studentCondition === '未进入考试' "
        style="color: red"
      >
        &circleddash;
      </span>
      <span
        v-else
        style="color: greenyellow"
      >
        √
      </span>
      {{ studentInfo.studentCondition?studentInfo.studentCondition:'未进入考试' }}
    </div>
  </div>
</template>

<script>
import sendWarning from "@/api/cheatData/sendWarning";

export default {
  name: "oneStudentItem",
  props: {
    studentInfo: {
      type:Object,
      required: true
    },
    examId:{
      type:Number,
      default(){
        return 0
      }
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.$props.studentInfo)
  },
  methods: {
    //获取异常接口
    warning(){
      sendWarning(this.$props.examId,this.$props.studentInfo.id,'请认真考试')
    }
  }
}
</script>

<style scoped lang="scss">
.oneStudentItem {
  min-height: 200px;
  max-width: 200px;
  margin-top: 20px;
  margin-right: 20px;
  img {
    margin-left: 50%;
    transform: translateX(-50%);
    width: 125px;
    height: 125px;
  }

  .basicInfo {
    width: 100%;

    div {
      text-align: center;
      margin-top: 10px;
    }
  }

  .status {
    height: 50px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
