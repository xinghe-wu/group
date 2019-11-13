<template>
    <div :style="{height:marginCount+'px','background-color':bgColor}" class="line">

    </div>
</template>
<script>
export default {
    props:{
        marginCount:{
            type:Number,
            default:10
        },
        bgColor:{
            type:String,
            default:'#f2f2f2'
        }
    },
    data() {
        return {

        }
    },
}
</script>
<style lang="less" scoped>

</style>
