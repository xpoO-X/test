// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import $ from 'jquery'
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store/store'
import VueResource from 'vue-resource'
import Vant from 'vant';
import {NumberKeyboard,Tab,Tabs,Sku,Toast,Lazyload,PullRefresh,Uploader, Swipe, SwipeItem,Picker,Tabbar,TabbarItem } from 'vant';
import 'vant/lib/vant-css/index.css';
import 'swiper/dist/css/swiper.css'
//（如果使用的是2.6.0以上的版本需要自己手动去加载css）
import VueAwesomeSwiper from 'vue-awesome-swiper'
import EXIF from 'exif-js'

Vue.use(VueAwesomeSwiper);
Vue.use(PullRefresh);
Vue.use(Vant);
Vue.use(NumberKeyboard);
Vue.use(Toast);
Vue.use(Sku);
Vue.use(Lazyload);
Vue.use(Tab).use(Tabs);
Vue.use(VueResource);
Vue.use(Uploader);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Picker);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.prototype.EXIF = EXIF
Vue.config.productionTip = false;
axios.defaults.withCredentials=true;
// axios.defaults.timeout =  5000;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */

// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  next()
});

//返回上一页面
Vue.prototype.goBack = function(){
  const that = this;
  if(localStorage.getItem("isBackToLogin")){
      that.$router.push(localStorage.getItem("backPath"));
  }else{
    localStorage.removeItem('isBackToLogin');
    localStorage.removeItem('backPath');
    that.$router.go(-1);
  }
};

// 路由跳转后的钩子
router.afterEach(function (to) {

  setTimeout(function () {
    window.scrollTo(0,0);
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
  },50)
});

axios.interceptors.request.use(function(config){
  return config
},function(err){
  return Promise.reject(err)
});

axios.interceptors.response.use(function(response){
  return response
},function(err){
  var str = err + '';
  if (str.search('timeout') !== -1) {   // 超时error捕获
    Toast({
      message: "请求超时,稍后再试！",
      duration: 2000
    })
  }
  return Promise.reject(err)
});

new Vue({
  el: '#app',
  data(){
    return {

    }
  },
  router,
  store,
  components: { App },
  template: '<App/>',
  methods:{

  },
  mounted() {

  }
})


