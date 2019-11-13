<template>
  <div class="tabbar-wrap">
      <router-link class="tabbar-item" to="/home">
        <div class="item-icon">
          <img :src="require('../../../../static/img/home.png')" alt="" v-if="atPath!=='/home'">
          <img :src="require('../../../../static/img/homeactive.png')" alt="" v-if="atPath=='/home'">
        </div>
        <p class="item-text" :class="atPath=='/home' ? 'colorActive' : ''">首页</p>
      </router-link>
      <a class="tabbar-item" href="https://tt.mylmyx.com/group/?system=web#/" v-if="UA!='alipay'">
        <div class="item-icon">
          <img :src="require('../../../../static/img/group.png')">
        </div>
        <p class="item-text">拼团</p>
      </a>
      <router-link class="tabbar-item" to="/home/shoppingcart">
        <div class="item-icon">
          <img :src="require('../../../../static/img/cart.png')" alt="" v-if="atPath!=='/home/shoppingcart'">
          <img :src="require('../../../../static/img/cartactive.png')" alt="" v-if="atPath=='/home/shoppingcart'">
        </div>
        <p class="item-text" :class="atPath=='/home/shoppingcart' ? 'colorActive' : ''">购物车</p>
      </router-link>
      <router-link class="tabbar-item" to="/home/my" v-if="isShowPersonal">
        <div class="item-icon">
          <img :src="require('../../../../static/img/personal.png')" alt="" v-if="atPath!=='/home/my'">
          <img :src="require('../../../../static/img/personalactive.png')" alt="" v-if="atPath=='/home/my'">
        </div>
        <p class="item-text" :class="atPath=='/home/my' ? 'colorActive' : ''">个人中心</p>
      </router-link>
  </div>
</template>
<script>
export default {
  props:{
    atPath:{
      type:String,
      default:'/home'
    }
  },
  data() {
    return {
      isShowPersonal:true,
      UA:''
    };
  },
  methods: {
      //H5页面js
        navigate() { //控制页面跳转---小程序、公众号、非微信跳转方式 【modelName---vue路由名字】
            this.isMiniProgram((res)=>{//判断是否是小程序页面的回调函数
                if (res) {//小程序页面
                    this.isShowPersonal=false
                } else {
                    this.isShowPersonal=true
                }
            })
        },
        isMiniProgram(callback) { //是否为小程序环境
            //是否在微信环境
            if (this.UA=='alipay') {
                callback(false);
            } else {
                //微信API获取当前运行环境
                this.$wx.miniProgram.getEnv((res) => {
                    if (res.miniprogram) {//小程序环境
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
            }
        }
  },
  created(){
    this.UA=sessionStorage.getItem('UA')
    this.navigate()
  },
  watch: {
  }
};
</script>
<style lang="less" scoped>
.tabbar-wrap{
  width: 7.5rem;
  margin:auto;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding-right: 0;
  z-index: 100;
  display: flex;
  background-color: #fff;
  font-size: 0.28rem;
  box-sizing: border-box;
  border-top: 0.01rem solid #cccccc;
  .tabbar-item{
    width: 33.33%;
    height: 1.05rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .item-icon{
      width: 0.44rem;
      height: 0.44rem;
      margin-bottom: 0.1rem;
      img{
        width: 100%;
        height: 100%;
        font-size: 0;
      }
    }
  }
}
.colorActive{
  color: #f55413!important
}
.item-text{
  color: #7e8c8d;
}

</style>
