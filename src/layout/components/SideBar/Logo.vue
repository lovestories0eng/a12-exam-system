<template>
  <div class="sidebar-logo-container">
    <transition>
      <router-link class="sidebar-logo-link" to="/">
        <img :src="logo" class="sidebar-logo" alt="">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  data() {
    return {
      title: '考试助手'
    }
  },
  computed: {
    logo: () => {
      // return require('@/assets/logo.jpg')
      return require('@/assets/logo_final.png')
    }
  }
}
</script>

<style lang="scss" scoped>

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 100px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 100px;
      height: 92px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 700;
      line-height: 50px;
      font-size: 20px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
}
</style>
