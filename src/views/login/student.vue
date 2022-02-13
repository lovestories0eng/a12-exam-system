<template>
  <el-form ref="form" :model="loginForm" :rules="loginRules" autocomplete="on" label-position="left">
    <h3 style="font-weight: 400; margin-bottom: 30px; color: #909399">{{ title }}</h3>
    <el-form-item prop="userId" style="margin-bottom: 27px;">
      <el-input
        ref="userId"
        v-model="loginForm.userId"
        placeholder="请输入用户名或账号"
        style="width: calc(100% - 20px)"
        prefix-icon="el-icon-user"
        clearable
      >
      </el-input>
      <el-popover
        style="float: right"
        placement="right-start"
        title="注意："
        width="200"
        trigger="hover"
        content="用户名由字母、数字以及汉字组成，区分大小写"
      >
        <i slot="reference" class="el-icon-warning-outline" style="cursor: pointer; color: #E6A23C"></i>
      </el-popover>
    </el-form-item>
    <el-form-item prop="userPassword" style="margin-bottom: 27px">
      <el-input
        ref="userPassword"
        v-model="loginForm.userPassword"
        type="password"
        placeholder="请输入密码"
        style="width: calc(100% - 20px)"
        prefix-icon="el-icon-key"
        clearable
        show-password
      >
      </el-input>
      <el-popover
        style="float: right"
        placement="right-start"
        title="注意："
        width="200"
        trigger="hover"
        content="密码长度不低于8位"
      >
        <i slot="reference" class="el-icon-warning-outline" style="cursor: pointer; color: #E6A23C"></i>
      </el-popover>
    </el-form-item>
    <el-form-item style="margin-bottom: 5px">
      <el-button
        type="primary"
        style="width: calc(100% - 15px)"
        :loading="btnLoad"
        @click="onSubmit()"
      >
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    let validateUsername = (rule, value, callback) => {
      if(this.loginForm.userId === "")
        return false;
      let newUname = this.loginForm.userId.replace(/\s/g, "")
      if(newUname.length < 5 || newUname.length > 10){
        callback(new Error("长度为5~10位，不能包含空格"));
        this.loginForm.userId = "";
        return false;
      }
      callback()
    }

    let validatePassword = (rule, value, callback) => {
      if(this.loginForm.userPassword === "")
        return false;
      let newPassword = this.loginForm.userPassword.replace(/\s/g, "")
      if(newPassword.length < 6 || newPassword.length > 18){
        callback(new Error("密码长度为6~18位，不能包含空格"));
        this.loginForm.userPassword = "";
        return false;
      }
      let zg =  /^[0-9a-zA-Z]*$/;
      if (!zg.test(newPassword)){
        let newPwd = newPassword.replaceAll("@","");
        if(!zg.test(newPwd)){
          callback(new Error("密码只能由数字和字母和@组成"));
          this.loginForm.userPassword = "";
        }
      }
      callback()
    }
    return {
      title: "学生登录",
      loginForm: {
        userId: "20273110",
        userPassword: "123456",
      },
      loginRules: {
        userId: [{ required: true, trigger: 'blur', validator: validateUsername }],
        userPassword: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      btnLoad: false// 登录按钮加载
    };
  },
  mounted() {
    // 页面加载完毕自动聚焦
    if (this.loginForm.userId === '') {
      this.$refs.userId.focus()
    } else if (this.loginForm.userPassword === '') {
      this.$refs.userPassword.focus()
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        this.btnLoad = true
        if (valid) {
          // this.$store.dispatch(‘Login’, this.loginForm)来调取store里的user.js的login方法
          // 把this.loginForm中的账号密码发送给后台用于登录
          this.$store.dispatch('user/login', this.loginForm)
            .then(async () => {
              // '/'默认为首页
              await this.$router.push({path: this.redirect || '/'})
              this.btnLoad = false
            })
            .catch(() => {
              this.btnLoad = false
            })
        } else {
          console.log('error submit!!')
          this.btnLoad = false
          return false
        }
      }, 1000)
    }
  },
};
</script>

<style scoped>
.el-form {
  margin: 60px 80px 0 80px;
  width: calc(100% - 160px);
  height: 300px;
  padding: 5px 5px;
  background-color: rgba(255, 255, 255, 0);
}
</style>
