import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store= new Vuex.Store({
    state:{//
      cart:[],//购物车列表
      addressList:[],//地址列表
      updateAddressId:'',//更新哪一个地址
      selectAddressId:'',//下单选择哪个地址
      searchKeyWord:'',//搜索的关键字
    },
    mutations:{
      addToCart(state,cartList){//保存到store商品信息


        state.cart=cartList
        // var flag = false//是否存在此商品

        // state.cart.some(item=>{
        //   if (item.goodsdId==goodsinfo.goodsdId) {
        //     item.goodsNumber+=parseInt(goodsinfo.goodsNumber)
        //     flag = true
        //   }
        // })

        // if (!flag) {
        //   state.cart.push(goodsinfo)
        // }

      },
      addUpdateNum(state,goodsdId){
        //console.log(goodsdId)
        state.cart.forEach(item=>{
          item.cartList.some(subitem=>{
            if (subitem.goodsdId==goodsdId) {
                if (subitem.num>0) {
                    subitem.num++
                }

            }
          })
        })
      },
      decreaseUpdateNum(state,goodsdId){

        state.cart.forEach(item=>{
          item.cartList.some(subitem=>{
            if (subitem.goodsdId==goodsdId) {
              if (subitem.num<=1) {
                subitem.num=1
              }else{
                subitem.num--
              }


            }
          })
        })
      },
      getIsCheck(state,goodsdId){
        state.cart.forEach(item=>{
          item.cartList.some(subitem=>{
            if (subitem.goodsdId==goodsdId) {
                  if (subitem.isCheck==0) {
                    subitem.isCheck=1
                  }else{
                    subitem.isCheck=0
                  }
            }
          })
        })
      },
      changeAllChecked(state,isCheck){
        state.cart.forEach(item=>{
          item.cartList.some(subitem=>{
            subitem.isCheck=isCheck
          })
        })

      },
      saveAddress(state,address){
        state.addressList=address
        //console.log(state.addressList)
      },
      updateAddress(state,derId){
        state.updateAddressId=derId
      },
      selectAddress(state,derId){
        state.selectAddressId=derId
        //console.log(state.selectAddressId)
      },
      addSearchKeyWord(state,keyWord){//储存搜索关键字
        if (keyWord) {
          state.searchKeyWord=keyWord
        }
      }
    },
    getters:{
      getAllGoodsNumber(state){
        var num =0
        state.cart.forEach(item=>{
          num+=item.cartList.length
        })
        return num
      },
      getGoodsNumber(state){
        var goodsNum ={}
        state.cart.forEach(item=>{
          item.cartList.forEach(subitem=>{
            goodsNum[subitem.goodsdId] = subitem.num
          })
        })
        return goodsNum
      },
      goodsCheck(state){
        var goodsCheck ={}
        state.cart.forEach(item=>{
          item.cartList.forEach(subitem=>{
            goodsCheck[subitem.goodsdId] = subitem.isCheck
          })
        })
        return goodsCheck
      },
      getAllChecked(state){
        var allChecked
        var checkedStr=''
        state.cart.forEach(item=>{
          item.cartList.forEach(subitem=>{
            checkedStr+=subitem.isCheck
          })
        })
        if (checkedStr.indexOf('0')==-1) {
          allChecked=1
        }else{
          allChecked=0
        }
        return allChecked
      },
      getClearGoods(state){
        var cleargoods=[]
        state.cart.forEach(item=>{
          item.cartList.forEach(subitem=>{
            if (subitem.isCheck==1) {
              cleargoods.push(subitem.cartId)
            }
          })
        })
        return cleargoods
      },
      backGoEditAddress(state){
        var updateAddress
        if (state.updateAddressId) {
          state.addressList.forEach(item=>{
            if (item.derId==state.updateAddressId) {
              updateAddress=item
            }
          })
        }
        return updateAddress
      },
      backGoOrderAddress(state){
        var selectAddress
        if (state.selectAddressId) {
          state.addressList.forEach(item=>{
            if (item.derId==state.selectAddressId) {
              selectAddress=item
            }
          })
        }
        return selectAddress
      },
      backSearchKeyWord(state){//返回关键字
          var keyWord=state.searchKeyWord
          return keyWord
      }
    }
  })

export default store