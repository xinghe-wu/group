<template>
    <div class="home">
        <div v-for="(itmeData,index) in indexData" :key="index">
            <Header v-if="openId!=''" :Fixed="Fixed"></Header>
            <Swiper :floorIndex="index" :imgTextData="itmeData" v-if="itmeData.typeId==6 && openId!=''"></Swiper>
            <margin-line :marginCount="itmeData.hdCount" v-if="itmeData.typeId==11 && openId!=''"></margin-line>
            <v-title :titleData="itmeData" v-if="itmeData.typeId==13 && itmeData.floorId!=14 && openId!=''"></v-title>
            <Goods :goodsData="itmeData" v-if="itmeData.typeId==8"></Goods>
        </div>
    </div>
</template>
<script>
import Swiper from '../../components/swiper'
import Title from '../../components/title'
import Goods from '../../components/goods.vue'
import MarginLine from '../../components/split'
import Header from '../../components/header'
export default {
    data() {
        return {
            imgTextData:null,
            marginCount:0,
            titleData:null,
            goodsData:null,
            openId:'',
            indexData:[],
            Fixed:false
        }
    },
    components:{
        Swiper:Swiper,
        "margin-line":MarginLine,
        "v-title":Title,
        "Goods":Goods,
        Header
    },
    mounted(){
        this.getAllData()
        if (window.history && window.history.pushState) {//判断物理返回
            history.pushState(null, null, document.URL);
            window.addEventListener('popstate', this.goBack, false);
        }
        window.addEventListener('scroll', this.handleScroll)
    },
    created(){
        sessionStorage.setItem('message',JSON.stringify('home'))
    },
    methods:{
        getAllData(){
                this.openId=sessionStorage.getItem('openId')
                this.GLOBAL.crmPost(
                    '/temp/index',
                    {
                        typeId:900,
                        pageNum:0
                    }
                )
                .then(res=>{
                    if (res.data.code==200) {
                        var data=res.data.data;
                        this.indexData=data
                        // var picdata=[]
                        // var titledata=[]
                        // var goodsdata=[]
                        // for (var i = 0; i < data.length; i++) {
                        //     if (data[i].typeId==6) {
                        //         picdata.push(data[i])
                        //     }
                        //     if (data[i].typeId==11) {
                        //         this.marginCount=data[i].hdCount
                        //     }
                        //     if (data[i].typeId==13) {
                        //         titledata.push(data[i])
                        //     }
                        //     if (data[i].typeId==8 || data[i].typeId==7 || data[i].typeId==9) {
                        //         goodsdata.push(data[i])
                        //     }

                        // }
                        // this.imgTextData=picdata[0]
                        // this.titleData=titledata[0]
                        // this.goodsData=goodsdata[0]

                    }else{
                        this.$toast.center(res.data.msg);
                    }

                }).catch(()=>{
                    this.$toast.center("请求楼层组件错误");
                })
        },
        goBack(){
            this.navigate()
        },
        //H5页面js
        navigate() { //控制页面跳转---小程序、公众号、非微信跳转方式 【modelName---vue路由名字】
            this.isMiniProgram((res)=>{//判断是否是小程序页面的回调函数
                if (res) {//小程序页面
                    this.$wx.miniProgram.switchTab({url: '/pages/personal/main'});
                } else {
                    WeixinJSBridge.call('closeWindow');//非小程序页面使用vue路由跳转
                    AlipayJSBridge.call('closeWindow')
                }
            })
        },
        isMiniProgram(callback) { //是否为小程序环境
            //是否在微信环境
            if (sessionStorage.getItem('UA')=='alipay') {
                callback(false);
            } else {
                //微信API获取当前运行环境
                this.$wx.miniProgram.getEnv((res) => {
                    if (res.miniprogram) {//小程序环境
                        callback(true);
                    } else {
                        callback(false);
                    }
                })
            }
        },
        handleScroll () {//滚动事件监听执行的方法
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > 0) {
                this.Fixed = true
            } else if (scrollTop <=0){
                this.Fixed = false
            }
        },
    },
    beforeDestroy(){
        this.openId=''
        window.removeEventListener('popstate', this.goBack, false);//false阻止默认事件
    }
}
</script>
<style lang="less" scoped>
    .home{
        width: 7.5rem;
        margin: 0 auto;
        padding-bottom: 1.05rem;
        padding-top: 0.88rem;
    }
</style>
