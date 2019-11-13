<template>
  <div class="syn-wrap">
    <!-- 手机号码输入框 -->
    <div class="phone-wrap">
      <div class="phone-input clear">
        <div class="phone-icon">
          <img
            src="../../../static/img/phone.jpg"
            alt=""
            class="img"
          >
        </div>
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="phone"
          class="phoneNumber"
        >
        <div
          class="emptyPhone"
          @click.stop="emptyData"
          v-if="phone"
        >
          <img
            src="../../../static/img/close.png"
            alt=""
            class="img"
          >
        </div>
      </div>
    </div>
    <!-- 验证码输入框 -->
    <div class="verityCode-wrap">
      <div class="verityCode-input clear">
        <div class="verityCode-icon">
          <img
            src="../../../static/img/vercode.jpg"
            alt=""
            class="img"
          >
        </div>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="verityCode"
          class="verityNumber"
        >
        <!-- 获取验证码按钮 -->
        <button
          class="vCode-btn"
          :disabled="disabled"
          @click="getVerityCode"
        >{{btnTitle}}</button>
      </div>
    </div>
    <!-- 确定按钮 -->
    <div class="comfirm">
      <button
        class="comfirm-btn"
        @click="commitData"
      >确定</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "", //手机号
      verityCode: "", //验证码
      btnTitle: "获取验证码", //获取倒计时提示
      disabled: false, //是否可以点击
      alipayId: "",
      timer:null
    };
  },
  mounted() {
    var _isBdMobile_=localStorage.getItem('_isBdMobile_')
    if (_isBdMobile_&&_isBdMobile_==2) {
        this.$router.replace('/mywallet')
    }
    if (window.history && window.history.pushState) {//判断物理返回
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', this.goBack, false);
    }
  },
  methods: {
    getVerityCode() {
      //点击获取验证码
      if (this.validatePhone()) {
        var _that = this;
        // 请求验证码数据
        this.GLOBAL.crmPost(
          '/base/sms/send',
          {
            phone:this.phone,
            code:'update_binding_phone'
          }
        )
        .then(res => {
          ////console.log(res);
          if (res.data.code === 200) {
            this.$toast.center(res.data.msg);
            this.dateBtn(); //执行倒计时
          } else {
            this.$toast.center(res.data.msg);
          }
        });
      }
    },

    validatePhone() {
      //判断输入的手机号是否合法
      if (!this.phone) {
        //手机号为空时提示
        this.$toast.center("手机号不能为空");
      } else if (!/^1[23456789]\d{9}$/.test(this.phone)) {
        //手机号格式有误时
        this.$toast.center("请输入正确的手机号");
      } else {
        this.disabled = false;
        return true;
      }
    },
    //判断输入验证码是否合法
    validateVerityCode() {
      if (!this.verityCode && !this.phone) {
        //判断手机号和验证码是否为空
        return;
      } else if (this.phone && !this.verityCode) {
        //判断验证码是否为空
        this.$toast.center("请输入验证码");
      } else if (
        this.phone &&
        this.verityCode &&
        !/^\d{6}$/.test(this.verityCode)
      ) {
        //判断验证码是否合法
        this.$toast.center("验证码格式错误");
      } else {
        return true;
      }
    },
    emptyData() {
      //重置的事件处理
      if (this.phone !== "") {
        this.phone = "";
      }
      if (this.verityCode !== "") {
        this.verityCode = "";
      }
    },
    dateBtn() {
      //获取验证码倒计时
      var time = 60;
      var timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          this.disabled = false;
          this.btnTitle = "获取验证码";
        } else {
          this.btnTitle = time + "秒后重试";
          this.disabled = true;
          time--;
        }
      }, 1000);
    },

    //提交手机号和验证码
    commitData() {
      var _that=this;
      if (this.validatePhone()) {
        //判断手机号
        if (this.validateVerityCode()) {
          //判断验证码
          this.GLOBAL.crmPost(
            '/account/weChatPublicAccount/bindingMobile',
            {
              verifyCode:this.verityCode,
              mobile:this.phone,
            }
          )
          .then(res => {
            if (res.data.code === 200) {
              this.$toast.center("绑定成功");
              localStorage.setItem('_bdMobile_',res.data.data.bdMobile)
              if (localStorage.getItem('_isBdMobile_')) {
                localStorage.setItem('_isBdMobile_',res.data.data.isBdMobile)
              }
              if (localStorage.getItem('_url_')=='/syxidou') {
                _that.timer=setTimeout(()=>{
                    this.$router.replace("/mywallet");
                  },2000)
              }else{
                  _that.timer=setTimeout(()=>{
                      _that.$router.replace(localStorage.getItem('_url_'));
                  },2000)
              }
            } else {
              if (res.data.msg=="您已绑定过该手机了") {
                this.$toast.center(res.data.msg);
                this.$router.replace('/mywallet');
              }
            }
          }).catch(()=>{
            this.$toast.center("请求绑定失败,请稍后再试");
          });
        }
      }
    },
    goBack(){
      if (sessionStorage.getItem('_url_')=='/syxidou') {
          WeixinJSBridge.call('closeWindow');
      }else{
          this.$router.go(-1)
      }
    }
  },
  beforeDestroy(){
    if (this.timer) {
      clearTimeout(this.timer)
    }
    window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
  }
};
</script>

