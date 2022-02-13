<template>
  <div>
    <span v-if="examList">
      <template>
        <el-table
          :data="examList"
          stripe
        >
          <el-table-column
            prop="examName"
            label="试卷名称"
          >
          </el-table-column>
          <el-table-column
            prop="processedBeginTime"
            label="考试开始时间"
          >
          </el-table-column>
          <el-table-column
            prop="processedEndTime"
            label="考试结束时间"
          >
          </el-table-column>
          <el-table-column
            v-if="operation.length !== 0"
            fixed="right"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">{{ operation }}</el-button>
            </template>
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
    handleClick: {
      type: Function,
      default() {
        return undefined;
      }
    },
    operation: {
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>

<style scoped>
</style>
