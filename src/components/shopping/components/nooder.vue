<template>
     <div class="noGoodsListsData">
            <div class="noGoodsListsData-icon">
                <img src="../../../../static/img/nogoodsshowimg.png" alt="">
            </div>
            <p class="noGoodsListsData-text">你还没有相关订单</p>
            <p class="to-navigation">
                可以去商城逛逛
            </p>
        </div>
</template>
<script>
export default {

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
