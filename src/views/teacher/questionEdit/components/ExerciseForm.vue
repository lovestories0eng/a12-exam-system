<template>
  <div class="wrapper">
    <el-form>
      <el-form-item label="试题类型">
        <el-select v-model="form.exerciseType" placeholder="请选择试题类型">
          <el-option label="单选题" :value="questionMap('单选题')"></el-option>
          <el-option label="五选题" :value="questionMap('五选题')"></el-option>
          <el-option label="填空题" :value="questionMap('填空题')"></el-option>
          <el-option label="判断题" :value="questionMap('判断题')"></el-option>
          <el-option label="解答题" :value="questionMap('简答题')"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科  ">
        <el-input v-model="form.majorId" style="width: 25%;" placeholder="请输入学科"></el-input>
      </el-form-item>
      <el-form-item label="章节  ">
        <el-input v-model="form.chapterId" style="width: 25%;" placeholder="请输入章节"></el-input>
      </el-form-item>
      <el-form-item label="难度  ">
        <el-input v-model="form.exerciseHard" style="width: 25%;"></el-input>
      </el-form-item>
      <el-form-item label="分值  ">
        <el-input v-model="form.exerciseValue" style="width: 25%;"></el-input>
      </el-form-item>
      <el-form-item label="题目">
        <el-input v-model="variable.question" style="width: 25%;"></el-input>
      </el-form-item>
      <el-form-item label="正确答案">
        <el-input v-model="variable.rightAnswer" style="width: 25%;"></el-input>
      </el-form-item>
      <el-form-item label="题目解析">
        <el-input v-model="variable.analyse" style="width: 25%;"></el-input>
      </el-form-item>
      <div v-if="form.exerciseType === 'choice4'">
        <el-form-item v-for="item in 4" :key="item" label="选项">
          {{ item + '：' }}
          <el-input v-model="variable['option' + item]" style="width: 25%;"></el-input>
        </el-form-item>
      </div>
      <div v-else-if="form.exerciseType === 'choice5'">
        <el-form-item v-for="item in 5" :key="item" label="选项">
          {{ item + '：' }}
          <el-input v-model="variable['option' + item]" style="width: 25%;"></el-input>
        </el-form-item>
      </div>
      <el-button @click="submitExercise">创建题目</el-button>
    </el-form>
  </div>
</template>

<script>
import {questionMap} from "utils/questionMap"
import { createExercise } from "@/api/exercises"
export default {
  name: "ExerciseForm",
  data() {
    return {
      questionMap: questionMap,
      form: {
        exerciseType: 'choice4',
        majorId: '1',
        chapterId: '1',
        exerciseHard: 1,
        exerciseValue: 1,
      },
      variable: {
        question: "test",
        rightAnswer: "test",
        option1: "test",
        option2: "test",
        option3: "test",
        option4: "test",
        option5: "test",
        analyse: "test"
      }
    }
  },
  methods: {
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
