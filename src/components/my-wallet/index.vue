<template>
    <div>
        <div class="mywallet-wrap">
            <!-- <div class="mywallet-tabbar">
                <div class="tab-item" v-for="(item,index) in tabItemTitle" :class="{tabActive:ownCard==index}" @click="toggletab(index)">
                    {{item}}
                </div>
            </div> -->
            <div class="mywallet-main-wrap" ref="f">
                <div class="wallet-balance">
                    <div class="wallet-card">
                        <p class="balance">喜豆余额</p>
                        <p class="balanceNumber">{{balance}}</p>
                        <p class="icon-circle"></p>
                        <p class="icon-square"></p>
                    </div>
                </div>
            </div>
            <!-- 交易明细 -->
            <div class="wallet-details-wrap">
                <div class="wallet-details-title" ref="s">
                    交易明细
                </div>
                <div class="wallet-details-lists" :style="{height: listHeight+'px'}">
                <scroller  ref="myscroller" :on-refresh="refresh" :on-infinite="infinite" :noDataText="noDataText" style="height:100%">
                    <div class="details-lists-item" v-for="(item,index) in detailLists" :key="index">
                        <div class="details-item-left">
                            <div class="details-item-name">
                                {{item.custNameG}}
                            </div>
                            <div class="details-item-date">
                                {{item.dealTime}}
                            </div>
                        </div>
                        <div class="details-item-right">
                            <div class="details-item-getxidounumber">
                                {{item.dealMoney}}
                            </div>
                        </div>
                    </div>
                    </scroller>
                </div>
                <div class="nodata" v-if="isNoData">
                    <div class="nodataimg"><img src="../../../static/img/nodata.png" alt=""></div>
                    <p>暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //tabItemTitle:["喜豆"],//控制tab的切换的个数
            //ownCard:0, //控制选到tab的样式
            //isShowTab:0//切换不同的组件
            balance:'',//账号余额
            token:'',//用户token
            pageNo:0,//页数
            pageSize:10,//每页数据数
            balanceType:2,//请求余额类型:喜豆
            detailLists:[//交易明细数据列表

            ],
            noDate:false,
            clientHeight:document.documentElement.clientHeight,
            noDataText:'我是有底线的',
            isNoData:false,
            listHeight:0,
            from:this.$route.query.from
        }
    },

    mounted(){
        this.getDataLists()
        if (window.history && window.history.pushState) {//判断物理返回
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
        }
        this.count()
    },
    methods:{
        count(){
            var fh=this.$refs.f.offsetHeight
            var sh=this.$refs.s.offsetHeight
            var listHeight=this.clientHeight-(fh+sh)
            this.listHeight=listHeight
        },
        getDataLists(){
            var _that=this
            this.GLOBAL.crmPost(
                '/cater/myPackage/balance',
                {
                    pageNo:_that.pageNo,
                    pageSize:_that.pageSize,
                    balanceType:_that.balanceType
                }
            )
            .then(res=>{
                if (res.data.code==200) {
                    _that.balance=res.data.data.balance
                    if(res.data.data.dealList.length<10){
                            _that.noDate=true;
                        }else{
                            _that.noDate=false;
                        }
                        // 判断是下拉刷新还是上拉加载
                        if(_that.pageNo==0){
                            _that.detailLists = res.data.data.dealList;
                        }else{
                            _that.detailLists=_that.detailLists.concat(res.data.data.dealList);
                        }
                }else if (res.data.code==201) {
                    localStorage.clear()
                    window.Location.replace='https://tt.mylmyx.com/#/'+localStorage.getItem('_url_')
                }
            }).catch(()=>{
                this.$toast.center("请求消费明细错误");
            })
        },
        refresh(){
         this.pageNo=0;//重置页数刷新每次页数都是第一页
         this.noDate=false;//重置数据判断
          setTimeout(function(){
              this.getDataLists();
              this.$refs.myscroller.finishPullToRefresh();//刷新完毕关闭刷新的转圈圈
          }.bind(this),1700)
        },
   // 上拉加载
        infinite(done){
            if(!this.noDate){
                setTimeout(() => {
                    this.pageNo++;//下拉一次页数+1
                    this.getDataLists();
                    done();//进行下一次加载操作
                }, 1500);
            }else
            {
                this.$refs.myscroller.finishInfinite(true);//这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
            }
        },
        goBack(){
            if (this.from=='my') {
                this.$router.go(-1)
            }else{
                WeixinJSBridge.call('closeWindow');
            }
        },
    },
    watch:{
        detailLists:function () {
            if (this.detailLists.length<=0) {
                this.isNoData=true
                this.noDataText=''
            }
        }
    },
    beforeDestroy(){
        this.openId=''
        window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
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
/* .tabActive{
    color: #000000 !important;
    border-bottom: 0.04rem solid #cf3327
}
.mywallet-wrap{
    width: 100%;
    height: auto
}
.mywallet-tabbar{
    width: 100%;
    border-top: 0.02rem solid #f5f5f5;
    display: flex;
    justify-content: space-around
}
.tab-item{
    width: 1.2rem;
    height: 0.88rem;
    text-align: center;
    font-size: 0.3rem;
    line-height: 0.88rem;
    box-sizing: border-box;
    color: #999999
} */

.mywallet-main-wrap{
    width: 100%;
    height: auto
}
.wallet-balance{
    width: 100%;
    height: auto;
    background-color: #f5f5f5;
    padding: 0.5rem 0
}
.wallet-card{
    width: 6.5rem;
    height: 3rem;
    background-color: #cf3327;
    margin: 0 auto;
    border-radius:0.1rem;
    position: relative;
    color: #ffffff;
    overflow: hidden;

}
.wallet-card .balance{
    font-size: 0.24rem;
    position: absolute;
    top: 1.14rem;
    left:0.8rem;
    color: #f1c2bf

}
.wallet-card .balanceNumber{
    font-size: 0.45rem;
    font-weight: 400;
    position: absolute;
    top: 1.78rem;
    left:0.8rem
}

.icon-circle{
    width: 3.5rem;
    height: 3.5rem;
    background-color: #c63125;
    position: absolute;
    left: 3.8rem;
    top: -0.2rem;
    border-radius: 50%;
    transform: rotate(-60deg)
}
.icon-square{
    width: 1.2rem;
    height: 1.2rem;
    background-color: #cf3327;
    position: absolute;
    right: 0.4rem;
    top: 0.9rem;
    transform: rotate(-30deg)
}

/* 明细列表 */
.wallet-details-wrap{
    width: 6.9rem;
    height: auto;
    min-height: 7rem;
    margin: 0 auto;
    color: #333333;
    position: relative;
}
.wallet-details-title{
    width: 100%;
    height:1rem;
    line-height: 1rem;
    box-sizing: border-box;
    font-size: 0.3rem;
    text-align: center;
    border-bottom: 0.02rem solid #f2f2f2;
    font-weight: 500;

}
.wallet-details-lists{
    width: 100%;
    position: relative;
}
.details-lists-item{
    width: 100%;
    height: 1rem;
    box-sizing: border-box;
    border-bottom: 1px solid #f2f2f2;
    font-size: 0.27rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.details-item-left{
    width: 40%;
    margin-left:  0.2rem;
    .details-item-name{
        width: 100%;
        height: 0.36rem;
        line-height: 0.36rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .details-item-date{
        font-size: 0.18rem;
        color: #999999;
        line-height: 0.30rem
    }
}

.details-item-right{
    text-align: center;
    width: 1.8rem;
    float: right;
    margin-left:0.2rem;
    .details-item-getxidounumber{
        font-size: 0.30rem;
        line-height: 1rem
    }

}
// 暂无数据

.nodata{
    position: absolute;
    top: 0;
    left: 2.5rem;
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    font-size: 0.3rem;
    color: #8a8a8a;
    text-align: center;
    margin-top: 2rem;
    p{
        margin-top: 0.2rem;
        font-size: 0.24rem
    }
}


</style>
