<template>
  <div>
    <span v-if="examList">
      <template>
        <el-table
          :data="examList"
          stripe
          @row-click="rowClick"
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
    },
    rowClick: {
      type: Function,
      default() {
        return undefined;
      }
    }
  },
  methods: {
    clickData(row) {
      let routeUrl = this.$router.resolve({
        path: "/exam/do",
        query: {
          id: row.id,
          studentId: this.$store.getters.studentId
        }
      });
      window.open(routeUrl.href, '_blank');
    }
  }
}
</script>

<style scoped>
.el-table {
  cursor: pointer;
}
</style>
