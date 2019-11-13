<template>
    <div class="guess-like-wrap" v-if="guessLikeData">
        <div class="guess-like-middle">
            <div class="guess-like-title">
                <p class="guess-like-title-text">- 猜你喜欢 -</p>
            </div>
            <div class="guess-like-goods-wrap" v-for="item in guessLikeData" :key="item.goodsId">
                <div class="guess-like-goods-item" v-for="arritem in item.detail" :key="arritem.goodsId">
                    <a href="javascript:" class="goods-link" @click="goToDetail(arritem.goodsId)">
                        <div class="guess-like-goods-img">
                            <img v-lazy="arritem.goodsImg" alt="">
                        </div>
                        <div class="guess-like-goods-content">
                            <div class="guess-like-goods-title">
                                {{arritem.goodsName}}
                            </div>
                            <div class="guess-like-goods-price">
                                <span>￥{{arritem.goodsPrice}}</span>
                                <p class="guess-like-goods-price-reference">市场参考价￥{{arritem.goodsMarketPrice}}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    inject:['reload'],
    data() {
        return {
            guessLikeData:[]
        }
    },
    methods:{
        getLike(){
            this.GLOBAL.crmPost(
                '/temp/index',
                {
                    typeId:901,
                    pageNum:0
                }
            )
            .then((res)=>{
                if (res.data.code==200) {
                    this.guessLikeData=res.data.data
                }else{
                    this.$toast.center(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.center("请求猜你喜欢错误");
            })
        },
        goToDetail(goodsId){
            this.$router.push({path:'/goodsdetail',query:{
                goodsId:goodsId
            }})
            this.reload()//刷新当前页面
        }
    },
    mounted(){
        this.getLike()
    }
}
</script>
<style lang="less" scoped>
.guess-like-wrap{
    width: 100%;
    height: auto;
    background-color: #F3F3F3;
    .guess-like-middle{
        width: 7.1rem;
        margin: 0 auto;
    }
    .guess-like-title{
        text-align: center;
        font-size: 0.32rem;
        height: 0.5rem;
        padding-top:0.3rem
    }
    .guess-like-goods-wrap{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .guess-like-goods-item{
            width:3.45rem;
            height:5rem;
            background-color:rgba(255,255,255,1);
            border-radius:0.06rem;
            margin-bottom: 0.1rem;
            .goods-link{
                display: block;
                width: 100%;
                height: 100%;
            }
            .guess-like-goods-img{
                width: 100%;
                height: 3.45rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .guess-like-goods-content{
                margin-left: 0.15rem;
                width: 3rem;
                .guess-like-goods-title{
                    font-size: 0.24rem;
                    color: #6A6A6A;
                    line-height: 0.42rem;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    height: 0.84rem;
                }
                .guess-like-goods-price{
                    display: flex;
                    color: #F96633;
                    font-size: 0.3rem;
                    padding-top: 0.28rem;
                    .guess-like-goods-price-reference{
                        font-size: 0.2rem;
                        color: #999999;
                        margin-left: 0.05rem;;
                        line-height: 0.3rem
                    }
                }
            }
        }
    }
}
</style>
