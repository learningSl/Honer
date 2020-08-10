import Vue from 'vue'
import App from './App.vue'

import './style.scss'
import router from './router'
Vue.config.productionTip = false
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/iconfont/iconfont.css'  //引入字体图标
Vue.use(VueAwesomeSwiper)
import Card from './components/card.vue'
Vue.component('m-card', Card)
import ListCard from './components/ListCard.vue'
Vue.component('list-card', ListCard)
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
