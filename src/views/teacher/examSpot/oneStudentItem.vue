<template>
  <div class="oneStudentItem">
    <img :id="studentInfo.id" v-lazy="studentInfo.avatar" alt="" class="avatar" @click="getAbnormalPicture">
    <div class="basicInfo">
      <div class="studentName">
        {{ "名字: "+studentInfo.name }}
      </div>
      <div class="studentId">
        {{ "学号: "+studentInfo.id }}
      </div>
    </div>
    <div class="status">
      <span
        v-if="studentInfo.studentCondition"
        style="color: red"
      >
        &circleddash;
      </span>
      <span
        v-if="!studentInfo.studentCondition"
        style="color: green"
      >
        &circledcirc;
      </span>
      {{ studentInfo.studentCondition?studentInfo.studentCondition:'未进入考试' }}
    </div>
  </div>
</template>

<script>
export default {
  name: "oneStudentItem",
  props: {
    studentInfo: {
      type:Object,
      required: true
    }
  },
  mounted() {
    console.log(this.$props.studentInfo)
  },
  data() {
    return {
    }
  },
  methods: {
    //获取异常接口
    getAbnormalPicture(){

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
      //margin-left: 30px;
    }
  }

  .status {
    height: 50px;
    width: 100%;
    text-align: center;
  }
}
</style>
