<template>
    <div class="goods-wrap small-model clear" ref="goodsWrap">
        <div class="goods-item" v-for="(item,index) in goodsLists" :key="index">
            <div @click="goToDetail(item.goodsId)">
                <div class="goods-item-pic" :style="{height:picBoxHeight+'px'}">
                    <div class="goods-img-wrap" :style="isFillType()">
                        <img v-lazy="item.goodsImg" alt="">
                    </div>
                    <div class="goods-discount-wrap clear" v-if="false">
                        <span class="discount-title" v-if="goodsStyle==1">限时折扣</span>
                        <div class="discount-countDown">
                            <p class="countDown-text">就结束仅剩</p>
                            <div class="countDown-time" v-if="goodsStyle==1">00时00分00秒</div>
                            <div class="countDown-time" v-if="goodsStyle==2">00:00:00</div>
                        </div>
                    </div>
                </div>
                <div class="goods-item-parms">
                    <div class="goods-title">
                        {{item.goodsName}}
                    </div>
                    <p class="goods-detail" v-if="false">次数显示商品描述</p>
                    <div class="goods-price">
                        <p class="goods-price-hint">市场参考价￥{{item.goodsMarketPrice}}</p>
                        <p class="nowPrice">
                            ￥{{item.goodsPrice}}
                        </p>
                    </div>
                </div>
                <div class="buy-btn" v-if="goodsCartType==1">
                    <img class="icon" v-lazy="goodsData.goodsCartImg">
                </div>
                <div class="goods-mark" v-if="goodsAngleType==1">
                    <img v-lazy="goodsData.goodsAngleImg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        goodsData:{
            type:Object
        }
    },
    data() {
        return {
            goodsLists:this.goodsData.detail,
            picBoxHeight:0,//图片展示盒子的高度
            showScale:0,//判断显示比例0是1:1,1是3:2
            GoodsImgFillType:1,//填充方式0:表示填充,1表示留白
            goodsStyle:3,//主题显示的类型.1是大图显示
            goodsCartType:0,//购物车图标显示
            goodsAngleType:0
        }
    },
    mounted(){
        this.countPicBoxHeight()
    },
    methods:{
        countPicBoxHeight(){//判断显示比例0是1:1,1是3:2,调整盒子高度
            var w=this.$refs.goodsWrap.clientWidth

            if (this.goodsStyle==1) {
                if (this.showScale==0) {//1:1比例显示
                    this.picBoxHeight=w
                }else{
                    this.picBoxHeight=w*(2/3)
                }
            }else if(this.goodsStyle==2){
                this.picBoxHeight=w*0.5
            }else if (this.goodsStyle==3) {
                this.picBoxHeight=w*0.315
            }

        },
        isFillType(){//判断图片展示方式,0是填充,1是留白
            var fillHeight
            var fillWidth
                if (this.GoodsImgFillType==0) {
                    fillHeight=this.picBoxHeight*0.5//留白模式下调整父元素的宽度高度
                    fillWidth=this.picBoxHeight*0.5
                }
            return `height:${fillHeight}px;width:${fillWidth}px`
        },
        goToDetail(goodsId){
            this.$router.push({path:'/goodsdetail',query:{
                goodsId:goodsId
            }})
        }
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
// ====================
    .goods-wrap{
        width: 96%;
        margin: 0 auto;
        font-size: 0.24rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;

    }
    .big-model{//大图模式
        .goods-item{
            width: 100%;
            a{
                display: block;
                width: 100%;
                position: relative;
            }
        }
        .goods-item-pic{
            width: 100%;
            position: relative;
        }
        .goods-img-wrap{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            img{
                width:100%;
                height: 100%
            }
        }
        .goods-discount-wrap{//折扣盒子
            width: 100%;
            height: 40px;
            line-height: 40px;
            background-color: #cf3327;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
            color: #ffffff;
            .discount-title{
                float: left;
                margin-left: 0.2rem;
                font-size: 0.4rem;
                font-weight: 900
            }
            .discount-countDown{
                float: right;
                margin-right: 0.2rem;
                height: 40px;
                .countDown-text{
                    color:#999999;
                    font-size: 0.24rem;
                    line-height: 0.24rem;
                    margin-top: 0.05rem
                }
                .countDown-time{
                    font-size: 0.24rem;
                    line-height: 0.24rem;
                    margin-top: 0.2rem
                }
            }
        }
        .goods-item-parms{//商品参数外层盒子
            margin: 0.1rem;
            position: relative;
            overflow: hidden;
            .goods-title{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                line-clamp: 1;
                line-height: 0.32rem;
                color: #333333;
                font-size: 0.3rem;
                max-height: 0.64rem;
            }
            .goods-detail{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                line-height: 0.3rem
            }
            .goods-price-hint{
                font-size: 0.2rem
            }
            .nowPrice{
                font-size: 0.32rem;
                color: #cf3327;
                margin: 0.1rem 0
            }

        }
        .buy-btn{
                width: 0.5rem;
                height: 0.5rem;
                position: absolute;
                bottom: 0;
                right: 0.2rem;
                img{
                    width: 100%;
                    height:100%
                }
        }
        .goods-mark{
                position: absolute;
                top: 0.2rem;
                left: 0.2rem;
        }
    }
    .small-model{
        .goods-item{
            width: 31.5%;
            margin-right: 0.06rem;
            margin-left: 0.06rem;
            margin-bottom: 0.15rem;
            a{
                display: block;
                width: 100%;
                position: relative;
                margin: 0.03rem
            }
        }
        .goods-item-pic{
            width: 100%;
            position: relative;
        }
        .goods-img-wrap{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            img{
                width:100%;
                height: 100%
            }
        }
        .goods-discount-wrap{//折扣盒子
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            background-color: #cf3327;
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 1;
            color: #ffffff;
            .discount-countDown{
                display: flex;
                justify-content: space-between;
                height: 0.6rem;
                .countDown-text{
                    color:#999999;
                    font-size: 0.24rem;
                    line-height: 0.6rem;
                    margin-left: 0.2rem
                }
                .countDown-time{
                    font-size: 0.24rem;
                    line-height: 0.6rem;
                    margin-right: 0.2rem
                }
            }
        }
        .goods-item-parms{//商品参数外层盒子
            margin: 0.1rem;
            position: relative;
            overflow: hidden;
            .goods-title{
                -webkit-line-clamp: 1;
                line-height: 0.32rem;
                font-size: 0.24rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-clamp: 1;
                color: #333333;
            }
            .goods-detail{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                line-height: 0.3rem
            }
            .goods-price-hint{
                font-size: 0.2rem;
                line-height: 0.32rem;
                color: #999999;
            }
            .nowPrice{
                font-size: 0.3rem;
                color: #cf3327;
                margin: 0.1rem 0
            }
        }
        .buy-btn{
                width: 0.5rem;
                height: 0.5rem;
                position: absolute;
                bottom: 0;
                right: 0.2rem;
                img{
                    width: 100%;
                    height:100%
                }
        }
        .goods-mark{
                position: absolute;
                top: 0.2rem;
                left: 0.2rem;
        }
    }
</style>
