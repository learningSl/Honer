import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
Vue.config.productionTip = false
Vue.prototype.$http = http
// Vue.mixin({  这样定义的方法在每一个vue实例中都能调用
//   methods:{

//   }
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
