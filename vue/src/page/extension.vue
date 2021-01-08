<template>
  <transition :name="transitionName">
  <div id="Ext_box">
    <div>
      <div class="navBar">
        <div class="goback" @click="returns"></div>
        <div @click="returns">推广中心</div>
        <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
      </div>
      <div class="ext_box">
          <div class="ext_Top">
            <div class="ext_info">
            <div class="ext_tu">
            <img src="../assets/ls/ren.png" alt="">
            </div>
            <div class="ext_namels">
            <div class="ext_nameT"><div class="ext_isname">刘某某</div><div class="ext_lsLiwatr"><img src="../assets/ls/zuan.png" alt="">LV3</div></div>
            <div style="clear: both"></div>
            <div class="ext_nameB">梦回大唐有限责任公司</div>
            <div class="ext_lsnum">律师号：KUG-08937489789</div>
            </div>
            </div>

            <div class="ext_lv">
              <van-progress color="#1C6DB1" :percentage="50" :show-pivot="false" />
              <div class="ext_liLv">LV1</div>
              <div class="ext_liLv ext_mLv">LV2</div>
              <div class="ext_liLv ext_mLv">LV3</div>
              <div class="ext_liLv ext_mLv">LV4</div>
              <div class="ext_liLv ext_mLv">LV5</div>
            </div>

            <div style="clear: both"></div>
            <div class="ext_lvText">
              距离下一等级还差324分
            </div>
          </div>

        <!--分值-->
          <div class="ext_score clearfix">
            <div class="ext_scoreT">
              <div class="ext_stname">您想购买分值</div>
              <div class="ext_stRtext"><img src="../assets/ls/extjf.png" alt=""><span class="ext_stRwen">分值说明</span></div>
            </div>
            <div style="clear: both"></div>
            <div class="fuel_value">
              <div class="fuel_num">
                <div class="fuel_zhi" @click="xuan($event,0)" :class=" 0 == 0 ? 'selected' : '' " name="200">
                  <div>
                    <div class="fuel_zt">200</div>
                    <div class="fuel_zb"><span class="isXj">¥19</span><span class="isDel">¥49.9</span></div>
                  </div>
                </div>
                <div class="fuel_zhi" @click="xuan($event,1)" :class=" 1 == 0 ? 'selected' : '' " name="300">
                  <div>
                    <div class="fuel_zt">300</div>
                    <div class="fuel_zb"><span class="isXj">¥19</span><span class="isDel">¥49.9</span></div>
                  </div>
                </div>
                <div class="fuel_zhi" @click="xuan($event,2)" :class=" 2 == 0 ? 'selected' : '' " name="500">
                  <div>
                    <div class="fuel_zt">500</div>
                    <div class="fuel_zb"><span class="isXj">¥19</span><span class="isDel">¥49.9</span></div>
                  </div>
                </div>
                <div class="fuel_zhi" @click="xuan($event,2)" :class=" 2 == 0 ? 'selected' : '' " name="500">
                  <div>
                    <div class="fuel_zt">500</div>
                    <div class="fuel_zb"><span class="isXj">¥19</span><span class="isDel">¥49.9</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <!--您希望提升-->
        <div class="ext_scoreX clearfix">
          <div class="ext_scoreT">
            <div class="ext_stname">您希望提升</div>
          </div>
          <div style="clear: both"></div>
          <div class="ts_value">
            <div class="ts_num">
              <div class="ts_zhi" @click="xuanTs($event,0)" :class=" 0 == 0 ? 'selects' : '' " name="200">
                <div>
                  <div class="ts_zt">浏览量</div>
                </div>
              </div>
              <div class="ts_zhi" @click="xuanTs($event,1)" :class=" 1 == 0 ? 'selects' : '' " name="300">
                <div>
                  <div class="ts_zt">胜诉率</div>
                </div>
              </div>
              <div class="ts_zhi" @click="xuanTs($event,2)" :class=" 2 == 0 ? 'selects' : '' " name="500">
                <div>
                  <div class="ts_zt">排名</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--支付-->
        <div class="ext_pay">
            <div class="ext_payNum">¥29</div>
            <div class="ext_payBtn">支付</div>
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
  import normalgwcw from '../assets/gwcw.png'
  import activeMe from '../assets/Jacme.png'
  import tou from '../assets/Jmo.png'
  import global_ from '../components/Global'
  import { Toast } from 'vant';
  var qs=require('qs');
  var fromName =global_.Arr;
  var add = new Object();
  export default {
    data() {
      return {
        serverSrc:global_.serverSrc,
        imgSrc:global_.imgSrc,
        tabarActive:3,
        icon: {
          normal: normalHome,
          whole:normalWhole,
          me:activeMe,
          gwcw:normalgwcw,
        },
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      returns() {
        this.$router.go(-1);
      },
      xuanTs(e, index) {

        // this.indexs = index;
        // console.log(localStorage.getItem('indNum'),45646)
        // var a =parseInt(localStorage.getItem('indNum'));
        // console.log($('.fuel_zhi').eq(a).find('.fuel_zt').text(),798465464)
        // console.log(index,789879);
        // this.nums = price;
        // this.specPropertyId = id;
        // this.goodsId = gid;
        $(e.currentTarget).siblings('.ts_zhi').removeClass('selects');
        $(e.currentTarget).siblings('.ts_zhi').find('.ts_zb').css('color', '#737373');
        $(e.currentTarget).addClass('selects');
      },
      xuan(e, index) {

        // this.indexs = index;
        // console.log(localStorage.getItem('indNum'),45646)
        // var a =parseInt(localStorage.getItem('indNum'));
        // console.log($('.fuel_zhi').eq(a).find('.fuel_zt').text(),798465464)
        // console.log(index,789879);
        // this.nums = price;
        // this.specPropertyId = id;
        // this.goodsId = gid;
        $(e.currentTarget).siblings('.fuel_zhi').removeClass('selected');
        $(e.currentTarget).siblings('.fuel_zhi').find('.fuel_zb').css('color', '#737373');
        $(e.currentTarget).addClass('selected');
      },
      redirects(url) {
        this.$router.push(url);
      },
      handleFileUpload(event){

        event.preventDefault();

        this.file = this.$refs.file.files[0].name;

      },
      func:function(c){
        this.active=c;
        // this.block=c;
      },
      showPopup() {
        this.show = true;
      },
    },
    mounted(){
      window.scrollTo(0,0);;
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
  .Ext_box{
    min-height: 100vh;
  }

  #Ext_box .navBar{
    top: 0;
    left: 0;
    width: j(750);
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
  #Ext_box .goback{
    width: j(40);
    height: j(40);
    background: url("../assets/ls/back.png") no-repeat;
    background-size: 100% 100%;
    float: left;
    margin-left: j(20);
    margin-right: j(20);
  }

  .ext_box{
    margin-top: j(88);
    margin-bottom: j(100);
  }
  .ext_Top{
    width: j(750);
    height: j(408);
    background: #FFFFFF;
    margin-top: j(110);
  }

  /*TOP*/
  .ext_info{
    width: j(702);
    height: j(242);
    margin: 0 auto;
  }

  .ext_tu{
    width: j(152);
    height: j(152);
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-left: j(20);
    margin-top: j(46);
  }
  .ext_tu img{
    width: 100%;
    height: 100%;
  }
  .ext_namels{
    margin-top: j(50);
    margin-left: j(30);
    float: left;
  }
  .ext_nameT{
    font-size: j(36);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
  }
  .ext_nameB{
    margin-top: j(2);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .ext_jian img{
    margin-top: j(108);
    width: j(32);
    height: j(32);
    float: right;
    margin-right: j(20);
  }
  .ext_isname{
    float: left;
  }
  .ext_lsLiwatr{
    float: left;
    width: j(108);
    height: j(38);
    line-height: j(42);
    font-size: j(24);
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #FFFFFF;
    background: #1C6DB1;
    border-radius: j(16);
    margin-top: j(4);
    margin-left: j(12);
  }
  .ext_lsLiwatr img{
    width: j(28);
    height: j(28);
    margin-left: j(12);
    margin-right: j(6);
    margin-top: j(2);
    vertical-align: middle;
  }
  .ext_lsnum{
    margin-top: j(18);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
  }
  /*进度条*/
  .ext_lv{
     width: j(630);
     margin: 0 auto;
  }
  .ext_lv .van-progress{
    width: j(630) !important;
  }
  .ext_liLv{
    float: left;
    margin-top: j(10);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .ext_mLv{
    margin-left: j(103);
  }
  .ext_lvText{
    width: j(630);
    margin: j(20) auto 0;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }

  /*分值*/
  .ext_score{
    width: j(750);
    /*min-height: j(308);*/
    background: #FFFFFF;
    margin-top: j(24);
    padding-bottom: j(62);
  }
  .ext_scoreT{
    width: j(662);
    margin: 0 auto;
  }
  .ext_stname{
    float: left;
    margin-top: j(26);
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
  }
  .ext_stRtext{
    margin-top: j(32);
    float: right;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1C6DB1;
  }
  .ext_stRtext img{
    width: j(28);
    height: j(28);
    vertical-align: middle;
    margin-top: j(-2);
    margin-right: j(14);
  }
  .ext_stRwen{
    display: inline-block;
    border-bottom: 1px solid #1C6DB1;
  }
  .ext_score .fuel_value {
    width: j(680);
    /*height: j(320);*/
    /*margin-top: j(80);*/
    /*position: relative;*/
    /*top: j(90);*/
    background: #FFFFFF;
    color: #333333;
    /*padding: 0 j(44);*/
    margin:  j(36) auto 0;
  }

  .ext_score  .fuel_value .fuel_val {
    font-size: j(28);
    font-weight: 600;
    margin-bottom: j(24);
  }

  .ext_score  .fuel_num .fuel_zhi {
    float: left;
    width: j(200);
    height: j(140);
    border: 1px solid #D4DDE8;
    background: #FFFFFF;
    border-radius: j(10);
    margin-bottom: j(24);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ext_score .fuel_num > .fuel_zhi:nth-child(3n-1) {
    margin-left: j(32);
    margin-right: j(32);
  }

  .ext_score .fuel_num .fuel_zhi .fuel_zt {
    font-size: j(42);
    /*padding-left: j(54);*/
    text-align: center;
    /*padding-top: j(24);*/
    font-weight: 700;
    color: #8E9397;
  }

  .ext_score .fuel_num .fuel_zhi .fuel_zb {
    font-size: j(28);
    /*padding-left: j(58);*/
    text-align: center;
    color: #737373;
    font-weight: 400;
  }
  .ext_score .selected {
    border: 1px solid #1C6DB1 !important;
  }
  .ext_score  .selected .fuel_zt{
    color:#1C6DB1 !important;
  }
  .ext_score .isDel{
    font-weight: 400;
    color: #BBBEC1;
    text-decoration:line-through;
  }
  .ext_score  .isXj{
    font-weight: 400;
    color: #F47D48;
    margin-right: j(6);
  }
  .clearfix:after{content: ".";display: block;height: 0;clear: both;visibility: hidden;}
  /*希望*/
  /*提升*/
  .ext_scoreX{
    width: j(750);
    /*min-height: j(308);*/
    background: #FFFFFF;
    margin-top: j(24);
    padding-bottom: j(50);
  }
  .ts_value {
    width: j(680);
    background: #FFFFFF;
    color: #333333;
    /*padding: 0 j(44);*/
    margin:  j(36) auto 0;
  }

  .ts_value .ts_val {
    font-size: j(28);
    font-weight: 600;
    margin-bottom: j(24);
  }

  .ts_num .ts_zhi {
    float: left;
    width: j(200);
    height: j(68);
    border: 1px solid #D4DDE8;
    background: #FFFFFF;
    border-radius: j(10);
    margin-bottom: j(24);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ts_num > .ts_zhi:nth-child(3n-1) {
    margin-left: j(32);
    margin-right: j(32);
  }

  .ts_num .ts_zhi .ts_zt {
    font-size: j(24);
    /*padding-left: j(54);*/
    text-align: center;
    /*padding-top: j(24);*/
    font-weight: 500;
    color: #53575A;
  }
  .selects{
    border: 1px solid #1C6DB1 !important;
  }
  .selects .ts_zt{
    color:#1C6DB1 !important;
  }

  /*支付按钮*/
  .ext_pay{
    margin-top: j(200);
    width: j(750);
    height: j(98);
    line-height: j(98);
    background: #FFFFFF;
  }
  .ext_payNum{
    font-size: j(42);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #F47D48;
    float: left;
    margin-left: j(56);
  }
  .ext_payBtn{
    width: j(200);
    height: j(78);
    line-height: j(78);
    text-align: center;
    background: #1C6DB1;
    border-radius: j(8);
    float: right;
    margin-right: j(24);
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    margin-top: j(10);
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
