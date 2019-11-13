<template>
    <div class="goods-detail-wrap" :style="{'min-height':clientHeight+'px'}">
        <!-- 轮播图 -->
        <div class="goodsSwiper-wrap">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div v-for="(item,index) in imgList" class="swiper-slide" :key="index">
                        <img class="img" v-lazy="item.imgUrl" style="width:100%">
                    </div>
                </div>
            </div>
            <p class="label"><span>{{swiperIndex}}</span>/<span>{{imgList ? imgList.length : swiperIndex}}</span> </p>
        </div>
        <!-- 商品描述 -->
        <div class="goods-presentation-wrap" v-if="goodsInfo">
            <div class="goods-title">
                <p class="goods-title-content">{{goodsInfo.goodsName}}</p>
            </div>
            <div class="goods-price">
                <span class="price-icon">￥</span>
                <p class="price-number">{{goodsInfo.goodsPrice}}</p>
                <span class="price-text">市场参考价￥{{goodsInfo.marketPrice}}</span>
            </div>
            <div class="goods-option">
                <div class="goods-params option-item-border" @click="openGoodsParams">
                    <div class="goods-params-title option">参数</div>
                    <p>查看商品参数</p>
                    <p class="nextIocn"></p>
                </div>
            </div>
        </div>
        <!-- 商品详情 -->
        <div class="goods-detail" v-if="goodsInfo">
            <div class="goods-detail-title">
                <p class="detail-title-content">产品详情</p>
                <span class="line-left"></span>
                <span class="line-right"></span>
            </div>
            <div class="goods-detail-main">
                <div :class="goodsInfo ? 'goods-detail-pic' : ''" v-html="goodsInfo.goodsDescMobile" v-if="goodsInfo">
                </div>
            </div>
        </div>
        <!-- 商品参数 -->
        <mt-popup
            v-model="isShowGoodsParams"
            position="bottom">
            <div class="goods-params-lists" v-if="isShowGoodsParams" @touchmove.prevent>
            <div class="goods-params-lists-title">
                产品参数
            </div>
                <scroller  ref="myscroller" style="height:100%">
                    <div class="goods-params-lists-content" >
                        <div class="goods-params-lists-item" v-for="item in attrList" :key="item.attrId">
                            <h3 class="params-name">{{item.attrName}}</h3>
                            <p class="params-content">{{item.attrValue}}</p>
                        </div>
                        </div>
                </scroller>
            <div class="params-confirm" @click="paramsConfirm">确定</div>
        </div>
        </mt-popup>
    </div>
</template>
<script>
import Swiper from 'swiper'
import Vue from 'vue'
export default {
    data() {
        return {
            clientHeight:document.documentElement.clientHeight,
            goodsNumber:1,//商品数量
            isShowGoodsParams:false,//显示商品参数界面
            attrList:null,//规格列表
            detList:null,//detList商品规格信息
            detListName:null,
            imgList:null,
            goodsInfo:null,
            activeIndex:100,
            goodsId:this.$route.query.goodsId,
            colorLists:{},
            sizeLists:{},
            sizeActiveIndex:100,
            swiperIndex:1,//切换到当前轮播图的index
        }
    },
    methods:{
        paramsConfirm(){//点击确定关闭参数界面
            this.isShowGoodsParams=false
        },
        openGoodsParams(){//打开商品参数界面
            this.isShowGoodsParams=true
        },
        getGoodsInfo(goodsId){//获取商品信息
            this.GLOBAL.goodsPost(
                '/goods/info',
                {
                    goodsId:goodsId
                }
            )
            .then((res)=>{
                if (res.data.code==200) {
                    var data=res.data.data;
                    this.attrList=data.attrList
                    this.detList=data.detList
                    this.detListName=data.detListName
                    this.imgList=data.imgList
                    this.goodsInfo=data.goodsInfo
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("获取失败");
            })
        },
        goBack(){
            if (sessionStorage.getItem('UA')=='wxpay') {
                WeixinJSBridge.call('closeWindow');
            }else{
                window.AlipayJSBridge.call('closeWebview')
            }
        },
    },
    mounted(){
        var _this=this
         new Swiper('.swiper-container',{
             on:{
                    slideChange: function () {
                            // 切换结束时，告诉我现在是第几个slide
                            _this.swiperIndex=this.activeIndex+1

                            //console.log( this.activeIndex)
                    }
                },
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        })
        //this.checkCollect()检查是否收藏此商品
        if (window.history && window.history.pushState) {//判断物理返回
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);

        }
    },
    created(){
        var goodsId =this.goodsId
        this.getGoodsInfo(this.goodsId)
    },
    beforeDestroy(){
        window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
    }
}
</script>
<style lang="less" scoped>


