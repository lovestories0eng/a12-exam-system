<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div>
            考试通知
          </div>
          <el-button ref="examEdit" class="editButton">批量编辑</el-button>
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
        prop="examIsRead"
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.examIsRead === '未读'" style="color: red;">
            {{ scope.row.examIsRead }}
          </div>
          <div v-else>
            {{ scope.row.examIsRead }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="examEdit"
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            :disabled="examMessage[scope.$index].examReadTime !== null"
            type="text"
            size="small"
            @click="handleClick(scope.$index, examMessage)"
          >
            标为已读
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div>
            成绩推送
          </div>
          <el-button ref="gradeEdit" class="editButton">批量编辑</el-button>
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
        prop="gradeIsRead"
        label="状态"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.examIsRead === '未读'" style="color: red;">
            {{ scope.row.examIsRead }}
          </div>
          <div v-else>
            {{ scope.row.examIsRead }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="gradeEdit"
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            :disabled="gradeMessage[scope.$index].gradeReadTime !== null"
            type="text"
            size="small"
            @click="handleClick(scope.$index, gradeMessage)"
          >
            标为已读
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getNotice} from "@/api/user"
import {formatDate} from "utils/timeFormat";

export default {
  name: "Received",
  data() {
    return {
      examMessage: undefined,
      gradeMessage: undefined,
      examEdit: false,
      gradeEdit: false
    }
  },
  created() {
    getNotice().then(res => {
      let tableData = res.data
      this.examMessage = tableData.filter(item => {
        return item.grade === null
      })
      this.gradeMessage = tableData.filter(item => {
        return item.grade !== null
      })
      this.examMessage.forEach(item => {
        item.examIsRead = item.examReadTime !== null ? "已读" : "未读"
        item.gradeIsRead = item.gradeReadTime !== null ? "已读" : "未读"
        item.examBeginTime = formatDate(new Date(item.examBeginTime), 'yyyy-MM-dd hh:mm:ss')
        item.examEndTime = formatDate(new Date(item.examEndTime), 'yyyy-MM-dd hh:mm:ss')
      })
      this.gradeMessage.forEach(item => {
        item.examIsRead = item.examReadTime !== null ? "已读" : "未读"
        item.gradeIsRead = item.gradeReadTime !== null ? "已读" : "未读"
        item.examBeginTime = formatDate(new Date(item.examBeginTime), 'yyyy-MM-dd hh:mm:ss')
        item.examEndTime = formatDate(new Date(item.examEndTime), 'yyyy-MM-dd hh:mm:ss')
      })
    })
  },
  mounted() {
    this.$refs.examEdit.$el.onclick = () => {
      this.examEdit = !this.examEdit
    }
    this.$refs.gradeEdit.$el.onclick = () => {
      this.gradeEdit = !this.gradeEdit
    }
  },
  methods: {
    handleClick(index, message) {
      if (message[index].grade === null) {
        message[index].examReadTime = new Date()
        message[index].examIsRead = "已读"
      } else {
        message[index].gradeReadTime = new Date()
        message[index].gradeIsRead = "已读"
      }
    }
  }
}
</script>

<style scoped>
.is-active {
  color: red;
}

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
