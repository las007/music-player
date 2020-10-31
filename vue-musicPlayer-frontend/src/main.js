// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../store'
import mmToast from './base/mm-toast'

Vue.config.productionTip = false

// 弹出层
Vue.use(mmToast)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + '- rmPlayer在线播放器'
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
