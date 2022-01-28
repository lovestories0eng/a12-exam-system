<template>
  <div>
    <logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 外循环，遍历所有父节点 -->
        <side-bar-item v-for="route in permissionRoutes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from "layout/components/SideBar/Logo";
import SideBarItem from "layout/components/SideBar/SideBarItem";
import variables from '@/styles/variables.scss'

export default {
  name: "index",
  components: {
    Logo,
    SideBarItem
  },
  computed: {
    // 从VueX中取出permissionRoutes属性和sidebar属性
    ...mapGetters([
      'permissionRoutes',
    ]),
    activeMenu() {
      // for debug
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  }
}
</script>

<style scoped>

</style>
