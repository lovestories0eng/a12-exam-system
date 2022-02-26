<template>
  <div class="wrapper">
    <el-form>
      <el-form-item label="试题类型">
        <el-select v-model="form.exerciseType" placeholder="请选择试题类型">
          <el-option label="单选题" value="单选题"></el-option>
          <el-option label="填空题" value="填空题"></el-option>
          <el-option label="简答题" value="简答题"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学科">
        <el-input v-model="form.major" style="width: 25%;" placeholder="请输入学科"></el-input>
      </el-form-item>
      <el-form-item label="章节">
        <el-input v-model="form.chapter" style="width: 25%;" placeholder="请输入章节"></el-input>
      </el-form-item>
      <el-form-item label="题目">
      </el-form-item>
      <el-form-item label="正确答案">
      </el-form-item>
      <el-form-item label="分值">
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ExerciseForm",
  data() {
    return {
      form: {
        exerciseType: '',
        major: '',
        chapter: ''
      }
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
