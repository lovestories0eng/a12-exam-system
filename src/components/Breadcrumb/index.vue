<template>
  <el-breadcrumb class="app-breadcrumb" separator=">">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!-- no-redirect:判断是否需要返回上层路由 -->
        <span v-if="item.redirect==='noRedirect' || index===levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route(route) {
      // 如果要进入redirect页面，就不更新面包屑
      if (route.path.startsWith('/redirect/')) {
        return
      }
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    // 获得面包屑
    getBreadcrumb() {
      // $route.matched 类型:Array 返回一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)。
      // 只显示带有meta属性和meta.title的路由
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      // 第一个面包屑
      const first = matched[0]
      // 如果第一个面包屑不是首页则把首页放在第一个面包屑上面
      if (!this.isDashboard(first)) {
        matched = [{ path: '/dashboard', meta: { title: '首页' }}].concat(matched)
      }
      // !==的优先级比&&大
      // undefined !== false的值为true
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    // 判断第一个面包屑是不是dashboard（首页）
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      // 得到当前路由中的参数（query之类的）
      const { params } = this.$route
      let toPath = pathToRegexp.compile(path)
      return toPath(params)
    },

    handleLink(item) {
      const { redirect, path } = item
      // 返回上一级路由的缺省路由
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      // 无缺省路由则直接返回所指向的路由
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb .el-breadcrumb {
  display: inline-block;
  font-size: 18px!important;
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
