<template>
  <div>
    <Screen></Screen>
    <div v-for="(item, index) in tags" :key="item">
      <el-card>
        <span>
          <strong>{{ item }}</strong>
        </span>
        <ExamClassification :exam-list="examLists[index]"></ExamClassification>
      </el-card>
    </div>
  </div>
</template>

<script>
import Screen from "views/student/exam/myexam/Screen";
import ExamClassification from "views/student/exam/myexam/ExamClassification";
import { examClassification } from "@/api/examClassification";
export default {
  name: "MyExam",
  components: {
    Screen,
    ExamClassification
  },
  data() {
    return {
      tags: ["进行中", "待开始", "已完成"],
      show: [true, true, false],
      examLists: [[], [], []],
      currentTime: (new Date).getTime()
    }
  },
  created() {
    examClassification("20141331").then(response => {
      let tempExamLists = response.response.response
      for (let i of tempExamLists) {
        let index = this.parseCategory(i.time)
        this.examLists[index].push(i)
      }
      console.log(this.examLists)
      }
    )
  },
  methods: {
    parseCategory(dateStr) {
      let dateArray = dateStr.split('-')
      let start = new Date(dateArray[0]).getTime()
      let end = new Date(dateArray[1]).getTime()
      // 0代表进行中，1代表未开始，2代表已结束
      if (start <= this.currentTime && this.currentTime <= end) {
        return 0
      } else if (this.currentTime < start) {
        return 1
      } else if (this.currentTime > end) {
        return 2
      }
    }
  }
}
</script>

<style scoped>

</style>
