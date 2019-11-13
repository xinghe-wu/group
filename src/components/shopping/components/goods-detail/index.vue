<template>
    <div class="goods-detail-wrap" v-if="goodsInfo">
         <div class="go-back" @click="gobackHome">
            <img src="../../../../../static/img/back.png" alt="" class="backIcon">
        </div>
        <!-- 轮播图 -->
        <div class="goodsSwiper-wrap">
            <div class="swiper-container swiper-wrap">
                <div class="swiper-wrapper">
                    <div v-for="(item,index) in imgList" class="swiper-slide" :key="index">
                        <img class="img" v-lazy="item.imgUrl" style="width:100%">
                    </div>
                </div>
            </div>
            <p class="label"><span>{{swiperIndex}}</span>/<span>{{imgList ? imgList.length : swiperIndex}}</span> </p>
        </div>
        <!-- 商品描述 -->
        <div class="goods-presentation-wrap">
            <div class="goods-title">
                <p class="goods-title-content">{{goodsInfo.goodsName}}</p>
            </div>
            <div class="goods-price">
                <span class="price-icon">￥</span>
                <p class="price-number">{{selectGoodsPrice ?selectGoodsPrice : goodsInfo.goodsPrice}}</p>
                <span class="price-text">市场参考价￥{{goodsInfo.marketPrice}}</span>
            </div>
            <div class="goods-option">
                <div class="goods-standard option-item-border" @click="ShowSelectGoods" v-if="detListName.length>0">
                    <div class="goods-standard-title option">规格</div>
                    <p>{{selectValue ? `已选:"${selectValue}"` :'请选择商品规格'}}</p>
                    <p class="nextIocn"></p>
                </div>
                <div class="goods-params option-item-border" @click="openGoodsParams">
                    <div class="goods-params-title option">参数</div>
                    <p>查看商品参数</p>
                    <p class="nextIocn"></p>
                </div>
                <div class="goods-serve option-item-border" @click="openGoodsServe">
                    <div class="goods-serve-title option">服务</div>
                    <p>极速退货•正品保证•极速退款</p>
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
        <!-- 猜你喜欢 -->
        <GuessLike v-if="goodsInfo"></GuessLike>
        <!-- 黑幕隔层 -->
        <!-- 选择商品界面 -->
        <mt-popup
        v-model="isShowSelectGoods"
        position="bottom" style="width:7.5rem;margin:0 auto;">
            <div class="goods-select-wrap" v-if="isShowSelectGoods" @touchmove.prevent>
            <scroller  ref="myscroller" style="height:100%">
            <div class="goods-select-middle">
                <div class="goods-select">
                    <div class="goods-select-img">
                        <img v-lazy="selectGoodsImgUrl" alt="">
                    </div>
                    <div class="goods-select-classify">
                        <div class="goods-select-price">￥{{selectGoodsPrice ? selectGoodsPrice :goodsInfo.goodsPrice}}</div>
                        <div class="goods-select-inventory">
                            <span>库存: </span>
                            <span>{{maxGoodsNumber ? maxGoodsNumber : goodsInfo.goodsKeQty}}件</span>
                        </div>
                        <div class="goods-select-choose" v-if="detListName.length>0">
                            {{selectValue ? `已选:"${selectValue}"` :'请选择规格'}}
                        </div>
                    </div>
                </div>
                <div v-for="(item,oneIndex) in detListName" :key="oneIndex">
                  <Spec :oneIndex="oneIndex" :specList="item" @onchangeindex="changeIndex"  ref="f"/>
                </div>
                <div class="goods-select-number">
                    <p class="select-number-title">数量</p>
                    <div class="select-number-count">
                        <p class="countGoodsNumber" @click="decreaseGoodsNumber">-</p>
                        <p class="countGoodsNumberValue countGoodsNumber">{{goodsNumber}}</p>
                        <p class="countGoodsNumber" @click="increaseGoodsNumber">+</p>
                    </div>
                </div>
            </div>
            <div class="cancel" @click="closeSelectGoods">
                <img src="../../../../../static/img/cancel.png" alt="">
            </div>
            </scroller>
        </div>
        </mt-popup>

        <!-- 购买悬浮窗 -->
         <div class="goods-purchase-service" v-if="goodsInfo">
                <div class="goods-service">
                    <div class="goods-customer-service goods-service-item" @click.stop="getServiceUrl">
                        <i class="service-icon">
                            <img src="../../../../../static/img/server.png" alt="">
                        </i>
                        <p class="service-text">客服</p>
                    </div>
                    <div class="goods-customer-service goods-service-item" @click.stop="goTocart">
                        <i class="service-icon">
                            <img src="../../../../../static/img/cartactive.png" alt="">
                        </i>
                        <p class="service-text">去购物车</p>
                    </div>
                </div>
                <div class="goods-purchase">
                    <div class="add-shoppingCart" @click="jionShopCart">加入购物车</div>
                    <div class="goods-buy" @click="nowPayment">立即购买</div>
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

        <!-- 基本保障 -->
        <mt-popup
            v-model="isShowGoodsServe"
            position="bottom">
            <div class="goods-serve-lists" v-if="isShowGoodsServe" @touchmove.prevent>
            <div class="goods-serve-lists-title">基本保障</div>
            <div class="goods-serve-lists-content">
                <div class="goods-serve-lists-item">
                    <div class="goods-serve-lists-icon"></div>
                    <div class="goods-serve-content">
                        <p class="goods-serve-sub-title">正品保证</p>
                        <p class="goods-serve-sub-content">正品保证</p>
                    </div>
                </div>
                <div class="goods-serve-lists-item">
                    <div class="goods-serve-lists-icon"></div>
                    <div class="goods-serve-content">
                        <p class="goods-serve-sub-title">七天无理由退换货</p>
                        <p class="goods-serve-sub-content">七天无理由退换货</p>
                    </div>
                </div>
                <div class="goods-serve-lists-item">
                    <div class="goods-serve-lists-icon"></div>
                    <div class="goods-serve-content">
                        <p class="goods-serve-sub-title">极速退货</p>
                        <p class="goods-serve-sub-content">预约后准时上门取件，极速退款到账</p>
                    </div>
                </div>
            </div>
            <div class="params-confirm" @click="serveConfirm">确定</div>
        </div>
        </mt-popup>
    </div>
