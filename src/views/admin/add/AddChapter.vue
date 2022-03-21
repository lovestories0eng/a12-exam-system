<template>
  <div>
    <el-form class="add">
      <el-form-item label="学科名称">
        <el-select v-model="form.majorId">
          <el-option
            v-for="(item, index) in majorInfo"
            :key="index"
            :value="item.majorId"
            :label="item.majorName"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="章节序号">
        <el-input v-model="form.chapterId" class="input-wrapper"></el-input>
      </el-form-item>
      <el-form-item label="章节名称">
        <el-input v-model="form.chapterName" class="input-wrapper"></el-input>
      </el-form-item>
      <el-button @click="submit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import {getMajorList} from "@/api/common";
import {addChapter} from "@/api/admin/addChapter";
export default {
  name: "AddChapter",
  data() {
    return {
      form: {
        majorId: '',
        chapterId: '',
        chapterName: '',
      },
      userType: ['老师', '学生', '管理员'],
      majorInfo: []
    }
  },
  created() {
    getMajorList()
    .then(res => {
      res = res.data
      this.majorInfo = res
    })
  },
  methods: {
    submit() {
      this.form.chapterId = parseInt(this.form.chapterId)
      addChapter(this.form)
      .then(res => {
        this.$message.success(res.message)
        this.form.majorId = ''
        this.form.chapterId = ''
        this.form.chapterName = ''
      })
      .catch(error => {
        this.$message.error(error.message)
      })
    },
  }
}
</script>

<style scoped>

</style>
