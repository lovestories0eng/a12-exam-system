<template>
  <div>
    <el-row class="row">
      <span class="desc">{{ desc }}</span>
      <el-radio-group v-model="selectedRadio" style="margin: 15px auto;">
        <el-radio v-for="item in radioData" :key="item" :label="item">
          <span>{{ item }}</span>
        </el-radio>
      </el-radio-group>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Screen",
  data() {
    return {
      desc: "筛选",
      radioData: ["全部", "进行中", "待开始", "已完成"],
      selectedRadio: ""
    }
  }
}
</script>

<style scoped>
.row {
  background-color: #eee;
}

.desc {
  margin-left: 20px;
  margin-right: 25px;
}

</style>
