<template>
    <div class="goods-select-color">
        <p class="select-color-title">{{specList.name}}</p>
        <div class="select-color-content">
            <p class="select-color-item" v-for="(subItem,twoIndex) in specList.value" :key="twoIndex" @click.stop="selectItem(twoIndex,subItem)" ref="s" :class="[selectIndex == twoIndex ? 'activeIndex' : '',subItem.gray == 1 ? 'gray' : '']">{{subItem.specdName}}</p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    props: {
        specList: {
            type: Object,
            required: true
        },
        oneIndex: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            selectIndex: -1
        }
    },
    created() {
        this.specList.value.forEach((spec) => {
            Vue.set(spec,'gray', 0)
        })

    },
    methods: {
        selectItem(i,o) {
            if(!o.gray) {
                this.selectIndex = i
                this.$emit('onchangeindex',o,this.oneIndex)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.goods-select-color{
    margin-top: 0.5rem;
    font-size: 0.28rem;
    color: #6D6D6D;
    .select-color-title{
        margin-bottom: 0.3rem;

    }
    .select-color-content{
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        .select-color-item{
            padding: 0 0.1rem;
            min-width: 0.8rem;
            height: 0.6rem;
            text-align: center;
            line-height: 0.6rem;
            border: 1px solid #D2D2D2;
            margin-right: 0.3rem;
            margin-bottom: 0.1rem;
            border-radius: 0.1rem
        }
        .activeIndex{
            color: #F96633;
            border:1px solid #F96633
        }
        .gray{
            color: pink;
            border:1px solid pink;
        }
    }

}
</style>