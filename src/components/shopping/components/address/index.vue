<template>
    <div class="address-wrap" :style="{'min-height':countHeight+'px'}">
        <div class="address-list-item" v-if="addressList" v-for="item in addressList" :key="item.derId" @click="selectAdress(item.derId)">
                <div class="userinfo">
                    <p class="user-name">{{item.buyer}}</p>
                    <p class="user-phone">{{item.phone}}</p>
                </div>
                <div class="user-address clear">
                    <span class="default" v-if="item.isMr=='Y'">默认</span>
                    {{item.provinceName}} {{item.cityName}} {{item.areaName}} {{item.address}}
                </div>
                <div class="option clear">
                    <div class="default-address" v-if="item.isMr=='Y'">
                        <span>√</span>
                        <p>默认地址</p>
                    </div>
                    <div class="delete" @click.stop="editAddressData(item.derId)">
                        <i></i>
                        <span>编辑</span>
                    </div>
                </div>
        </div>
        <div class="add-address-btn" @click="goEditAddress">添加新地址</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            token:'',
            addressList:null,
            countHeight:document.documentElement.clientHeight
        }
    },
    methods:{
        getUserAddressList(){
            this.axios({
                method:"get",
                url:this.GLOBAL.crmHost+'/user/deliver/list?token='+this.GLOBAL.token+'&typeId=1'
            })
            .then(res=>{
                if (res.data.code==200) {
                    this.addressList=res.data.data
                    this.$store.commit('saveAddress',this.addressList)
                }else{
                   this.$toast.bottom(res.data.msg);
                }

            }).catch(()=>{
                this.$toast.bottom("加载失败");
            })
        },
        goEditAddress(){//添加地址
            this.$store.commit('updateAddress','')
            this.$router.replace('/editaddress')

        },
        editAddressData(derId){
            this.$store.commit('updateAddress',derId)
            this.$router.replace('/editaddress')
        },
        selectAdress(derId){
            this.$store.commit('selectAddress',derId)
            this.$router.replace('/order/createorder')
        },

    },
    mounted(){
        this.token=localStorage.getItem('_token_')
        this.getUserAddressList()
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
    .address-wrap{
        width: 7.5rem;
        margin: 0 auto;
        background-color: #F2F0F0;
        color: #090909;
        font-size: 0.3rem;
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
            .address-list-item{
                width: 6.9rem;
                background-color: #ffffff;
                margin: 0 auto;
                margin-top: 0.2rem;
                margin-bottom: 0.1rem;
                .userinfo{
                    width: 90%;
                    height: auto;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    font-weight: 700;
                    text-align: center;
                    .user-name{
                        max-width: 50%;
                        height: 1rem;
                        line-height: 1rem;
                        overflow: hidden;
                    }
                    .user-phone{
                        max-width: 50%;
                        height: 1rem;
                        line-height: 1rem;
                        overflow: hidden;
                    }
                }
                .user-address{
                    width: 90%;
                    margin: 0 auto;
                    color: #646464;
                    font-size: 0.27rem;
                    line-height: 0.52rem;
                    padding-bottom: 0.16rem;
                    border-bottom: 0.02rem solid #F7F7F7;
                    .default{
                        float: left;
                        width: 0.8rem;
                        height: 0.3rem;
                        line-height: 0.3rem;
                        color: #ffffff;
                        font-size: 0.2rem;
                        text-align: center;
                        background-color: #E31436;
                        border-radius:0.15rem;
                        vertical-align:middle;
                        margin-top:0.11rem
                    }
                    .home{
                        float: left;
                        width: 0.6rem;
                        height: 0.3rem;
                        line-height: 0.3rem;
                        color: #ffffff;
                        font-size: 0.2rem;
                        text-align: center;
                        background-color: #5D5D5D;
                        border-radius:0.15rem;
                        margin-left:0.05rem;
                        margin-right:0.05rem;
                        vertical-align:middle;
                        margin-top:0.11rem
                    }
                }
                .option{
                    width: 90%;
                    margin: 0 auto;
                    height: 0.94rem;
                    line-height: 0.94rem;
                    .default-address{
                        color: #090909;
                        font-size: 0.26rem;
                        float: left;
                        display: flex;
                        align-items: center;
                        height: 0.94rem;
                        line-height: 0.94rem;
                        span{
                            width: 0.4rem;
                            height: 0.4rem;
                            background-color: #090909;
                            color: #ffffff;
                            text-align: center;
                            line-height: 0.4rem;
                            display: block;
                            border-radius: 0.2rem;
                            font-size: 0.2rem;
                            margin-right: 0.17rem;
                        }
                    }
                    .delete{
                        float: right;
                        color: #090909;
                        font-size: 0.26rem;
                         display: flex;
                        align-items: center;
                        height: 0.94rem;
                        line-height: 0.94rem;
                        i{
                            width: 0.32rem;
                            height: 0.32rem;
                            display: block;
                            background: url('../../../../../static/img/edit.png') no-repeat;
                            background-size: cover;
                            margin-right: 0.2rem;
                        }
                    }
                }
            }
            .add-address-btn{
                width: 6.9rem;
                height: 0.92rem;
                line-height: 0.92rem;
                background-color: #FB0F52;
                text-align: center;
                color: #ffffff;
                font-size: 0.32rem;
                border-radius: 0.46rem;
                margin-top: 1rem;
            }
    }
</style>
