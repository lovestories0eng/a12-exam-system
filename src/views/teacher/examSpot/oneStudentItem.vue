<template>
  <div class="oneStudentItem">
    <img :id="studentInfo.id"  alt="" class="avatar" @click="getAbnormalPicture" v-lazy="studentInfo.avatar">
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
        v-if="studentInfo.isReady"
        style="color: red"
      >
        &circleddash;
      </span>
      <span
        v-if="!studentInfo.isReady"
        style="color: green"
      >
        &circledcirc;
      </span>
      {{ studentInfo.isReady ? "考试中" : "未进入考试" }}
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
    margin-left: 70%;
    transform: translateX(-50%);
    width: 125px;
    height: 125px;
  }

  .basicInfo {
    width: 100%;

    div {
      text-align: center;
    }
  }

  .status {
    height: 50px;
    width: 100%;
    text-align: center;
  }
}
</style>
