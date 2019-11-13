<template>
     <div class="noGoodsListsData">
            <div class="noGoodsListsData-icon">
                <img src="../../../../../static/img/nogoodsshowimg.png" alt="">
            </div>
            <p class="noGoodsListsData-text">支付成功</p>
            <p class="paySuccess-icon">

            </p>
            <div class="checkOrder" @click="checkOrder">
                查看订单
            </div>
        </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods:{
        checkOrder(){
            this.$router.push('/orderlist')
        },
        goToHome(){
            setTimeout(()=>{
                this.$router.push('/home')
            },5000)
        }
    },
    mounted(){
        this.goToHome()
    }
}
</script>
<style lang="less" scoped>
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
    .paySuccess-icon{
        width: 0.7rem;
        height: 0.7rem;
        background: url('../../../../../static/img/success.png') no-repeat;
        background-size: cover;
    }
    .checkOrder{
        width: 6rem;
        height: 0.9rem;
        background: url('../../../../../static/img/checkorder.png') no-repeat;
        background-size: cover;
        color: #ffffff;
        font-size: 0.32rem;
        text-align: center;
        line-height: 0.9rem;
        margin-top: 1rem;
    }

}
</style>
