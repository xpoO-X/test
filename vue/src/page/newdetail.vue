<template>
  <transition :name="transitionName">
  <div id="azdetails">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">案件详情</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="azdBox">
        <div class="azd_titleT"></div>
        <div class="azd_List">
            <div class="azd_Top">
              {{caseTitle}}
            </div>
            <div class="azd_time">
                <div class="azd_timeL">
                  最后更新时间：{{updateTime}}
                </div>
                <div class="azd_timeR">
                  {{progressRemark}}
                </div>
                <div style="clear: both"></div>

            </div>
            <div class="azd_text">
              <div v-html="caseDetails"></div>
            </div>
            <!--<div class="azd_title">-->
              <!--相似案例-->
            <!--</div>-->
            <!--<div class="azd_li">-->
                 <!--<div class="azd_liTtext">-->
                   <!--北京市司法局关于批准佟珂在内地从事律师职北京市司法局关于批准佟珂在内律师职-->
                 <!--</div>-->
                 <!--<div class="azd_liBtext">2012-12-12 12:12:32</div>-->
            <!--</div>-->
            <!--<div class="azd_li">-->
              <!--<div class="azd_liTtext">-->
                <!--北京市司法局关于批准佟珂在内地从事律师职北京市司法局关于批准佟珂在内律师职-->
              <!--</div>-->
              <!--<div class="azd_liBtext">2012-12-12 12:12:32</div>-->
            <!--</div>-->
          <!--权利人-->
          <!--<div class="azd_btn" @click="redirects('/speed')" v-if="obligee">-->
            <!--<img src="../assets/ls/jindu.png" alt="">查看案件进度-->
          <!--</div>-->
          <!--&lt;!&ndash;律师&ndash;&gt;-->
          <div class="azd_btn" @click="isYesNo">
              操作
          </div>
        </div>

    </div>
    <div class="car">
      <van-popup v-model="msg">
        <div class="msgBoxd">
          <div class="newest_xin" @click="yesBtn">
            <img src="../assets/ls/newxin.png" alt="">
            <div class="newest_noLeftc">接受案件</div>
            <div class="newest_noRightc"></div>
          </div>
          <div class="newest_no" @click="NoBtn">
            <img src="../assets/ls/newno.png" alt="">
            <div class="newest_noLeft">拒绝接受</div>
            <div class="newest_noRight"></div>
          </div>
        </div>
        <div
          class="closenBox"
          @click="msgClosen"
        >
          <div class="msgClosen">
            关闭
          </div>
        </div>

      </van-popup>
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
        showPicker:false,
        obligee:true,/*权利人*/
        lawyer:false,/*律师*/
        value: '',
        caseTitle: '',
        updateTime: '',
        progressRemark: '',
        caseDetails: '',
        isSteps: 4,
        myID: '',
        barId: '',
        msg:false,
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      msgClosen() {
        this.msg = false;
      },
      yesBtn(){
        var that = this;
        that.msg = false;
        var postDatasn = qs.stringify({
          barristerId:that.isID,
          caseId:that.myID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/confirm",postDatasn)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          Toast({
            message:'已接受！',
            duration:2000
          });
          setTimeout(function () {
            that.$router.push('/newest');
          },2000)
        }else {
          Toast({
            message:res.data.message,
            duration:2000
          });
        }
      })
      .catch(err=>{
          var str = err + '';
        if(str.search('timeout') !== -1){

        }else {
          Toast({
            message:"网络异常！",
            duration:2000
          })
        }
      });
      },
      NoBtn(){
        var that = this;
        that.msg = false;
        var postDatasn = qs.stringify({
          barristerId:that.isID,
          caseId:that.myID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/cancel",postDatasn)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          Toast({
            message:'已拒绝！',
            duration:2000
          });
          setTimeout(function () {
            that.$router.push('/newest');
          },2000)
        }else {
          Toast({
            message:res.data.message,
            duration:2000
          });
        }
      })
      .catch(err=>{
          var str = err + '';
        if(str.search('timeout') !== -1){

        }else {
          Toast({
            message:"网络异常！",
            duration:2000
          })
        }
      });
      },
      isYesNo(){
         this.msg = true;
      },
      init(){
        var that=this;
        var postDatau = qs.stringify({
          id:that.myID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/detail",postDatau)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          if(JSON.stringify(res.data.body.hwCase) !== "{}"){
              that.caseTitle = res.data.body.hwCase.caseTitle;
              that.updateTime = res.data.body.hwCase.updateTime;
              that.progressRemark = res.data.body.hwCase.progressRemark;
              that.caseDetails = res.data.body.hwCase.caseDetails;
              that.barId = res.data.body.hwCase.barristerId;
              if(that.isID  == that.barId){

                this.lawyer=true;
                this.obligee=false;
              }else {
                this.obligee=true;
                this.lawyer=false;
              }
              localStorage.setItem('azId',res.data.body.hwCase.id);
          }
        }else {
          Toast({
            message:res.data.message,
            duration:2000
          });
        }
      })
      .catch(err=>{
          var str = err + '';
        if(str.search('timeout') !== -1){

        }else {
          Toast({
            message:"网络异常！",
            duration:2000
          })
        }
      });
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
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      if(localStorage.getItem('newdetailId')){
        this.myID =localStorage.getItem('newdetailId')
      }
      this.init();
      // if(localStorage.getItem('body')){
      //   this.isJson =JSON.parse(localStorage.getItem('body'))
      //   if(this.isJson.accountType =='PROTECT'){
      //     this.obligee=true;
      //     this.lawyer=false;
      //   }
      //   if(this.isJson.accountType =='BARRISTER'){
      //     this.lawyer=true;
      //     this.obligee=false;
      //   }
      // }
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
  .azdBox{
    margin-top: j(88);
  }
  .azd_titleT{
    margin-left: j(28);
    margin-top: j(114);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .azd_List{
    width: 100%;
    background: #ffffff;
    padding-top: j(40);
    padding-bottom: j(60);
  }
  .azd_btn{
    width: j(702);
    height: j(88);
    line-height: j(88);
    background: #1C6DB1;
    border-radius: j(16);
    margin: j(80) auto j(56);
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .azd_btn img{
    width: j(48);
    height: j(48);
    vertical-align: middle;
    margin-top: j(-8);
    margin-right: j(10);
  }
  .azd_Top{
    width: j(672);
    margin: 0 auto;
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    padding-bottom: j(30);
  }
  .azd_time{
    width: j(672);
    height: j(44);
    margin: 0 auto j(58);

  }
  .azd_timeL{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    float: left;
    margin-top: j(6);
  }
  .azd_timeR{
    /*width: j(106);*/
    /*height: j(44);*/
    /*line-height: j(44);*/
    padding: j(8) j(20);
    line-height: 1;
    text-align: center;
    background: #F47D48;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    float: right;
  }
  .azd_text{
    width: j(672);
    margin: 0 auto j(26);
  }
  .azd_text div{
    font-size: j(32);
    color: #666666;
    font-weight: 400;
    margin-bottom: j(40);
  }
  .azd_title{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    height: j(84);
    line-height: j(84);
    background: #f5f5f5;
    color: #BBBEC1;
    padding-left: j(36);
    margin-bottom: j(24);
  }
  .azd_li{
    width: j(702);
    min-height: j(198);
    margin: 0 auto;
    border-bottom: 2px solid #E8EEF3;
  }
  .azd_liTtext{
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    padding: j(38) j(10) j(20);
  }
  .azd_liBtext{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    padding: 0 j(10);
    margin-bottom: j(24);
  }
  .azd_popTop{
    width: 100%;
    margin-top: j(92);
  }
  .azd_popTopL{
    font-size: j(36);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    float: left;
    margin-left: j(84);
  }
  .azd_popTopR img{
    width: j(48);
    height: j(48);
    float: right;
    margin-right: j(42);
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }


  /*弹出*/
  .car .van-popup {
    background: transparent;
    top: 70% !important;
  }
  .msgBoxd {
    width: j(702);
    height: j(216);
    background: #fff;
    border-radius: 10px;
    overflow: auto;
  }
  .closenBox {
    width: 100%;
    height: 100%;
    background: transparent;
  }

  .closenBox .msgClosen {
    width: 100%;
    height: j(108);
    font-size: j(32);
    line-height: j(108);
    margin: j(18) auto;
    background: #ffffff;
    text-align: center;
    border-radius: j(16);
    color: #A5AAAE;
  }
  /*#Cart .van-popup{*/
  /*top:70% !important;*/
  /*}*/
  .newest_no{
    width: j(662);
    height: j(106);
    border-bottom: 2px solid #E8EEF3;
    margin: 0 auto;
  }
  .newest_xin{
    width: j(662);
    height: j(98);
    border-bottom: 2px solid #E8EEF3;
    margin: 0 auto;
  }
  .newest_xin img{
    width: j(48);
    height: j(48);
    float: left;
    margin-top: j(22);
    margin-right: j(16);
  }
  .newest_clear{
    width: j(662);
    height: j(98);
    margin: 0 auto;
  }
  .newest_clear img{
    width: j(48);
    height: j(48);
    float: left;
    margin-top: j(22);
    margin-right: j(16);
  }
  .newest_no img{
    width: j(48);
    height: j(48);
    float: left;
    margin-top: j(32);
    margin-right: j(16);
  }
  .newest_noLeft{
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    float: left;
    margin-top: j(34);
  }
  .newest_noRight{
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #AEB0B3;
    float: right;
    margin-top: j(36);
  }
  .newest_noLeftc{
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    float: left;
    margin-top: j(24);
  }
  .newest_noRightc{
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #AEB0B3;
    float: right;
    margin-top: j(26);
  }
</style>
