import Vue from 'vue'
import App from './App.vue'
import vueLazy from 'vue-lazyload'
import Element from 'element-ui'
import store from "store";
import { router } from 'router'
import axios from 'axios'
import './icons'
import './markdown'

import 'normalize.css/normalize.css'
import '@/styles/index.scss' // 全局样式
import '@/styles/element-variables.scss'
import './permission'

import {externalLink} from "utils/markdownExternalLink";

Vue.prototype.$externalLink = externalLink
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
Vue.use(Element)
Vue.use(vueLazy,{
  loading:require('../public/lazy-loading/loading.gif'),
  error:require('../public/lazy-loading/loading.gif')
})
// require('./mock')

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
