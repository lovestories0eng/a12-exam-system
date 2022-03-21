<template>
  <div>
    <el-form class="add">
      <el-form-item label="用户类型">
        <el-select v-model="form.userType">
          <el-option v-for="item in userType" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户账号">
        <el-input v-model="form.userId" class="input-wrapper"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.userPassword" class="input-wrapper"></el-input>
      </el-form-item>
      <el-button @click="submit">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import {addUser} from "@/api/admin/addUser";
export default {
  name: "AddUser",
  data() {
    return {
      form: {
        userId: '',
        userPassword: '',
        userType: '',
      },
      userType: ['老师', '学生', '管理员']
    }
  },
  methods: {
    submit() {
      addUser(this.form)
      .then(res => {
        this.$message.success(res.message)
        this.form.userId = ''
        this.form.userPassword = ''
        this.form.userType = ''
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
