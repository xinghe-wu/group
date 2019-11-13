<template>
    <div class="order-wrap" :style="{'min-height':countHeight+'px'}" v-if="OrderData">
      <div class="line"></div>
      <div
        class="mailing-info"
        v-if="addressStatus==2"
        @click="addAddress"
      >
        <div class="consignee-info">
          <p class="consignee-name">收货人 : {{addressList.buyer}}</p>
          <p class="consignee-phone">{{addressList.phone}}</p>
        </div>
        <div class="shipping-address">
          <div class="shipping-location"></div>
          <p class="shipping-address-detail">收货地址 : {{addressList.provinceName}} {{addressList.cityName}} {{addressList.areaName}} {{addressList.address}}</p>
          <p class="nextIcon"></p>
        </div>
      </div>
      <div
        class="add-address"
        v-if="addressStatus==1"
        @click="addAddress"
      >
        <i></i>
        <p class="add-address-title">
          请添加地址
        </p>
        <p class="nextIcon"></p>
      </div>
      <div class="line-sub-bcg"></div>
      <div class="order-lists-wrap">
        <div
          class="order-lists-item"
          v-if="orderItemList"
          v-for="item in orderItemList"
          :key="item.sellerId"
        >
          <div
            class="order-goods-info"
            v-for="arritem in item.cartList"
            :key="arritem.cartId"
            @click="goToGoodsDetail(arritem.goodsId)"
          >
            <div class="order-goods-img">
              <img
                v-lazy="arritem.imageDefault"
                alt=""
              >
            </div>
            <div class="order-goods-detail">
              <div class="order-goods-name">{{arritem.name}}</div>
              <div class="order-goods-classify">
                <span
                  v-for="(classify,index) in arritem.others.specList"
                  :key="index"
                >
                  {{classify.name}} : {{classify.value}}
                </span>
              </div>
              <div class="order-goods-price">￥{{arritem.price}}</div>
              <p class="order-goods-number">x{{arritem.num}}</p>
            </div>
          </div>
          <div class="dispatching-mode order-goods-info-public">
            <div class="dispatching-mode-title">配送方式</div>
            <div class="dispatching-mode-text">
              <span>快递 预计</span>
              <span>￥{{item.carriageMoney}}</span>
              <span>></span>
            </div>
          </div>
          <div class="Buyer-message order-goods-info-public">
            <div class="Buyer-message-title">买家留言:</div>
            <input
              type="text"
              placeholder="选填"
              v-model="userMessage"
              style="width: 80%;"
            >
          </div>
          <div class="order-goods-sumPrice order-goods-info-public">
            <span>共 {{item.totalCount}} 商品</span>
            <span>共计:</span>
            <span class="order-goods-sum">￥{{item.orderMoney}}</span>
          </div>
        </div>
      </div>
      <div
        class="submit-order-wrap"
        v-if="JSON.stringify(OrderData) != '{}'"
      >
        <div class="order-sum-price">
          <span>合计:</span>
          <span class="order-sum-price-text">￥{{OrderData.orderMoneyPrice ?OrderData.orderMoneyPrice : 0 }}</span>
        </div>
        <div
          class="order-submit-btn"
          @click="commitOrder"
        >提交订单</div>
      </div>
      <mt-popup v-model="isShowPayment" :closeOnClickModal=false position="bottom">
        <div class="payment-wrap" v-if="isShowPayment" ref="payment">
          <div class="payment-title">确认付款</div>
          <div class="payment-sum">￥{{OrderData.orderMoney}}</div>
          <div class="payment-account payment-public">
            <div class="payment-account-title">订单信息</div>
            <div class="payment-account-text">立马有喜支付</div>
          </div>
          <div
            class="payment-modle payment-public"
            @click="ShowPayModle"
          >
            <div class="payment-modle-title">付款方式</div>
            <div class="payment-modle-text">{{SelectionModle}}</div>
            <div class="payment-modle-select"></div>
          </div>
          <div
            class="close-payment"
            @click="close"
          ></div>
          <div
            class="comfirm-payment"
            @click="PayPassWord"
          >
            确认付款
          </div>
        </div>
      </mt-popup>
      <vpay
        ref="pays"
        v-model="isShowPayPassWord"
        style="z-index:10000"
        @input-end="inputEnd"
      ></vpay>
      <mt-popup
        v-model="isShowPayModle"
        style="width:100%"
        position="bottom"
      >
        <div class="pay-modle-wrap">
          <div class="pay-title-wrap">
            <p class="backPayMent"></p>
            <p class="pay-title">选择支付方式</p>
          </div>
          <div class="pay-modle-lists">
            <div
              class="has-pay-modle"
              v-if="userAccount"
            >
              <div
                class="xidou item-pay-modle"
                v-for="(item,index) in userAccount"
                :key="index"
                @click.stop=" item.aviliable==1  ? selectPayModle(item.payId,item.payName) :''"
                :class="item.aviliable==0 ? 'cannotSelection' :''"
                :ref="item.payCode"
              >
                <div class="xidou-icon">
                  <img
                    v-lazy="item.payIcon"
                    alt=""
                  >
                </div>
                <div class="xidou-text">{{item.payName}}<span v-if="item.payId==200 || item.payId==4">(剩余:{{item.balance}})</span></div>
                <div
                  class="recommend"
                  v-if="item.payId==200"
                >推荐</div>
                <div
                  class="selectRadio"
                  v-if="SelectionType==item.payId"
                >√</div>
              </div>

            </div>
          </div>
        </div>
      </mt-popup>
    </div>
