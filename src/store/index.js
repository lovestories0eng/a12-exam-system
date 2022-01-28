import Vue from "vue"
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

// require.context函数接受三个参数：
// directory {String} -读取文件的路径
// useSubdirectories {Boolean} -是否遍历文件的子目录
// regExp {RegExp} -匹配文件的正则
const modulesFiles = require.context('./modules', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './permission.js' => 'permission'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
