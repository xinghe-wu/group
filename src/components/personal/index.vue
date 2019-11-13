<template>
    <div>
        <div class="userinfo-wrap">
            <div class="userinfo clear">
                <div class="user-avatar" @click.stop="navToEdit">
                    <div class="user-avatar-frame">
                        <img v-lazy="userLogo" alt="">
                    </div>
                </div>
                <div class="user">
                    <div class="username">{{custName}}</div>
                    <div class="userid"><span>会员</span></div>
                </div>
            </div>
            <div class="split-line"></div>
            <div class="personal-apply-wrap">
                <div class="personal-apply-lists">
                    <div class="personal-apply-item clear" @click="navToWallet">
                        <div class="item-icon">
                            <img src="../../../static/img/dou.png" alt="">
                        </div>
                        <p class="item-name">我的喜豆</p>
                        <i class="item-enter-icon"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userLogo:'http://img01.fabric.cn/guideimg/app_def.png',
            token:'',
            custName:''
        }
    },
    methods: {
        navToEdit(){//跳转到修改个人资料
            this.$router.push('/edit')
        },
        navToWallet(){//跳转到我的喜豆
            this.$router.push('/mywallet')
        },
        getUserInfo(){
            var _that=this
            this.GLOBAL.crmPost(
                '/user/getLoginUserInfo',
                {

                }
            )
            .then(res=>{
                var data=res.data.data
                if (res.data.code==200) {
                    _that.custName=data.custNameNc
                }else{
                this.$toast.center(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.center("请求错误");
            })
        }
    },
    mounted(){
        if ( localStorage.getItem('_userLogo_')) {
            this.userLogo=localStorage.getItem('_userLogo_')
        }
        this.getUserInfo()
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
// -----------------------
.userinfo-wrap{
    width: 100%;
    height: auto;
}
.userinfo{
    width: 100%;
    height: 1.50rem;
    padding: 0.18rem 0 0.18rem 0;
    border-radius: 0.1rem 0.1rem 0 0;
    color:#3e3e3e;
    font-size: 0.24rem
}
.userinfo .user-avatar{
    width: 1.5rem;
    height: 1.5rem;
    box-sizing: border-box;
    float: left;
    margin: 0 0.2rem;
    .user-avatar-frame{
        width: 1.32rem;
        height: 1.32rem;
        border: 0.06rem solid #ffffff;
        border-radius: 50%;
        margin: 0.03rem 0.03rem;
        text-align: center;
        img{
            width: 100%;
            height: 100%;
            display: block;
            font-size: 0
        }
    }
}
.userinfo .user{
    float: left;
    .username{
        margin: 0.42rem 0 0.2rem 0;
        font-size: 0.27rem;
        white-space:nowrap;
        width: 5rem
    }
    .userid{
        width: 0.8rem;
        height: 0.31rem;
        box-sizing: border-box;
        span{
            display: block;
            text-align: center;
            line-height: 0.3rem;
            background-color: #d6a9ad;
            border-radius: 0.15rem;
            color: #ffffff
        }
    }
}
// 分割线
.split-line{
    width: 100%;
    height: 0.1rem;
    /*! autoprefixer: off */
    background: -webkit-linear-gradient(top, #f5f6f7, #fbfbfc);
    /*! autoprefixer: no */
    background: -moz-linear-gradient(top, #f5f6f7, #fbfbfc);
    background: -o-linear-gradient(top, #f5f6f7, #fbfbfc);
    background: linear-gradient(top, #f5f6f7, #fbfbfc);
}
// 应用列表
.personal-apply-wrap{
    width: 100%;
    height:auto
}
.personal-apply-lists{
    width: 6.9rem;
    margin: 0 auto;
    .personal-apply-item{
        width: 100%;
        height: 0.3rem;
        padding: 0.3rem 0;
        border-bottom: 0.01rem solid #e5e5e5;
        .item-icon{
            width: 0.3rem;
            height: 0.3rem;
            float: left;
            margin-left: 0.03rem;
            img{
                height: 100%;
                width: 100%;
                display: block;
                font-size: 0
            }
        }
        .item-name{
            font-size: 0.3rem;
            color: #333333;
            line-height: 0.3rem;
            float: left;
            margin-left: 0.2rem
        }
        .item-enter-icon{
            width: 0.19rem;
            height: 0.19rem;
            float: right;
            border: 0.02rem solid #333333;
            border-left-color: transparent;
            border-bottom-color: transparent;
            display: block;
            transform: rotate(45deg);
            position: relative;
            top: 0.04rem;
            left: -0.08rem;
        }
    }
}
</style>
