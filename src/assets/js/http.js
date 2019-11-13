import axios from 'axios';
import Vue from 'vue'
import { Indicator } from "mint-ui";

import VueAxios from 'vue-axios'

//全局注册axios请求
Vue.use(VueAxios,axios);
Vue.prototype.$Indicator = Indicator;

import Qs from 'qs'

var crmHost = 'http://192.168.18.40:1103';//1103
var goodsHost='http://192.168.18.40:1102';//1102
var orderHost='http://192.168.18.40:1104'//1104
var wxAppId = 'wx45d71a990376a9d7'//测试
var aliPayId = '2019061365575064'//测试

// var orderHost = 'https://ord.mylmyx.com'//1104
// var crmHost = 'https://mem.mylmyx.com'//1103
// var goodsHost = 'https://base.mylmyx.com'//1102
// var wxAppId = 'wxa8cb2553d7add76f'
// var aliPayId = '2016011201086258'


// var crmHost = 'http://192.168.18.159:1103';//1103
// var goodsHost='http://192.168.18.159:1102';//1102
// var orderHost='http://192.168.18.159:1104'//1104
// var wxAppId = 'wx45d71a990376a9d7'//测试
// var aliPayId = '2019061365575064'//测试

var token = sessionStorage.getItem('token')
// var token ='5935966d6403496fad1f8875343950b5crm'


Vue.config.productionTip = false

axios.interceptors.request.use(
  function(config) {
    Vue.prototype.$Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    if(config.method  === 'post'){
      config.data = Qs.stringify(config.data);
    }
    return config;
  },
  function(error) {
    Vue.prototype.$Indicator.close()
    return Promise.reject(error);
  }
);


axios.interceptors.response.use(
  function(response) {
    Vue.prototype.$Indicator.close()
    return response;
  },
  function(error) {
    Vue.prototype.$Indicator.close()
    return Promise.reject(error);
  }
);


// 封装post请求
// @param url
// @param data
// @returns {Promise}

function goodsPost(url, data) {
  axios.defaults.headers.common["Authorization"] = this.token;
  return new Promise((resolve, reject) => {
    axios({
      method:'post',
      url:this.goodsHost+url,
      data: data,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}
function crmPost(url, data) {
  axios.defaults.headers.common["Authorization"] = this.token;
  return new Promise((resolve, reject) => {
    axios({
      method:'post',
      url:this.crmHost+url,
      data: data,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then(
      response => {

        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}
function orderPost(url, data) {
  axios.defaults.headers.common["Authorization"] = this.token;
  return new Promise((resolve, reject) => {
    axios({
      method:'post',
      url:this.orderHost+url,
      data: data,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then(
      response => {
        resolve(response);
      },
      err => {
        reject(err);
      }
    );
  });
}

export default {
  crmHost,
  crmPost,
  goodsHost,
  goodsPost,
  orderHost,
  orderPost,
  token,
  wxAppId,
  aliPayId
}
