<template>
    <div class="floor-nav">
        <div class="text-navigation" style="height:40px" :class="setSilide()" v-if="goodsStyle==2">
            <div class="navigation-item" v-for="(item,index) in navLists" :key="index" :style="countTextNavHeight()" :class="lineBetween()">
                <a href="javascript:" class="link">
                    {{item.goodsName}}
                </a>
            </div>
        </div>
        <div class="pic-navigation">
            <div class="navigation-item" v-for="(item,index) in navLists" :key="index" >
                <a href="javascript:" class="link">
                    <div class="showNavImg" :style="countpicNavWidth()">
                        <img v-lazy="item.goodsImg" alt="">
                    </div>
                    <p>{{item.goodsName}}</p>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        picTextNavData:{
            type:Object
        }
    },
    data() {
        return {
            navLists:this.picTextNavData.detail,//数据列表
            navWidth:0,//每个导航宽度
            orderWidth:document.body.clientWidth,//设备宽度
            navHeight:0,//每项父元素盒子的宽度
            hdType:0,//判断是否滑动
            hdCount:4,//设置展示导航个数
            goodsStyle:1,//this.picTextNavData.goodsStyle,
        }
    },
    mounted(){


    },
    methods:{
        countpicNavWidth(){//计算导航每项的宽度高度
            this.isHdType()
            var img= new Image()
            img.src=this.picTextNavData.detail[0].goodsImg
            var _that=this;
            img.onload=function () {
                _that.navHeight =img.height/(img.width/_that.navWidth)

            }
            return `height:${_that.navHeight/50}rem;width:${this.navWidth/50}rem`
        },
        countTextNavHeight(){
            this.isHdType()
            return `width:${this.navWidth/50}rem`
        },
        isHdType(){//判断是固定导航还是滑动时的导航宽度
            if (this.hdType==0) {//如果是固定导航
                this.navWidth=this.orderWidth/this.picTextNavData.detail.length
            }else{//选择滑动
                switch (this.hdCount) {//判断每屏显示几个
                    case 4:this.navWidth = this.orderWidth * 0.3125//相当于屏幕的32.25%
                        break;
                    case 5:this.navWidth = this.orderWidth * 0.25
                        break;
                    case 6:this.navWidth = this.orderWidth * 0.19
                        break;
                    case 7:this.navWidth = this.orderWidth * 0.1625
                        break;
                    case 8:this.navWidth = this.orderWidth * 0.14
                        break;
                    case 9:this.navWidth = this.orderWidth * 0.125
                        break;
                    case 10:this.navWidth = this.orderWidth * 0.11
                        break;
                    default:this.navWidth = this.orderWidth * 0.3125
                        break;
                }
            }
        },
        lineBetween(){//滑动时的分割线
            if (this.hdType==0) {
                return
            }else{
                return "line-between"
            }
        },
        setSilide(){//是否设置滑动
            if (this.hdType==0) {
                return
            }else{
                return "setSilide"
            }
        },

    }
}
</script>
<style lang="less" scoped>
    .floor-nav{
        width: 100%;
        height: auto;
        font-size: 0.24rem
    }
    .text-navigation{
        display: flex;
        align-items: center;
        text-align: center
    }
    .navigation-item{
        overflow: hidden;
        white-space:nowrap;
        &:last-of-type {
            border-right: 0;
        }
    }
    .line-between{
        border-right:0.01rem solid #eeeeee;
        box-sizing: border-box;
    }
    .setSlide{
        width:100%;
        display: inline;
        white-space: nowrap;/*规定段落中的文本不进行换行*/
        float:left;/*一定要设置左侧浮动*/
        overflow-y:hidden;/*竖直方向，超出部分隐藏*/
        div{
            display: inline-block;
        }
    }
    .pic-navigation{
        display: flex;
        align-items: center;
        text-align: center;
        p{
            color:#333333;
            line-height: 40px
        }
    }
    .showNavImg{
        width: 100%;
        height: 70%;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%
        }
    }
    .link{
        display: block;
        height: 100%;
    }

</style>
