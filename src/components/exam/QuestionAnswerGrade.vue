<template>
  <div style="line-height:1.8;">
    <el-card v-if="qTypeStr==='choice4'||qTypeStr==='choice5'||qTypeStr==='fill'||qTypeStr==='judge'||qTypeStr==='choice8'" :style="cardStyle">
      <div class="bar">
        <span v-if="majorName.length !== 0" class="desc">学科：{{ majorName }}</span>
        <span class="desc">题型：{{ questionMap(qTypeStr) }}</span>
        <span v-if="chapterId !== 0" class="desc">章节：{{ chapterId }} {{ chapterName }}</span>
      </div>
      <div v-if="qTypeStr==='choice4'">
        <div class="q-title" v-html="questionOverview.question" />
        <div class="q-content">
          <el-radio-group :value="answer.studentAnswer" disabled>
            <el-radio v-for="index in 4" :key="questionOverview['option' + index]" :label="questionOverview['option' + index]">
              <span class="question-prefix"> {{ choice4Options[index - 1] }}.</span>
              <span class="q-item-span-content" v-html="questionOverview['option' + index]"></span>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-if="qTypeStr==='choice5'">
        <div class="q-title" v-html="questionOverview.question" />
        <div class="q-content">
          <el-radio-group :value="answer.studentAnswer" disabled>
            <el-radio v-for="index in 5" :key="questionOverview['option' + index]" :label="questionOverview['option' + index]">
              <span class="question-prefix"> {{ choice5Options[index - 1] }}.</span>
              <span class="q-item-span-content" v-html="questionOverview['option' + index]"></span>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-if="qTypeStr==='fill'">
        <div class="q-title" v-html="questionOverview.question" />
      </div>
      <div v-if="qTypeStr==='judge'">
        <div class="q-title" v-html="questionOverview.question" />
        <div class="q-content">
          <el-radio-group :value="answer.studentAnswer" disabled>
            <el-radio v-for="index in 2" :key="questionOverview['option' + index]" :label="questionOverview['option' + index]">
              <span class="question-prefix"> {{ judgeOptions[index - 1] }}.</span>
              <span class="q-item-span-content" v-html="questionOverview['option' + index]"></span>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="question-answer-show-item">
        <span class="question-show-item">题目分数：</span>
        <span>{{ exerciseValue }}</span>
      </div>
      <div class="question-answer-show-item">
        <span class="question-show-item">难度：</span>
        <el-rate v-model="questionOverview.difficult" disabled class="question-show-item"></el-rate>
      </div>
      <br />
      <div class="question-answer-show-item">
        <span class="question-show-item">学生答案：{{ answer.studentAnswer }}</span>
        <br>
        <span class="question-show-item">正确答案：</span>
        <span v-if="qTypeStr==='choice4'||qTypeStr==='choice5' ||qTypeStr==='fill'||qTypeStr==='judge'" class="q-item-span-content" v-html="questionOverview.rightAnswer" />
        <!--<span v-if="qType===3" class="q-item-span-content" v-html="trueFalseFormatter(question)" />-->
        <!--<span v-if="qType===4">{{ question.correctArray }}</span>-->
      </div>
      <div class="question-answer-show-item" style="line-height: 1.8">
        <span class="question-show-item">解析：</span>
        <span class="q-item-span-content" v-html="questionOverview.analyze" /> <br>
        <span class="q-item-span-content" v-html="questionOverview.analyze" />
        <span class="q-item-span-content">
          老师评分：
          <el-input-number v-model="answer.studentValue"></el-input-number>
        </span> <br>
        <span class="q-item-span-content">
          老师批语：
          <el-input v-model="answer.teacherMessage" type="textarea" style="width: 50%; margin-top: 10px"></el-input>
        </span>
      </div>
    </el-card>
    <div v-else>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import {questionMap} from "utils/questionMap";

export default {
  name: 'QuestionGrade',
  props: {
    questionOverview: {
      type: Object,
      default() {
        return {}
      }
    },
    chapterId: {
      type: Number,
      default() {
        return 0
      }
    },
    chapterName: {
      type: String,
      default() {
        return ''
      }
    },
    answer: {
      type: Object,
      default() {
        return {}
      }
    },
    exerciseValue: {
      type: Number,
      default: 0
    },
    qLoading: {
      type: Boolean,
      default: false
    },
    qTypeStr: {
      type: String,
      default: ""
    },
    majorName: {
      type: String,
      default: ""
    },
    cardStyle: {
      type: String,
      default: 'box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);'
    }
  },
  data() {
    return {
      questionMap: questionMap,
      choice4Options: ['A', 'B', 'C', 'D'],
      choice5Options: ['A', 'B', 'C', 'D', 'E'],
      judgeOptions: ['对', '错'],
      teacherMessage: '',
      studentValue: 0
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doRightEnum: state => state.exam.question.answer.doRightEnum,
      doRightTag: state => state.exam.question.answer.doRightTag
    })
  },
  mounted() {
    // console.log(this.questionOverview)
  },
  methods: {
    trueFalseFormatter (question) {
      return question.items.filter(d => d.prefix === question.correct)[0].content
    },
    doRightTagFormatter (status) {
      return this.enumFormat(this.doRightTag, status)
    },
    doRightTextFormatter (status) {
      return this.enumFormat(this.doRightEnum, status)
    }
  }
}
</script>

<style scoped>
.bar {
  width: 100%;
  height: 30px;
  background-color: #fff;
  margin-bottom: 20px;
  font-weight: 700;
}

.desc {
  height: inherit;
  line-height: 30px;
  margin-right: 30px;
}
</style>
