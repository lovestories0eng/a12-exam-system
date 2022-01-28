import Vue from 'vue'
import Router from 'vue-router'

import Layout from 'layout'

Vue.use(Router)

export const constantRoutes =[
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/student/dashboard/index'),
        name: 'dashboard',
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },
  // 登录界面路由
  {
    path: '/login',
    redirect: '/login/student-login',
    component: () => import('@/views/login/login'),
    hidden: true,
    children: [
      {
        path: '/login/student-login',
        component: () => import('@/views/login/student'),
        name: 'student-login'
      },
      {
        path: '/login/teacher-login',
        component: () => import('@/views/login/teacher'),
        name: 'teacher-login'
      },
      {
        path: '/login/admin-login',
        component: () => import('@/views/login/admin'),
        name: 'admin-login'
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/ErrorPage'),
    hidden: true
  }
]

export const studentRoutes = [
  {
    path: '/notice',
    component: Layout,
    // component: Layout,
    redirect: '/notice/sent',
    alwaysShow: true,
    name: 'notice',
    meta: {
      title: '通知',
      icon: 'lock',
    },
    children: [
      {
        path: '/notice/sent',
        component: () => import('@/views/student/notice/Sent'),
        name: '我发出的',
        meta: {
          title: '我发出的',
          icon: 'lock'
        }
      },
      {
        path: '/notice/received',
        component: () => import('@/views/student/notice/Received'),
        name: '我收到的',
        meta: {
          title: '我收到的',
          icon: 'lock'
        }
      },
      // 404 page must be placed at the end !!!
      {
        path: '*',
        redirect: '/404',
        hidden: true
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/my-exam',
    alwaysShow: true,
    name: '考试',
    meta: {
      title: '考试',
      icon: 'lock',
    },
    children: [
      {
        path: '/exam/my-exam',
        component: () => import('@/views/student/exam/MyExam'),
        name: '我的考试',
        meta: {
          title: '我的考试',
          icon: 'lock'
        }
      },
      {
        path: '/exam/exam-data',
        component: () => import('@/views/student/exam/ExamData'),
        name: '考试数据',
        meta: {
          title: '考试数据',
          icon: 'lock'
        }
      },
      {
        path: 'exam/mistakes',
        component: () => import('@/views/student/exam/Mistakes'),
        name: '错题本',
        meta: {
          title: '错题本',
          icon: 'lock'
        }
      }
    ]
  },
  {
    path: '/exam/do',
    component: () => import('views/student/exam/myexam/do'),
    hidden: true,
    name: '进行考试',
  },
  {
    path: '/help',
    component: Layout,
    name: '帮助',
    meta: {
      title: '帮助',
      icon: 'lock'
    }
  }
]

export const teacherRoutes = []

export const adminRoutes = []

// 解决路由相同跳转报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}

export const router = new Router({
  mode: 'hash',
  routes: constantRoutes
})
