<template>
    <div>
        <div class="title-wrap" style="height:40px;width:100%">
            <div class="title-name" :class="isFontShowType()">{{titleName}}</div>
            <div class="title-more" v-if="hdType==100">
                <span>更多</span>
                <i class="icon">></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        titleData:{
            type:Object
        }
    },
    data() {
        return {
            titleName:this.titleData.titleName,
            hdType:this.titleData.hdType,
            fontShowType:this.titleData.fontShowType
        }
    },
    methods:{
        isFontShowType(){
            if (this.fontShowType==1) {
                return "left"
            }else if (this.fontShowType==2) {
                 return "center"
            }else if (this.fontShowType==3) {
                 return "right"
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .title-wrap{
        width: 7.5rem;
        margin: 0 auto;
        position: relative;
        font-size: 0.3rem
    }
    .title-more{
        position: absolute;
        top: 0;
        right: 0.2rem;
        line-height: 40px;
        color: #999999
    }
    .title-name{
        line-height: 40px;
        color: #030303;
        margin-left:0.2rem;
    }
    .center{
        text-align: center
    }
    .left{
        text-align: left
    }
    .right{
        text-align: right
    }
</style>
