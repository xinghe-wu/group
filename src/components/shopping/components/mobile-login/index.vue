<template>
    <div class="my" :style="{'min-height':countHeight+'px'}">
        <div class="mobile-login">
            <div class="login-logo">
                <img :src="require('../../../../../static/img/lmyx.png')" alt="" class="img">
            </div>
            <div class="login-main">
                <div class="phone-wrap">
                    <div class="phone-input clear">
                    <div class="phone-icon">
                    <img
                        src="../../../../../static/img/phone.jpg"
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
                        src="../../../../../static/img/close.png"
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
                        src="../../../../../static/img/vercode.jpg"
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
                <div class="login-btn" @click.stop="comfirmLogin">
                    登录
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            verityCode:'',
            phone:'',
            btnTitle:'获取验证码',
            disabled:false,
            countHeight:document.documentElement.clientHeight,
            UA:''
        }
    },
    methods:{
         getVerityCode() {
        //点击获取验证码

        if (this.validatePhone()) {
            var _that = this;
            // 请求验证码数据
                this.GLOBAL.crmPost(
                    '/base/sms/send',
                    {
                        phone:this.phone,
                        code:'wxapp_register'
                    }
                )
                .then(res => {
                if (res.data.code === 200) {
                    this.$toast.center(res.data.msg);
                    this.dateBtn(); //执行倒计时
                } else {
                    this.$toast.center(res.data.msg);
                }
                }).catch(()=>{
                    this.$toast.center("获取手机验证码失败,请稍后再试");
                })
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
        comfirmLogin(){//确定登录
             var _that=this;
            if (this.validatePhone()) {
                //判断手机号
                if (this.validateVerityCode()) {
                    //判断验证码
                    this.GLOBAL.crmPost(
                        '/account/wxLoginRegister',
                        {
                            mobile:this.phone,
                            verifyCode:this.verityCode,
                        }
                    )
                    .then(res => {
                        if (res.data.code==200) {
                            var data = res.data.data;
                            this.GLOBAL.token=data.token
                            localStorage.setItem("_token_", data.token);
                            if (this.UA == "wxpay") {
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
                            this.$router.replace('/home/my')
                        }else{
                            this.$toast.center(res.data.msg);
                        }
                    }).catch(()=>{
                        this.$toast.center("登录失败,请稍后再试");
                    })
                }
            }
        }
    },
    mounted(){
        this.UA=sessionStorage.getItem('UA')
    }
}
</script>
<style lang="less" scoped>
.clear:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
// =============================
.my{
    width: 7.5rem;
    margin: auto;
    font-size: 0.3rem;
    .phone-wrap {
        margin-bottom: 0.1rem;
        width: 6.9rem;
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
    width: 6.9rem;
    border-bottom: 0.02rem solid #e5e5e5;
    }
    .verityCode-input {
    padding: 0.2rem 0;
    width: 6.9rem;
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
    .login-main{
        margin: auto;
        width: 6.9rem;
        padding: 0 0.3rem;

    }
    .login-btn{
        width: 5.38rem;
        height: 0.68rem;
        background:linear-gradient(94deg,rgba(248,90,76,1) 0%,rgba(215,48,54,1) 100%);
        border-radius:10px;
        margin: auto;
        text-align: center;
        line-height: 0.68rem;
        color: #ffffff;
    }
}
</style>
