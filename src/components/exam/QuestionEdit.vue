<template>
  <div style="line-height:1.8">
    <!-- 单选题 -->
    <div v-if="qType===1" v-loading="qLoading">
      <!-- question.title: 题目的内容 -->
      <div class="q-title" v-html="question.title" />
      <div class="q-content">
        <!-- v-model="answer.content"用于取出作答答案 -->
        <el-radio-group v-model="answer.content" @change="answer.completed = true">
          <el-radio v-for="item in question.items" :key="item.prefix" :label="item.prefix">
            <!-- 选项（A、B、C、D） -->
            <span class="question-prefix">{{ item.prefix }}.</span>
            <!-- 选项对应的内容 -->
            <span class="q-item-span-content" v-html="item.content"></span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 多选题 -->
    <div v-else-if="qType===2" v-loading="qLoading">
      <div class="q-title" v-html="question.title" />
      <div class="q-content">
        <el-checkbox-group v-model="answer.contentArray" @change="answer.completed = true">
          <el-checkbox v-for="item in question.items" :key="item.prefix" :label="item.prefix">
            <span class="question-prefix">{{ item.prefix }}.</span>
            <span class="q-item-span-content" v-html="item.content"></span>
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 判断题 -->
    <div v-else-if="qType===3" v-loading="qLoading">
      <div class="q-title" style="display: inline;margin-right: 10px" v-html="question.title" />
      <span style="padding-right: 10px;">(</span>
      <el-radio-group v-model="answer.content" @change="answer.completed = true">
        <el-radio v-for="item in question.items" :key="item.prefix" :label="item.prefix">
          <span class="q-item-span-content" v-html="item.content"></span>
        </el-radio>
      </el-radio-group>
      <span style="padding-left: 10px;">)</span>
    </div>
    <div v-else-if="qType===4" v-loading="qLoading">
      <div class="q-title" v-html="question.title" />
      <div>
        <el-form-item v-for="item in question.items" :key="item.prefix" :label="item.prefix" label-width="50px" style="margin-top: 10px;margin-bottom: 10px;">
          <el-input v-model="answer.contentArray[item.prefix-1]" @change="answer.completed = true" />
        </el-form-item>
      </div>
    </div>
    <div v-else-if="qType===5" v-loading="qLoading">
      <div class="q-title" v-html="question.title" />
      <div>
        <el-input v-model="answer.content" type="textarea" rows="5" @change="answer.completed = true" />
      </div>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionShow',
  // vue中的props是单向绑定的，父组件的属性变化时会传递给子组件，子组件内部不应改变props的值，否则控制台会给出警告。
  // 但如果props的类型为数组或者对象时，在子组件内部改变props的值控制台不会警告。
  // 因为数组或对象是地址引用，vue不会检测到props发生改变。所以有的情况需要在子组件内部改变父组件的值，可以将属性定义为数组或者对象类型传入。
  // 但官方不建议在子组件内改变父组件的值，因为这违反了vue中props单向绑定的思想。
  // 所以在这里，子组件相应的props值发生变化之后父组件中相应的值也会发送变化。
  props: {
    // 题目
    question: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 选项
    answer: {
      type: Object,
      default: function () {
        return { id: null, content: '', contentArray: []}
      }
    },
    qLoading: {
      type: Boolean,
      default: false
    },
    // 问题类型（选择题、多选题、判断题、填空题、简答题）
    qType: {
      type: Number,
      default: 0
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.q-title {
  margin: 5px 5px 0 5px;

  p {
    display: inline !important;
  }
}

.q-content {
  margin: 10px 35px 15px 25px;

  p {
    display: inline !important;
  }

  .el-checkbox__input {
    line-height: 1.8;
    vertical-align: top;
  }
}

.question-prefix {
  padding-right: 20px;
  font-weight: 600 !important;
}

.q-item-span-content {
  white-space: normal;
  line-height: 1.8;

  p {
    display: inline !important;
  }
}
</style>
