<template>
  <div>
    <span v-if="examList">
      <template>
        <el-table
          :data="examList"
          stripe
          style="width: 100%"
          @row-click="clickData"
        >
          <el-table-column
            prop="name"
            label="试卷名称"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="考试时间"
          >
          </el-table-column>
        </el-table>
      </template>
    </span>
  </div>
</template>

<script>
export default {
  name: "ExamClassification",
  props: {
    show: {
      type: Boolean,
      default: true
    },
    examList: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  methods: {
    clickData(row) {
      let routeUrl = this.$router.resolve({
        path: "/exam/do",
        query: {
          id: row.id,
          studentId: 20141331
        }
      });
      window.open(routeUrl.href, '_blank');
    }
  }
}
</script>

<style scoped>

</style>
