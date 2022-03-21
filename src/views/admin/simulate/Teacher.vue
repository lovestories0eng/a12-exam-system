<template>
  <div>
    <div class="diy-button">
      <el-button @click="submit">点击模拟</el-button>
    </div>
  </div>
</template>

<script>
import {changeIdentity} from "@/api/admin/simulation";
import store from "store";
import {resetRouter, router} from "router";
export default {
  name: "Teacher",
  methods: {
    submit() {
      changeIdentity({ role: 'teacher' })
          .then(async res => {
            this.$message.success('操作成功，正在模拟老师身份')
            console.log(res);
            await this.$store.dispatch('user/changeRole', {role: 'teacher', token: res.token, userId: res.userId})
            await store.dispatch('user/getInfo')
            resetRouter()
            const accessRoutes = await store.dispatch('permission/generateRoutes', '老师')
            console.log(accessRoutes)
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
