<template>
  <div class="dialog" @click="showMask =false" v-show="showMask">
    <div class="dialog-container">
      <div class="dialog-title">{{title}}</div>
      <div class="content" v-html="content"></div>
      <div class="btns">
        <div v-if="type != 'confirm'" v-show="leftBtn" class="default-btn" @click="closeBtn">
          {{cancelText}}
        </div>
        <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
          {{dangerText}}
        </div>
        <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
          {{confirmText}}
        </div>
      </div>
      <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
    </div>

  </div>
</template>
<script>
  export default {
    props: {
      value: {},
      // 类型包括 defalut 默认， danger 危险， confirm 确认，
      type:{
        type: String,
        default: 'default'
      },
      content: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      dangerText: {
        type: String,
        default: '删除'
      },
      confirmText: {
        type: String,
        default: '确认'
      },
      leftBtn: {
        type: Boolean,
        default: true
      },
    },
    data(){
      return{
        showMask: false,
      }
    },
    methods:{
      closeMask(){
        this.showMask = false;
      },
      closeBtn(){
        this.$emit('cancel');
        this.closeMask();
      },
      dangerBtn(){
        this.$emit('danger');
        this.closeMask();
      },
      confirmBtn(){
        this.$emit('confirm');
        this.closeMask();
      }
    },
    mounted(){
      this.showMask = this.value;
    },
    watch:{
      value(newVal, oldVal){
        this.showMask = newVal;
      },
      showMask(val) {
        this.$emit('input', val);
      }
    },
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

  .dialog{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    .dialog-container{
      width: j(600px);
      height: j(400px);
      background: #ffffff;
      /*position: absolute;*/
      position: absolute;
      top: 50%;
      left: 50%;
      //transform: translate(-50%, -50%);
      margin-top: j(-160);
      margin-left: j(-300);
      border-radius: j(25);
      .dialog-title{
        width: 100%;
        height: j(60px);
        font-size: j(30px);
        font-weight: bold;
        text-align: center;
        box-sizing: border-box;
        margin: 0 auto;
        padding-top: 20px;
        color: #333333;
      }
      .content{
        color: #797979;
        line-height: j(26);
        padding: 0 j(20);
        box-sizing: border-box;
      }
      .inp{
        margin: j(10) 0 0 j(20);
        width: j(200);
        height: j(40);
        padding-left: j(4);
        border-radius: j(4);
        border: none;
        background: #efefef;
        outline: none;
        &:focus{
          border: 1px solid #509EE3;
        }
      }
      .btns{
        width: 100%;
        height: j(60);
        // line-height: 60px;
        position: absolute;
        bottom: j(50);
        left: 0;
        text-align: center;
        padding: 0 j(16);
        box-sizing: border-box;
        & > div{
          display: inline-block;
          height: j(40);
          line-height: j(40);
          padding: 0 j(14);
          color: #ffffff;
          background: #f1f1f1;
          border-radius: j(8);
          /*margin-right: j(12);*/
          cursor: pointer;
        }
        .default-btn{
          width: j(180);
          height: j(70);
          line-height: j(70);
          color: #ffffff;
          background: #1C6DB1;
          border: 1px solid #1C6DB1;
          &:hover{
            /*color: #509EE3;*/
          }
        }
        .danger-btn{
          width: j(180);
          height: j(70);
          line-height: j(70);
          /*color: #ffffff;*/
          /*background: #1C6DB1;*/
          /*border: 1px solid #1C6DB1;*/
          color: #1C6DB1;
          background: #ffffff;
          border: 1px solid #1C6DB1;
          margin-left: j(10);
          &:hover{
            /*background: rgb(224, 135, 135);*/
          }
          &:active{
            /*background: #EF8C8C;*/
          }
        }
        .confirm-btn{
          width: j(180);
          height: j(70);
          line-height: j(70);
          color: #1C6DB1;
          background: #ffffff;
          border: 1px solid #1C6DB1;
          &:hover{
            /*background: #6FB0EB;*/
          }
        }
      }
      .close-btn{
        position: absolute;
        top: j(16);
        right: j(16);
        width: j(30);
        height: j(30);
        line-height: j(30);
        text-align: center;
        font-size: j(18);
        cursor: pointer;
        &:hover{
          /*font-weight: 600;*/
        }
      }
    }
    .contentTest{
      text-align: center;
      margin-top: j(80);
    }
  }
</style>
