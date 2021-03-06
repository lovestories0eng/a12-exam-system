import {constantRoutes, studentRoutes, teacherRoutes, adminRoutes} from "router";
import deepClone from "utils/deepClone";

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, role) {
    return new Promise(resolve => {
      let accessedRoutes
      if (role === '学生') {
        accessedRoutes = deepClone([...studentRoutes])
      } else if (role === '老师') {
        accessedRoutes = deepClone([...teacherRoutes])
      } else if (role === '管理员') {
        accessedRoutes = deepClone([...adminRoutes])
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
