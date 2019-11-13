<template>
    <div class="search-detail-wrap">
        <div class="input">
            <div class="backsearch" @click="goBack"></div>
            <span class="input-icon"></span>
            <input type="text" :placeholder="searchKeyWord" class="input-content" readonly @click="goBack">
        </div>
        <div class="search-goods-wrap">
            <div class="search-goods-title">
                <div class="search-goods-comprehensive search-title" @click="changeTab(1)">
                    <p :class="tabType==1 ? 'active' : ''">综合</p>
                </div>
                <div class="search-goods-price search-title"  @click="changeTab(2)">
                    <p :class="tabType==2 ? 'active' : ''">价格</p>
                    <div class="sort-icon">
                        <div class="sort-top sort " :class="priceSorttype==1 ? 'borderActive':''"></div>
                        <div class="sort-bottom sort" :class="priceSorttype==2 ? 'borderActive':''"></div>
                    </div>
                </div>
                <div class="search-goods-sales search-title"  @click="changeTab(3)">
                    <p :class="tabType==3 ? 'active' : ''">销量</p>
                    <div class="sort-icon">
                        <div class="sort-top sort" :class="numberSort==1 ? 'borderActive':''"></div>
                        <div class="sort-bottom sort" :class="numberSort==2 ? 'borderActive':''"></div>
                    </div>
                </div>
            </div>
            <div class="search-goods-content" :style="{height:(clientHeight/50)-2.02+'rem'}" v-if="searchGoodsListsL.length">
                <scroller  ref="myscroller" :on-refresh="refresh" :on-infinite="infinite" style="height:100%">
                    <div class="search-goods-lists">
                        <div class="guess-like-goods-item" v-for="(item,index) in searchGoodsListsL" :key="index" @click="goToGoodsDetail(item.goodsId)">
                            <a href="javascript:" class="goods-link">
                                <div class="guess-like-goods-img">
                                    <img v-lazy="item.imgSmall" alt="">
                                </div>
                                <div class="guess-like-goods-content">
                                    <div class="guess-like-goods-title">
                                        {{item.goodsName}}
                                    </div>
                                    <div class="guess-like-goods-price">
                                        <span>￥{{item.goodsPrice}}</span>
                                        <p class="guess-like-goods-price-reference">市场参考价￥{{item.marketPrice}}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>

                </scroller>
            </div>
            <div class="noGoodsListsData" v-if="!searchGoodsListsL.length">
                <div class="noGoodsListsData-icon">
                    <img src="../../../../../static/img/nogoodsshowimg.png" alt="">
                </div>
                <p class="noGoodsListsData-text">你还没有相关商品</p>
                <p class="to-navigation">
                    可以去商城逛逛
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchKeyWord:'',//搜索关键字
            searchGoodsListsL:[],//搜索商品列表
            token:'',//用户token
            pageNo:0,//页数
            noDate:false,//没有数据时显示状态
            clientHeight:0,
            tabType:1,//tab切换此时的功能
            priceSorttype:0,//1为从上到下 2 为从下到上
            numberSort:0
        }
    },

    mounted(){
        this.clientHeight=document.documentElement.clientHeight//获取屏幕高度
        sessionStorage.setItem('searchKeyWord',this.$store.getters.backSearchKeyWord)//缓存搜索关键字
        this.searchKeyWord=this.$store.getters.backSearchKeyWord//获取仓库的关键字
        this.getSearchGoodsList()//执行此函数获取搜索打的商品列表
    },
    methods:{
        goBack(){//返回上一页
            this.$router.go(-1)
        },
        refresh(){
         this.pageNo=0;//重置页数刷新每次页数都是第一页
         this.noDate=false;//重置数据判断
          setTimeout(function(){
              this.getSearchGoodsList()
              this.$refs.myscroller.finishPullToRefresh();//刷新完毕关闭刷新的转圈圈
          }.bind(this),1700)
        },
   // 上拉加载
        infinite(done){
            if(!this.noDate){
                setTimeout(() => {
                    this.pageNo++;//下拉一次页数+1
                    this.getSearchGoodsList()//再次请求商品
                    done();//进行下一次加载操作
                }, 1500);
            }else
            {
                this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
            }
        },
        getSearchGoodsList(sort){//获取商品列表函数
                    this.GLOBAL.goodsPost(
                        '/goods/list',
                        {
                            pageNo:this.pageNo,
                            keyword:this.searchKeyWord,
                            sort:sort
                        }
                    )
                    .then(res=>{
                        if (res.data.code==200) {
                            if (res.data.data.code==204) {
                                 this.$toast.center(res.data.msg);
                            }else{
                                if(res.data.data.goodsList.length<20){//当返回length少于20停止请求
                                    this.noDate=true;
                                }else{
                                    this.noDate=false;
                                }
                                    // 判断是下拉刷新还是上拉加载
                                if(this.pageNo==0){
                                    this.searchGoodsListsL = res.data.data.goodsList;
                                }else{
                                    this.searchGoodsListsL=this.searchGoodsListsL.concat(res.data.data.goodsList);
                                }
                            }
                    }else{
                        this.$toast.center(res.data.msg);
                    }

                    }).catch(()=>{
                        this.$toast.center("搜索商品暂时无法请求,请稍后再试");
                    })
        },
        goToGoodsDetail(goodsId){
            this.$router.push({path:'/goodsdetail',query:{
                goodsId:goodsId
            }})
        },
        changeTab(tab){
            this.tabType=tab
            if (tab==1) {
                this.getSearchGoodsList()
            }
            if (tab==2) {
                if (this.priceSorttype==1) {
                    this.priceSorttype=2
                    this.getSearchGoodsList('p_h')
                }else{
                    this.priceSorttype=1
                    this.getSearchGoodsList('p_l')
                }
            }
            if (tab==3) {
                if (this.numberSort==1) {
                    this.numberSort=2
                    this.getSearchGoodsList('s_h')
                }else{
                    this.numberSort=1
                    this.getSearchGoodsList('s_h')
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.active{
    color: #FF060A
}
.search-detail-wrap{
    width: 7.5rem;
    margin: 0 auto;
    height: auto;
    font-size: 0.3rem;
}
.input{
            width: 94%;
            padding: 0 3%;
            height: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.28rem;
            .input-content{
                flex: 1;
                width: 5rem;
                height: 0.6rem;
                padding-left: 1rem;
                background-color: #f2f2f2
            }
            .input-btn{
                width: 1rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
            }
            .input-icon{
                width: 0.44rem;
                height: 0.44rem;
                background: url('/static/img/search.png') no-repeat;
                background-size: cover;
                position: absolute;
                top: 0.3rem;
                left: 1.3rem;;
            }
            .backsearch{
                width: 0.35rem;
                height: 0.35rem;
                border: 0.03rem solid #d6d6d6;
                margin-right: 0.3rem;
                margin-left: 0.1rem;
                transform: rotate(45deg);
                border-top: 0;
                border-right: 0;
            }
}
.search-goods-wrap{
    width: 100%;
    .search-goods-title{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 1rem;
        width: 100%;
        line-height: 1rem;
        border-bottom: 0.01rem solid #f2f2f2;
        text-align: center;
        .search-title{
            flex: 1;
            position: relative;
            .sort-icon{
                position:absolute;
                right: 0.64rem;
                top:0.29rem;
                .sort{
                    width: 0.15rem;
                    height: 0.15rem;
                    border: 0.01rem solid #d6d6d6;
                    transform: rotate(45deg)
                }
                .sort-top{
                    border-right: 0;
                    border-bottom: 0;
                    position: relative;
                    top: 0.1rem
                }
                .sort-bottom{
                    border-left: 0;
                    border-top: 0;
                }
                .borderActive{
                    border-color: #FF060A
                }
            }
        }
    }
    .search-goods-content{
        position: relative;
        width: 100%;
        height: 100%;
        .search-goods-lists{
            width: 94%;
            padding: 0 3%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

        }
        .guess-like-goods-item{
            width:3.45rem;
            height:5rem;
            background-color:rgba(255,255,255,1);
            border-radius:0.06rem;
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
        font-size: 0.3rem;
        color: #030303;
        margin-bottom: 1.3rem;
    }
    .to-navigation{
        width: 100%;
        height: 0.8rem;
        display: flex;
        justify-content: center;
        justify-items: center;
        font-size: 0.28rem;
        color: #999999;

    }
}

</style>
