<template>
  <el-form ref="form" :rules="rules">
    <el-form-item style="margin-bottom: 27px" prop="uname">
      <el-input v-model="uname" placeholder="请输入企业名称" prefix-icon="el-icon-s-custom" clearable maxlength="10"></el-input>
      <el-popover
        placement="right-start"
        title="注意："
        width="200"
        trigger="hover"
        content="企业名由字母、数字以及汉字组成，区分大小写"
      >
        <i slot="reference" class="el-icon-warning-outline" style="cursor: pointer; color: #E6A23C"></i>
      </el-popover>
    </el-form-item>
    <!-- <el-form-item style="margin-bottom: 27px" prop="eAddress">
      <el-input placeholder="请输入邮箱地址" prefix-icon="el-icon-message" v-model="eAddress" clearable>
        <el-select v-model="com" slot="append" placeholder="请选择" style=" width: 140px">
        <el-option label="@qq.com" value="@qq.com"></el-option>
        <el-option label="@163.com" value="@163.com"></el-option>
        <el-option label="@gmail.com" value="@gmail.com"></el-option>
    </el-select></el-input>
    <el-popover
        placement="right-start"
        title="注意："
        width="200"
        trigger="hover"
        content="请确保该邮箱真实可用，我们将会发送一条验证码至该邮箱，输入验证码才能完成验证"
      >
      <i slot="reference" class="el-icon-warning-outline" style="cursor: pointer; color: #E6A23C"></i></el-popover>
    </el-form-item> -->
    <el-form-item style="margin-bottom: 27px" prop="password">
      <el-input v-model="password" placeholder="请输入密码" prefix-icon="el-icon-lock" clearable maxlength="16" show-password></el-input>
      <el-popover
        placement="right-start"
        title="注意："
        width="200"
        trigger="hover"
        content="密码由6~14位字母、数字和唯一符号@组成,区分大小写"
      >
        <i slot="reference" class="el-icon-warning-outline" style="cursor: pointer; color: #E6A23C"></i>
      </el-popover>
    </el-form-item>
    <!-- <el-form-item  style="margin-bottom: 27px" prop="code">
      <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model='code' clearable maxlength="6"></el-input>
    </el-form-item> -->
    <el-form-item style="margin-bottom: 10px">
      <!-- <el-button type="primary" @click="getCode()" style="width: 120px;" :loading="btnLoad1" :disabled = "disabled1">{{placeholder}}</el-button> -->
      <el-button type="primary" style="width: 300px;" :loading="btnLoad2" :disabled="disabled2" @click="onSubmit()">立即注册</el-button>
    </el-form-item>
    <div class="footer">
      <el-link style="margin-right: 170px" type="info" :underline="false" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1625753207&site=qq&menu=yes&hm">遇到问题?</el-link>
      <el-link type="info" :underline="false" @click="signIn">立即登录</el-link>
    </div>
  </el-form>
