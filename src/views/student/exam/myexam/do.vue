<template>
  <div id="do">
    <!-- 试卷总览 -->
    <el-row class="do-exam-title">
      <el-col :span="24">
        <span v-for="item in answer.answerItems" :key="item.itemOrder">
          <!-- item.completed判断题目是否做完 -->
          <el-tag :type="questionCompleted(item.completed)" class="do-exam-title-tag" @click="goAnchor('#question-'+item.itemOrder)">{{ item.itemOrder }}</el-tag>
        </span>
        <span class="do-exam-time">
          <label>剩余时间：</label>
          <label>{{ formatSeconds(remainTime) }}</label>
        </span>
      </el-col>
    </el-row>
    <el-row class="do-exam-title-hidden">
      <el-col :span="24">
        <span v-for="item in answer.answerItems" :key="item.itemOrder">
          <el-tag class="do-exam-title-tag">{{ item.itemOrder }}</el-tag>
        </span>
        <span class="do-exam-time">
          <label>剩余时间：</label>
        </span>
      </el-col>
    </el-row>
    <el-container class="app-item-contain">
      <!-- 试卷名称与概况 -->
      <el-header class="align-center">
        <h1>{{ form.name }}</h1>
        <div>
          <span class="question-title-padding">试卷总分：{{ form.score }}</span>
          <span class="question-title-padding">考试时间：{{ form.suggestTime }}分钟</span>
        </div>
      </el-header>
      <el-main>
        <el-form ref="form" v-loading="formLoading" :model="form" label-width="100px">
          <el-row v-for="(titleItem,index) in form.titleItems" :key="index">
            <!-- 题目类型（单选题、多选题、简答题） -->
            <h3>{{ titleItem.name }}</h3>
            <el-card v-if="titleItem.questionItems.length!==0" class="exampaper-item-box">
              <!-- question记录题目数据 -->
              <el-form-item v-for="questionItem in titleItem.questionItems" :id="'question-'+ questionItem.itemOrder"
                            :key="questionItem.itemOrder"
                            :label="questionItem.itemOrder+'.'" class="exam-question-item" label-width="50px"
              >
                <question-edit :q-type="questionItem.questionType" :question="questionItem"
                               :answer="answer.answerItems[questionItem.itemOrder-1]"
                />
              </el-form-item>
            </el-card>
          </el-row>
          <el-row class="do-align-center">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button>取消</el-button>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { formatSeconds } from '@/utils/timeFormat'
import QuestionEdit from 'components/exam/QuestionEdit'
import examPaperApi from '@/api/examPaper'

export default {
  components: { QuestionEdit },
  data () {
    return {
      form: {},
      // 是否在试卷数据未完全获取时进行加载样式
      formLoading: false,
      answer: {
        // 题目编号
        questionId: null,
        // 考试已经进行了的时间
        doTime: 0,
        answerItems: []
      },
      timer: null,
      remainTime: 0
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doCompletedTag: state => state.exam.question.answer.doCompletedTag
    })
  },
  created () {
    let id = this.$route.query.id
    let studentId = this.$route.query.studentId
    let _this = this
    // 得到数据
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true
      examPaperApi.select(id, studentId).then(re => {
        re = re.response
        _this.form = re.response
        _this.remainTime = re.response.suggestTime * 60
        _this.initAnswer()
        _this.timeReduce()
        _this.formLoading = false
      })
    }
  },
  mounted () {

  },
  // 清除考试时间的定时器
  beforeDestroy () {
    window.clearInterval(this.timer)
  },
  methods: {
    // 时间格式标准化
    formatSeconds (theTime) {
      return formatSeconds(theTime)
    },
    // 计算考试相关时间
    timeReduce () {
      let _this = this
      this.timer = setInterval(function () {
        if (_this.remainTime <= 0) {
          _this.submitForm()
        } else {
          ++_this.answer.doTime
          --_this.remainTime
        }
      }, 1000)
    },
    questionCompleted (completed) {
      return this.enumFormat(this.doCompletedTag, completed)
    },
    // 网页滚动到相应题号处
    goAnchor (selector) {
      this.$el.querySelector(selector).scrollIntoView({ behavior: 'instant', block: 'center', inline: 'nearest' })
    },
    // 生成选择题和判断题的选项
    initAnswer () {
      this.answer.id = this.form.id
      let titleItemArray = this.form.titleItems
      for (let tIndex in titleItemArray) {
        let questionArray = titleItemArray[tIndex].questionItems
        for (let qIndex in questionArray) {
          let question = questionArray[qIndex]
          // 初始状态complete状态都设置为false
          this.answer.answerItems.push({ questionId: question.id, content: null, contentArray: [], completed: false, itemOrder: question.itemOrder })
        }
      }
    },
    submitForm () {
      let _this = this
      window.clearInterval(_this.timer)
      _this.formLoading = true
      examPaperApi.answerSubmit(this.answer).then(re => {
        if (re.code === 200) {
          _this.$alert('试卷得分：' + re.response + '分', '考试结果', {
            confirmButtonText: '返回考试记录',
            callback: action => {
              // _this.$router.push('/record/index')
            }
          })
        } else {
          _this.$message.error(re.message)
        }
        _this.formLoading = false
      }).catch(e => {
        _this.formLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .do-exam-title {
    width: 99%;
    background: #fff6f6;
    padding: 5px 0;
  }

  .do-exam-title-hidden {
    width: 100%;
    visibility: hidden;
    padding: 5px 0;
  }

  .do-exam-title-tag {
    margin-left: 5px;
    cursor: pointer;
  }

  .do-exam-time {
    float: right;
    line-height: 2;
    font-size: 14px;
    padding-right: 5px;
  }

  @media only screen and (max-width: 768px) {
    .app-item-contain {
      padding: 30px 0 0 0;
    }
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
