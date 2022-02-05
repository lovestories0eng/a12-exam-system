import { debounce } from '@/utils' // 防抖函数

export default {
  data() {
    return {
      $_sidebarElm: null,
      $_resizeHandler: null
    }
  },
  mounted() {
    // $_resizeHandler resize 事件，里面代码告诉我们chart如果存在就会调用resize 是为了保证图表显示正常
    this.$_resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    // 这里调用 resize 窗口大小变化时就会resize保证图表显示正常
    this.$_initResizeEvent()
    // 侧边栏展开或者缩放时触发 resize 保证图表正常渲染
    this.$_initSidebarResizeEvent()
  },
  beforeDestroy() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  // to fixed bug when cached by keep-alive
  // https://github.com/PanJiaChen/vue-element-admin/issues/2116
  // 由于页面使用了 keep-alive 包裹肯定也要只要不刷新页面，第二次进入的时候就不会触发上面的钩子了所以这两个钩子内还要做重复的操作保证 resize 正常
  activated() {
    this.resize()
    this.$_initResizeEvent()
    this.$_initSidebarResizeEvent()
  },
  deactivated() {
    this.$_destroyResizeEvent()
    this.$_destroySidebarResizeEvent()
  },
  methods: {
    reinitializeChart() {
      if (this.chart !== null) {
        this.chart.dispose()
        this.chart = null
        this.initChart()
      }
    },
    // bug fixed
    resize() {
      const { chart } = this
      chart && chart.resize()
    },
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // activated 和 mounted 都调用了
    $_initResizeEvent() {
      // $_resizeHandler 在 mounted 的第一行就赋值了
      window.addEventListener('resize', this.$_resizeHandler)
    },
    $_destroyResizeEvent() {
      window.removeEventListener('resize', this.$_resizeHandler)
    },
    // 这个函数为 transitionend 事件触发函数
    $_sidebarResizeHandler(e) {
      // propertyName 属性返回与过渡关联的 CSS 属性的名称。
      if (e.propertyName === 'width') {
        this.$_resizeHandler()
      }
    },
    // activated 和 mounted 都调用了
    $_initSidebarResizeEvent() {
      // $_sidebarElm 就是整个侧边栏
      this.$_sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      // 如果这个元素存在就监听一个事件调用一个方法
      // transitionend 这个是 vue 动画的事件在 transtion 结束后触发
      // transitionend 是 CSStransition（如 transform/scale 等）结束的触发事件
      this.$_sidebarElm && this.$_sidebarElm.addEventListener('transitionend', this.$_sidebarResizeHandler)
    },
    $_destroySidebarResizeEvent() {
      this.$_sidebarElm && this.$_sidebarElm.removeEventListener('transitionend', this.$_sidebarResizeHandler)
    }
  }
}
