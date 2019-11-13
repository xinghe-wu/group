<template>
    <div class="order-detail-wrap" v-if="orderDetailData">
        <div class="order-status-wrap">
            <div class="order-status">
                <p class="order-status-title">{{orderDetailData.ordStatusStr}}</p>
                <p class="order-status-text">{{orderDetailData.statusShow ? orderDetailData.statusShow : remark}}</p>
            </div>
            <div class="order-address">
                <div class="order-address-icon"></div>
                <div class="order-address-content">
                    <div class="order-userinfo">
                        <span>{{orderDetailData.buyer}}</span>
                        <span>{{orderDetailData.phone}}</span>
                    </div>
                    <div class="order-addressinfo">
                        <span>收货地址:</span>
                        <span>{{orderDetailData.provinceName}}{{orderDetailData.cityName}}{{orderDetailData.areaName}}{{orderDetailData.address}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-detail-goodsinfo" v-for="item in orderDetailData.detList" :key="item.goodsdId">
            <div class="order-goodsinfo" @click="goToGoodsDetail(item.goodsId)">
                <div class="goods-img">
                    <img v-lazy="item.imgSmall" alt="">
                </div>
                <div class="goods-title">{{item.goodsName}}</div>
                <div class="goods-params">
                    <div class="goods-price">￥{{item.goodsPrice}}</div>
                    <div class="goods-number">x{{item.goodsQty}}</div>
                </div>
            </div>
            <div class="join-shopping-cart" style="display:none">
                <p class="join-cart-btn" @click.stop="orderJoinCart(orderDetailData.orderId,item.orderdId)">加入购物车</p>
            </div>
        </div>
        <div class="line"></div>
        <div class="orderinfo-wrap">
            <div class="orderinfo-title">
                <div class="col"></div>
                <div class="orderinfo-title">订单信息</div>
            </div>
            <div class="orderinfo-number">
                <span>订单编号:</span>
                <span>{{orderDetailData.orderId}}</span>
            </div>
            <div class="orderinfo-time">
                <span>下单时间:</span>
                <span>{{orderDetailData.orderDate}}</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="order-amount">
            <div class="goods-total order-amount-item">
                <div class="goods-totol-title">商品总额</div>
                <div class="goods-totol-content">￥{{orderDetailData.goodsAmt}}</div>
            </div>
            <div class="goods-freight order-amount-item">
                <div class="goods-freight-title">运费(快递)</div>
                <div class="goods-freight-content">预计￥{{orderDetailData.carriageAmt}}</div>
            </div>
            <div class="order-total order-amount-item">
                <div class="order-totol-title">订单总额</div>
                <div class="order-totol-content">￥{{orderDetailData.orderAmt}}</div>
            </div>
            <div class="due-amount">
                应付款:￥{{orderDetailData.orderAmt}}
            </div>
        </div>
        <div class="bottom-wrap">
            <div class="cancel-roder item-btn" @click="cancelOrder(orderDetailData.orderId)" v-if="orderDetailData.orderStatus==0||orderDetailData.orderStatus==6">
                取消订单
            </div>
            <div class="cancel-roder item-btn" v-if="orderDetailData.orderStatus==1 || orderDetailData.orderStatus==2 || orderDetailData.orderStatus==3 " @click="deleteOrder(orderDetailData.orderId)">
                删除订单
            </div>
            <div class="cancel-roder item-btn" v-if="orderDetailData.orderStatus==11" @click="yesReceipt(orderDetailData.orderId)">
                确定收货
            </div>
            <!-- <div class="cancel-roder item-btn" v-if="orderDetailData.orderStatus==11">
                查看物流
            </div> -->
            <!-- <div class="cancel-roder item-btn" v-if="orderDetailData.orderStatus==5" @click.stop="refund">
                退款/退货
            </div> -->
            <div class="cancel-roder item-btn" v-if="orderDetailData.orderStatus==90">
                退款已完成
            </div>
             <div class="payment item-btn" v-if="orderDetailData.orderStatus==0||orderDetailData.orderStatus==6" @click="isShowpay">
                付款
            </div>
            <div class="payment item-btn" v-if="orderDetailData.orderStatus==5 && orderDetailData.tranType==1" @click="toUsed">
                去使用
            </div>
        </div>

        <mt-popup
                v-model="isShowPayment"
                position="bottom">
            <div class="payment-wrap" v-if="isShowPayment" ref="payment">
                <div class="payment-title">确认付款</div>
                <div class="payment-sum">￥{{orderDetailData.orderAmt}}</div>
                <div class="payment-account payment-public">
                    <div class="payment-account-title">订单信息</div>
                    <div class="payment-account-text">立马有喜支付</div>
                </div>
                <div class="payment-modle payment-public" @click="ShowPayModle">
                    <div class="payment-modle-title">付款方式</div>
                    <div class="payment-modle-text">{{SelectionModle}}</div>
                    <div class="payment-modle-select"></div>
                </div>
                <div class="close-payment" @click="close"></div>
                <div class="comfirm-payment" @click="PayPassWord">
                    确认付款
                </div>
            </div>
            </mt-popup>

            <vpay ref="pays"
                v-model="isShowPayPassWord"
                style="z-index:10000"
                @input-end="inputEnd"
            ></vpay>

            <mt-popup
            v-model="isShowPayModle"
            style="width:100%"
            position="bottom">
            <div class="pay-modle-wrap">
                <div class="pay-title-wrap">
                    <p class="backPayMent"></p>
                    <p class="pay-title">选择支付方式</p>
                </div>
                <div class="pay-modle-lists">
                    <div class="has-pay-modle" v-if="userAccount">
                        <div class="xidou item-pay-modle" v-for="(item,index) in userAccount" :key="index" @click.stop=" item.aviliable==1  ? selectPayModle(item.payId,item.payName) :''" :class="item.aviliable==0 ? 'cannotSelection' :''" :ref="item.payCode">
                            <div class="xidou-icon">
                                <img v-lazy="item.payIcon" alt="">
                            </div>
                            <div class="xidou-text">{{item.payName}}<span v-if="item.payId==200 || item.payId==4">(剩余:{{item.balance}})</span></div>
                            <div class="recommend" v-if="item.payId==200">推荐</div>
                            <div class="selectRadio" v-if="SelectionType==item.payId">√</div>
                        </div>
                    </div>
                </div>
            </div>
        </mt-popup>
        <mt-popup
        v-model="isShowCancelReason"
        popup-transition="popup-fade" style="border-radius: 0.1rem;">
            <div class="CancelReason-wrap">
                <div class="CancelReason-title">
                    请选择取消订单的原因
                </div>
                <div class="CancelReason-lists">
                     <scroller  ref="myscroller" style="height:100%">
                        <p class="CancelReason-item" v-for="(item,index) in CancelReasonLists" :key="item.bicdId" @click="selectReason(item.dicdName,index)">
                            <span class="CancelReason-text">{{item.dicdName}}</span>
                            <span class="CancelReason-select-icon" v-show="selectReasonType==index">√</span>
                        </p>
                    </scroller>
                </div>
                <div class="comfirm-btn">
                    <p class="btn" @click="cancelOrderReasoncancel">取消</p>
                    <p class="btn" @click="comfirmCancelOrder">确定</p>
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            orderDetailData:null,
            token:'',
            orderId:'',
            isShowPayment:false,//显示确定付款
            isShowPayPassWord:false,//显示输入支付密码界面
            isShowPayModle:false,//选择付款方式
            SelectionType:12,//选择类型
            SelectionModle:'喜豆钱包',
            NoSelect:4,
            isShowCancelReason:false,
            CancelReasonLists:[],
            selectReasonType:0,
            remark:'',//取消原因
            UA:sessionStorage.getItem('UA'),
            userAccount:[],
            orderNo:'',
            openId:''
        }
    },
    mounted(){
        if (localStorage.getItem('_token_')) {
            this.token=localStorage.getItem('_token_')
        }
        if (sessionStorage.getItem('orderId')) {
            this.orderId=sessionStorage.getItem('orderId')
        }
        if (sessionStorage.getItem('orderNo')) {
            this.orderNo=sessionStorage.getItem('orderNo')
        }
        this.getOrderDetail()
        this.token=sessionStorage.getItem('token')
        this.openId=sessionStorage.getItem('openId')

    },
    methods:{
        refund(){
            this.$toast.bottom('暂不支持');
        },
        inputEnd(val){
            //////////console.log(val)
            var orderNo=this.orderNo.toString()
            this.orderPay(orderNo,val)
        },
        PayPassWord(){//显示输入支付密码
            if (this.SelectionType==200 || this.SelectionType==4) {
                this.isShowPayPassWord=true;
            }else if (this.SelectionType == 12) {
                //this.$toast.bottom('微信支付维护中');
                var orderNo = this.orderNo.toString();
                this.weixinpay(orderNo, 3);
            } else if (this.SelectionType == 11) {
                //this.$toast.bottom('支付宝支付');
                var orderNo=this.orderNo.toString()
                this.weixinpay(orderNo,4)
            }

        },
        onBridgeReady:function (appId,timeStamp,nonceStr,rpackage,signType,paySign){
            ////console.log(appId)
            var _this=this
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId" : appId,     //公众号名称，由商户传入
                    "timeStamp" :timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr" :nonceStr, //随机串
                    "package" : rpackage,
                    "signType" : signType,         //微信签名方式：
                    "paySign" : paySign //微信签名,paySign 采用统一的微信支付 Sign 签名生成方法，注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
                },
                function(res) {
                    // if(true ) {     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        if (this.orderDetailData.tranType==1) {
                            window.location.href = 'https://tt.mylmyx.com/group/?system=web#/umused?orderId='+this.orderId
                        } else{
                            _this.$router.replace('/paysuccess')
                        }   // 使用以上方式判断前端返回,

                    } else if(res.err_msg == "get_brand_wcpay_request:cancel" ){
                        _this.$messagebox('提示', '您取消了支付，请重新支付')
                    }else if(res.err_msg == "get_brand_wcpay_request:fail" ){
                        _this.$messagebox('提示', '支付失败，请重新支付')
                    }
                }
            );
        },
        isShowpay(){
            this.isShowPayment=true;
            this.getPayModle()
        },
        close(){//关闭付款跳转订单详情

            this.isShowPayment=false;
        },
        ShowPayModle(){//显示付款方式
            this.isShowPayModle=true
        },
        getPayModle(){//获取用户账户的金额,获取使用什么方式付款
            this.GLOBAL.crmPost(
                '/fms/paylist',
                {
                    price:this.orderDetailData.orderAmt,
                    payType:this.UA
                }
            )
            .then(res=>{
                if(res.data.code==200){
                   this.userAccount=res.data.data
                   this.SelectionType=this.userAccount[0].payId
                   this.SelectionModle=this.userAccount[0].payName
                }else{
                    this.$toast.bottom(res.data.msg);
                }

            }).catch(()=>{
                this.$toast.bottom("获取支付方式失败");
            })
        },
        getOrderDetail(){//获取订单详细信息
            var orderId=this.orderId.toString()
            this.GLOBAL.orderPost(
                '/buyer/order/detail',
                {
                    orderId:orderId
                }
            )
            .then(res=>{
                if(res.data.code==200){
                    this.orderDetailData=res.data.data
                }else{
                    this.$toast.bottom(res.data.msg);
                }

            }).catch(()=>{
                this.$toast.bottom("获取失败");
            })
        },
        orderJoinCart(orderId,orderdId){//订单中加入购物车
            this.GLOBAL.orderPost(
                '/buyer/order/goodsAddCart',
                {
                    orderId:orderId,
                    orderdId:orderdId
                }
            )
            .then(res=>{
                if (res.data.code==200) {
                    this.$toast.bottom("添加至购物车成功噢~");
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("加载失败");
            })
        },

        cancelOrder(orderId){//取消订单
        this.getCancelReason()
        this.isShowCancelReason=true

        },
        cancelOrderReasoncancel(){//选择取消订单原因的选择取消
            this.isShowCancelReason=false
        },
        comfirmCancelOrder(){//确定取消订单
            if (this.selectReasonType==0) {
                this.remark='我不想买了'
            }
            this.GLOBAL.orderPost(
                '/buyer/order/cancel',
                {
                    orderId:this.orderId,
                    remark:this.remark
                }
            )
            .then(res=>{
                if (res.data.code==200) {
                    this.$toast.bottom("取消成功");
                    this.getOrderDetail()
                    this.isShowCancelReason=false
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("加载失败");
            })
        },
        deleteOrder(orderId){//删除订单
            this.$messagebox({//提示框
                  title: '确定删除订单',
                  message: '删除后需要重新购买',
                    showCancelButton: true,
                    confirmButtonText:"确定",
                    cancelButtonText:"取消"
                }).then(action => {
                   if(action == 'confirm'){//确定时删除订单
                        this.GLOBAL.orderPost(
                            '/buyer/order/del',
                            {
                                orderId:orderId
                            }
                        )
                        .then(res=>{
                            if (res.data.code==200) {
                                this.$toast.bottom("删除成功");
                                this.$router.go(-1)
                            }else{
                                this.$toast.bottom(res.data.msg);
                            }
                        }).catch(()=>{
                            this.$toast.bottom("加载失败");
                        })
                    }
            })
        },
        yesReceipt(orderId){//确定收货成功
            this.GLOBAL.orderPost(
                '/buyer/order/receipt',
                {
                    orderId:orderId
                }
            )
            .then(res=>{
                if (res.data.code==200) {
                    this.$toast.bottom("收货成功");
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("加载失败");
            })

        },
        goToGoodsDetail (goodsId){//点击商品进入商品详情页
            this.$router.push({path:'/goodsdetail',query:{
                goodsId:goodsId
            }})
        },
        getCancelReason(){//获取取消订单原因列表
            this.GLOBAL.crmPost(
                '/base/getDicContent',
                {
                    code:'ORD_ORDER_BUYER_CANCEL'
                }
            )
            .then(res=>{
                if (res.data.code==200) {
                    this.CancelReasonLists=res.data.data

                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("获取取消订单原因失败");
            })
        },
        selectReason(remark,index){//选择取消订单的原因
            this.remark=remark
            this.selectReasonType=index
        },
        orderPay(orderNo,PayPassWord){//喜豆,余额支付
            if (this.SelectionType==200) {
                var ptstr=JSON.stringify({integralCount:this.orderDetailData.orderAmt,balanceMoney :0})
            }else if (this.SelectionType==4){
                var ptstr=JSON.stringify({balanceMoney :this.orderDetailData.orderAmt,integralCount:0})
            }
            this.GLOBAL.orderPost(
                '/order/pay',
                {
                    payPass:PayPassWord,
                    orderNo:orderNo,
                    typeId:0,
                    resource:1,
                    ptStr:ptstr,
                }
            )
            .then(res=>{
                if(res.data.code==200){
                    this.$refs.pays.$success(true).then(res => {
                        if (this.orderDetailData.tranType==1) {
                            window.location.href = 'https://tt.mylmyx.com/group/?system=web#/umused?orderId='+this.orderId
                        } else{
                            this.$router.replace('/paysuccess')
                        }
                    })
                }else if(res.data.code==202){
                    this.$refs.pays.$fail('支付密码错误')

                }else{
                    this.$toast.bottom(res.data.msg);
                }

            }).catch(()=>{
                this.$toast.bottom("获取支付链接失败");
            })
        },
        selectPayModle(type,name){//选择支付方式
            this.SelectionType=type
            this.SelectionModle=name
            this.isShowPayModle=false
        },
        weixinpay(orderNo,typeId){//typeId:3微信支付,typeId:2支付宝支付
            var openId=this.openId
            var _this=this
            this.GLOBAL.orderPost(
                '/order/pay',
                {
                    orderNo:orderNo,
                    typeId:typeId,
                    resource:1,
                    openId:openId
                }
            )
            .then(res=>{
                var data=res.data.data
                if (res.data.code == 200) {
                    if (typeId == 3) {
                    this.onBridgeReady(
                        data.appId,
                        data.timeStamp,
                        data.nonceStr,
                        data.package,
                        data.signType,
                        data.paySign
                    );
                    } else {
                        AlipayJSBridge.call("tradePay", {//调起支付宝支付
                            tradeNO: data.tradeNo
                        }, function(result) {
                            var code = result.resultCode
                            if (code=='9000') {
                                if (this.orderDetailData.tranType==1) {
                                    window.location.href = 'https://tt.mylmyx.com/group/?system=web#/umused?orderId='+this.orderId
                                } else{
                                    _this.$router.replace('/paysuccess')
                                }
                            }else if (code=='8000') {
                                _this.$toast.bottom("后台获取支付结果超时，暂时未拿到支付结果");
                            }else if (code=='6004') {
                                _this.$toast.bottom("支付过程中网络出错， 暂时未拿到支付结果");
                            }else if (code=='7001') {
                                _this.$toast.bottom("客户端-钱包中止快捷支付,请重新支付");
                            }else if (code=='6002') {
                                _this.$toast.bottom("普通网络出错,请稍后再试");
                            }else if (code==6001) {
                                _this.$toast.bottom("你中途取消了支付,请稍后再试");
                            }else if (code=='4000') {
                                _this.$toast.bottom("订单支付失败,请稍后再试");
                            }else if (code=='99') {
                                _this.$toast.bottom("用户点击忘记密码快捷界面退出");
                            }else{
                                _this.$toast.bottom("其他支付异常,请稍后再试");
                            }

                        });
                    }
                } else {
                    this.$toast.bottom(res.data.msg);
                }

            }).catch(()=>{
                this.$toast.bottom("获取支付链接失败");
            })
        },
        toUsed(){
           window.location.replace('https://tt.mylmyx.com/group/?system=web#/order-detail?orderId='+this.orderId)
        }

    },

}
</script>
<style lang="less" scoped>
.line{
    width: 100%;
    height: 0.2rem;
    background-color: #F7F7F7
}
.order-detail-wrap{
    width: 7.5rem;
    margin: 0 auto;
    color: #090909;
    font-size: 0.26rem;
    padding-bottom: 1rem;

    .order-status-wrap{
        width: 100%;
        min-height: 3.5rem;
        position: relative;
        .order-status{
            width: 90%;
            padding: 0 5%;
            background-color: #FF060A;
            color: #ffffff;
            min-height: 1.8rem;
            .order-status-title{
                font-size: 0.34rem;
                line-height: 0.64rem;
            }
            .order-status-text{
                font-size: 0.24rem;
                line-height: 0.32rem
            }
        }
        .order-address{
            width: 96%;
            height: 2rem;
            display: flex;
            justify-content: start;
            align-items: center;
            border-radius: 0.1rem;
            background-color: #ffffff;
            position: absolute;
            bottom: 0;
            left: 2%;
            .order-address-icon{
                width: 0.44rem;
                height: 0.44rem;
                background:url('../../../../../static/img/location.png') no-repeat;
                background-size: cover;
                margin: 0 2%
            }
            .order-address-content{
                span{
                    line-height: 0.52rem;
                }
            }
        }
    }
    .order-detail-goodsinfo{
        width: 96%;
        padding: 0.2rem 2%;
        background-color: #ffffff;
        border-bottom: 0.01rem solid #F7F7F7;
        .order-goodsinfo{
            width: 100%;
            display: flex;
            justify-content: start;
            .goods-img{
                width: 1.7rem;
                height: 1.7rem;
                margin-right: 2%;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                    font-size: 0
                }
            }
            .goods-title{
                flex: 1;
                line-height: 0.44rem;
                overflow: hidden;
                max-height: 1.7rem;
            }
            .goods-price{
                margin-bottom: 0.4rem;
            }
            .goods-number{
                text-align: center
            }
        }
        .join-shopping-cart{
            width: 100%;
            height: 0.6rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            .join-cart-btn{
                width: 1.6rem;
                height: 0.48rem;
                border: 0.03rem solid #646464;
                border-radius: 0.24rem;
                text-align: center;
                line-height: 0.48rem;
                font-size: 0.24rem;
                color: #646464;
            }
        }
    }
    .orderinfo-wrap{
        width: 96%;
        padding: 0.2rem 2%;
        color: #646464;
        .orderinfo-title{
            display: flex;
            justify-content: start;
            align-items: center;
            .col{
                width: 0.06rem;
                height: 0.36rem;
                background-color: #FF060A
            }
            .orderinfo-title{
                font-size: 0.32rem;
                line-height: 0.36rem;
                color: #000000;
                text-indent: 0.1rem
            }

        }
        .orderinfo-number,.orderinfo-time{
                width: 100%;
                padding:0.1rem 0.05rem;
                span{
                    line-height: 0.4rem
                }
            }
    }
    .order-amount{
        width: 96%;
        padding: 0.2rem 2%;
        .order-amount-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 0.6rem;
            line-height: 0.6rem
        }
    }
    .due-amount{
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        color: #FF060A;
        font-size: 0.32rem;
        text-align: right
    }
    .bottom-wrap{
        width: 90%;
        padding: 0 5%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #ffffff;
        .item-btn{
            height: 0.6rem;
            text-align: center;
            color: #646464;
            border: 1px solid #646464;
            border-radius: 0.30rem;
            line-height: 0.6rem;
            font-size: 0.26rem
        }
        .cancel-roder{
            width: 1.4rem;
            margin-right: 0.2rem
        }
        .payment{
            width: 1rem
        }
    }
}
.payment-wrap{
    width: 7rem;
    padding: 0 0.25rem;
    height: 8.45rem;
    background-color: #ffffff;
    font-size: 0.32rem;
    color: #6D6D6D;
    .payment-title{
        width: 100%;
        font-size: 0.36rem;
        margin: 0.32rem 0;
        text-align: center;
    }
    .payment-sum{
        width: 100%;
        height: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        font-size: 0.8rem;
        color: #F96633
    }
    .payment-public{
        display: flex;
        justify-content: space-between;
        height: 0.9rem;
        line-height: 0.9rem;
        border-bottom: 0.01rem solid #F6F6F6;
        align-items: center;
    }
    .payment-account-title{
        width: 50%;
        height: 0.9rem;
        line-height: 0.9rem;
    }
    .payment-modle-title{
        width: 50%;
        height: 0.9rem;
        line-height: 0.9rem;
    }
    .payment-account-text{
        width: 50%;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: right;
        color: #313131;
    }
    .payment-modle-text{
        width: 50%;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: right;
        color: #313131;
    }
    .payment-modle-select{
        width: 0.44rem;
        height: 0.44rem;
        background: url('../../../../../static/img/right.png') no-repeat;
        background-size: cover
    }
    .close-payment{
        width: 0.44rem;
        height: 0.44rem;
        position: absolute;
        top: 0.24rem;
        left:0.25rem;
        background: url('../../../../../static/img/cancel.png') no-repeat;
        background-size: cover;
    }
    .comfirm-payment{
        width: 7.5rem;
        height: 1.18rem;
        text-align: center;
        font-size: 0.32rem;
        color: #ffffff;
        line-height: 1.18rem;
        z-index: 6;
        background: url('../../../../../static/img/comfirm.png') no-repeat;
        background-size: cover;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
.pay-modle-wrap{
    width: 100%;
    min-height: 8rem;
    .pay-title-wrap{
        width: 6.8rem;
        padding: 0 0.35rem;
        height: 0.95rem;
        line-height: 0.95;
        display: flex;
        justify-content: start;
        align-items: center;
        border: 0.02rem solid #F7F7F7;
        .backPayMent{
            width: 0.20rem;
            height: 0.20rem;
            border: 0.02rem solid #B8B8B8;
            transform: rotate(45deg);
            border-right:0;
             border-top:0
        }
        .pay-title{
            color: #121212;
            line-height: 0.95rem;
            height: 0.95rem;
            width: 100%;
            font-size: 0.34rem;
            text-align: center
        }

    }
    .pay-modle-lists{
        width:100%;
        .has-pay-modle{
            width: 100%;
            color: #2F2F2F;
            font-size: 0.28rem;
        }
        .item-pay-modle{
            width: 90%;
            height: 1.2rem;
            margin: 0 auto;
            display: flex;
            justify-content: start;
            align-items: center;
            border-bottom: 0.02rem solid #F7F7F7;
        }
        .alipay-icon,.weixin-icon,.xidou-icon,.balance-icon{
            width: 0.47rem;
            height: 0.47rem;
            margin: 0 0.32rem;
            img{
                width: 100%;
                height: 100%;
                display: block;
                font-size: 0;
            }
        }
        .xidou-text,.alipay-text,.weixin-text,.balance-text{
            flex: 1
        }
        .selectRadio{
            color: #FB0F52;
            font-size: 0.34rem;
        }
        .recommend{
            width: 0.68rem;
            height: 0.3rem;
            line-height: 0.3rem;
            text-align: center;
            color: #ffffff;
            background-color: #FF060A;
            font-size: 0.2rem;
            border-radius: 0.15rem;
            margin-left: 0.3rem;
            position: relative;
            left: -2rem;
        }
        .cannotSelection{
            background-color: #F3F3F3;
            color: #959595;
            opacity: 0.5;

        }
    }
}
.CancelReason-wrap{
    width: 6rem;
    height:auto;
    margin: 0 auto;
    border-radius: 0.1rem;
    .CancelReason-title{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        color: #FF060A;
        font-size: 0.3rem;
        text-align: center;
        border-bottom: 0.01rem solid #FF060A;
    }
    .CancelReason-lists{
        position: relative;
        width: 100%;
        height: 5.6rem;
        color: #6D6D6D;
        font-size: 0.28rem;
        .CancelReason-item{
            width: 94%;
            padding: 0 3%;
            margin: 0.4rem 0;
            line-height: 0.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .CancelReason-text{
                width: 88%;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
            }
            .CancelReason-select-icon{
                color:#FF060A
            }
        }
    }
    .comfirm-btn{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        border-top: 0.01rem solid #f2f2f2;
        display: flex;
        .btn{
            width: 50%;
            text-align: center;

        }
        .btn:nth-of-type(1){
            border-right: 0.01rem solid #f2f2f2
        }
    }
}
</style>
