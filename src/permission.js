import { router } from 'router'
import store from "./store";
import { Message } from 'element-ui'
// 进度条插件
import NProgress from'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth' // get token from cookie

// NProgress 页面导航
NProgress.configure({ showSpinner: false }) // NProgress Configuration
// no redirect whitelist
const whiteList = ['/login', '/login/student-login', '/login/teacher-login', '/login/admin-login']

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()
  // 确定用户是否已登录
  // 在开始路由跳转之前已经设置好了token，见store/modules/user.js login({ commit }, userInfo)
  const hasToken = getToken()
  if (hasToken) {
    // 如果是进入登录页面 则不需要权限 直接进入home page 因为已经有了token
    if (to.path === '/login') {
      next({ path: '/' })
      // 进度条完成
      NProgress.done()
    } else {
      // 通过getInfo判断用户是否获得了权限角色
      // 用户刚登录的时候，没有getInfo，第一次需要获取用户信息给予相关权限
      const hasRoles = store.getters.role && store.getters.role.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          await store.dispatch('user/getInfo')
          // 根据roles权限生成可访问的路由表
          const { role } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', role)
          // for debug
          accessRoutes.forEach(route => {
            router.addRoute(route)
          })
          // hack方法 确保addRoute已完成
          next({ ...to, replace: true })
        } catch(error) {
          // 删除令牌，进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 无token */
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 没有访问权限的其他页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 在路由跳转结束之后关闭进度条
  NProgress.done()
})
