<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div>
            考试通知
          </div>
          <el-button class="editButton">批量编辑</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="examMessage"
      style="width: 100%"
    >
      <el-table-column
        prop="examName"
        label="考试名称"
      >
      </el-table-column>
      <el-table-column
        prop="examBeginTime"
        label="考试开始时间"
      >
      </el-table-column>
      <el-table-column
        prop="examEndTime"
        label="考试截止时间"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">标为已读</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div>
            成绩推送
          </div>
          <el-button class="editButton">批量编辑</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="gradeMessage"
      style="width: 100%"
    >
      <el-table-column
        prop="examName"
        label="考试名称"
      >
      </el-table-column>
      <el-table-column
        prop="examBeginTime"
        label="考试开始时间"
      >
      </el-table-column>
      <el-table-column
        prop="examEndTime"
        label="考试截止时间"
      >
      </el-table-column>
      <el-table-column
        prop="grade"
        label="成绩"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">标为已读</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import getNotice from "@/api/notice"
import {formatDate} from "utils/timeFormat";

export default {
  name: "Received",
  data() {
    return {
      examMessage: undefined,
      gradeMessage: undefined,
    }
  },
  created() {
    getNotice.received(this.$store.getters.studentId).then(res => {
      console.log(res);
      let tableData = res.data.data
      this.examMessage = tableData.filter(item => {
        return item.grade === null
      })
      this.gradeMessage = tableData.filter(item => {
        return item.grade !== null
      })
      this.examMessage.forEach(item => {
        item.examBeginTime = formatDate(new Date(item.examBeginTime), 'yyyy-MM-dd hh:mm:ss')
        item.examEndTime = formatDate(new Date(item.examEndTime), 'yyyy-MM-dd hh:mm:ss')
      })
      this.gradeMessage.forEach(item => {
        item.examBeginTime = formatDate(new Date(item.examBeginTime), 'yyyy-MM-dd hh:mm:ss')
        item.examEndTime = formatDate(new Date(item.examEndTime), 'yyyy-MM-dd hh:mm:ss')
      })
    })
  }
}
</script>

<style scoped>
.bg-purple-dark {
  font-weight: 700;
  margin: 10px;
  background: #eee;
}

.grid-content {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  border-radius: 4px;
  min-height: 36px;
}

.editButton {
  margin: 5px;
}

</style>
