<template>
  <div id="notification">
    <el-table :data="tableData">
      <el-table-column
        label="考试ID"
        prop="examId"
      >
      </el-table-column>
      <el-table-column
        label="考试名称"
        prop="examName"
      >
      </el-table-column>
      <el-table-column
        label="学生学号"
        prop="userId"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            label="批改试卷"
            @click="handleClick(scope.row)"
          >
            批改试卷
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getStudentAnswer} from "@/api/gradingPaper";

export default {
  name: "MessageReminder",
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleClick(row) {
      let routeUrl = this.$router.resolve({
        path: '/exam/grade',
        query: {
          examId: row.examId,
          userId: row.userId
        }
      })
      window.open(routeUrl.href, '_blank')

      // getStudentAnswer({
      //   examId: row.examId,
      //   userId: row.userId
      // })
      // .then(res => {
      //   console.log(res)
      // })

    }
  }
}
</script>

<style scoped>

</style>
