<template>
  <transition :name="transitionName">
  <div id="newsdetails">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">消息详情</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="newsdetailsBox">
        <div class="newsdetails_titleT"></div>
        <div class="newsdetails_List">
            <div class="newsdetails_Top">
              北京市司法局关于批准佟珂在内地从事内地从事律师内地从事律师律师职
            </div>
            <div class="newsdetails_time">
                <div class="newsdetails_timeL">
                  <img src="../assets/ls/newgps.png" alt="">
                  北京市
                </div>
                <div class="newsdetails_timeR">
                  2012-12-12 12
                </div>
                <div style="clear: both"></div>

            </div>
            <div class="newsdetails_text">
              <div>啊哈哈哈哈哈啊哈哈哈哈哈哈啊哈哈哈的点点滴滴所大大所打算埃斯阿萨德埃斯埃斯</div>
              <div>啊哈哈哈哈哈啊哈哈哈哈哈哈啊哈哈哈的点点滴滴所大大所斯</div>
              <div>城一体化设计，有效融入城市肌体，做到枢纽区域与城市规划、产业开发有机融合；站房外观采用“青莲滴露”设计主题，呈水滴状椭圆造型，椭圆形屋盖轮廓如清泉源头，似一瓣青莲上的露珠；采用立体候车布局，能够实现旅客“进出分层、到发分离”，保证旅客进出畅通；在车场之间创新采用15米宽的“光谷”，提升了采光通风效果。未来，雄安站将成为京港（台）高速铁路、京雄城际铁路、天津至雄安新区城际铁路、雄安新区至忻州高速铁路的交会枢纽。</div>
            </div>
            <div class="newsdetails_bm">
              <div class="newsdetails_bmbtn">
                <img src="../assets/ls/del.png" alt="">
                删除
              </div>
            </div>
        </div>

    </div>
  </div>
  </transition>
</template>

<script>
  import {store} from '../store/store';
  import normalHome from '../assets/Jnohome.png'
  import normalWhole from '../assets/Jnofabu.png'
  import normalgwcw from '../assets/gwcz.png'
  import activeMe from '../assets/Jnome.png'
  import tou from '../assets/Jmo.png'
  import global_ from '../components/Global'
  import { Toast } from 'vant';
  var qs=require('qs');
  var fromName =global_.Arr;
  export default {
    data() {
      return {
        serverSrc:global_.serverSrc,
        imgSrc:global_.imgSrc,
        radio: '1',
        showJIN:true,
        value: '',
        isSteps: 4,
        columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      seeBtn(){
        this.showJIN=true;
      },
      popClose(){
        this.showJIN=false;
      },
      clickRadio(val){
        // console.log(val)
        if(this.radio!==val){
          if(this.radio==val){
            // this.radio=0;
          }else{
            this.radio=val;
          }
        }

      },
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
      },
      returns() {
        this.$router.go(-1);
      },
      goLog(){
        this.$router.push('/');
      },
      redirects(url) {
        this.$router.push(url);
      },
    },
    mounted(){
      window.scrollTo(0,0);
      function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
          if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
          }
        }
        if(window.screen.width>=768){
          flag = true;
        }
        return flag;
      }
      if(IsPC()){
        $('.van-tabbar').css("height", "60px");
        $('.van-tabbar').css("padding-bottom", "10px");
      }
    },
    beforeCreate(){
      document.getElementsByTagName("body")[0].style.background = "#f5f5f5";
    }
  }
</script>
<style lang="scss" src="../assets/css/reset.css" ></style>
<style lang="scss">
  @function j($px, $base-font-size: 75px) {
    @if (unitless($px)) {
      @return j($px + 0px); // That may fail.
    } @else if (unit($px) == rem) {
      @return $px;
    }
    @return ($px / $base-font-size) * 1rem;
  }
  .van-tabbar--fixed{
    padding-bottom: j(14);
  }
  @supports (bottom: env(safe-area-inset-bottom)) {
    .van-tabbar--fixed{
      /*padding-bottom: env(safe-area-inset-bottom);*/
      padding-bottom: j(34);
    }
  }

  /*app.vue  的style*/
  .slide-left-enter-active{
    will-change: transform;
    transition: all 600ms;
    position: absolute;
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .navBar{
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    height: j(88);
    line-height: j(88);
    background: #ffffff;
    /*flex 布局*/
    display: flex;
    /*实现垂直居中*/
    align-items: center;
    font-size: j(36);
    font-family: PingFangSC-Medium, PingFang SC;
    color: #1F2226;
    font-weight: 600;
    z-index: 999;
  }
  .goback{
    width: j(40);
    height: j(40);
    background: url("../assets/ls/back.png") no-repeat;
    background-size: 100% 100%;
    float: left;
    margin-left: j(20);
    margin-right: j(20);
  }
  .newsdetailsBox{
    margin-top: j(120);
  }
  .azd_titleT{
    margin-left: j(28);
    margin-top: j(114);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .newsdetails_List{
    width: 100%;
    background: #ffffff;
    padding-top: j(40);
    margin-bottom: j(100);
  }
  .newsdetails_Top{
    width: j(672);
    margin: 0 auto;
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    padding-bottom: j(30);
  }
  .newsdetails_time{
    width: j(672);
    height: j(44);
    margin: 0 auto j(58);

  }
  .newsdetails_timeL{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    float: left;
    margin-top: j(6);
  }
  .newsdetails_timeL img{
    width: j(40);
    height: j(40);
    vertical-align: middle;
    margin-top: j(-8);
  }
  .newsdetails_timeR{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    float: right;
    margin-top: j(6);
  }
  .newsdetails_text{
    width: j(672);
    margin: 0 auto j(26);
  }
  .newsdetails_text div{
    font-size: j(32);
    color: #666666;
    font-weight: 400;
    margin-bottom: j(40);
  }
  .newsdetails_bm{
    width: j(662);
    height: j(86);
    line-height: j(86);
    border-top: 2px solid #E8EEF3;
    margin: 0 auto;
  }
  .newsdetails_bmbtn{
    float: right;
  }
  .newsdetails_bmbtn img{
    width: j(40);
    height: j(40);
    vertical-align: middle;
    margin-top: j(-6);
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
