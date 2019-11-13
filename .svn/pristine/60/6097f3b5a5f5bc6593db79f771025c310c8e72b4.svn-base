<template>
    <div class="header-wrap" :class="Fixed == true ? 'Fixed' : ''">
        <div class="search-wrap">
            <span class="search-icon"></span>
            <input type="text" placeholder="搜索寻找你想要的商品/商家" readonly class="search-text" @click="goToSrarch">
        </div>
    </div>
</template>
<script>
export default {
    props:{
        Fixed:{
            type:Boolean,
        }
    },
    data() {
        return {

        }
    },
    methods:{
        goToSrarch(){
            this.$router.push('/search')
        },
    }
}
</script>
<style lang="less" scoped>
.header-wrap{
    width: 7.5rem;
    margin: 0 auto;
    height: 0.88rem;
    background-color: #FB0F52;
    font-size: 0.28rem;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding-top: 0;
    z-index: 100;
    .search-wrap{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        .search-text{
            padding-left: 0.65rem;
            height: 0.57rem;
            width: 5.08rem;
            font-size: 0.26rem;
            border-radius: 0.285rem;
        }
    }
}
.Fixed{
    position: fixed!important
}
</style>
