<template>
  <el-form class="add">
    <el-form-item label="学科名称">
      <el-input v-model="form.majorName" class="input-wrapper"></el-input>
    </el-form-item>
    <el-form-item class="major-introduction" label="学科介绍">
      <el-input v-model="form.majorIntroduction" type="textarea" class="input-wrapper"></el-input>
    </el-form-item>
    <el-button @click="submit">提交</el-button>
  </el-form>
</template>

<script>
import {addSubject} from "@/api/admin/addSubject";

export default {
  name: "AddSubject",
  data() {
    return {
      form: {
        majorName: '',
        majorIntroduction: ''
      }
    }
  },
  methods: {
   submit() {
     addSubject(this.form)
     .then(res => {
       this.$message.success(res.message)
     })
     .catch(error => {
       this.$message.error(error.message)
     })
   }
  }
}
</script>

<style scoped>

</style>
