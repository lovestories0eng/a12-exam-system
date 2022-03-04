<template>
  <div id="read">
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
                :type="questionDoRightTag(item.studentAnswer === item[item.exerciseType + 'Tea'].rightAnswer)"
                class="do-exam-title-tag"
                style="display:inline-block;"
                @click="goAnchor('#question-'+item.itemOrder)"
              >
                {{ item.itemOrder }}
              </el-tag>
            </span>
          </el-col>
        </el-row>
      </div>
      <div id="right">
        <el-header class="align-center">
          <h1>{{ examName }}</h1>
          <div>
            <span class="question-title-padding">试卷得分：{{ answer.score }}</span>
            <span class="question-title-padding">试卷耗时：{{ formatSeconds(answer.doTime) }}</span>
          </div>
        </el-header>
        <el-main>
          <el-form ref="form" v-loading="formLoading" :model="form" label-width="100px">
            <el-form-item v-for="(item, index) in tableData" :key="index">
              <span v-if="questionOrder.indexOf(index) !== -1" style="display: block; text-align:center; font-weight: 700; padding: 5px; background:#eee;">
                {{ questionName[questionOrder.indexOf(index)] }} <br>
              </span>
              <QuestionAnswerShow
                :id="'question-'+ item.itemOrder"
                :q-type-str="item.exerciseType"
                :chapter-id="item.chapterId"
                :chapter-name="item.chapterName"
                :major-name="item.majorName"
                :question-overview="item[item.exerciseType + 'Tea']"
                :student-answer="item.studentAnswer"
                :student-value="item.studentValue"
                :exercise-value="item.exerciseValue"
                :teacher-message="item.teacherMessage"
                class="record-answer-info"
              />
            </el-form-item>
          </el-form>
        </el-main>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatSeconds } from '@/utils/timeFormat'
import QuestionAnswerShow from 'components/exam/QuestionAnswerShow'
import {getHistoryPaper} from "@/api/exam/paper";
import {questionMap} from "utils/questionMap";

export default {
  components: { QuestionAnswerShow },
  data () {
    return {
      form: {},
      formLoading: false,
      answer: {
        id: null,
        score: 0,
        doTime: 0,
        answerItems: [],
        doRight: false
      },
      questionOrder: [],
      questionName: [],
      tableData: [],
      examName: ''
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doRightTag: state => state.exam.question.answer.doRightTag
    })
  },
  created () {
    let examId = this.$route.query.examId
    let _this = this
    if (examId && parseInt(examId) !== 0) {
      _this.formLoading = true
      getHistoryPaper(examId).then(re => {
        console.log(re)
        this.examName = re.data.examName
        let exerciseItems = re.exerciseItems
        this.tableData = exerciseItems
        let count = 0
        let index = 0
        let tempExerciseType = ""
        for (let temp of exerciseItems) {
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
      })
    }
  },
  methods: {
    formatSeconds (theTime) {
      return formatSeconds(theTime)
    },
    questionDoRightTag (status) {
      console.log(this.doRightTag)
      console.log(status)
      return this.enumFormat(this.doRightTag, status)
    },
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    }
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

  .student-info {
   padding: 5px;
  }

  .student-info .detail {
    padding: 5px;
  }

  .align-center {
    text-align: center
  }

  .exam-question-item{
    padding: 10px;
    .el-form-item__label{
      font-size: 15px !important;
    }
  }

  .question-title-padding{
    padding-left: 25px;
    padding-right: 25px;
  }
</style>
