<template>
  <div class="app-wrapper">
    <side-bar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <navbar />
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import SideBar from './components/SideBar'
import Navbar from "layout/components/Navbar";

export default {
  name: 'Layout',
  components: {
    SideBar,
    Navbar
  },
  computed: {
    ...mapState({
      // sidebar: state => state.app.sidebar,
    }),
  },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.app-wrapper {
  position: relative;
  height: 100%;
  width: 80%;
  margin: 0 auto;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: relative;
  top: 0;
  z-index: 9;
  width: 100%;
  transition: width 0.28s;
}


</style>
