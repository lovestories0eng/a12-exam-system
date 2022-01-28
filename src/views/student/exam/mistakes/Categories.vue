<template>
  <el-row class="header">
    {{ desc }}
    <span v-for="(item, index) in list" :key="index" class="subject">{{ item.name }}</span>
    <hr>
  </el-row>
</template>

<script>
export default {
  name: "Categories",
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      desc: "学科分类"
    }
  }
}
</script>

<style scoped>
.subject {
  padding: 15px;
  height: 25px;
  line-height: 25px;
}

.subject:hover {
  cursor: pointer;
  background-color: #eee;
}
</style>
