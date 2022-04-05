import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'
import {resetRouter} from "router";

// vuex模块---登录，获取用户信息，登出模块--user.js

const state = {
  image: '',
  role: '',
  address: "",
  phoneNumber: 0,
  sex: '',
  name: '',
  userId: '',
  email: '',
  avatar: '',
  introduction: '',
  className: '',
  token: ''
}

// 注册所有的mutation方法
const mutations = {
  SET_IMAGE: (state, image) => {
    state.image = image
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_ADDRESS: (state, address) => {
    state.address = address
  },
  SET_PHONE_NUMBER: (state, phoneNumber) => {
    state.phoneNumber = phoneNumber
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_FACE_TOKEN: (state, faceToken) => {
    state.faceToken = faceToken
  },
  SET_CONTAINER: (state, container) => {
    state.container = container
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

// action存在的意义就是执行异步操作
// 注册所有的action方法
const actions = {
  changeRole({ commit }, { token, userId, role }) {
    setUserId(userId)
    setToken(token)
    commit('SET_ROLE', role)
    commit('SET_USERID', userId)
  },
  // 登录
  // commit为VueX中自带的方法
  // 将commit 从 context 中结构出来
  // Promise封装的组合式action
  login({ commit }, userInfo) {
    const { userId, userPassword } = userInfo
    return new Promise((resolve, reject) => {
      // trim() 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
      // utils里的login
      login({ userId: userId.trim(), userPassword: userPassword }).then(response => {
        const { data } = response
        setUserId(userId)
        setToken(data.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // get user info
  // 获取用户信息
  // 将commit,state从 context 中结构出来
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('认证失败，请重新登录')
        }
        const { image, role, sex, address, phoneNumber, name, userId, email, faceToken } = data
        commit('SET_IMAGE', image)
        commit('SET_ROLE', role)
        commit('SET_SEX', sex)
        commit('SET_ADDRESS', address)
        commit('SET_PHONE_NUMBER', phoneNumber)
        commit('SET_NAME', name)
        commit('SET_USERID', userId)
        commit('SET_EMAIL', email)
        commit('SET_FACE_TOKEN', faceToken)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // 登出
  // 将commit, state, dispatch 从 context 中结构出来
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_ROLE', [])
        removeToken()
        removeUserId()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  // 清除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_ROLE', [])
      commit('SET_TOKEN', '')
      removeToken()
      removeUserId()
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
