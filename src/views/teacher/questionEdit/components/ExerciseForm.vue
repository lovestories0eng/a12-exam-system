<template>
  <div class="wrapper">
    <el-form>
      <el-form-item label="试题类型">
        <el-select v-model="form.exerciseType" placeholder="请选择试题类型">
          <el-option label="单选题" :value="questionMap('单选题')"></el-option>
          <el-option label="五选题" :value="questionMap('五选题')"></el-option>
          <el-option label="填空题" :value="questionMap('填空题')"></el-option>
          <el-option label="判断题" :value="questionMap('判断题')"></el-option>
          <el-option label="解答题" :value="questionMap('解答题')"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科  ">
        <el-select v-model="form.majorId" style="width: 25%;" placeholder="请选择学科" @change="loadChapterData">
          <el-option v-for="(item, index) in majors" :key="index" :label="item.majorName" :value="item.majorId"></el-option>
        </el-select>
        <!--<el-input v-model="form.majorId" style="width: 25%;" placeholder="请输入学科"></el-input>-->
      </el-form-item>
      <el-form-item label="章节  ">
        <el-select v-model="form.chapterId" style="width: 25%;" placeholder="请先选择学科" :disabled="form.majorId === ''">
          <el-option v-for="(item, index) in chaptersShow" :key="index" :value="item.majorId" :label="item.chapterName"></el-option>
        </el-select>
        <!--<el-input v-model="form.chapterId" style="width: 25%;" placeholder="请选择章节"></el-input>-->
      </el-form-item>
      <el-form-item label="分值  ">
        <el-input v-model="form.exerciseValue" style="width: 25%;"></el-input>
      </el-form-item>
      <el-form-item label="难度  ">
        <el-rate v-model="form.exerciseHard" style="margin-top: 11px"></el-rate>
      </el-form-item>
      <el-form-item label="题目">
        <!--<el-input v-model="variable.question" style="width: 25%;"></el-input>-->
        <mavon-editor
          v-model="variable.question"
          :external-link="externalLink"
          class="mavon-editor-question"
          :autofocus="false"
          default-open="preview"
          :editable="true"
          :subfield="true"
          :style="{'width': '100%', 'margin-top': '10px'}"
        >
        </mavon-editor>
      </el-form-item>
      <div v-if="form.exerciseType === 'choice4'">
        <el-form-item v-for="(item, index) in 4" :key="item" label="选项">
          {{ choice4Objects[index] + '：' }}
          <mavon-editor
            v-model="variable['option' + item]"
            :external-link="externalLink"
            class="mavon-editor-choice-option"
            :autofocus="false"
            default-open="preview"
            :editable="true"
            :subfield="true"
            :style="{'width': '100%', 'margin-top': '10px'}"
          >
          </mavon-editor>
        </el-form-item>
      </div>
      <div v-else-if="form.exerciseType === 'choice5'">
        <el-form-item v-for="(item, index) in 5" :key="item" label="选项">
          {{ choice5Objects[index] + '：' }}
          <mavon-editor
            v-model="variable['option' + item]"
            :external-link="externalLink"
            class="mavon-editor-choice-option"
            :autofocus="false"
            default-open="preview"
            :editable="true"
            :subfield="true"
            :style="{'width': '100%', 'height': '100px', 'margin-top': '10px'}"
          >
          </mavon-editor>
        </el-form-item>
      </div>
      <el-form-item label="正确答案">
        <mavon-editor
          v-if="subjectiveQuestion.indexOf(form.exerciseType) !== -1"
          v-model="variable.rightAnswer"
          :external-link="externalLink"
          class="mavon-editor-subject-answer"
          :autofocus="false"
          default-open="preview"
          :editable="true"
          :subfield="true"
          :style="{'width': '100%', 'margin-top': '10px'}"
        >
        </mavon-editor>
        <mavon-editor
          v-else-if="form.exerciseType === 'judge'"
          v-model="variable.rightAnswer"
          :external-link="externalLink"
          class="mavon-editor-object-answer"
          :autofocus="false"
          default-open="preview"
          :editable="true"
          :subfield="true"
          :style="{'width': '100%', 'margin-top': '10px'}"
        >
        </mavon-editor>
        <el-select v-else-if="form.exerciseType === 'choice4'" v-model="variable.rightAnswer" style="width: 25%;">
          <el-option v-for="item in choice4Objects" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-select v-else-if="form.exerciseType === 'choice5'" v-model="variable.rightAnswer" style="width: 25%;">
          <el-option v-for="item in choice5Objects" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目解析">
        <!--<el-input v-model="variable.analyse" style="width: 25%;"></el-input>-->
        <mavon-editor
          v-model="variable.analyse"
          :external-link="externalLink"
          class="mavon-editor-analyze"
          :autofocus="false"
          default-open="preview"
          :editable="true"
          :subfield="true"
          :style="{'width': '100%', 'margin-top': '10px'}"
        >
        </mavon-editor>
      </el-form-item>
      <el-button @click="submitExercise">创建题目</el-button>
    </el-form>
  </div>
</template>

<script>
import {questionMap} from "utils/questionMap"
import { createExercise } from "@/api/exercises"
import { getMajorList, getChapterByMajorId } from "@/api/common";

export default {
  name: "ExerciseForm",
  data() {
    return {
      externalLink: this.$externalLink,
      // 客观题
      objectiveQuestion: ['judge', 'choice4', 'choice5'],
      // 主观题
      subjectiveQuestion: ['fill', 'solve'],
      choice4Objects: ['A', 'B', 'C', 'D'],
      choice5Objects: ['A', 'B', 'C', 'D', 'E'],
      questionMap: questionMap,
      form: {
        exerciseType: 'choice4',
        majorId: '',
        chapterId: '',
        exerciseHard: 1,
        exerciseValue: 1,
      },
      variable: {
        question: "test",
        rightAnswer: "",
        option1: "test",
        option2: "test",
        option3: "test",
        option4: "test",
        option5: "test",
        analyse: "test"
      },
      majors: [],
      chapters: {},
      chaptersShow: []
    }
  },
  created() {
    getMajorList()
    .then(res => {
      this.majors = res.data
    })
  },
  methods: {
    loadChapterData(majorId) {
      if (this.chapters[majorId] === undefined) {
        let formData = new window.FormData()
        formData.append('majorId', majorId)
        getChapterByMajorId(formData)
        .then(res => {
          this.chapters[majorId] = res.chapters
          this.chaptersShow = res.chapters
        })
      } else {
        this.chaptersShow = this.chapters[majorId]
      }
    },
    submitExercise() {
      this.form[this.form.exerciseType + 'Tea'] = this.variable
      createExercise(this.form)
      .then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 20px auto;
  width: 85%;
}
</style>