.goods-detail-wrap{
    width: 7.5rem;
    margin: 0 auto;
    height: auto;
    position: relative;
    font-size: 0.24rem;
    padding-bottom: 1.16rem
}
.goodsSwiper-wrap{
    width: 100%;
    position: relative;
}
.swiper-slide{
    height: 7.5rem;
}
.go-back{
    width: 0.65rem;
    height: 0.65rem;
    position: fixed;
    top: 0.26rem;
    left: 0.26rem;
    z-index: 2;
    .backIcon{
        width: 100%;
        height: 100%;
        display: block;
        font-size: 0
    }
}


.label{
    width: 0.9rem;
    height: 0.4rem;
    background:rgba(0,0,0,1);
    opacity:0.6;
    border-radius:20px;
    font-size: 0.3rem;
    position: absolute;
    bottom: 0.18rem;
    right: 0.26rem;
    z-index: 2;
    color: #ffffff;
    text-align: center;
    line-height: 0.4rem;
}
.goods-presentation-wrap{
    width: 7rem;
    margin: 0 auto;
    padding: 0.3rem 0
}
.goods-title-content{
    font-size: 0.32rem;
    color: #6D6D6D;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    line-height: 0.36rem;
    max-height: 0.72rem;
}
.goods-price{
    font-size: 0.36rem;
    color: #F96633;
    display: flex;
    padding: 0.2rem 0;
    .price-icon{
        margin-right: 0.05rem
    }
    .price-text{
        font-size: 0.24rem;
        color: #6D6D6D;
        line-height: 0.32rem;
        margin-left: 0.17rem
    }
}
.goods-option{
    padding: 0.15rem 0.05rem;
    color: #999999;

    .option-item-border{
        display: flex;
        line-height: 0.8rem;
        border-bottom: 0.01rem solid #F2F2F3;
        position: relative;
    }
    .option{
        margin-right: 0.15rem;
    }
    .nextIocn{
        display: block;
        width: 0.2rem;
        height: 0.2rem;
        border: 0.01rem solid #999999;
        transform:rotate(-45deg);
        -ms-transform:rotate(-45deg); 	/* IE 9 */
        -moz-transform:rotate(-45deg); 	/* Firefox */
        -webkit-transform:rotate(-45deg); /* Safari 和 Chrome */
        -o-transform:rotate(-45deg); 	/* Opera */
        border-left: 0;
        border-top: 0;
        position: absolute;
        top: 0.3rem;
        right: 0.3rem
    }
}
.goods-detail-title{
    width: 100%;
    height: 1.2rem;
    position: relative;
    .detail-title-content{
        width: 100%;
        height:1.2rem;
        line-height: 1.2rem;
        font-size: 0.27rem;
        background-color: #F3F3F3;
        text-align: center;
        color: #999999
    }
    .line-left{
        height: 0;
        width: 2.6rem;
        border-top: 0.01rem solid #D2D2D2;
        position: absolute;
        top: 0.59rem;
        left: 0.29rem
    }
    .line-right{
        height: 0;
        width: 2.6rem;
        border-top: 0.01rem solid #D2D2D2;
        position: absolute;
        top: 0.59rem;
        right: 0.29rem
    }
}
.swiper-slide{
    img{
        width: 100%;
        height: 100%;
        font-size: 0;
        display: block
    }
}
.goods-params-lists{
    width: 7rem;
    padding: 0.25rem;
    height: 9rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    z-index: 11;
    color: #6D6D6D;
    font-size: 0.28rem;
    overflow: hidden;
    .goods-params-lists-title{
        font-size: 0.32rem;
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #ffffff;
        z-index: 100;

    }
    .goods-params-lists-content{
        width: 100%;
        height: auto;
        margin-top: 1rem;
        .goods-params-lists-item{
            display: flex;
            height: 1rem;
            border-bottom: 0.01rem solid #F6F6F6;
            .params-name{
                width: 2.4rem;
                height: 1rem;
                line-height: 1rem;
                margin-left:0.5rem
            }
            .params-content{
                flex: 1;
                width: 100%;
                height: 1rem;
                line-height: 1rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
}
.params-confirm{//公用的确定按钮
        width: 100%;
        height: 1rem;
        background: url('../../../static/img/comfirm.png') no-repeat;
        background-size: cover;
        text-align: center;
        line-height: 1rem;
        font-size: 0.32rem;
        color: #ffffff;
        position: absolute;
        left: 0;
        bottom: 0;
}

</style>
<style lang="less">
    .goods-detail-pic{
    width: 100%;
    p{
        width: 100%;
        img{
            width: 100%
        }
    }
}
</style>