</template>
<script>
import GuessLike from '../guess-like'
import Spec from '../spec'
export default {
    data() {
        return {
            clientHeight:0,
            goodsNumber:1,//商品数量
            isShowSelectGoods:false,//显示选择商品界面
            isShowGoodsParams:false,//显示商品参数界面
            isShowGoodsServe:false,//显示商品服务界面
            maxGoodsNumber:0,
            minGoodsNumber:1,
            attrList:null,//规格列表
            detList:null,//detList商品规格信息
            detListName:null,
            imgList:null,
            goodsInfo:null,
            selectValue:'',
            selectGoodsId:'',
            activeIndex:100,
            goodsId:this.$route.query.goodsId,
            selectGoodsPrice:0,
            selectGoodsImgUrl:'',
            collectType:0,//是否收藏
            isShowShare:false,//显示分享
            colorLists:{},
            sizeLists:{},
            sizeActiveIndex:100,
            swiperIndex:1,//切换到当前轮播图的index
            swiper:null
        }
    },
    methods:{
        changeIndex(obj,oid) {
            this.$refs.f.forEach((specs,j)=> {
                specs.specList.value.forEach((spec) => {
                    if(oid != j){
                    Vue.set(spec,'gray',0)
                    }
                })
            })
            var idArr = []
            var valueArr=[]
            this.$refs.f.forEach((item) => {
                if(item.selectIndex > -1) {
                    idArr.push(item.specList.value[item.selectIndex].specdId)
                    valueArr.push(item.specList.value[item.selectIndex].specdName)
                }
            })
            idArr = idArr.join(',')
            var _this = this
            this.detList.forEach((det, i) => {
                if(det.contition == idArr){
                    this.selectValue=valueArr.join(',')
                    this.selectGoodsId=det.goodsdId
                    this.selectGoodsPrice=det.price
                    this.maxGoodsNumber=det.store
                    this.selectGoodsImgUrl=det.img
                }else{

                }
                var detArr = det.contition.split(',')
                if(det.store <= 0 && detArr[oid] == obj.specdId) {
                    _this.$refs.f.forEach((specs,j)=> {
                        specs.specList.value.forEach((spec) => {
                            detArr.forEach((id) => {
                                if(spec.specdId == id && spec.specdId != obj.specdId && oid != j) {
                                    Vue.set(spec,'gray',1)
                                }
                            })
                        })
                    })
                }
            })
        },
        ShowSelectGoods(){
            if (!this.isShowSelectGoods) {
                this.isShowSelectGoods=true
                this.selectGoodsImgUrl=this.goodsInfo.imgLarge
            }else{
                this.isShowSelectGoods=false
            }

        },
        gobackHome(){
            if (localStorage.getItem('_url_').indexOf("/goodsdetail")!=-1) {
                WeixinJSBridge.call('closeWindow');
            }else{
                this.$router.go(-1)
            }
        },
        goTocart(){
            this.$router.push('/home/shoppingcart')
        },
        closeSelectGoods(){//关闭
            this.isShowSelectGoods=false;
        },
        paramsConfirm(){//点击确定关闭参数界面
            this.isShowGoodsParams=false
        },
        openGoodsParams(){//打开商品参数界面
            this.isShowGoodsParams=true
        },
        closeBloak(){//点击黑幕退出二层界面
            this.isShowSelectGoods=false
            this.isShowGoodsParams=false
            this.isShowGoodsServe=false
        },
        openGoodsServe(){
            this.isShowGoodsServe=true
        },
        serveConfirm(){
            this.isShowGoodsServe=false
        },
        increaseGoodsNumber(){
            if (this.goodsNumber<this.maxGoodsNumber&&this.goodsNumber>=this.minGoodsNumber) {
                this.goodsNumber++
            }else{
                this.goodsNumber=this.maxGoodsNumber
                this.$toast.bottom("已到最大库存");
            }
        },
        decreaseGoodsNumber(){
            if (this.goodsNumber<=this.maxGoodsNumber&&this.goodsNumber>this.minGoodsNumber) {
                this.goodsNumber--
            }else{
                this.goodsNumber=this.minGoodsNumber

            }
        },
        blurCount(){//监听商品数量
            if (this.goodsNumber=='') {
                this.goodsNumber=1
            }
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
                    this.selectGoodsId=data.goodsdId
                    if (data.detListName && data.detListName.length>1) {
                        this.colorLists=data.detListName[0]
                        this.sizeLists=data.detListName[1]
                    }else if (data.detListName) {
                        this.colorLists=data.detListName[0]
                    }
                    this.detListName=data.detListName
                    this.imgList=data.imgList
                    this.goodsInfo=data.goodsInfo
                    this.maxGoodsNumber=data.goodsInfo.goodsKeQty
                    this.$nextTick(()=>{
                        this.createSwiper()
                    })
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("获取失败");
            })
        },
        jionShopCart(){//加入购物车
            if (!this.isShowSelectGoods) {
                this.ShowSelectGoods()
            }else{
                if (this.detListName.length<=0) {
                    this.selectGoodsPrice=this.goodsInfo.goodsPriceselectValue
                    if (this.goodsNumber) {
                        this.addGoods()
                        this.isShowSelectGoods=false
                    }
                }else{
                    if (!this.selectValue) {
                        this.$toast.bottom('请选择规格')
                    }else{
                        this.addGoods()
                        this.isShowSelectGoods=false
                        this.$toast.bottom("添加至购物车成功噢~~");
                    }
                }
            }
        },
        addGoods(){
            var selectGoodsId=this.selectGoodsId
            this.GLOBAL.orderPost(
                '/cart/addGoods',
                {
                    goodsdId:selectGoodsId,
                    num:this.goodsNumber,
                    showCartData:0,
                }
            )
            .then(res=>{
                if (res.data.code==200) {
                    this.$toast.bottom("添加至购物车成功噢~~");
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("添加失败");
            })
        },
        nowPayment(){
            if (!this.isShowSelectGoods) {
                this.ShowSelectGoods()
            }else{
                if (this.detListName.length<=0) {
                    this.selectGoodsPrice=this.goodsInfo.goodsPrice
                    if (this.goodsNumber) {
                        sessionStorage.setItem('nowPayGoodsId',this.selectGoodsId)
                        sessionStorage.setItem('nowPayGoodsNum',this.goodsNumber)
                        this.isShowSelectGoods=false
                        this.$router.push('/order/createorder')
                    }
                }else{
                    if (!this.selectValue) {
                        this.$toast.bottom('请选择属性')
                    }else{
                        sessionStorage.setItem('nowPayGoodsId',this.selectGoodsId)
                        sessionStorage.setItem('nowPayGoodsNum',this.goodsNumber)
                        this.isShowSelectGoods=false
                        this.$router.push('/order/createorder')
                    }
                }
            }
        },
        checkCollect(){//请求商品是否收藏
            var goodsId =this.goodsId.toString()
            this.GLOBAL.orderPost(
                '/collect/check',
                {
                    goodsId:goodsId
                }
            )
            .then(res=>{
                if (res.data.code==200) {
                    this.collectType=res.data.data.isCollect
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("请求收藏失败");
            })
        },

        getServiceUrl(){
            var goodsId =this.goodsId.toString()
            var goodsName=this.goodsInfo.goodsName
            this.GLOBAL.crmPost(
                '/base/customService',
                {
                    goodsId:goodsId,
                    goodsName:goodsName
                }
            )
            .then(res=>{
                //console.log(res)
                if (res.data.code==200) {
                   window.location.replace(res.data.data.url)

                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("请求客服失败,请重新尝试");
            })
        },
        goBack(){
            if (localStorage.getItem('_url_').indexOf("/goodsdetail")!=-1) {
                WeixinJSBridge.call('closeWindow');
                AlipayJSBridge.call('closeWebview')
            }else{
                this.$router.go(-1)
            }
        },
        createSwiper(){//创建轮播组件
            var _this=this
            this.swiper=new Swiper('.swiper-wrap',{
                on:{
                        slideChange: function () {
                                // 切换结束时，告诉我现在是第几个slide
                                _this.swiperIndex=this.activeIndex+1

                                // console.log( this.activeIndex)
                        }
                    },
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,//修改swiper的父元素时，自动初始化swiper
            })
        },

    },
    mounted(){
        //this.checkCollect()检查是否收藏此商品
        if (window.history && window.history.pushState) {//判断物理返回
                history.pushState(null, null, document.URL);
                window.addEventListener('popstate', this.goBack, false);

        }
    },
    created(){
        var goodsId =this.goodsId
        this.getGoodsInfo(this.goodsId)
        this.token=localStorage.getItem('_token_')

    },
    components:{
        GuessLike,
        Spec
    },
    watch:{
        goodsNumber(){
            if (!/^[+]{0,1}(\d+)$/.test(this.goodsNumber)) {
                this.goodsNumber=''
            }
        },

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

.goods-select-wrap{
    width: 100%;
    min-height: 8rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    padding-bottom: 1.5rem;
    .cancel{
        width: 0.44rem;
        height: 0.44rem;
        position: absolute;
        top:0.3rem;
        right: 0.19rem;
        img{
            width: 100%;
            height: 100;
            display: block;
            font-size:0
        }
    }
    .goods-select-middle{
        width: 6.55rem;
        margin: 0 auto;
        height: 100%;
        padding-top: 0.45rem;
    }
    .goods-select{
        display: flex;
        .goods-select-img{
            width: 2rem;
            height: 2rem;
            margin-right: 0.3rem;
            img{
                width: 100%;
                height: 100%;
                display: block;
                font-size: 0
            }
        }
        .goods-select-classify{
            color: #6d6d6d;
            .goods-select-price{
                font-size: 0.37rem;
                color: #F96633;
                margin-top: 0.54rem;
                margin-bottom: 0.23rem;
            }
            .goods-select-choose{
                margin-top: 0.35rem
            }
        }
    }
    .goods-select-color{
        margin-top: 0.5rem;
        font-size: 0.28rem;
        color: #6D6D6D;
        .select-color-title{
            margin-bottom: 0.3rem;

        }
        .select-color-content{
            display: flex;
            justify-content: start;
            flex-wrap: wrap;
            .select-color-item{
                width: 1.2rem;
                height: 0.6rem;
                text-align: center;
                line-height: 0.6rem;
                border: 0.02rem solid #D2D2D2;
                margin-right: 0.3rem;
                margin-bottom: 0.1rem;
                border-radius: 0.1rem
            }
            .activeIndex{
                color: #F96633;
                border:0.02rem solid #F96633
            }
        }

    }
    .goods-select-number{
        margin-top: 0.65rem;
        font-size: 0.28rem;
        color: #6D6D6D;
        .select-number-title{
            margin-bottom: 0.3rem
        }
        .select-number-count{
            display: flex;
            .countGoodsNumber{
                width: 1rem;
                height: 0.5rem;
                line-height: 0.5rem;
                text-align: center;
                border: 0.01rem solid #D2D2D2;
            }
            .countGoodsNumberValue{
                width: 1.2rem;
                border-left: 0;
                border-right: 0
            }
        }
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
.goods-purchase-service{
        position: fixed;
        bottom: 0rem;
        left: 0;
        width: 7.5rem;
        right: 0;
        margin: 0 auto;
        display: flex;
        height: 1.15rem;
        border-top: 0.01rem solid #D2D2D2;
        z-index: 1000000;
        .goods-service{
            display: flex;
            height: 1.15rem;
            background-color: #ffffff;
            .goods-service-item{
                display: flex;
                flex-direction:column;
                align-items: center;
                width: 1.44rem;
                border-right: 0.01rem solid #F6F6F6;
                .service-icon{
                    width: 0.38rem;
                    height: 0.36rem;
                    margin-top: 0.2rem;
                    margin-bottom: 0.1rem;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        font-size: 0
                    }
                }
            }

        }
        .goods-purchase{
            display: flex;
            text-align: center;
            color: #ffffff;
            font-size: 0.28rem;
            .add-shoppingCart{
                width: 2.3rem;
                height: 1.15rem;
                line-height: 1.15rem;
                background-color: #F4832A
            }
            .goods-buy{
                width: 2.3rem;
                height: 1.15rem;
                line-height: 1.15rem;
                background-color: #F96633
            }
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
        background: url('../../../../../static/img/comfirm.png') no-repeat;
        background-size: cover;
        text-align: center;
        line-height: 1rem;
        font-size: 0.32rem;
        color: #ffffff;
        position: absolute;
        left: 0;
        bottom: 0;
}
.goods-serve-lists{
    width: 6.8rem;
    padding: 0.35rem;
    height: 9rem;
    background-color: #ffffff;
    border-radius: 0.2rem;
    z-index: 11;
    color: #6D6D6D;
    font-size: 0.28rem;
    .goods-serve-lists-title{
        margin: 0.28rem 0 0.6rem;
        font-size: 0.32rem;
        text-align: center;
    }
    .goods-serve-lists-content{
        width: 100%;
        height: auto;
        .goods-serve-lists-item{
            display: flex;
            height: 1rem;
            margin-bottom: 0.3rem;
            .goods-serve-lists-icon{
                width:0.2rem;
                height:0.2rem;
                background-color:#F96633;
                border-radius:50%;
                margin-top: 0.2rem
            }
            .goods-serve-sub-title{
                margin: 0.2rem 0;
                padding-left:0.3rem
            }
            .goods-serve-sub-content{
                width: 6rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                padding-left:0.3rem
            }
        }

    }
}
.share-wrap{
    width: 100%;
    height: auto;
    .share-title{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.3rem;
        text-align: center;
    }
    .share-modle{
        width: 100%;
        padding: 0.1rem 0;
        display: flex;
        justify-content: start;
        align-items: center;
        .share-item{
            width: 25%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            .share-item-img{
                width: 0.6rem;
                height: 0.6rem;
                margin-bottom: 0.15rem;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                    font-size: 0
                }
            }
        }
    }
    .cancelShare{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.3rem;
        text-align: center;
    }
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