</template>
<script>
export default {
  data() {
    return {
      countHeight: document.documentElement.clientHeight, //高度
      isShowPayment: false, //显示确定付款
      isShowPayPassWord: false, //显示输入支付密码界面
      token: "", //用户token
      OrderData: {}, //订单全部信息
      orderItemList: [], //订单内商品列表
      addressList: null, //默认地址
      isShowPayModle: false, //选择付款方式
      SelectionType: 12, //选择类型
      userMessage: "", //留言信息
      orderId: "", //提交订单后的id
      SelectionModle: "喜豆钱包",
      NoSelect: 4,
      nowPayGoodsId: "",
      nowPayGoodsNum: "",
      UA: sessionStorage.getItem("UA"),
      userAccount: [],
      orderNo: "",
      openId: "",
      addressStatus:0,//地址状态,0是无状态,1是无地址列表,2是有地址
    };
  },
  methods: {
    inputEnd(val) {
      var orderNo = this.orderNo;
      this.orderPay(orderNo, val);
    },
    PayPassWord() {
      //显示输入支付密码
      if (this.SelectionType == 200 || this.SelectionType == 4) {
        this.isShowPayPassWord = true;
      } else if (this.SelectionType == 12) {
        //this.$toast.bottom('微信支付维护中');
        var orderNo = this.orderNo.toString();
        this.weixinpay(orderNo, 3);
      } else if (this.SelectionType == 11) {
        //this.$toast.bottom('支付宝支付');
        var orderNo=this.orderNo.toString()
        this.weixinpay(orderNo,4)
      }
    },
    getOrderData() {
      //获取用户的订单信息
        this.GLOBAL.orderPost(
          '/order/getData',
          {
            goodsdId:this.nowPayGoodsId,
            num:this.nowPayGoodsNum
          }
        )
        .then(res => {
          if (res.data.code == 200) {
            if (this.$store.getters.backGoOrderAddress) {
              this.addressStatus=2
              this.addressList = this.$store.getters.backGoOrderAddress;
            } else {
              this.getUserAddress();
            }
            this.OrderData = res.data.data;
            this.orderItemList = res.data.data.orderItemList;
            if (res.data.data.code == 205) {
              //提交订单后刷新返回上一层
              this.$router.go(-1);
            } else if (res.data.data.code == 204) {
              this.$toast.bottom(res.data.data.msg);
              setTimeout(() => {
                this.$router.go(-1);
              }, 2000);
            }
          } else {
            this.$toast.bottom(res.data.msg);
          }
        })
        .catch(() => {
          this.$toast.bottom("获取订单信息失败");
        });
    },
    getUserAddress() {
        this.axios({
          method:"get",
          url:this.GLOBAL.crmHost+'/user/deliver/def?token='+this.GLOBAL.token
        })
        .then(res => {
          if (res.data.code == 200) {
            this.addressList = res.data.data;
            if (JSON.stringify(res.data.data)=='{}') {
              this.addressStatus=1
            }else{
              this.addressStatus=2
            }
          } else {
            this.$toast.bottom(res.data.msg);
          }
        })
        .catch(() => {
          this.$toast.bottom("加载失败");
        });
    },

    addAddress() {
      //添加地址
      this.$router.replace("/address");
    },
    close() {
      //关闭付款跳转订单详情
      this.isShowPayment = false;
      this.$router.replace({path:'/order/orderdetail'})
    },
    ShowPayModle() {
      //显示付款方式
      this.isShowPayModle = true;
    },
    commitOrder() {
      //提交订单
      var shopStr = [];
      if (this.orderItemList) {
        for (var i = 0; i < this.orderItemList.length; i++) {
          var shopStrItem = {};
          shopStrItem.sellerId = this.orderItemList[i].sellerId;
          shopStrItem.tmsId = 1;
          shopStrItem.desc = this.userMessage;
          shopStr.push(shopStrItem);
        }
      }
      if (this.addressList.derId) {//判断用户有无地址
        if (this.nowPayGoodsId && this.nowPayGoodsNum) {
          this.GLOBAL.orderPost(
            '/order/create',
            {
              derId: this.addressList.derId,
              shopStr: JSON.stringify(shopStr),
              goodsdId: this.nowPayGoodsId,
              num: this.nowPayGoodsNum
            }
          )
            .then(res => {
              if (res.data.code == 200) {
                this.orderId = res.data.data.orderId;
                this.orderNo = res.data.data.orderNo;
                sessionStorage.setItem("orderId", res.data.data.orderId);
                sessionStorage.setItem("orderNo", res.data.data.orderNo);
                sessionStorage.removeItem("nowPayGoodsId");
                sessionStorage.removeItem("nowPayGoodsNum");
                this.navigate();
              } else {
                this.$toast.bottom(res.data.msg);
              }
            })
            .catch(() => {
              this.$toast.bottom("提交失败");
            });
        } else {
          this.GLOBAL.orderPost(
            '/order/create',
            {
              derId: this.addressList.derId.toString(),
              shopStr: JSON.stringify(shopStr)
            }
          )
            .then(res => {
              if (res.data.code == 200) {
                this.orderId = res.data.data.orderId;
                this.orderNo = res.data.data.orderNo;
                sessionStorage.setItem("orderId", res.data.data.orderId);
                sessionStorage.setItem("orderNo", res.data.data.orderNo);
                this.navigate();
              } else {
                this.$toast.bottom(res.data.msg);
              }
            })
            .catch(() => {
              this.$toast.bottom("提交失败");
            });
        }
      } else {
        this.$toast.bottom("收货地址为空,请设置~");
      }
    },
    goToGoodsDetail(goodsId) {
      //点击商品进入商品详情页
      this.$router.push({
        path: "/goodsdetail",
        query: {
          goodsId: goodsId
        }
      });
    },
    selectPayModle(type, name) {
      //选择支付方式
      this.SelectionType = type;
      this.SelectionModle = name;
      this.isShowPayModle = false;
    },
    getPayModle() {
      //获取用户账户的金额,获取使用什么方式付款
      this.GLOBAL.crmPost(
        '/fms/paylist',
        {
          price:this.OrderData.orderMoney,
          payType:this.UA
        }
      )
        .then(res => {
          if (res.data.code == 200) {
            this.userAccount = res.data.data;
            this.SelectionType = this.userAccount[0].payId;
            this.SelectionModle = this.userAccount[0].payName;
          } else {
            this.$toast.bottom(res.data.msg);
          }
        })
        .catch(() => {
          this.$toast.bottom("获取支付方式失败");
        });
    },
    onBridgeReady: function(
      appId,
      timeStamp,
      nonceStr,
      rpackage,
      signType,
      paySign
    ) {
      var _this = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: appId, //公众号名称，由商户传入
          timeStamp: timeStamp, //时间戳，自1970年以来的秒数
          nonceStr: nonceStr, //随机串
          package: rpackage,
          signType: signType, //微信签名方式：
          paySign: paySign //微信签名,paySign 采用统一的微信支付 Sign 签名生成方法，注意这里 appId 也要参与签名，appId 与 config 中传入的 appId 一致，即最后参与签名的参数有appId, timeStamp, nonceStr, package, signType。
        },
        function(res) {
          // if(true ) {     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,
            _this.$router.replace("/paysuccess");
          } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            _this.$router.replace("/order/orderdetail");
          } else if (res.err_msg == "get_brand_wcpay_request:fail") {
            _this.$router.replace("/order/orderdetail");
          }
        }
      );
    },
    orderPay(orderNo, PayPassWord) {
      //喜豆,余额支付
      if (this.SelectionType == 200) {
        var ptstr = JSON.stringify({
          integralCount: this.OrderData.orderMoney,
          balanceMoney: 0
        });
      } else if (this.SelectionType == 4) {
        var ptstr = JSON.stringify({
          balanceMoney: this.OrderData.orderMoney,
          integralCount: 0
        });
      }
      this.GLOBAL.orderPost(
        '/order/pay',
        {
          payPass: PayPassWord,
          orderNo: orderNo,
          typeId: 0,
          resource: 1,
          ptStr: ptstr,
        }
      )
        .then(res => {
          if (res.data.code == 200) {
            this.$refs.pays.$success(true).then(res => {
              this.$router.replace("/paysuccess");
            });
          } else if (res.data.code == 202) {
            this.$refs.pays.$fail("支付密码错误");
          } else {
            this.$toast.bottom(res.data.msg);
          }
        })
        .catch(() => {
          this.$toast.bottom("获取支付链接失败");
        });
    },
    weixinpay(orderNo, typeId) {
      //typeId:3是微信支付
      var _this=this
      var openId = this.openId
      this.GLOBAL.orderPost(
        '/order/pay',
        {
          orderNo: orderNo,
          typeId: typeId,
          resource: 1,
          openId: openId
        }
      )
        .then(res => {
          var data = res.data.data;
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
                        _this.$router.replace("/paysuccess");
                    }else if (code=='8000') {
                        _this.$toast.bottom("后台获取支付结果超时，暂时未拿到支付结果");
                    }else if (code=='6004') {
                        _this.$toast.bottom("支付过程中网络出错， 暂时未拿到支付结果");
                    }else if (code=='7001') {
                        _this.$toast.bottom("客户端-钱包中止快捷支付,请从新支付");
                    }else if (code=='6002') {
                        _this.$toast.bottom("普通网络出错,请稍后再试");
                    }else if (code=='6001') {
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
        })
        .catch(() => {
          this.$toast.bottom("获取支付链接失败");
        });
    },


    navigate() {
      //控制页面跳转---小程序、公众号、非微信跳转方式 【modelName---vue路由名字】
      this.isMiniProgram(res => {
        //判断是否是小程序页面的回调函数
        if (res) {
          //小程序页面
          var userMobile = sessionStorage.getItem("userMobile");
          if (userMobile) {
            this.$wx.miniProgram.navigateTo({
              url:
                "/pages/down-sheet/main?orderId=" +
                this.orderId +
                "&isShowBack=true&from=h5"
            });
          } else {
            this.$wx.miniProgram.navigateTo({
              url: "/pages/binding/main?from=h5&orderId=" + this.orderId
            });
          }
        } else {
          this.isShowPayment = true;
          this.getPayModle();
        }
      });
    },
    isMiniProgram(callback) {
      //是否为小程序环境
      //是否在微信环境
      if (sessionStorage.getItem("UA") !== "wxpay") {
        callback(false);
      } else {
        //微信API获取当前运行环境
        this.$wx.miniProgram.getEnv(res => {
          if (res.miniprogram) {
            //小程序环境
            callback(true);
          } else {
            callback(false);
          }
        });
      }
    }
  },
  watch: {
    userMessage() {
      if (this.userMessage.length >= 30) {
        this.userMessage = this.userMessage.substr(0, 30);
      }
    }
  },
  created() {
    var openId=sessionStorage.getItem("openId");
    if (openId && openId !='' && openId!=undefined) {
      this.openId = openId
    }else{
      this.$toast.bottom('没有获取到用户openId,请退出重新登录')
    }

  },
  mounted() {
    if (sessionStorage.getItem("fromPath") == "/home/shoppingcart") {
    } else {
      if (sessionStorage.getItem("nowPayGoodsId")) {
        this.nowPayGoodsId = sessionStorage.getItem("nowPayGoodsId");
      }
      if (sessionStorage.getItem("nowPayGoodsNum")) {
        this.nowPayGoodsNum = sessionStorage.getItem("nowPayGoodsNum");
      }
    }

    this.getOrderData();

  },
};
</script>
<style lang="less" scoped>
.black {
  width: 100%;
  background-color: #000000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
}
// ---------------------
.order-wrap {
  width: 7.5rem;
  margin: 0 auto;
  position: relative;
  color: #6d6d6d;
  font-size: 0.28rem;
  padding-bottom: 1.1rem;
  box-sizing: border-box
}
.line {
  width: 100%;
  height: 0.02rem;
  background: #f6f6f6;
}
.add-address {
  width: 100%;
  height: 1.3rem;
  display: flex;
  color: #313131;
  font-size: 0.36rem;
  align-items: center;
  position: relative;
  i {
    display: block;
    width: 0.44rem;
    height: 0.44rem;
    background: url("../../../../../static/img/location.png") no-repeat;
    background-size: cover;
    margin-left: 0.6rem;
    margin-right: 0.3rem;
  }
  .nextIcon {
    width: 0.44rem;
    height: 0.44rem;
    background: url("../../../../../static/img/right.png") no-repeat;
    background-size: cover;
    position: absolute;
    right: 0.15rem;
  }
}
.mailing-info {
  width: 100%;
  height: 2.5rem;
  .consignee-info {
    width: 5.7rem;
    margin-left: 1rem;
    margin-top: 0.6rem;
    display: flex;
    font-size: 0.3rem;
    .consignee-name {
      width: 3.45rem;
      height: 0.32rem;
      line-height: 0.32rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .consignee-phone {
      width: 2.25rem;
      height: 0.32rem;
      line-height: 0.32rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .shipping-address {
    width: 100%;
    display: flex;
    margin-top: 0.3rem;
    position: relative;
    .shipping-location {
      width: 0.35rem;
      height: 0.35rem;
      background: url("../../../../../static/img/location.png") no-repeat;
      background-size: cover;
      margin-left: 0.39rem;
    }
    .shipping-address-detail {
      width: 5.57rem;
      margin-left: 0.26rem;
      font-size: 0.24rem;
      line-height: 0.35rem;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .nextIcon {
      width: 0.3rem;
      height: 0.3rem;
      background: url("../../../../../static/img/right.png") no-repeat;
      background-size: cover;
      position: absolute;
      right: 0.15rem;
      top: 0.13rem;
    }
  }
}
.line-sub-bcg {
  width: 100%;
  height: 0.1rem;
  background: url("../../../../../static/img/line.png") no-repeat;
  background-size: cover;
}
.order-lists-wrap {
  width: 100%;
  height: auto;
  .order-lists-item {
    border-bottom: 0.2rem solid #f3f3f3;
  }
  .order-goods-info {
    width: 7rem;
    padding: 0 0.25rem;
    display: flex;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    .order-goods-img {
      width: 1.9rem;
      height: 1.9rem;
      margin-right: 0.3rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
        font-size: 0;
      }
    }
    .order-goods-detail {
      width: 4.8rem;
      height: 100%;
      font-size: 0.24rem;
      position: relative;
      .order-goods-name {
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0.26rem;
        margin-top: 0.1rem;
      }
      .order-goods-classify {
        width: 100%;
        height: 0.3rem;
        line-height: 0.35rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 0.26rem;
        color: #cacaca;
      }
      .order-goods-price {
        margin-top: 0.5rem;
        font-size: 0.28rem;
        color: #f96633;
      }
      .order-goods-number {
        font-size: 0.24rem;
        position: absolute;
        bottom: 0rem;
        right: 0;
      }
    }
  }
  .order-goods-info-public {
    width: 7rem;
    padding: 0 0.25rem;
    height: 1rem;
    line-height: 1rem;
    border-top: 0.01rem solid #eeeeee;
  }
  .dispatching-mode {
    display: flex;
    justify-content: space-between;
    .dispatching-mode-text {
      font-size: 0.24rem;
    }
  }
  .Buyer-message {
    display: flex;
    input {
      font-size: 0.24rem;
      color: #999999;
      height: 0.9rem;
      margin-top: 0.05rem;
      border: none;
      outline: medium;
    }
  }
  .order-goods-sumPrice {
    text-align: right;
    .order-goods-sum {
      font-size: 0.3rem;
      color: #f96633;
    }
  }
}
.submit-order-wrap {
  width: 7.5rem;
  height: 1.05rem;
  line-height: 1.05rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: #ffffff;
  .order-sum-price {
    margin-left: 0.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .order-sum-price-text {
      font-size: 0.36rem;
      color: #f96633;
    }
  }
  .order-submit-btn {
    width: 2.2rem;
    height: 1.05rem;
    background: url("../../../../../static/img/commitorder.png") no-repeat;
    background-size: cover;
    text-align: center;
    line-height: 1.05rem;
    color: #ffffff;
  }
}
.payment-wrap {
  width: 7rem;
  padding: 0 0.25rem;
  height: 8.45rem;
  background-color: #ffffff;
  font-size: 0.32rem;
  color: #6d6d6d;
  .payment-title {
    width: 100%;
    font-size: 0.36rem;
    margin: 0.32rem 0;
    text-align: center;
  }
  .payment-sum {
    width: 100%;
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    font-size: 0.8rem;
    color: #f96633;
  }
  .payment-public {
    display: flex;
    justify-content: space-between;
    height: 0.9rem;
    line-height: 0.9rem;
    border-bottom: 0.01rem solid #f6f6f6;
    align-items: center;
  }
  .payment-account-title {
    width: 50%;
    height: 0.9rem;
    line-height: 0.9rem;
  }
  .payment-modle-title {
    width: 50%;
    height: 0.9rem;
    line-height: 0.9rem;
  }
  .payment-account-text {
    width: 50%;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: right;
    color: #313131;
  }
  .payment-modle-text {
    width: 50%;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: right;
    color: #313131;
  }
  .payment-modle-select {
    width: 0.44rem;
    height: 0.44rem;
    background: url("../../../../../static/img/right.png") no-repeat;
    background-size: cover;
  }
  .close-payment {
    width: 0.44rem;
    height: 0.44rem;
    position: absolute;
    top: 0.24rem;
    left: 0.25rem;
    background: url("../../../../../static/img/cancel.png") no-repeat;
    background-size: cover;
  }
  .comfirm-payment {
    width: 7.5rem;
    height: 1.18rem;
    text-align: center;
    font-size: 0.32rem;
    color: #ffffff;
    line-height: 1.18rem;
    z-index: 6;
    background: url("../../../../../static/img/comfirm.png") no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
.pay-modle-wrap {
  width: 100%;
  min-height: 8rem;
  .pay-title-wrap {
    width: 6.8rem;
    padding: 0 0.35rem;
    height: 0.95rem;
    line-height: 0.95;
    display: flex;
    justify-content: start;
    align-items: center;
    border: 0.02rem solid #f7f7f7;
    .backPayMent {
      width: 0.2rem;
      height: 0.2rem;
      border: 0.02rem solid #b8b8b8;
      transform: rotate(45deg);
      border-right: 0;
      border-top: 0;
    }
    .pay-title {
      color: #121212;
      line-height: 0.95rem;
      height: 0.95rem;
      width: 100%;
      font-size: 0.34rem;
      text-align: center;
    }
  }
  .pay-modle-lists {
    width: 100%;
    .has-pay-modle {
      width: 100%;
      color: #2f2f2f;
      font-size: 0.28rem;
    }
    .item-pay-modle {
      width: 90%;
      height: 1rem;
      margin: 0 auto;
      display: flex;
      justify-content: start;
      align-items: center;
      border-bottom: 0.02rem solid #f7f7f7;
    }

    .alipay-icon,
    .weixin-icon,
    .xidou-icon,
    .balance-icon {
      width: 0.47rem;
      height: 0.47rem;
      margin: 0 0.32rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
        font-size: 0;
      }
    }
    .xidou-text,
    .alipay-text,
    .weixin-text,
    .balance-text {
      flex: 1;
    }
    .selectRadio {
      color: #fb0f52;
      font-size: 0.34rem;
    }
    .recommend {
      width: 0.68rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      color: #ffffff;
      background-color: #ff060a;
      font-size: 0.2rem;
      border-radius: 0.15rem;
      margin-left: 0.6rem;
      position: relative;
      left: -1rem;
    }
    .cannotSelection {
      background-color: #f3f3f3;
      color: #959595;
      opacity: 0.5;
    }
  }
}
</style>