<style scoped>
.clear:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}

/* ---------------- */
.syn-wrap {
  width: 6.9rem;
  margin: 0 auto;
  height: 12.34rem;
  padding-top: 1rem
}
.phone-wrap {
  margin-bottom: 0.1rem;
}
.verityCode-wrap {
  margin-bottom: 0.6rem;
}
.img {
  display: block;
  font-size: 0;
  width: 100%;
  height: 100%;
}
.phoneNumber {
  float: left;
  border: none;
  outline: medium;
  width: 5.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  padding-left: 0.32rem;
  font-size: 0.3rem;
  margin: auto 0;
  border-left: 1px solid #e5e5e5;
  border-radius: 0
}
.verityNumber {
  float: left;
  border: none;
  outline: medium;
  height: 0.5rem;
  line-height: 0.5rem;
  padding-left: 0.32rem;
  font-size: 0.3rem;
  margin: auto 0;
  border-left: 1px solid #e5e5e5;
  border-radius: 0
}
.phone-input {
  padding: 0.2rem 0;
  width: 100%;
  border-bottom: 0.02rem solid #e5e5e5;
}
.verityCode-input {
  padding: 0.2rem 0;
  border-bottom: 0.02rem solid #e5e5e5;
}
/* 浮动 */
.phone-icon,
.verityCode-icon {
  float: left;
  width: 0.45rem;
  height: 0.5rem;
  margin: 0.02rem 0.25rem 0 0.15rem;
}
.emptyPhone {
  float: right;
  width: 0.45rem;
  height: 0.5rem;
  margin-top: 0.02rem;
}

.vCode-btn {
  float: right;
  width: 1.56rem;
  height: 0.54rem;
  border: 0.01rem solid #cf3327;
  color: #cf3327;
  background-color: #ffffff;
  font-size: 0.25rem;
  border-radius: 0.09rem;
}

.verityCode-icon {
  width: 0.45rem;
  height: 0.5rem;
}
/* 确定按钮 */
/* .comfirm{
  width: 100%;
  margin-top:0.7rem;
  height: 0.88rem
} */
.comfirm-btn {
  width: 100%;
  height: 0.88rem;
  border-radius: 0.1rem;
  color: #ffffff;
  font-size: 0.3rem;
  /*! autoprefixer: off */
  background: -webkit-linear-gradient(top, #fa5c4d, #d73036);
  /*! autoprefixer: no */
  background: -moz-linear-gradient(top, #fa5c4d, #d73036);
  background: -o-linear-gradient(top, #fa5c4d, #d73036);
  background: linear-gradient(top, #fa5c4d, #d73036);
  border: none;
}
/* error提示 */
.phone-error {
  color: #cf3327;
  font-size: 0.25rem;
  padding-left: 1.18rem;
}
</style>
