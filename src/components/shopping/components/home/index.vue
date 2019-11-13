<template>
  <div>
    <router-view></router-view>
    <Tabbar :atPath="atPath" v-if="!isMiniprogram"></Tabbar>
  </div>
</template>
<script>
import Tabbar from '../tabbar'
export default {
    data() {
      return {
        isShowShopCart:true,
        atPath:this.$path,
        isMiniprogram:false
      }
    },
    methods:{
      goToShopCart(){
         this.$router.push("/home/shoppingcart");
      },
      deleteHistoryUrl(){
        window.history=null
      },

    },
    mounted(){

    },

    watch:{
      $route (to,from,next){
        this.atPath=to.path
        if (to.path=='/home/shoppingcart') {
            this.isShowShopCart=false
        }else{
          this.isShowShopCart=true
        }
      }
    },
    mounted(){
      if (sessionStorage.getItem('toPath')=='/home/shoppingcart') {
        this.isShowShopCart=false
      }else{
        this.isShowShopCart=true
      }

    },
    components:{
      Tabbar
    }

}
</script>
<style lang="less" scoped>
.suspend-shoppingcart{
  width: 0.8rem;
  height: 0.8rem;
  position: fixed;
  bottom: 1rem;
  right: 0.4rem;
  overflow: hidden;
  text-align:center;
  border-radius: 0.4rem;
  -moz-box-shadow:5px 0px 11px #333333;
  -webkit-box-shadow:5px 0px 11px #333333;
   box-shadow:5px 0px 11px #333333;
  img{
    width: 80%;
    height: 80%;
    display: block;
    font-size: 0;
    margin: 0.1rem auto;
    line-height: 0.8rem;
  }
}
.cartGoodsNumber{
  position: absolute;
  top: 0;
  right:0
}
</style>
