import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
axios.defaults.baseURL='http://xbvuestudy.top/'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
import Vant from 'vant';
import 'vant/lib/index.css';
import '../src/http.js'
Vue.use(Vant);
import VAS from 'vue-awesome-swiper'
Vue.use(VAS)
import 'swiper/css/swiper.css'
import '@/assets/css/style.css'
import './assets/iconfont/iconfont.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
