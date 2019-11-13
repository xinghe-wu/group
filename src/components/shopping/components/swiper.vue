<template>
  <div class="picShow-wrap" ref="picShow">
      <!-- 显示轮播效果 -->
    <div :class="'swiper-container'+floorIndex" class="swiper-container" v-if="goodsStyle==1">
        <div class="swiper-wrapper">
            <div v-for="(item,index) in arrItem" class="swiper-slide" :key="index" ref="pt" :class="spaceWhite()" :style="{height:countfirstHeight()}" @click="goToGoodsdetail(item.goodsUrl)">
                <img class="img" :src="item.goodsImg" :style="countBannerHeight(item.goodsImg)">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" v-show="arrItem.length>1"></div>
    </div>
    <div class="colpic" v-if="goodsStyle==2">
        <div v-for='(item,index) in arrItem'  :key="index">
            <img v-lazy="item.goodsImg" alt="" class="img" :style="{height:countImgHeight(item.compImgHeight,item.compImgWidth)}">
        </div>
    </div>
    <!-- 滑动 -->
    <div class="slide-wrap clear" :style="{height:countSlideWidth()}" v-if="goodsStyle==3">
        <div class="slide">
          <div v-for='(item,index) in arrItem'  :key="index" :style="{height:countSlideWidth()}" class="slide-item">
              <img v-lazy="item.goodsImg" alt="" class="img" style="height:100%">
          </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
      imgTextData:{
          type:Object
      },
      floorIndex:{
        type:Number,
        default:''
      }
  },
  data() {
    return {
        orderWidth:document.documentElement.clientWidth,
        arrItem:this.imgTextData.detail,
        goodsStyle:this.imgTextData.goodsStyle,//判断渲染哪个组件,1是轮播图
        GoodsImgFillType:2,//this.imgTextData.GoodsImgFillType,//判断轮播组件的填充方式,1是填充,2是留白
        getPicDataLists:null,
        bannerBoxHeight:0,//轮播图图片盒子的高度
        slideHeight:0,//滑动组件的item高度
        slideImgWidth:0,
        swiper:null
    };
  },
  mounted(){
      if (this.arrItem.length>1) {
        this.createSwiper()
      }
  },
  methods:{
    createSwiper(){//创建轮播组件
        this.swiper=new Swiper('.swiper-container0', {
            loop: false, // 循环模式选项
                // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            autoplay: {
              delay: 5000,
              stopOnLastSlide: false,
              disableOnInteraction: true,
            },
            speed:1000
        })
    },
    countfirstHeight(){//计算第一张图片,得到盒子高度
        var height=this.imgTextData.detail[0].compImgHeight//截取图片高度
        var width =this.imgTextData.detail[0].compImgWidth//截取图片宽度
        var scale=width/height;
        var boxHeight=(this.orderWidth/scale);
        this.bannerBoxHeight=boxHeight
        return boxHeight+'px'
    },

    countImgHeight(height,width){//计算一行一个图片高度
        var height=height
        var width = width
        var scale=width/height;
        var endHeight=(this.orderWidth/scale)+'px'
        return endHeight
    },
    spaceWhite(){//判断轮播组件的填充方式
      if (this.GoodsImgFillType==2) {
          return "whiteSpace"
      }else{
        return "fill"
      }
    },
    countBannerHeight(url){//计算轮播图片尺寸
        var img= new Image()
        img.src=url
        var _that=this;
        var height
        var width
        img.onload=function () {
          height=img.height
          width=img.width

        }
        if (height>width) {
            var imgWidth=(width/(height/this.bannerBoxHeight))
              return `height:${this.bannerBoxHeight}px;width:${imgWidth}px`
            }else{
              var imgHeight=(height/(width/this.orderWidth))
              return `height:${imgHeight}px;width:7.5rem`

        }


    },
    countSlideWidth(){//计算滑动每项的高度
      var img= new Image()
      img.src=this.imgTextData.detail[0].goodsImg
      var _that=this;
      img.onload=function () {
        _that.slideHeight =img.height/(img.width/_that.orderWidth)
      }
      return `${_that.slideHeight}px`
    },
    countSlideImgWidth(height,width){//计算滑动每项图片的宽度高度
       var  height=height
        var  width = width
          this.slideImgWidth =width/(height/this.slideHeight)
        return `${this.slideImgWidth}px`
    },
    goToGoodsdetail(goodsUrl){
      if (this.floorIndex!=4) {
        var goodsId=JSON.parse(goodsUrl).goodsId
        this.$router.push({path:'/goodsdetail',query:{
          goodsId:goodsId
        }})
      }
    }
  },
  watch: {
  },
  destroyed(){

  }
};
</script>

<style lang="less" scoped>
.clear:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}
.picShow-wrap {
  width: 7.5rem;
  margin: 0 auto;
}
.swiper-container{
  position: relative;
  width: 7.5rem;
  margin: 0 auto;
}
.swiper-slide{
    overflow: hidden;
    width: 7.5rem;
    margin: 0 auto;
}
.onlyOne{
  width: 7rem;
  background-color: #f2f2f2;
  margin: auto;
}

//填充
.fill{
  img{
    width: 100%;
    height: 100%;
  }
}
//留白
.whiteSpace{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
//图片去空间
.img {
    display: block;
    font-size: 0
}
.slide-wrap{
  overflow: hidden;
}
.slide{
    width:100%;
    display: inline;
    white-space: nowrap;/*规定段落中的文本不进行换行*/
    float:left;/*一定要设置左侧浮动*/
    overflow-y:hidden;/*竖直方向，超出部分隐藏*/
    .slide-item{
      display: inline-block;
      margin-right: 0.1rem;
      &:last-of-type {
        margin-right: 0;
      }
    }
}
</style>
