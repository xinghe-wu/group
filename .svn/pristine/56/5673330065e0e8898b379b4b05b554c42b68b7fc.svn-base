<template>
    <div class="editaddress-wrap" :style="{height:clientHeight+'px'}">
        <div class="user-address">
            <div class="edit-user-name editaddress">
                <label class="edit-name-title">收货人</label>
                <input type="text" class="edit-name inputEdit" placeholder="请输入收货人名字" v-model="buyer">
            </div>
            <div class="edit-user-phone editaddress">
                <label class="edit-phone-title">手机号码 +86</label>
                <input type="text" class="edit-phone inputEdit" placeholder="请输入手机号码" v-model="phone">
            </div>
            <div class="edit-user-area editaddress" @click="isPopupVisible">
                <label class="edit-area-title">所在地区</label>
                <p class="edit-area-content">{{myAddressProvince}}{{myAddressCity}}{{myAddresscounty}}</p>
                <span class="nexticon"></span>
            </div>
            <div class="edit-user-address">
                <label  class="edit-address-title">详细地址</label>
                <textarea placeholder="如街道名称、门牌号码、楼层和房间号等" class="edit-address-text" ref="address" @blur="getAddress" :value="address"></textarea>
            </div>
        </div>
        <div class="setDeflut">
            <label>设为默认地址</label>
            <mt-switch v-model="isSwitch"></mt-switch>
        </div>
        <div class="comfirm-btn">
            <div class="save" @click="saveAddress">保存</div>
            <div class="delete" @click="deleteTheAddress">删除</div>
        </div>
        <mt-popup v-model="popupVisible" position="bottom" class="prop-tk" @touchmove.prevent style="width:100%">
            <div class="clR">
                <p @click="cancle">取消</p>
                <p @click="sureMap">确定</p>
            </div>
        <mt-picker ref="pickCom" :slots="slots" @change="onValuesChange" value-key="areaName"   @touchmove.prevent ></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isSwitch:false,
            isMr:'',//是否默认地址
            buyer:'',//用户收货姓名
            address:'',//详细地址
            phone:'',
            token:'',
            popupVisible:false,
            slots:[
                    {
                        flex: 1,
                        defaultIndex: 0,
                        values:[],
                        className: 'slot1',
                        textAlign: 'center',
                    }, {
                        pider: true,
                        content: 'content',
                        // className: 'slot2'
                    }, {
                        flex: 1,
                        values:[],
                        className: 'slot3',
                        textAlign: 'center'
                    }, {
                        pider: true,
                        content: '',
                        // className: 'slot4'
                    }, {
                        flex: 1,
                        values: [],
                        className: 'slot5',
                        textAlign: 'center'
                    }
            ],
                cityData:{},
                myAddressProvince:'',
                myAddressCity:'',
                myAddresscounty:'',
                myAddressProvinceId:'',
                myAddressCityId:'',
                myAddresscountyId:'',
                derId:'',
                clientHeight:0

        }
    },
    methods:{
        getAllArea(){
            var _this=this
            this.GLOBAL.goodsPost(
                '/area/getAllArea',
                {

                }
            )
            .then(res=>{
                if(res.data.code==200){
                    this.cityData=res.data.data
                var arr=[]
                for (var i = 0; i < this.cityData.length; i++) {
                   arr[i]=this.cityData[i].provinceAreaName
                }
                _this.slots[0].values = arr

                }else{
                    this.$toast.bottom(res.data.msg);
                }

            }).catch(()=>{
                this.$toast.bottom("加载失败");
            })
        },
        saveAddress(){
            if (this.judgeDataFormat()) {
                if (this.derId) {
                    this.GLOBAL.crmPost(
                        '/user/deliver/update',
                        {
                            provinceId:this.myAddressProvinceId,
                            cityId:this.myAddressCityId,
                            areaId:this.myAddresscountyId,
                            derId:this.derId,
                            buyer:this.buyer,
                            address:this.address,
                            phone:this.phone,
                            isMr:this.isMr,
                        }
                    )
                    .then(res=>{
                        if (res.data.code==200) {
                            this.$toast.bottom("更新成功");
                            this.$router.replace('/address')
                        }else{
                            this.$toast.bottom(res.data.msg);
                        }
                    }).catch(()=>{
                        this.$toast.bottom("保存失败");
                    })
                }else{
                    this.GLOBAL.crmPost(
                        '/user/deliver/add',
                        {
                            provinceId:this.myAddressProvinceId,
                            cityId:this.myAddressCityId,
                            areaId:this.myAddresscountyId,
                            derId:this.derId,
                            buyer:this.buyer,
                            address:this.address,
                            phone:this.phone,
                            isMr:this.isMr,
                            typeId:1
                        }
                    )
                    .then(res=>{
                        if (res.data.code==200) {
                            this.$toast.bottom("保存成功");
                            this.$router.replace('/address')
                        }else{
                            this.$toast.bottom(res.data.msg);
                        }
                    }).catch(()=>{
                        this.$toast.bottom("保存失败");
                    })
                }

            }
        },
        isPopupVisible(){
            if (this.popupVisible) {
                this.popupVisible=false
            }else{
                this.popupVisible=true
            }
        },
        onValuesChange(picker,values){//滚动变化改变选择的地区
        if (values[2]) {
            var areas=values[2].areas
        }
            if(this.cityData!={}){
                for (var i = 0; i < this.cityData.length; i++) {
                    if (this.cityData[i].provinceAreaName==values[0]) {
                       picker.setSlotValues(2, this.cityData[i].cities);
                       picker.setSlotValues(4, areas)
                    }
                }
            }

        },
        cancle(){//取消选择地区
            this.popupVisible = false;
        },
        sureMap(){//选择地区确定
            this.popupVisible = false;
            var cityList=this.$refs.pickCom.getValues()
            this.myAddressProvince = cityList[0];
             this.cityData.forEach(item => {
                if (item.provinceAreaName==cityList[0]) {
                   this.myAddressProvinceId=item.provinceAreaId
                }
            });
            this.myAddressCity = cityList[2].areaName;
            this.myAddresscounty = cityList[4].areaName;
            this.myAddressCityId = cityList[2].areaId;
            this.myAddresscountyId = cityList[4].areaId;
        },
        judgeDataFormat(){//判断输入内容
            if (!this.buyer) {
                this.$toast.bottom("请输入收货人");
            }else if(!this.phone){
                this.$toast.bottom("请输入手机号码");
            }else if (!this.myAddressProvince || !this.myAddressCity) {
                this.$toast.bottom("省市区信息有误,请重新选择");
            }else if(!this.address){
                this.$toast.bottom("请输入详细地址");
            }else{
                return true
            }
        },
        getAddress(){
            this.address=this.$refs.address.value
        },
        deleteTheAddress(){
            if (this.derId) {
                this.GLOBAL.crmPost(
                    '/user/deliver/del',
                    {
                       derId:this.derId
                    }
                )
                .then(res=>{
                    if (res.data.code==200) {
                        this.$toast.bottom("删除成功");
                        this.$router.replace('/address')
                    }else{
                        this.$toast.bottom(res.data.msg);
                    }
                }).catch(()=>{
                    this.$toast.bottom("删除失败");
                })
            }else{
                this.$toast.bottom("暂无地址需要删除,请添加");
            }

        }

    },
    mounted(){
        this.token=localStorage.getItem('_token_')
        this.getAllArea()
        if (this.$store.getters.backGoEditAddress) {
            var updateAddress =this.$store.getters.backGoEditAddress
            this.buyer=updateAddress.buyer
            this.address=updateAddress.address
            this.isMr=updateAddress.isMr
            //////console.log(updateAddress.isMr)
            this.derId=updateAddress.derId
            this.phone=updateAddress.phone
            this.myAddressProvinceId=updateAddress.provinceId
            this.myAddressCityId=updateAddress.cityId
            this.myAddresscountyId=updateAddress.areaId
            this.myAddressProvince=updateAddress.provinceName
            this.myAddressCity=updateAddress.cityName
            this.myAddresscounty=updateAddress.areaName
        }
        this.clientHeight=document.documentElement.clientHeight//获取屏幕高度
    },
    watch:{
        isSwitch(){
            if (this.isSwitch) {
                this.isMr='Y'
            }else{
                this.isMr='N'
            }
        },
        isMr(){
            if (this.isMr=='N') {
                this.isSwitch=false
            }else{
                this.isSwitch=true
            }
        }
    }
}
</script>
<style lang="less" scoped>
.editaddress-wrap{
    width: 7.5rem;
    margin: 0 auto;
    background-color: #F2F0F0;
    color: #6D6D6D;
    font-size: 0.28rem;
    .user-address{
        width: 90%;
        padding: 0 5%;
        background-color: #ffffff
    }
    .editaddress{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:0.02rem solid #F2F0F0;
    }
    .inputEdit{
        text-align:right;
        width:70%;
        height: 0.64rem;
        outline: medium;
    }
    .edit-user-area{
        .nexticon{
            width: 0.4rem;
            height: 0.4rem;
            display: block;
            background: url('../../../../../static/img/right.png') no-repeat;
            background-size: cover;
        }
        .edit-area-content{
            width: 70%;
            line-height: 1rem;
            height: 1rem;
            text-align: right;
        }

    }
    .edit-user-address{
            width:100%;
            height: auto;
            display: flex;
            padding-top: 0.2rem;
            .edit-address-title{
                height: 100%;
                display: block;
                margin-top: 0.05rem;
                margin-right: 0.1rem;
            }
            .edit-address-text{
                width: 80%;
                height: 1.2rem;
                border: 0;
                outline: medium;
            }
    }
    .setDeflut{
        width: 90%;
        padding: 0 5%;
        background-color: #ffffff;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.1rem;
    }
    .comfirm-btn{
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #ffffff;
        color: #ffffff;
        margin-top: 0.3rem;
        .save{
            width: 2rem;
            height: 0.8rem;
            background-color: #F0163F;
            border-radius: 0.4rem;
            line-height: 0.8rem;
            text-align: center
        }
        .delete{
            width: 2rem;
            height: 0.8rem;
            color: #F0163F;
            border-radius: 0.4rem;
            border: 1px solid #F0163F;
            line-height: 0.8rem;
            text-align: center
        }
    }
}
.clR{
    display: flex;
    justify-content: space-around;
    height: 1rem;
    align-items: center;
}
</style>
