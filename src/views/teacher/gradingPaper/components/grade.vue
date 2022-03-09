<template>
  <div id="grade">
    <el-container class="app-item-contain">
      <div id="left">
        <div class="student-info">
          <span class="detail">
            学生学号：{{ $store.getters.userId }}
          </span>
          <br>
          <span class="detail">
            学生姓名：{{ $store.getters.name }}
          </span>
        </div>
        <!-- 试卷总览 -->
        <el-row class="do-exam-title">
          <el-col :span="24">
            <span v-for="(item, index) in tableData" :key="item.itemOrder">
              <span v-if="questionOrder.indexOf(index) !== -1" style="display: block; text-align:center; font-weight: 700; padding: 5px; background:#eee;">
                {{ questionName[questionOrder.indexOf(index)] }} <br>
              </span>
              <!-- item.completed判断题目是否做完 -->
              <el-tag
                class="do-exam-title-tag"
                style="display:inline-block;"
                @click="goAnchor('#question-'+item.itemOrder)"
              >
                {{ item.itemOrder }}
              </el-tag>
            </span>
            <span class="do-exam-time">
            </span>
          </el-col>
        </el-row>
      </div>

      <div id="right">
        <!-- 试卷名称与概况 -->
        <el-header class="align-center">
          <h1>{{ examName }}</h1>
          <div>
            <span class="question-title-padding">试卷总分：{{ totalScore }}</span>
          </div>
        </el-header>
        <el-main>
          <el-form ref="form" v-loading="formLoading" label-width="100px">
            <el-form-item v-for="(item, index) in tableData" :key="index">
              <span v-if="questionOrder.indexOf(index) !== -1" style="display: block; text-align:center; font-weight: 700; padding: 5px; background:#eee;">
                {{ questionName[questionOrder.indexOf(index)] }} <br>
              </span>
              <QuestionAnswerGrade
                :id="'question-'+ item.itemOrder"
                :q-type-str="item.exerciseType"
                :student-answer="item.studentAnswer"
                :chapter-id="item.chapterId"
                :chapter-name="item.chapterName"
                :major-name="item.majorName"
                :question-overview="item[item.exerciseType + 'Tea']"
                :answer="studentAnswerAll[item.itemOrder - 1]"
                :exercise-value="item.exerciseValue"
                class="record-answer-info"
              />
            </el-form-item>
            <el-row class="do-align-center">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button>取消</el-button>
            </el-row>
          </el-form>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatSeconds } from '@/utils/timeFormat'
import QuestionAnswerEdit from 'components/exam/QuestionAnswerEdit'

import {getStudentAnswer, uploadGradingScore} from "@/api/gradingPaper";
import {getOnGoingPaper} from "@/api/exam/paper"
import {questionMap} from "utils/questionMap"
import QuestionAnswerGrade from "@/components/exam/QuestionAnswerGrade";

export default {
  components: {QuestionAnswerGrade, QuestionAnswerEdit },
  data () {
    return {
      // 是否在试卷数据未完全获取时进行加载样式
      formLoading: false,
      examId: 0,
      timer: null,
      questionOrder: [],
      questionName: [],
      tableData: [],
      examName: '',
      totalScore: 0,
      studentAnswerAll: []
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doCompletedTag: state => state.exam.question.answer.doCompletedTag
    })
  },
  async created() {
    let examId = this.$route.query.examId
    let userId = this.$store.getters.userId
    let _this = this
    // 得到数据
    if (examId && parseInt(examId) !== 0) {
      _this.formLoading = true
      await getOnGoingPaper(examId).then(re => {
        // console.log(re);
        this.examName = re.data.examName
        this.examId = re.data.examId
        let exerciseItems = re.exerciseItems
        this.tableData = exerciseItems
        let count = 0
        let index = 0
        let tempExerciseType = ""
        for (let temp of exerciseItems) {
          this.totalScore += temp.exerciseValue
          if (tempExerciseType !== temp.exerciseType) {
            tempExerciseType = temp.exerciseType
            this.questionOrder.push(index)
            this.questionName.push(questionMap(temp.exerciseType))
          }
          // tempExerciseType = temp.exerciseType
          index++
          temp.itemOrder = index
        }
        this.formLoading = false
        _this.initAnswer()
      })
    }
  },
  // 清除考试时间的定时器
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  mounted() {
    // for debug
    // setTimeout(() => {
    //   console.log(this.tableData)
    // }, 1000)
  },
  methods: {
    // 时间格式标准化
    formatSeconds (theTime) {
      return formatSeconds(theTime)
    },
    questionCompleted (completed) {
      return this.enumFormat(this.doCompletedTag, completed)
    },
    // 网页滚动到相应题号处
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    },
    // 生成初始答案
    async initAnswer() {
      let examId = this.$route.query.examId
      let userId = this.$store.getters.userId

      await getStudentAnswer({examId, userId})
        .then(res => {
          this.studentAnswerAll = res.answers
          for (let i=0;i<this.studentAnswerAll.length;i++) {
            if (this.studentAnswerAll[i].studentAnswer === null)
              this.studentAnswerAll[i].studentAnswer = ''
          }
          console.log(this.studentAnswerAll)
        })
    },
    submitForm () {
      let Obj = {}
      Obj.answers = this.studentAnswerAll
      Obj.userId = this.$store.getters.userId
      Obj.examId = this.examId
      console.log(Obj)
      let _this = this
      _this.formLoading = true
      // console.log(this.answer.answerItems)
      uploadGradingScore(Obj).then(re => {
        if (re.status === 100) {
          this.$message.success('批改成功')
        } else {
          _this.$message.error(re.message)
        }
        _this.formLoading = false
      }).catch(e => {
        _this.formLoading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 480px) {
}

@media only screen and (min-width: 481px) {
  #left {
    position: fixed;
    transform: translate(0, 50%);
    margin: 15px;
    width: 24%;
    box-shadow: 0 2px 15px rgba(0, 0, 255, .2);
  }

  #right {
    position: relative;
    left: calc(24% + 30px);
    width: calc(100% - 24% - 30px);
  }

  .do-exam-title {
    width: 100%;
    background: #fff;
    padding: 5px 5px;
    z-index: 99;
  }
}

.do-exam-title-tag {
  margin: 5px;
  cursor: pointer;
}

.do-exam-time {
  width: 100%;
  text-align: center;
  line-height: 2;
  font-size: 14px;
  padding-right: 5px;
}

@media only screen and (max-width: 768px) {
  .app-item-contain {
    padding: 30px 0 0 0;
  }
}

.student-info {
  padding: 5px;
}

.student-info .detail {
  padding: 5px;
}

.align-center {
  text-align: center
}

.exam-question-item {
  padding: 10px;

  .el-form-item__label {
    font-size: 15px !important;
  }
}

.question-title-padding {
  padding-left: 25px;
  padding-right: 25px;
}

.do-align-center {
  text-align: center;
  margin-top: 40px;
}
</style>
