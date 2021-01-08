<template>
  <div class="noOrder">
    <img src="../assets/erro.png" alt="">
    <p>抱歉，您访问的页面失联啦...</p>
    <div class="b_box">
      <div class="back" @click="back">回首页</div>
      <div class="try" @click="confirmBtn">再试试</div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{

      }
    },
    methods:{
      confirmBtn(){
        this.$emit('try');
      },
      back(){
        this.$router.push('/')
      }
    },
    mounted(){

    }
  }
</script>
<style lang="scss">
  @function j($px, $base-font-size: 75px) {
    @if (unitless($px)) {
      @return j($px + 0px); // That may fail.
    } @else if (unit($px) == rem) {
      @return $px;
    }
    @return ($px / $base-font-size) * 1rem;
  }

  .noOrder{
    width:100%;
    margin-top: 50%;
    text-align: center;
    p{
      font-size: j(28);
      color: #b3b3b3;
    }
  }
  .back{
    width:j(150);
    height: j(50);
    line-height: j(50);
    text-align: center;
    background: red;
    color: #ffffff;
    float: left;
    border-radius: j(6);
  }
  .try{
    width:j(150);
    height: j(50);
    line-height: j(50);
    text-align: center;
    float: right;
    border-radius: j(6);
    border: 1px solid red;
    color: red;
  }
  .b_box{
    width: j(340);
    height: j(50);
    margin: j(100) auto;

  }
</style>
