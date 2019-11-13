<template>
    <div class="myhome" :style="{'min-height':countHeight+'px'}">
        <div class="userinfo">
            <div class="logourl">
                <img :src="userData.userLogo ? userData.userLogo : 'http://img01.fabric.cn/guideimg/app_def.png'" alt="" class="img">
            </div>
            <p class="username" v-if="isLogin">{{userData.custName}}</p>
            <p class="roleNames" v-if="isLogin&&roleNames || roleNames&&roleNames =='商户' || roleNames&&roleNames =='买手'">{{roleNames}}</p>
            <p class="roleNames" v-if="!isLogin" @click.stop="goToLogin">点击登录</p>
        </div>
        <div class="myorder" v-if="isLogin">
            <div class="allorder">
                <span class="title">我的订单</span>
                <div class="check-allorder" @click.stop="goToMyOrder(0)">
                    <p class="allorder">查看全部订单</p>
                    <p class="nextIcon"></p>
                </div>
            </div>
            <div class="select-check-order">
                <div class="check-order-item" @click.stop="goToMyOrder(1)">
                    <div class="icon">
                        <img :src="require('../../../../../static/img/defuk.png')" alt="">
                    </div>
                    <p class="text">待付款</p>
                </div>
                <div class="check-order-item" @click.stop="goToMyOrder(2)">
                    <div class="icon">
                        <img :src="require('../../../../../static/img/defah.png')" alt="">
                    </div>
                    <p class="text">待收货</p>
                </div>
                <div class="check-order-item" @click.stop="goToMyOrder(4)">
                    <div class="icon">
                        <img :src="require('../../../../../static/img/finish.png')" alt="">
                    </div>
                    <p class="text">已完成</p>
                </div>
            </div>
        </div>
        <div class="other-list" v-if="isLogin">
            <div class="other-item" @click.stop="goToMywallet">
                <div class="other-item-left">
                    <div class="item-left-icon">
                        <img :src="require('../../../../../static/img/mywallet.png')" alt="" class="img">
                    </div>
                    <p class="item-left-text">我的钱包</p>
                </div>
                <p class="nextIcon">
                </p>
            </div>
            <div class="other-item" @click.stop="ToCooperation">
                <div class="other-item-left">
                    <div class="item-left-icon">
                        <img :src="require('../../../../../static/img/group.png')" alt="" class="img">
                    </div>
                    <p class="item-left-text">我要合作</p>
                </div>
                <p class="nextIcon">
                </p>
            </div>
        </div>
        <div class="user-switch" @click.stop="againLogin" v-if="isLogin">切换账号</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            countHeight:document.documentElement.clientHeight,
            userData:{},
            roleNames:'',
            isLogin:true
        }
    },
    mounted(){
        var userinfo=sessionStorage.getItem('userInfo')
        if (userinfo) {
            this.userData=JSON.parse(userinfo)
            this.roleNames=this.userData.roleNames[0]
        }
        if (sessionStorage.getItem('token')) {
            this.isLogin=true
        }else{
            this.isLogin=false
        }
    },
    methods:{
        goToMyOrder(type){
            this.$router.push({path:'/orderlist'})
            sessionStorage.setItem('orderType',type)
        },
        ToCooperation(){
            window.location.href = 'https://tt.mylmyx.com/group/?system=web#/cooperation'
        },
        goToMywallet(){
            this.$router.push({path:'/mywallet',query:{from:'my'}})
        },
        againLogin(){
            this.$messagebox({//提示框
              title: '确定切换账户吗?',
              message: '切换后需要从新登录',
                showCancelButton: true,
                confirmButtonText:"确定",
                cancelButtonText:"取消"
            }).then(action => {
                if(action == 'confirm'){
                    sessionStorage.removeItem('token')
                    this.$router.push('/mobilelogin')
                }
            })
        },
        goToLogin(){
            this.$router.push('/mobilelogin')
        }
    }
}
</script>
<style lang="less" scoped>
.myhome{
    width: 7.5rem;
    background-color: #fff;
    margin: auto;
    font-size: 0.32rem;
    position: relative;
    .img{
        font-size: 0;
        width: 100%;
        height: 100%;
        display: block
    }
    .nextIcon{
        width: 0.3rem;
        height: 0.3rem;
        background: url('../../../../../static/img/right.png') no-repeat;
        background-size: cover;
    }
    .userinfo{
        width: 100%;
        height: 4rem;
        background: url('../../../../../static/img/mybg.png') no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 0.2rem solid #F4F4F4;
        .logourl{
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 0.9rem;
            margin-top: 0.4rem;
            margin-bottom: 0.2rem;
            overflow: hidden;
        }
        .username{
            font-size: 0.36rem;
            font-weight: 500;
            line-height: 0.6rem;
        }
        .roleNames{
            height: 0.36rem;
            line-height: 0.36rem;
            padding: 0 0.1rem;
            background-color: #fff;
            font-size: 0.28rem;
            text-align: center;
            border-radius: 0.18rem;
            min-width: 1rem;
        }
    }

    .myorder{
        width: 6.9rem;
        padding: 0 0.3rem;
        border-bottom: 0.2rem solid #F4F4F4;
        .allorder{
            width: 100%;
            height: 0.5rem;
            display: flex;
            padding: 0.3rem 0;
            justify-content: space-between;
            align-items: center;
            .title{
                font-size: 0.32rem;
                color: #333333;
            }
            .check-allorder{
                font-size: 0.28rem;
                color: #999999;
                display: flex;
                align-items: center;
                .allorder{
                    margin-right: 0.1rem;
                }

            }
        }
        .select-check-order{
            width: 100%;
            height: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .check-order-item{
                width: 33.33%;
                height: 1.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 0.28rem;
                .icon{
                    width: 0.52rem;
                    height: 0.52rem;
                    margin-bottom: 0.14rem;
                    margin-top: 0.14rem;
                    img{
                        width: 100%;
                        height: 100%;
                        font-size: 0;
                        display: block;
                    }
                }
            }
        }

    }
    .other-list{
        width: 7.5rem;
        font-size: 0.32rem;
        height: 3rem;
        .other-item{
            width: 6.9rem;
            height: 1rem;
            padding: 0 0.3rem;
            border-bottom: 1px solid #F4F4F4;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.32rem;
            .other-item-left{
                display: flex;
                align-items: center;
                height: 1rem;
            }
            .item-left-icon{
                width: 0.44rem;
                height: 0.44rem;
                margin-right: 0.25rem;
            }
        }
    }
    .user-switch{
        width: 5.38rem;
        height: 0.68rem;
        background:linear-gradient(94deg,rgba(248,90,76,1) 0%,rgba(215,48,54,1) 100%);
        border-radius:10px;
        margin: auto;
        text-align: center;
        line-height: 0.68rem;
        color: #ffffff;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 1.2rem;
    }

}
</style>
