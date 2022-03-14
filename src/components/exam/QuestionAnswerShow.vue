<template>
  <div style="line-height:1.8;">
    <el-card v-if="qTypeStr==='choice4'||qTypeStr==='choice5'||qTypeStr==='fill'||qTypeStr==='judge'||qTypeStr==='choice8'" :style="cardStyle">
      <div class="bar">
        <span v-if="majorName.length !== 0" class="desc">学科：{{ majorName }}</span>
        <span class="desc">题型：{{ questionMap(qTypeStr) }}</span>
        <span v-if="chapterId !== 0" class="desc">章节：{{ chapterId }} {{ chapterName }}</span>
      </div>
      <div class="q-title">
        <mavon-editor
          :value="questionOverview.question"
          class="mavon-editor-question-show q-item-span-content"
          :external-link="externalLink"
          :subfield="false"
          :default-open="'preview'"
          :toolbars-flag="false"
          :editable="false"
          :scroll-style="true"
          :ishljs="true"
        >
        </mavon-editor>
      </div>
      <div v-if="qTypeStr==='choice4'">
        <div class="q-content">
          <el-radio-group disabled>
            <el-radio v-for="index in 4" :key="questionOverview['option' + index]" class="answer-show-el-radio" :label="questionOverview['option' + index]">
              <div>
                <mavon-editor
                  :value="choice4Options[index - 1] + '.' + questionOverview['option' + index]"
                  class="mavon-editor-choice-option q-item-span-content"
                  :external-link="externalLink"
                  :subfield="false"
                  :default-open="'preview'"
                  :toolbars-flag="false"
                  :editable="false"
                  :scroll-style="true"
                  :ishljs="true"
                >
                </mavon-editor>
              </div>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-if="qTypeStr==='choice5'">
        <div class="q-content">
          <el-radio-group disabled>
            <el-radio v-for="index in 5" :key="questionOverview['option' + index]" class="answer-show-el-radio" :label="questionOverview['option' + index]">
              <div>
                <mavon-editor
                  :value="choice5Options[index - 1] + '.' + questionOverview['option' + index]"
                  class="mavon-editor-choice-option q-item-span-content"
                  :external-link="externalLink"
                  :subfield="false"
                  :default-open="'preview'"
                  :toolbars-flag="false"
                  :editable="false"
                  :scroll-style="true"
                  :ishljs="true"
                >
                </mavon-editor>
              </div>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-if="qTypeStr==='fill'">
        <mavon-editor
          :value="studentAnswer"
          class="mavon-editor-subject-answer-show"
          :subfield="false"
          :default-open="'preview'"
          :toolbars-flag="false"
          :editable="false"
          :scroll-style="true"
          :ishljs="true"
        />
      </div>
      <div v-if="qTypeStr==='judge'">
        <div class="q-content">
          <el-radio-group :value="studentAnswer">
            <el-radio label="对">正确</el-radio>
            <el-radio label="错">错误</el-radio>
          </el-radio-group>
        </div>
      </div>
      <br />
      <div class="question-answer-show-item">
        <span
          v-if="qTypeStr==='choice4' || qTypeStr==='choice5' || qTypeStr==='judge'"
          class="question-show-item"
        >学生答案：{{ studentAnswer }} <br>
        </span>
        <span class="question-show-item">正确答案：</span>
        <span
          v-if="qTypeStr==='choice4'||qTypeStr==='choice5'||qTypeStr==='judge'"
          class="q-item-span-content"
          v-html="questionOverview.rightAnswer"
        >
        </span>
        <span
          v-else-if="qTypeStr==='fill' || qTypeStr==='solve'"
          class="q-item-span-content"
        >
          <mavon-editor
            :value="questionOverview.rightAnswer"
            class="mavon-editor-subject-answer-show"
            :subfield="false"
            :default-open="'preview'"
            :toolbars-flag="false"
            :editable="false"
            :scroll-style="true"
            :ishljs="true"
          >
          </mavon-editor>
        </span>
      </div>
      <div class="question-answer-show-item" style="line-height: 1.8">
        <span>解析：</span>
        <span class="q-item-span-content">
          <mavon-editor
            :value="questionOverview.analyze"
            class="mavon-editor-subject-answer-show"
            :subfield="false"
            :default-open="'preview'"
            :toolbars-flag="false"
            :editable="false"
            :scroll-style="true"
            :ishljs="true"
          >
          </mavon-editor>
        </span> <br>
        <span>评语：</span>
        <mavon-editor
          :value="teacherMessage"
          class="mavon-editor-subject-answer-show"
          :subfield="false"
          :default-open="'preview'"
          :toolbars-flag="false"
          :editable="false"
          :scroll-style="true"
          :ishljs="true"
        >
        </mavon-editor>
      </div>
      <div class="question-answer-show-item" style="margin-top: 15px">
        <span class="question-show-item">结果：</span>
        <el-tag :type="doRightTagFormatter(studentAnswer === questionOverview.rightAnswer)">
          {{ doRightTextFormatter(studentAnswer === questionOverview.rightAnswer) }}
        </el-tag>
      </div>
      <div class="question-answer-show-item">
        <span class="question-show-item">题目分数：</span>
        <span>{{ exerciseValue }}</span>
      </div>
      <div class="question-answer-show-item">
        <span class="question-show-item">学生得分：</span>
        <span>{{ studentValue }}</span>
      </div>

      <div class="question-answer-show-item">
        <span class="question-show-item">难度：</span>
        <el-rate v-model="questionOverview.difficult" disabled class="question-show-item"></el-rate>
      </div>
    </el-card>
    <div v-else>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import {questionMap} from "utils/questionMap";
import {externalLink} from "utils/markdownExternalLink";
import {markdownOptionSetting} from "utils/markdownExternalLink";

export default {
  name: 'QuestionAnswerGrade',
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
    studentAnswer: {
      type: String,
      default() {
        return ''
      }
    },
    studentValue: {
      type: Number,
      default: 0
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
    teacherMessage: {
      type: String,
      default: ''
    },
    cardStyle: {
      type: String,
      default: 'box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);'
    }
  },
  data() {
    return {
      externalLink: externalLink,
      markdownOptionSetting: markdownOptionSetting,
      questionMap: questionMap,
      choice4Options: ['A', 'B', 'C', 'D'],
      choice5Options: ['A', 'B', 'C', 'D', 'E']
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
