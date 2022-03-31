<template>
  <div style="line-height:1.8;">
    <el-card
      v-if="qTypeStr==='choice4'||qTypeStr==='choice5'||qTypeStr==='fill'||qTypeStr==='judge'||qTypeStr==='choice8'"
      :style="cardStyle"
    >
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
        ></mavon-editor>
      </div>
      <div v-if="qTypeStr==='choice4'">
        <div class="q-content">
          <el-radio-group v-model="answer.answer" @change="answer.completed = true; container.push(Date.now());$emit('doing',Date.now())">
            <el-radio v-for="index in 4" :key="questionOverview['option' + index]" class="answer-show-el-radio"
                      :label="choice4Options[index]"
            >
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
        <div class="q-content" @click="doing">
          <el-radio-group v-model="answer.answer" @change="answer.completed = true">
            <el-radio v-for="index in 5" :key="questionOverview['option' + index]" class="answer-show-el-radio"
                      :label="choice5Options[index]"
            >
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
        <div>
          <!--<el-input v-model="answer.answer" style="width: 50%;" @change="answer.completed = true" />-->
          <mavon-editor
            v-model="answer.answer"
            class="mavon-editor-subject-answer"
            :toolbars="toolbars"
            :autofocus="false"
            default-open="preview"
            :editable="true"
            :subfield="true"
          />
        </div>
      </div>
      <div v-if="qTypeStr==='judge'">
        <div class="q-content">
          <el-radio-group
            v-model="answer.answer"
            @change="answer.completed = true"
          >
            <el-radio label="对">正确</el-radio>
            <el-radio label="错">错误</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="question-answer-show-item">
        <span class="question-show-item">题目分数：</span>
        <span>{{ exerciseValue }}</span>
      </div>
    </el-card>
    <div v-else>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {questionMap} from "utils/questionMap"
import {externalLink} from "utils/markdownExternalLink";

export default {
  name: 'QuestionAnswerEdit',
  props: {
    container: {
      type: Array,
      default() {
        return []
      }
    },
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
      default: function () {
        return {exerciseId: null, answer: '', exerciseType: '', timeSeries: null}
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
      gap: null,
      lastTime: null,
      externalLink: externalLink,
      questionMap: questionMap,
      choice4Options: ['A', 'B', 'C', 'D'],
      choice5Options: ['A', 'B', 'C', 'D', 'E'],
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        fullscreen: false, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
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
    // for debug
    // console.log(this.questionOverview)
    console.log(this.$props.judge)
  },
  methods: {
    trueFalseFormatter(question) {
      return question.items.filter(d => d.prefix === question.correct)[0].content
    },
    doRightTagFormatter(status) {
      return this.enumFormat(this.doRightTag, status)
    },
    doRightTextFormatter(status) {
      return this.enumFormat(this.doRightEnum, status)
    },
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
