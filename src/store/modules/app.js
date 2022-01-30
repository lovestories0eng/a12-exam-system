import Cookies from 'js-cookie'

const state = {
  sidebar: {
    // Cookies.get(‘sidebarStatus’))的意思是取出来的是 "0"
    // +Cookies.get(‘sidebarStatus’)的意思是 +"0" , 触发隐式类型转换, 会得到 0
    // !+Cookies.get(‘sidebarStatus’))的意思是 !0 , 对数值类型取反会返回布尔类型, 会得到 true
    // !!+Cookies.get(‘sidebarStatus’)的意思是 !true , 对布尔的true进行取反, 会得到 false
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // 无动画效果
    withoutAnimation: true
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  // 切换侧边导航栏的开关
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      // 如果打开，设置status=1
      Cookies.set('sidebarStatus', 1)
    } else {
      // 如果关闭，设置status=0
      Cookies.set('sidebarStatus', 0)
    }
    // 刷新后通过cookies保留siderbar.opened状态
  },
  // 关闭侧边导航栏
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  // 切换设备类型
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  // 设置主体按钮等组件大小
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
