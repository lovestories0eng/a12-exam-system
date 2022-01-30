<template>
  <div>
    <el-row class="row">
      <span class="desc">{{ desc }}</span>
      <el-radio-group v-model="selectedRadio" @change="change">
        <el-radio v-for="item in radioData" :key="item" :label="item">
          <span>{{ item }}</span>
        </el-radio>
      </el-radio-group>
      <slot></slot>
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
  },
  methods: {
    change(type) {
      this.$emit("filterExamLists", this.radioData.indexOf(type))
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  /*flex-grow: 1;*/
  background-color: #eee;
  height: 50px;
  line-height: 50px;
}

.desc {
  width: 50px;
  margin-left: 10px;
  margin-right: 5px;
}

.el-radio {
  margin: 5px;
}

</style>
