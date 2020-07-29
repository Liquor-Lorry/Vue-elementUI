import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全局配置
import './assets/scss/reset.scss'
import http from './api/config'
import './mock'

//第三方包
//引用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//挂载到vue实例上面
Vue.use(ElementUI)

// 将http挂载到vue原型
Vue.prototype.$http = http

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  let token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')
