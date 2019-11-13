<!--  -->
<template>
  <div class="loading-footer">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
      <div class="bounce4"></div>
    </div>
  </div>
</template>

<script>
export default {
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
  .spinner{
    position: relative;
    display: inline-block;
    color: #999;
    padding: 10px 20px;
    // &:before,&:after{
    //   display: inline-block;
    //   position: absolute;
    //   top: 50%;
    //   left: -65px;
    //   content: '';
    //   width: 65px;
    //   height: 1px;
    //   background-color: #ccc;
    // }
    // &:after{
    //   left: 100%;
    // }
    div{
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #cc3333;
      float: left;
      margin: 0 3px;
      animation: bouncedelay linear 1s infinite;
      &.bounce1 {
        -webkit-animation-delay: 0.15s;
        animation-delay: 0.15s;
      }
      &.bounce2 {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
      }
      &.bounce3 {
        -webkit-animation-delay: 0.45s;
        animation-delay: 0.45s;
      }
      &.bounce4 {
        -webkit-animation-delay: 0.6s;
        animation-delay: 0.6s;
      }
    }
  }
}
@keyframes bouncedelay {
  0%,60%,100% {transform: scale(1);}
  30% {transform: scale(2.5);}
}
@-webkit-keyframes bouncedelay {
  0%,60%,100% {transform: scale(1);}
  30% {transform: scale(2.5);}
}
</style>
