// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload' //懒加载  安装npm install vue-lazyload --save-dev
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import VueScroller  from 'vue-scroller'

// import {Swipe, SwipeItem ,Lazyload ,Search,Tabbar, TabItem , Badge,Header,Switch,Picker,Popup,Navbar, MessageBox} from 'mint-ui';

// import 'mint-ui/lib/style.css';
import './assets/css/mint.css'
// import 'swiper/dist/css/swiper.css';
//import animate from 'animate.css'
import vpay from './components/shopping/components/vapy/index';
import global from './assets/js/http'
Vue.prototype.GLOBAL = global


Vue.use(vpay);

Vue.use(VueLazyLoad, {
  error: require('../static/img/np-find.png')
  //loading: require('./assets/1.gif')
})
Vue.prototype.Globa={
  isShowLoading:false,
  isBack:false
}


import md5 from 'js-md5';

Vue.prototype.$md5 = md5;


import wx from 'weixin-js-sdk'
Vue.prototype.$wx=wx

//Vue.prototype.$messagebox = MessageBox  //引入消息弹窗



import store from './store/index'



 Vue.use(VueScroller)
// Vue.use(animate)
// Vue.use(Lazyload);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Search.name, Search);
// Vue.component(Tabbar.name, Tabbar);
// Vue.component(TabItem.name, TabItem);
//Vue.component(Badge.name, Badge);
//Vue.component(Header.name, Header);
//Vue.component(Switch.name, Switch);
//Vue.component(Picker.name, Picker);
//Vue.component(Popup.name, Popup);
//Vue.component(Navbar.name, Navbar);


//全局注册提示框
Vue.use(Toast,{
  duration: 2000,
});

// 判断是否微信浏览器还是支付宝浏览器
var ua = window.navigator.userAgent.toLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger'){
  // //console.log('微信'+ua)
  sessionStorage.setItem('UA', 'wxpay')
  // dplus.register({"APP来源": "微信"})
} else if (ua.match(/AliApp/i) == 'aliapp') {
  // //console.log('支付宝'+ua)
  sessionStorage.setItem('UA', 'alipay')
  // dplus.register({"APP来源": "支付宝"})
} else {
  // //console.log('其他'+ua)
  sessionStorage.setItem('UA', 'qita')
  // dplus.register({"APP来源": "其他"})
}

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title
  }
  Vue.prototype.$path=to.fullPath
  next()
   var token = localStorage.getItem('_token_')
   var openid = localStorage.getItem('_openId_')
   var payOpenId=sessionStorage.getItem('openId')

  if (!token || !openid || !payOpenId) {
    if (to.path === '/author') {
      next()
    } else {
      localStorage.setItem('_url_',to.fullPath)//缓存跳转前地址
      next('/author')
    }
  } else {
    var login=sessionStorage.getItem('token')
    if (!login) {
      next('/mobilelogin')
    }else{
      next()
    }
  }

  // localStorage.setItem('_openId_','asdsdasdasdasdasdasdasd')
  // sessionStorage.setItem('openId','asdsdasdasdasdasdasdasd')
  // localStorage.setItem('_token_','5935966d6403496fad1f8875343950b5crm')
  // sessionStorage.setItem('token','5935966d6403496fad1f8875343950b5crm')

})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
