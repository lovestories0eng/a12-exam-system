<template>
  <div class="navbar">
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
      style="line-height: 50px; font-size: 18px; margin-left: 15px;"
    />

    <div class="right-menu">
      <search
        id="header-search"
        class="right-menu-item"
        :search-pool="searchPool"
        :searcher-method="searcherMethod"
        :searcher-key="searcherKey"
        :searcher-label="searcherLabel"
        :fuse-keys="fuseKeys"
      />

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" alt="">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人资料</el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Search from '@/components/HeaderSearch'
import path from "path";

export default {
  components: {
    Breadcrumb,
    Search
  },
  data() {
    return {
      searchPool: [],
      fuseKeys: [{
        name: 'title',
        weight: 0.7
      }, {
        name: 'path',
        weight: 0.3
      }],
      searcherMethod: (val) => {
        this.$router.push(val.path)
      },
      searcherKey: item => item.path,
      searcherLabel: item => item.title.join(' >> ')
    }
  },
  computed: {
    ...mapGetters([
      'avatar',
      "permissionRoutes"
    ])
  },
  created() {
    this.searchPool = this.generateRoutes(this.permissionRoutes)
  },
  methods: {
    // 登出
    async logout() {
      await this.$store.dispatch('user/logout')
      await this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 过滤出可以显示在侧边栏中的路由 并生成相关标题 用于查找
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []
      for (const router of routes) {
        // 跳过隐藏的路由
        if (router.hidden) { continue }
        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }
        // path为相关路由，title数组存储父路由和子路由的title
        // {path: '/notice/received', title: Array(1)}
        // title: Array(2)
        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]
          if (router.redirect !== 'noRedirect') {
            // 只推送带有标题的路由
            // 特殊情况:需要排除无重定向父路由
            res.push(data)
          }
        }
        // 递归的子路由
        if (router.children) {
          const tempRoutes = this.generateRoutes(router.children, data.path, data.title)
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 50px;
    height: 100%;
    float: left;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

}
</style>
