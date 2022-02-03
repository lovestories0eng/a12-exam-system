<template>
  <div>
    <Screen ref="screen" @filterExamLists="filterExamLists">
      <template v-if="device!=='mobile'">
        <div class="right-menu">
          <search
            class="right-menu-item"
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
    <div v-for="(item, index) in tags" :key="item">
      <el-card v-if="examsShow[index].length !== 0">
        <span>
          <strong>{{ item }}</strong>
        </span>
        <!-- 不同种类（进行中、待开始、已完成）的考试点击的事件不同 -->
        <ExamClassification :row-click="rowClicks[index]" :exam-list="examsShow[index]"></ExamClassification>
      </el-card>
    </div>
  </div>
</template>

<script>
import Screen from "views/student/exam/myexam/Screen";
import ExamClassification from "views/student/exam/myexam/ExamClassification";
import Search from "components/HeaderSearch"

import { Message } from 'element-ui'

import {examClassification} from "@/api/examClassification";
import {mapGetters} from "vuex";

export default {
  name: "MyExam",
  components: {
    Screen,
    ExamClassification,
    Search
  },
  data() {
    return {
      tags: ["进行中", "待开始", "已完成"],
      show: [true, true, false],
      // 生成1x3的空二维数组
      examLists: [[], [], []],
      examsShow: [[], [], []], // 筛选后的数据
      allExams: [],
      currentTime: (new Date).getTime(),
      fuseKeys: [{
        name: 'name',
        weight: 0.7
      }, {
        name: 'id',
        weight: 0.3
      }],
      searcherKey: (item) => item.id,
      searcherLabel: (item) => item.name,
      searcherMethod: (value) => {
        this.examsShow = [[], [], []]
        for (let i in this.examLists) {
          for (let j in this.examLists[i]) {
            if (value.id === this.examLists[i][j].id) {
              this.examsShow[i].push(value)
              this.$refs.screen.selectedRadio = this.$refs.screen.radioData[parseInt(i) + 1]
              return
            }
          }
        }
      },
      // 点击进行中、待开始、已完成的考试分别触发的回调函数
      rowClicks: [
        (row) => {
        let routeUrl = this.$router.resolve({
          path: "/exam/do",
          query: {
            id: row.id,
            studentId: this.$store.getters.studentId
          }
        });
        window.open(routeUrl.href, '_blank');
      },
        () => {
          Message.error('考试未开始，无法查看')
      },
        (row) => {
          let routeUrl = this.$router.resolve({
            path: "/exam/read",
            query: {
              id: row.id,
              studentId: this.$store.getters.studentId
            }
          });
          window.open(routeUrl.href, '_blank');
        }]
    }
  },
  computed: {
  ...mapGetters([
      'device',
    ])
  },
  created() {
    examClassification("20141331").then(response => {
        this.allExams = response.response.response
        for (let i of this.allExams) {
          let index = this.parseCategory(i.time)
          this.examLists[index].push(i)
        }
        this.examsShow = this.examLists
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
