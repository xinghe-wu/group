<!-- 我的拼团 -->
<template>
  <div class="my-group" :style="{height: pageHeight + 'px'}">
    <div class="tab">
      <div class="tab-item" v-for="(item, index) in tabList" :key="item.text" @click="toggle(index)">{{item.text}}</div>
      <div class="line" :style="{left: calcLeft + 'rem'}"></div>
    </div>
    <div class="group-list swiper-container" ref="list" :style="{top: '0.86'+'rem'}">
      <div class="swiper-wrapper" ref="swiperWrapper">
        <orderList class="swiper-slide" v-for="(list,index) in dataList" :key="index" :orderList="list" :source="swipeIndex" @onchangelist="requestList" @cancelOrder="cancelChange" @deleteOrder="deleteChange" @yesReceipt="yesChange" ref="swipeSlide"/>
      </div>
    </div>
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
import Bus from '../../../../../static/js/bus.js'
import Split from '../split'
import orderList from '../order-list'
export default {
  data () {
    return {
      pageHeight: document.documentElement.clientHeight,
      tabList: [{ text: '全部', status: null },{ text: '待付款', status: 1 },{ text: '待发货', status: 2 },{ text: '待收货', status: 3 },{ text: '已完成', status: 5 }],
      listHeight: 0,
      mySwiper: '',
      swipeIndex: 0,
      dataList: [[],[],[],[],[]],//数据
      system: 'web',
      pageSize: 20,
      pageNo: [0,0,0,0,0],
      isShowCancelReason:false,
      orderId:'',
      remark:'我不想买了',
      CancelReasonLists:[],
      selectReasonType:0,
    }
  },
  methods: {
    toggle(i) {
      this.swipeIndex = i;

      this.mySwiper.slideTo(this.swipeIndex, 400, false)
    },
    requestList(isMore) {
      var status = this.tabList[this.swipeIndex].status
      this.pageNo[this.swipeIndex] = isMore ? this.pageNo[this.swipeIndex] += 1 : this.pageNo[this.swipeIndex]
      if(!isMore) {
        this.pageNo[this.swipeIndex] = 0
      }
      this.GLOBAL.orderPost(
        "/buyer/order/list",
        { status: status, pageSize: this.pageSize, pageNo: this.pageNo[this.swipeIndex]},
      )
        .then(res => {
          if (res.data.code == 200) {
            if(isMore) {
              this.$set(this.dataList,this.swipeIndex, this.dataList[this.swipeIndex].concat(res.data.data))
            }else{
              if(!res.data.data.length) {
                this.$refs.swipeSlide[this.swipeIndex].pageStatus = 2
              }
              this.$set(this.dataList,this.swipeIndex, res.data.data)
            }
            if(this.dataList[this.swipeIndex].length % this.pageSize != 0) {
              this.$refs.swipeSlide[this.swipeIndex].bottomLineShow = true
            }else {
              this.$refs.swipeSlide[this.swipeIndex].bottomLineShow = false
            }
            this.$refs.swipeSlide[this.swipeIndex]._initScroll()
            this.$refs.swipeSlide[this.swipeIndex].bottomLoadingShow = false
            this.$refs.swipeSlide[this.swipeIndex].topLoadingShow = false
            this.$refs.swipeSlide[this.swipeIndex].topTip = '下拉刷新'
            if(this.$refs.swipeSlide[this.swipeIndex].scroll) {
              this.$refs.swipeSlide[this.swipeIndex].scroll.finishPullUp()
            }
          } else {
            this.$toast.bottom(res.data.msg);
          }
        })
        .catch((err) => {
          this.$toast.bottom("拼团订单请求失败，请稍后再试");
        });
    },
    initSwiper() {
      var _this = this
      this.mySwiper = new Swiper ('.swiper-container', {
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
        on:{
          slideChange: function () {
            // 切换结束时，告诉我现在是第几个slide
            _this.swipeIndex = this.activeIndex
            _this.pageNo[_this.swipeIndex] = 0
            _this.requestList()
          }
        }
      })
    },
    cancelChange(val){//取消
      this.getCancelReason()
      this.isShowCancelReason=true
      this.orderId=val
    },
    deleteChange(val){//删除
      this.deleteOrder(val)
    },
    yesChange(val){
      this.yesReceipt(val)
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
    selectReason(remark,index){
        this.remark=remark
        this.selectReasonType=index
    },
    cancelOrderReasoncancel(){//选择取消订单原因的选择取消
        this.isShowCancelReason=false
    },
    comfirmCancelOrder(){//确定取消订单
        var orderId =this.orderId
        this.GLOBAL.orderPost(
            '/buyer/order/cancel',
            {
                orderId:orderId,
                remark:this.remark
            }
        )
        .then(res=>{
            if (res.data.code==200) {
                this.$toast.bottom("取消成功");
                this.isShowCancelReason=false
                this.requestList(false)
            }else{
                this.$toast.bottom(res.data.msg);
            }
        }).catch(()=>{
            this.$toast.bottom("取消订单错误");
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
                            this.requestList(false)
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
                this.requestList(false)
            }else{
                this.$toast.bottom(res.data.msg);
            }
        }).catch(()=>{
            this.$toast.bottom("确认收货失败");
        })

    },
    goBack(){
        if (localStorage.getItem('_url_')=='/orderlist') {
            WeixinJSBridge.call('closeWindow');
        }else{
            this.$router.go(-1)
        }
    },
  },
  mounted() {
    var _this = this
    this.initSwiper()
    Bus.$on('onchangelist',() => {
      _this.requestList()
    })
    if (window.history && window.history.pushState) {//判断物理返回
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
    }
    this.$nextTick(()=>{
        if (sessionStorage.getItem('orderType')) {
            var  type=sessionStorage.getItem('orderType')
            if (type==0) {
              _this.requestList()
            }else{
              _this.toggle(type)
            }
        }else{
          _this.requestList()
        }
    })
  },
  computed: {
    //计算横线位置
    calcLeft() {
      var tabNum = this.tabList.length
      var lineWidth = 0.88
      var pageWidth = 7.5
      var tabWidth = pageWidth / tabNum
      var left = (tabWidth - lineWidth) / 2 + (this.swipeIndex * tabWidth)
      return left
    }
  },
  components: {
    Split,
    orderList
  },
  destroyed(){
      window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
      sessionStorage.removeItem('orderType')
  },
}

</script>
<style lang='less' scoped>
@import "../../../../assets/css/mixin.less";
.my-group{
  width:7.5rem;
  overflow:hidden;
  .tab{
    .tab();
  }
  .split-box{
    height:0.2rem;
    position:relative;
    z-index:5000;
  }
  .group-list{
    position:absolute;
    bottom:0;
    left:0;
    font-size:0;
    width:7.5rem;
    overflow:hidden;
    .swiper-wrapper{
      height:100%;
      width:7.5rem;
    }
    &.shift {
      transition-property: margin-left;
      transition-duration: 0.6s;
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
        border-bottom: 1px solid #FF060A;
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
        border-top: 1px solid #f2f2f2;
        display: flex;
        .btn{
            width: 50%;
            text-align: center;
            font-size: 0.3rem;

        }
        .btn:nth-of-type(1){
            border-right: 1px solid #f2f2f2
        }
    }
}
</style>
