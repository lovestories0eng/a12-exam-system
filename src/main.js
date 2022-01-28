import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import store from "store";
import { router } from 'router'
import './icons'

import 'normalize.css/normalize.css'
import '@/styles/index.scss' // 全局样式
import '@/styles/element-variables.scss'
import './permission'

Vue.config.productionTip = false
Vue.use(Element)

require('./mock')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
