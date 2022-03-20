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
import modifyStatus from "@/api/cheatData/modifyStatus";
import sendSwitchTimes from "@/api/cheatData/sendSwitchTimes";

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
  },
  async mounted() {
    if(this.$props.examList){
      for(let i = 0;i<this.$props.examList.length;i++){
        try {
          await modifyStatus(this.$props.examList[i]['examId'],'未进入考试')
          await sendSwitchTimes(this.$props.examList[i]['examId'],0)
        }catch (e){
          console.log(e.message)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
