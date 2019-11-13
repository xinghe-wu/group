<template>
    <div class="search-wrap">
        <div class="search-top">
            <div class="input">
                <span class="input-icon"></span>
                <input type="search" placeholder="搜索商品名/商家/分类" v-model="searchValue" class="input-content" ref="search" @keyup.enter="searchGoods">
            </div>
            <div class="cancel input-btn" v-if="!searchValue" @click="goBack">取消</div>
            <div class="search input-btn" v-if="searchValue" @click="searchGoods">搜索</div>
        </div>
        <div class="search-history" v-if="historyData.length">
            <div class="search-history-title">
                <p>历史记录</p>
                <p class="delete" @click="deleteHistory">删除</p>
            </div>
            <div class="search-history-tontent">
                <span class="history-item" v-for="(item, index) in historyData" :key="index" @click="selectHistory(item)">{{item}}</span>
            </div>

        </div>
        <div class="hot-search">
            <div class="hot-search-title">
                <p>热门搜索</p>
            </div>
            <div class="hot-search-tontent">
                <span class="history-item" v-for="item in hotKeyWord" :key="item">{{item}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchValue:'',
            historyData:[],
            hotKeyWord:[],
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        },
        searchGoods(){
            this.historyData.push(this.searchValue);
            this.$store.commit('addSearchKeyWord',this.searchValue)//存到store
            var historyStr=JSON.stringify(this.historyData)
            sessionStorage.setItem('historyData',historyStr)
            this.$router.push('/searchdetail')
        },
        selectHistory(key){
            this.$store.commit('addSearchKeyWord',key)//存到store
            this.$router.push('/searchdetail')
        },
        getHotKey(){
            this.GLOBAL.goodsPost(
                '/goods/hotList',
                {

                }
            )
            .then((res)=>{
                if (res.data.code==200) {
                    this.hotKeyWord=res.data.data
                }else{
                    this.$toast.bottom(res.data.msg);
                }
            }).catch(()=>{
                this.$toast.bottom("请求热搜关键字失败");
            })
        },
        deleteHistory(){
            sessionStorage.removeItem('historyData')
            this.historyData=[]
        }
    },
    mounted(){
        if (sessionStorage.getItem('historyData')) {
            this.historyData=JSON.parse(sessionStorage.getItem('historyData'))
        }
        this.getHotKey()
    }
}
</script>
<style lang="less" scoped>
    .search-wrap{
        font-size: 0.24rem;
        color: #6D6D6D;
        width: 7.5rem;
        margin: 0 auto;
        height: 1rem;
        .search-top{
            width: 94%;
            padding: 0 3%;
            height: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
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
                top: 0.1rem;
                left: 0.3rem;;
            }
            .input{
                position: relative;
            }
        }
        .search-history{
            width: 100%;
            height: auto;
            padding: 0.1rem 0;

            border-bottom: 0.1rem solid #f2f2f2;
            .search-history-title{
                width: 94%;
                padding: 0 3%;
                display: flex;
                height: 0.6rem;
                justify-content: space-between;
                align-items: center;
                font-size: 0.32rem;
                .delete{
                    width: 1rem;
                    text-align: center;
                }
            }
            .search-history-tontent{
                width: 94%;
                padding: 0 3%;
                display: flex;
                flex-wrap: wrap;
                .history-item{
                    min-width: 10%;
                    height: 0.6rem;
                    margin: 0.1rem 4%;
                    padding: 0 1%;
                    line-height: 0.6rem;
                    text-align: center;
                    background-color: #DFDFDF;;
                    border-radius: 0.1rem;
                }
            }
        }
        .hot-search{
            .hot-search-title{
                width: 94%;
                padding: 0 3%;
                display: flex;
                height: 0.6rem;
                justify-content: start;
                align-items: center;
                font-size: 0.32rem;
            }
            .hot-search-tontent{
                width: 94%;
                padding: 0 3%;
                display: flex;
                flex-wrap: wrap;
                .history-item{
                    min-width: 12%;
                    height: 0.6rem;
                    margin: 0.1rem 4%;
                    line-height: 0.6rem;
                    text-align: center;
                    background-color: #DFDFDF;;
                    border-radius: 0.1rem;
                }
            }
        }
    }
</style>
