<template>
  <el-container>
    <!-- 头部 -->
    <el-header class="header">
      <span class="title">{{ title }}</span>
    </el-header>
    <!-- 内容 -->
    <el-main>
      <div class="login-content">
        <div class="method-switch">
          <div ref="$0" :style="activatedMenu" @click="signRouteSwitch(0)">
            <i class="el-icon-link"></i>
            <span>学生登录</span>
          </div>
          <div ref="$1" :style="deActivatedMenu" @click="signRouteSwitch(1)">
            <i class="el-icon-lock"></i>
            <span>老师登录</span>
          </div>
          <div ref="$2" :style="deActivatedMenu" @click="signRouteSwitch(2)">
            <i class="el-icon-lock"></i>
            <span>管理员登录</span>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      title: '教考分离 || 考试系统',
      flag: 0,
      activatedMenu: {
        color: "#5eacf0",
        borderBottomColor: "#5eacf0",
        borderBottomWidth: "2px",
      },
      deActivatedMenu: {
        color: "#ccc",
        borderBottomColor: "#ccc",
        borderBottomWidth: "1px",
      }
    }
  },
  methods: {
    signRouteSwitch(flag) {
      this.signRouteChange(flag)
    },
    signRouteChange(flag) {
      this.styleChange(flag)
      if (flag === 0) {
        this.$router.push('/login/student-login')
      } else if (flag === 1) {
        this.$router.push(('/login/teacher-login'))
      } else if (flag === 2) {
        this.$router.push('/login/admin-login')
      }
      this.flag = flag;
    },
    styleChange(flag) {
      this.$refs[`$` + `${flag}`].style.color = this.activatedMenu.color
      this.$refs[`$` + `${flag}`].style.borderBottomColor = this.activatedMenu.borderBottomColor
      this.$refs[`$` + `${flag}`].style.borderBottomWidth = this.activatedMenu.borderBottomWidth
      this.$refs[`$` + `${this.flag}`].style.color = this.deActivatedMenu.color
      this.$refs[`$` + `${this.flag}`].style.borderBottomColor = this.deActivatedMenu.borderBottomColor
      this.$refs[`$` + `${this.flag}`].style.borderBottomWidth = this.deActivatedMenu.borderBottomWidth
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #eee;
  text-align: center;
}

.title {
  height: 60px;
  font-size: 24px;
  line-height: 60px;
}

.login-content {
  text-align: center;
  position: relative;
  margin: 80px auto 80px;
  width: 35%;
  max-width: 800px;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 15px rgba(0, 0, 255, .2);
  border-radius: 10px;
}

.method-switch {
  height: 52px;
}

.method-switch div {
  float: left;
  margin: 0 !important;
  width: 33.33%;
  height: 52px;
  line-height: 52px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
</style>
