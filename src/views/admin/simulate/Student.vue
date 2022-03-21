<template>
  <div>
    <div class="diy-button">
      <el-button @click="submit">点击模拟</el-button>
    </div>
  </div>
</template>

<script>
import {changeIdentity} from "@/api/admin/simulation";
import {resetRouter, router} from "router";
import store from "store";
export default {
  name: "Student",
  methods: {
    submit() {
      changeIdentity({ role: 'student' })
      .then(async res => {
        this.$message.success('操作成功，正在模拟学生身份')
        console.log(res);
        await this.$store.dispatch('user/changeRole', {role: 'student', token: res.token, userId: res.userId})
        await store.dispatch('user/getInfo')
        resetRouter()
        const accessRoutes = await store.dispatch('permission/generateRoutes', '学生')
        console.log(accessRoutes)
        await this.$router.push('/')
        // for debug
        accessRoutes.forEach(route => {
          router.addRoute(route)
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