</template>
<script>
export default {
  name: "SignUp",
  data() {
    var validateUname = (rule, value, callback) => {
      if(this.uname === "")
        return false;
      var newUname = this.uname.replace(/\s/g, "");
      if(newUname.length <=1){
        callback(new Error("用户名长度为2~10位，不能包含空格"));
        this.uname = "";
        return false;
      }
      // var zg =  /^[0-9a-zA-Z]*$/;
      // if (!zg.test(newUname)){
      //   callback(new Error("用户名只能由数字和字母组成"));
      //   this.uname = "";
      //   return false;
      // }
      callback();
    }
    var validatePwd = (rule, value, callback) => {
      if(this.password === "")
        return false;
      var newpassword = this.password.replace(/\s/g, "")
      if(newpassword.length <=5){
        callback(new Error("密码长度为6~14位，不能包含空格"));
        this.password = "";
        return false;
      }
      var zg =  /^[0-9a-zA-Z]*$/;
      if (!zg.test(newpassword)){
        var newPwd = newpassword.replaceAll("@","");
        if(!zg.test(newPwd)){
          callback(new Error("密码只能由数字和字母和@组成"));
          this.password = "";
        }
      }
      callback();
    }
    var validateAdd = (rule, value, callback) => {
      if(this.eAddress === "")
        return false;
      var neweAddress = this.eAddress.replace(/\s/g, "")
      if(neweAddress.length === 0||neweAddress.length !== this.eAddress.length){
        callback(new Error("请输入正确邮箱"));
        this.eAddress = "";
        return false;
      }
      callback();
    }
    var validateCode = (rule, value, callback) => {
      if(this.code === "")
        return false;
      var newcode = this.code.replace(/\s/g, "")
      if(newcode.length !== 6 ){
        callback(new Error("验证码为6位数字"));
        this.code = "";
        return false;
      }
      var zg =  /^\d+$/;
      if (!zg.test(newcode)){
        callback(new Error("验证码为6位数字"));
        this.code = "";
      }
      callback();
    }
    return {
      com: "",
      uname: "",
      code: "",
      eAddress: "",
      password: "",
      placeholder: "发送验证码",
      btnLoad1: false,
      disabled1: true,
      btnLoad2: false,
      disabled2: false,
      rules: {
        uname: [
          { validator: validateUname, trigger: "blur" },
        ],
        password: [
          { validator: validatePwd, trigger: "blur" },
        ],
        eAddress: [
          { validator: validateAdd, trigger: "blur" },
        ],
        code: [
          { validator: validateCode, trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    signIn() {
      this.$router.push("/signIn");
    },
    getCode() {
      if(this.eAddress === ""||this.com === ""){
        this.$message.error("请填写邮箱地址");
        return false;
      }
      if(this.eAddress.replace(/\s/g, "").length !== this.eAddress.length){
        this.$message.error("请填写正确的邮箱地址");
        return false;
      }
      this.disabled1 = true;
      this.btnLoad1 = true
      var that = this
      this.axios({
        method: "post",
        url: "https://api.limkim.xyz/sendCode",
        data: {
          eAddress: this.eAddress + this.com
        },
      })
        .then(function (response) {
          if(response.data.status === "OK"){
            that.$message({
              message: "验证码发送成功,请注意查收",
              type: "success"
            });
            var count = 59
            var countDown = setInterval(function (){
              that.placeholder = count +"s后重发"
              count = count -1;
              if(count === -1){
                that.placeholder = "发送验证码";
                that.disabled1 = false;
                clearInterval(countDown);
              }
            }, 1000)
          }
          else if(response.data.status === "Wrong eAddress"){
            that.$message.error("邮箱已经注册过啦，换个试试吧");
            that.disabled1 = false;
          }
          that.btnLoad1 = false;
        })
        .catch((error) => {
          if(error.response.data.status === "Email Error")
            that.$message.error("出错啦,请检查邮箱地址后再试,或点击遇到问题联系站长");
          if(error.response.data.status === "Ip Error")
            that.$message.error("非法请求");
          else
            that.$message.error("出错啦,请稍后再试,或点击遇到问题联系站长");
          that.btnLoad1 = false;
          that.disabled1 = false;
        });
    },
    onSubmit() {
      if(this.uname ===""||this.password ===""){
        this.$message.error("请将表单填写完成,不要偷懒哦");
        return false;
      }
      var that = this
      this.btnLoad2 = true
      this.disabled2 = true;
      this.axios({
        method: "put",
        url: "https://api.hduhelp.com/gormja_wrapper/company/put",
        data: {
          CompanyCode: this.uname,
          Name: this.uname,
          Passphrase: this.password
        },
      })
        .then(function (response) {
          that.$message({
            message: "注册成功！",
            type: "success"
          });
          setTimeout(function (){
            that.disabled2 = false;
            that.$router.push("/signIn");
          }, 1000)
          // else if(response.data.status === "Wrong Uname"){
          //   that.disabled2 = false;
          //   that.$message.error("用户名已存在，换个试试吧");
          // }
          // else if(response.data.status === "Wrong Code"){
          //   that.disabled2 = false;
          //   that.$message.error("验证码错误,请核对后再试");
          // }
          // else if(response.data.status === "Wrong eAddress"){
          //   that.disabled2 = false;
          //   that.$message.error("邮箱已经注册过啦，换个试试吧");
          // }
          that.btnLoad2 = false;
        })
        .catch((error) => {
          // if(error.response.data.status === "Ip Error")
          //   that.$message.error("非法请求");
          // else
          that.$message.error("出错啦,请稍后再试");
          that.btnLoad2 = false;
          that.disabled2 = false;
        });
    },
  },
};
</script>

<style scoped>
.el-form {
  margin: 50px 130px 0 90px;
  width: 340px;
  height: 250px;
  padding: 5px 5px;
  background-color: rgba(255, 255, 255, 0);
}
.el-input {
  width: 300px;
  margin-right: 5px;
}
.footer {
  user-select: none;
}
</style>
<style>
.el-input-group__append {
  padding-left: 0 !important;
}
</style>
