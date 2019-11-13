<template>
    <div class="shopping-cart-wrap" :style="{height:clientHeight+'px'}">
        <div class="shopping-cart-title">
            <h2 class="cart-title-left">购物车</h2>
            <p class="cart-title-right" @click="isMange">{{isShowManage ? '完成' : '管理'}}</p>
        </div>
        <div class="shopping-cart-goods-lists-wrap">
            <div class="shopping-cart-goods-lists" v-if="sellerGoodsStatus==2" v-for="item in sellerGoods" :key="item.sellerId">
                <div class="shopping-cart-goods-item" v-for="arritem in item.cartList" :key="arritem.cartId" @click="goToGoodsDetail(arritem.goodsId)">
                    <div class="cart-goods-content">
                        <div class="cart-goods-sign" :class="$store.getters.goodsCheck[arritem.goodsdId]==1 ? 'ischecked': ''" @click.stop="isShowChecked(arritem.goodsdId,arritem.cartId)">
                            √
                        </div>
                        <div class="cart-goods-img">
                            <img v-lazy="arritem.imageDefault" alt="">
                        </div>
                        <div class="cart-goods-detail">
                            <div class="cart-goods-name">
                                <p>{{arritem.name}}</p>
                            </div>
                            <div class="cart-goods-classify">
                                <span v-for="(specitem,index) in arritem.others.specList" :key="index">{{specitem.name}}:{{specitem.value}}</span>

                            </div>
                            <div class="cart-goods-price">￥{{arritem.price}}</div>
                        </div>
                        <div class="goods-number-count">
                            <p class="countGoodsNumber" @click.stop="decreaseGoodsNumber(arritem.cartId,arritem.goodsdId)">-</p>
                            <input type="text"  class="countGoodsNumberValue countGoodsNumber" @blur="blurCount" :value="$store.getters.getGoodsNumber[arritem.goodsdId]" :ref="arritem.cartId" readonly>
                            <p class="countGoodsNumber" @click.stop="increaseGoodsNumber(arritem.cartId,arritem.goodsdId)">+</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="noGoodsListsData" v-if="sellerGoodsStatus==1">
            <div class="noGoodsListsData-icon">
                <img src="../../../../../static/img/nogoodsshowimg.png" alt="">
            </div>
            <p class="noGoodsListsData-text">去添加点什么吧</p>
            <div class="to-navigation">
                <div class="to-enshrine" @click="goToCollect">看看收藏</div>
                <div class="to-home" @click="goToHome">进入商城</div>
            </div>
        </div>
        <div class="goods-settle-accounts" v-if="sellerGoodsStatus==2" :style="isMiniprogram ? 'bottom:0;' : 'bottom:1.05rem'">
            <div class="goods-checkall">
                <div class="goods-checkall-sign" @click="isAllShowChecked" :class="$store.getters.getAllChecked==1 ? 'ischecked' :''">√</div>
                <div class="goods-checkall-text">全选</div>
            </div>
            <div class="goodsPriceTotal" v-if="!isShowManage">
                <div class="goodsPriceTotal-btn" @click="settleAccounts">结算</div>
                <div class="goodsPriceTotal-number">￥{{totalMoney}}</div>
                <div class="goodsPriceTotal-title">合计:</div>
            </div>
            <div class="goodsManage" v-if="isShowManage">
                    <div class="clearGoods" @click="clearGoods">
                        <i></i>
                        <span>清空</span>
                    </div>
                    <div class="deleteGoods" @click="clearGoods">删除</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            clientHeight:0,
            maxGoodsNumber:100,
            minGoodsNumber:1,
            token:'',
            sellerGoods:null,
            totalMoney:0,
            isShowManage:false,
            isMiniprogram:false,
            sellerGoodsStatus:0,//地址状态,0是无状态,1是无购物车列表,2是有购物车
        }
    },
    methods:{
        increaseGoodsNumber(cartId,goodsdId){//增加商品数量
            this.$store.commit('addUpdateNum',goodsdId)
            var num =this.$store.getters.getGoodsNumber[goodsdId]
            this.updateNum(cartId,goodsdId,num)
        },
        decreaseGoodsNumber(cartId,goodsdId){//减少商品数量

           this.$store.commit('decreaseUpdateNum',goodsdId)
           var num =this.$store.getters.getGoodsNumber[goodsdId]
           this.updateNum(cartId,goodsdId,num)
        },
        blurCount(){//监听商品数量
            if (this.goodsNumber=='') {
                this.goodsNumber=1
            }
        },
        getGoodsList(){//获取商品列表
            this.GLOBAL.orderPost(
                '/cart/listGoods',
                {}
            )
            .then(res=>{
                if(res.data.code==200){
                    if (res.data.msg=='购物车信息为空') {
                        this.sellerGoods=null
                        this.sellerGoodsStatus=1
                        this.$store.commit('addToCart',[])
                    }else{
                        this.sellerGoods=res.data.data.sellerGoods
                        this.totalMoney=res.data.data.totalMoney
                        this.$store.commit('addToCart',this.sellerGoods)
                        this.sellerGoodsStatus=2
                    }
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("获取购物车商品失败,请返回重试");
            })
        },
        updateNum(cartId,goodsdId,num){//更新商品数量
            this.GLOBAL.orderPost(
                '/cart/updateNum',
                {
                    cartId:cartId,
                    goodsdId:goodsdId,
                    num:num,
                }
            )
            .then(res=>{
                if(res.data.code==200){
                    this.getTotalMoney()
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("更新商品数量失败");
            })
        },
        isShowChecked(goodsdId,cartId){//选择结算商品
           this.$store.commit('getIsCheck',goodsdId)
           var checked =this.$store.getters.goodsCheck[goodsdId]
            this.GLOBAL.orderPost(
                '/cart/checkCroduct',
                {
                    cartId:cartId,
                    checked:checked
                }
            )
            .then(res=>{
                if(res.data.code==200){
                    this.getTotalMoney()
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("选择结算商品失败,请重新选择");
            })

        },
        isAllShowChecked(){//全部选择商品
            var allchecked=0
            if (this.$store.getters.getAllChecked==0) {
                allchecked=1
            }else{
                allchecked=0
            }
            this.$store.commit('changeAllChecked',allchecked)
            var cartIds=[]
            for (var i = 0; i < this.sellerGoods.length; i++) {
                for (var j = 0; j < this.sellerGoods[i].cartList.length; j++) {
                    cartIds.push(this.sellerGoods[i].cartList[j].cartId)
                }
            }
            this.axios({
                method:"post",
                url:this.GLOBAL.orderHost+'/cart/checkAll?token='+this.GLOBAL.token+'&cartIds='+cartIds+'&checked='+allchecked
            })
            .then(res=>{
                if(res.data.code==200){
                    this.getTotalMoney()
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("选择全部商品失败,请重试");
            })
        },
        getTotalMoney(){//选择商品计算总金额
            this.GLOBAL.orderPost(
                '/cart/getTotal',
                {

                }
            )
            .then(res=>{
                if(res.data.code==200){
                    this.totalMoney=res.data.data.total
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("计算商品总金额失败,请重新选择");
            })
        },
        isMange(){//是否显示设置管理
            if (this.isShowManage==true) {

                this.isShowManage=false
            }else{
                this.isShowManage=true
            }
        },
        clearGoods(){//删除购物车商品
            var clearGoods=this.$store.getters.getClearGoods
            if (!clearGoods.length) {
                this.$toast.bottom("请选择删除商品");
            }else{
                this.GLOBAL.orderPost(
                    '/cart/clean',
                    {
                        cartIds:clearGoods.join()
                    }
                )
                .then(res=>{
                    if (res.data.code==200) {
                        this.getGoodsList()
                    }else{
                        this.$toast.bottom(res.data.msg);
                    }
                }).catch(()=>{
                    this.$toast.bottom("删除失败");
                })
            }
        },
        settleAccounts(){//结算
            var selectedGoods=this.$store.getters.getClearGoods
            if (!selectedGoods.length) {
                this.$toast.bottom("暂未选择商品哦~~");
            }else{
                this.$router.push('/order/createorder')
            }
        },
        goToHome(){//去到商城首页
            this.$router.replace('/home')
        },
        goToCollect(){//去到收藏
            this.$toast.center("请下载立马有喜APP,体验更多功能福利");
        },
        goToGoodsDetail (goodsId){//点击商品进入商品详情页
            this.$router.push({path:'/goodsdetail',query:{
                goodsId:goodsId
            }})
        }

    },
    watch:{
        goodsNumber(){//监听判读输入数
            if (!/^[+]{0,1}(\d+)$/.test(this.goodsNumber)) {
                this.goodsNumber=''
            }
        }
    },
    mounted(){
        this.token=localStorage.getItem('_token_')
        var height = document.documentElement.clientHeight;
        this.clientHeight=height;
        this.getGoodsList()
        this.$wx.miniProgram.getEnv(res => {
          if (res.miniprogram) {
            //小程序环境
            this.isMiniprogram=true
          } else {
            this.isMiniprogram=false
          }
        });
    }
}
</script>
<style lang="less" scoped>

.shopping-cart-wrap{
    width: 7.5rem;
    margin: 0 auto;
    position: relative;
    font-size: 0.3rem;
    background-color: #F3F3F3;
    //padding: 0.9rem 0 0 0;
}
.shopping-cart-title{
    width: 7rem;
    padding: 0 0.25rem;
    margin: 0 auto;
    font-size: 0.32rem;
    color: #4A515E;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 5;
    .cart-title-left{
        height: 0.9rem;
        line-height: 0.9rem;
        font-size: 0.36rem;
        font-weight: 500
    }
    .cart-title-right{
        height: 0.9rem;
        line-height: 0.9rem;
    }
}
.shopping-cart-goods-lists-wrap{
    padding: 0.9rem 0 2.1rem 0;
}
.shopping-cart-goods-item{
    margin-top: 0.2rem;
    background-color: #ffffff
}
.cart-goods-content{
    width: 7rem;
    height: 2.29rem;
    margin: 0 auto;
    display: flex;
    position: relative;
    .cart-goods-sign{
        width:0.4rem;
        height:0.4rem;
        border:0.02rem solid #999999;
        border-radius:50%;
        text-align: center;
        line-height: 0.4rem;
        color: #fff;
        margin-top: 0.8rem;
        box-sizing: border-box;

    }
    .ischecked{
            background-color: #FF4141;
            border: none
        }
    .cart-goods-img{
        width: 1.7rem;
        height: 1.7rem;
        margin: 0.28rem 0.2rem 0.31rem 0.32rem;
        img{
            width: 100%;
            height: 100%;
            font-size: 0;
            display: block;
        }
    }
    .cart-goods-detail{
        width: 3.5rem;
        height: 1.7rem;
        margin-top: 0.28rem;
        .cart-goods-name{
            p{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #6D6D6D;
                font-size: 0.28rem;
                line-height: 0.32rem
            }
        }
        .cart-goods-classify{
            font-size: 0.24rem;
            line-height: 0.3rem;
            color: #CACACA;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 0.2rem
        }
        .cart-goods-price{
            margin-top: 0.6rem;
            font-size: 0.30rem;
            color: #F96633
        }
    }
    .goods-number-count{
        width: 1.85rem;
        height: 0.5rem;
        position: absolute;
        bottom:0.36rem;
        right: 0;
        display: flex;
        .countGoodsNumber{
            width: 0.6rem;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            border: 0.01rem solid #D2D2D2;
        }
        .countGoodsNumberValue{
            width: 0.65rem;
            border-left: 0;
            border-right: 0
        }
    }
}
.goods-settle-accounts{
    width:7.5rem;
    height: 1.04rem;
    display: flex;
    border:0.01rem solid #F6F6F6;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    justify-content: space-between;
    background-color: #fff;
    z-index: 5;
    .goods-checkall{
        width: 2rem;
        height: 1.04rem;
        display: flex;
        font-size: 0.29rem;
        color: #999999;

        .goods-checkall-sign{
            width:0.4rem;
            height:0.4rem;
            border:0.02rem solid #A0A0A0;
            border-radius:50%;
            text-align: center;
            line-height: 0.4rem;
            color: #fff;
            margin-left: 0.25rem;
            margin-top: 0.28rem;
            margin-right: 0.2rem
        }
        .ischecked{
            background-color: #FF4141;
            border: none
        }

        .goods-checkall-text{
            line-height: 1.04rem;
        }
    }
    .goodsPriceTotal{
        height: 1.04rem;
        font-size: 0.3rem;
        color: #6D6D6D;
        .goodsPriceTotal-title{
            line-height: 1.04rem;
            margin-right: 0.18rem;
            height:  1.04rem;
            float: right;
        }
        .goodsPriceTotal-number{
            min-width: 1.3rem;
            line-height: 1.04rem;
            height:  1.04rem;
            float: right;
            color: #F96633;
        }
        .goodsPriceTotal-btn{
            width: 2.03rem;
            height: 1.04rem;
            background:linear-gradient(90deg,rgba(244,131,42,1) 0%,rgba(249,102,51,1) 100%);
            color: #ffffff;
            font-size: 0.28rem;
            text-align: center;
            float: right;
            line-height: 1.04rem;
            margin-left: 0.1rem
        }
    }
    .goodsManage{
        width: 3.5rem;
        height: 1.04rem;
        line-height: 1.04rem;
        display: flex;
        justify-content: start;
        align-items: center;
        color: #999999;
        font-size: 0.28rem;

        .clearGoods{
            width: 2rem;
            display: flex;
            align-items: center;
            i{
                width: 0.44rem;
                height: 0.44rem;
                display: block;
                background: url('../../../../../static/img/clear.png') no-repeat;
                background-size: cover;

            }
        }
        .deleteGoods{
            width: 0.96rem;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            border: 0.01rem solid #F23030;
            color: #F23030;
            border-radius:0.3rem;
            font-size: 0.28rem
        }

    }
}
.noGoodsListsData{
    width: 5.5rem;
    margin: 0 auto;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    .noGoodsListsData-icon{
        width: 1.8rem;
        height: 1.6rem;
        margin-bottom: 0.35rem;
        img{
            width: 100%;;
            height: 100%;
            display: block;
            font-size: 0
        }
    }
    .noGoodsListsData-text{
        font-size: 0.28rem;
        color: #999999;
        margin-bottom: 1.3rem;
    }
    .to-navigation{
        width: 100%;
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        justify-items: center;
        font-size: 0.3rem;
        color: #999999;
        .to-enshrine{
            width: 2.4rem;
            height: 0.7rem;
            border:1px solid rgba(153,153,153,1);
            border-radius:30px;
            text-align: center;
            line-height: 0.7rem;
            background-color: #fff
        }
        .to-home{
            width: 2.4rem;
            height: 0.7rem;
            border:1px solid rgba(255,65,65,1);
            border-radius:30px;
            text-align: center;
            line-height: 0.7rem;
            background-color: #fff;
            color: #FF4141
        }
    }
}

</style>
