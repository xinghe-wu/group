<!--  -->
<template>
  <div class="loading-footer">
    <span class="text">{{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '我是有底线的'
    }
  },
  data () {
    return {

    }
  }
}

</script>
<style lang='less' scoped>
.loading-footer {
  width: 100%;
  text-align: center;
  .text{
    position: relative;
    display: inline-block;
    color: #999;
    padding: 20px;
    font-size: 11px;
    &:before,&:after{
      display: inline-block;
      position: absolute;
      top: 50%;
      left: -65px;
      content: '';
      width: 65px;
      height: 1px;
      background-color: #ccc;
    }
    &:after{
      left: 100%;
    }
  }
}
</style>
