<template>
  <div style="line-height:1.8;">
    <el-card v-if="qType===1||qType===2||qType===3||qType===4||qType===5">
      <div class="bar">
        <span class="desc">学科：{{ subjectName }}</span>
        <span class="desc">题型：{{ qTypeStr }}</span>
      </div>
      <div v-if="qType===1">
        <div class="q-title" v-html="question.title" />
        <div class="q-content">
          <el-radio-group v-model="answer.content" disabled>
            <el-radio v-for="item in question.items" :key="item.prefix" :label="item.prefix">
              <span class="question-prefix">{{ item.prefix }}.</span>
              <span class="q-item-span-content" v-html="item.content"></span>
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <div v-else-if="qType===2">
        <div class="q-title" v-html="question.title" />
        <div class="q-content">
          <el-checkbox-group v-model="answer.contentArray" disabled>
            <el-checkbox v-for="item in question.items" :key="item.prefix" :label="item.prefix">
              <span class="question-prefix">{{ item.prefix }}.</span>
              <span class="q-item-span-content" v-html="item.content"></span>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div v-else-if="qType===3">
        <div class="q-title" style="display: inline;margin-right: 10px" v-html="question.title" />
        <span style="padding-right: 10px;">(</span>
        <el-radio-group v-model="answer.content" disabled>
          <el-radio v-for="item in question.items" :key="item.prefix" :label="item.prefix">
            <span class="q-item-span-content" v-html="item.content"></span>
          </el-radio>
        </el-radio-group>
        <span style="padding-left: 10px;">)</span>
      </div>
      <div v-else-if="qType===4">
        <div class="q-title" v-html="question.title" />
        <div v-if="answer.contentArray!==null">
          <el-form-item v-for="item in question.items" :key="item.prefix" :label="item.prefix" label-width="50px" style="margin-top: 10px;margin-bottom: 10px;">
            <el-input v-model="answer.contentArray[item.prefix-1]" />
          </el-form-item>
        </div>
      </div>
      <div v-else-if="qType===5">
        <div class="q-title" v-html="question.title" />
        <div>
          <el-input v-model="answer.content" disabled type="textarea" rows="5"></el-input>
        </div>
      </div>
      <div class="question-answer-show-item" style="margin-top: 15px">
        <span class="question-show-item">结果：</span>
        <el-tag :type="doRightTagFormatter(answer.doRight)">
          {{ doRightTextFormatter(answer.doRight) }}
        </el-tag>
      </div>
      <div class="question-answer-show-item">
        <span class="question-show-item">分数：</span>
        <span>{{ question.score }}</span>
      </div>
      <div class="question-answer-show-item">
        <span class="question-show-item">难度：</span>
        <el-rate v-model="question.difficult" disabled class="question-show-item"></el-rate>
      </div>
      <br />
      <div class="question-answer-show-item" style="line-height: 1.8">
        <span class="question-show-item">解析：</span>
        <span class="q-item-span-content" v-html="question.analyze" />
      </div>
      <div class="question-answer-show-item">
        <span class="question-show-item">正确答案：</span>
        <span v-if="qType===1||qType===2 ||qType===5" class="q-item-span-content" v-html="question.correct" />
        <span v-if="qType===3" class="q-item-span-content" v-html="trueFalseFormatter(question)" />
        <span v-if="qType===4">{{ question.correctArray }}</span>
      </div>
    </el-card>
    <div v-else>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'QuestionShow',
  props: {
    question: {
      type: Object,
      default: function () {
        return {}
      }
    },
    answer: {
      type: Object,
      default: function () {
        return { id: null, content: '', contentArray: [], doRight: false }
      }
    },
    qLoading: {
      type: Boolean,
      default: false
    },
    qType: {
      type: Number,
      default: 0
    },
    qTypeStr: {
      type: String,
      default: ""
    },
    subjectName: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      doRightEnum: state => state.exam.question.answer.doRightEnum,
      doRightTag: state => state.exam.question.answer.doRightTag
    })
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
