import store from '@/store'

const { body } = document

// WIDTH > 992是桌面端。
// 反之是移动端
// this.device:设备类型（mobile：移动端，desktop：桌面端）
// this.sidebar.opened：判断侧边导航栏的关闭和打开
// withoutAnimation：判断是否显示动画的类名
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  // 监听页面路由，路由变化时如果设备是移动端且侧边栏打开，就去vuex关闭侧边导航栏
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  // 添加监听浏览器页面变化的方法
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  // 销毁监听浏览器页面变化的方法
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 方法 1.判断浏览器页面宽度是否小于992
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    // 2.根据浏览器宽度是否小于992来决定设备类型，
    // 触发toggleDevice方法修改vuex中设备类型，
    // 如果是移动端触发closeSideBar关闭侧边导航栏
    $_resizeHandler() {
      // Document.hidden （只读属性）返回布尔值，表示页面是（true）否（false）隐藏。
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
