<template>
  <div>
    <Screen ref="screen"
            @filterExamLists="filterExamLists"
    >
      <FaceDetection :exam-chosen="examChosen"></FaceDetection>
      <template v-if="device!=='mobile'">
        <div class="right-menu">
          <search class="right-menu-item"
                  :search-pool="allExams"
                  :searcher-key="searcherKey"
                  :searcher-label="searcherLabel"
                  :searcher-method="searcherMethod"
                  :fuse-keys="fuseKeys"
                  @change="searcherMethod"
          >
          </search>
        </div>
      </template>
    </Screen>
    <div v-for="(item, index) in tags"
         :key="item"
    >
      <el-card v-if="examsShow[index].length !== 0">
        <span>
          <strong>{{ item }}</strong>
        </span>
        <!-- 不同种类（进行中、待开始、已完成）的考试点击的事件不同 -->
        <ExamClassification :operation="operations[index]"
                            :handle-click="rowClicks[index]"
                            :exam-list="examsShow[index]"
        >
        </ExamClassification>
      </el-card>
    </div>
  </div>
</template>

<script>
import Screen from "views/student/exam/myexam/Screen"
import ExamClassification from "views/student/exam/myexam/ExamClassification"
import Search from "components/HeaderSearch"
import FaceDetection from "components/FaceDetection"

import {Message} from 'element-ui'

import {examClassification} from "@/api/user"
import {mapGetters} from "vuex"

import {formatDate} from "utils/timeFormat"
import modifyStatus from "@/api/cheatData/modifyStatus";
import sendSwitchTimes from "@/api/cheatData/sendSwitchTimes";

export default {
  name: "MyExam",
  components: {
    Screen,
    ExamClassification,
    Search,
    FaceDetection,
  },
  data() {
    return {
      row:null,
      showNotice: false,
      tags: ["进行中", "待开始", "已完成"],
      operations: ["进入考试", "", "查看原卷"],
      show: [true, true, false],
      // 生成1x3的空二维数组
      examLists: [[], [], []],
      examsShow: [[], [], []], // 筛选后的数据
      allExams: [],
      currentTime: (new Date).getTime(),
      fuseKeys: [{
        name: 'examName',
        weight: 0.7
      }, {
        name: 'examId',
        weight: 0.3
      }],
      // 选中的考试
      examChosen: null,
      dialogVisible: false,
      time: 0,
      searcherKey: (item) => item.examId,
      searcherLabel: (item) => item.examName,
      searcherMethod: (value) => {
        this.examsShow = [[], [], []]
        for (let i in this.examLists) {
          for (let j in this.examLists[i]) {
            if (value.examId === this.examLists[i][j].examId) {
              this.examsShow[i].push(value)
              this.$refs.screen.selectedRadio = this.$refs.screen.radioData[parseInt(i) + 1]
              return
            }
          }
        }
      },
      // 点击进行中、待开始、已完成的考试分别触发的回调函数
      rowClicks: [
        async (row) => {
          this.row = row
          this.examChosen = row
          try {
            await sendSwitchTimes(row.examId,0)
            await modifyStatus(row.examId,'考试中')
          }catch (e) {
            console.log(e.message)
          }
          window.addEventListener('beforeunload',this.beforeClosePage)
        },
        () => {
          Message.error('考试未开始，无法查看')
        },
        (row) => {
          let routeUrl = this.$router.resolve({
            path: '/exam/read',
            query: {
              examId: row.examId
            }
          })
          window.open(routeUrl.href, '_blank')
        }]
    }
  },
  computed: {
    ...mapGetters([
      'device',
    ])
  },
  created() {
    examClassification()
      .then(response => {
        this.allExams = response.data
        for (let i of this.allExams) {
          i.processedBeginTime = formatDate(new Date(i.examBeginTime), 'yyyy-MM-dd hh:ss')
          i.processedEndTime = formatDate(new Date(i.examEndTime), 'yyyy-MM-dd hh:ss')
          let index = this.parseCategory(i.examBeginTime, i.examEndTime)
          this.examLists[index].push(i)
        }
        this.examsShow = this.examLists
      }
    )
  },
  methods: {
    async beforeClosePage(){
      await modifyStatus(this.row.examId,'退出考试')
    },
    parseCategory(start, end) {
      start = new Date(start).getTime()
      end = new Date(end).getTime()
      // 0代表进行中，1代表未开始，2代表已结束
      if (start <= this.currentTime && this.currentTime <= end) {
        return 0
      } else if (this.currentTime < start) {
        return 1
      } else if (this.currentTime > end) {
        return 2
      }
    },
    filterExamLists(index) {
      this.examsShow = [[], [], []]
      if (index !== 0) {
        this.examsShow[index - 1] = this.examLists[index - 1]
      } else {
        this.examsShow = this.examLists
      }
    }
  },
}
</script>

<style scoped>
</style>
