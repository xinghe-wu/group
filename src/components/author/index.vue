<template>
  <div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      data: {},
      backUrl:''
    };
  },
  methods: {
    getCode(state) {//获取微信code
      var urlNow = encodeURIComponent(window.location.href);
      var scope = "snsapi_base"; //snsapi_base   //静默授权 用户无感知
      var appid=this.GLOBAL.wxAppId;
      var url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
      window.location.replace(url);
    },
    getAlipayCode() {//获取支付宝code
      var urlNow = encodeURIComponent(window.location.href);
      var appid=this.GLOBAL.aliPayId
      var url = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${appid}&scope=auth_user,auth_base&redirect_uri=${urlNow}`;
      window.location.replace(url);
    },
    getUrlCode(name) {
      // 截取url中的code方法
      //获取url 参数
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    getMobile(name, url) {
      // 截取url中的mobile方法
      //获取url 参数
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            url
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    }
  },
  created() {
    var UA = sessionStorage.getItem("UA");
    if (UA == "wxpay") {//当前微信运行环境
      var code = this.getUrlCode("code");
    } else if (UA == "alipay") {//当前支付宝运行环境
      var code = this.getUrlCode("auth_code");
    } else {
      var code = this.getUrlCode("code");
    }
    var url = localStorage.getItem("_url_"); //获取url中"?"符后的字串
    var mobile = this.getMobile("mobile", url); //获取mobile
    var token = this.getMobile("token", url); //获取token
    if (code) {
      if (mobile) {
        sessionStorage.setItem("userMobile", mobile);
        //var sign = this.$md5(code + mobile).toUpperCase();
          this.GLOBAL.crmPost(
              '/account/wechatPublicAccountLogin',
              {
                code:code
              }
          )
          .then(res => {
            if (res.data.code==200) {
              var data = res.data.data;
              this.GLOBAL.token=token
              localStorage.setItem("_token_", token);
              //微信缓存openId
              localStorage.setItem("_openId_", data.wxId);
              sessionStorage.setItem("openId", data.wxId);
              localStorage.setItem("_userLogo_", data.userLogo);
              localStorage.setItem("_isBdMobile_", data.isBdMobile);
              localStorage.setItem("_bdMobile_", data.mobile);
              sessionStorage.setItem("token", token);
              sessionStorage.setItem("userInfo", JSON.stringify(data));
              this.$router.replace(localStorage.getItem("_url_"));
            }else{
              this.$toast.center(res.data.msg);
            }
          })
          .catch(() => {
            this.$toast.center("登录失败,请稍后再试");
          });
      } else {
        this.GLOBAL.crmPost(
              '/account/wechatPublicAccountLogin',
              {
                code:code
              }
          )
          .then(res => {
            if (res.data.code == 200) {
              var data = res.data.data;
              this.GLOBAL.token=data.token
              localStorage.setItem("_token_", data.token);
              if (UA == "wxpay") {
                //微信缓存openId
                localStorage.setItem("_openId_", data.wxId);
                sessionStorage.setItem("openId", data.wxId);
              } else {
                //支付宝缓存openId
                localStorage.setItem("_openId_", data.zfbId);
                sessionStorage.setItem("openId", data.zfbId);
              }
              localStorage.setItem("_userLogo_", data.userLogo);
              localStorage.setItem("_isBdMobile_", data.isBdMobile);
              localStorage.setItem("_bdMobile_", data.mobile);
              sessionStorage.setItem("token", data.token);
              sessionStorage.setItem("userInfo", JSON.stringify(data));
              this.$router.replace(localStorage.getItem("_url_"));
            } else {
              this.$toast.center(res.data.msg);
              //window.location.replace('https://tt.mylmyx.com/#'+localStorage.getItem('_url_'))
            }
          })
          .catch(() => {
            this.$toast.center("用户登录失败,稍后再试");
            //window.location.replace('https://tt.mylmyx.com/#'+localStorage.getItem('_url_'))
          });
      }
    } else {
      if (UA == "wxpay") {
        this.getCode("123");//获取微信code
      } else if (UA == "alipay") {
        this.getAlipayCode();//获取支付宝code
      }
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>
