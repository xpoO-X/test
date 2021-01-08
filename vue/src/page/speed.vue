<template>
  <transition :name="transitionName">
  <div id="speed">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">案件进度</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="speed_Box">
      <div class="contract-operate_recodeMain" v-if="true">
        <ul class="contract-operate_recode_date">
          <!--添加备注-->
          <div class="liTR" v-if="addTo" @click="redirects('/speedEdit')">
            <img src="../assets/ls/xiugai.png" alt="">
            更新进度
          </div>
          <li v-for="(item,index) in list" :key='item.index'>
            <div class="boo">
              <span class="operate-date"></span>
              <i :class="{liAct:index+1==list.length}"></i>
            </div>
            <div class="liT">
              <div class="liTL">
                <div class="operate-name">
                  {{item.caseProgressName}}
                </div>
                <div class="operate-time">
                  {{item.creationTime}}
                </div>
              </div>
              <!--箭头-->
              <div class="liTRj" @click="open(index, item.id)">
                <img src="../assets/ls/sant.png" alt="" v-if="isShow === index">
                <img src="../assets/ls/sanb.png" alt="" v-else>
              </div>
              <div style="clear: both"></div>
               <div v-if="index == '0'?false:true">
                 <div class="operate-bottomNo" v-if="isShow !== index">
                   {{item.caseProgressRemark}}
                 </div>
                 <div class="operate-bottom" v-if="isShow === index">
                   {{item.caseProgressRemark}}
                 </div>
               </div>
              <!--修改备注-->
              <!--<div class="liT_B" v-if="addTo" @click="redirects('/speedEdit')">-->
              <!--<img src="../assets/ls/xiugai.png" alt="">-->
              <!--修改备注-->
              <!--</div>-->
              <div style="clear: both"></div>
            </div>
            <div class="line" v-if="index+1==list.length?false:true"></div>
          </li>

        </ul>
      </div>
      <div>
        <div class="kong" v-if="isKong">
          <img src="../assets/ls/nojindu.png" alt="">
          <div class="kongT">您还没有更新过案件进度</div>
          <div class="kongB">更新后权利人会第一时间通知权利人</div>
          <div class="kong_btn">立即更新</div>
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
  var add = new Object();
  var qs=require('qs');
  var fromName =global_.Arr;
  export default {
    data() {
      return {
        serverSrc:global_.serverSrc,
        imgSrc:global_.imgSrc,
        jian: true,
        isSteps: 2,
        itemList: [
        { id: '1', name: '王源'},
        { id: '2', name: '易烊千玺'},
        { id: '3', name: '王俊凯'}
        ],
        isShow: -1,
        addTo:false,
        isID:'',
        azId:'',
        isKong:false,
        list:[],
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      open(index, id){
        // this.isS =!this.isS;
        // this.jian =!this.jian
        let that = this;
         if (that.isShow === index) {
           that.isShow = -1;  //在这里就将它赋值为-1  由于：-1 !=  index 所以其他内容隐藏 ，被点击的则打开
         } else {
           that.isShow = index;   //这里是把index赋值给isShow，isShow=index则显示
         }
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
      init(){
        var that=this;
        var postDatau = qs.stringify({
          // barristerId:that.isID,
          caseId:that.azId,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/process",postDatau)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
            if(res.data.body.length>0){
              that.list =res.data.body
              console.log(that.list)
            }else {
              that.isKong=true
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
    },
    mounted(){
      window.scrollTo(0,0);
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      if(localStorage.getItem('azId')){
        this.azId =localStorage.getItem('azId')
      }
      if(localStorage.getItem('body')){
        this.isJson =JSON.parse(localStorage.getItem('body'))
        if(this.isJson.accountType =='PROTECT'){
          this.addTo=false
        }
        if(this.isJson.accountType =='BARRISTER'){
          this.addTo=true
        }
      }
      this.init()
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
  .speed_Box{
    margin-top: j(150);
  }
  .contract-operate_recode_date{
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: j(44);
    margin-top: j(24);
    li .boo{
      width:100%;
      :nth-child(2){
        display: inline-block;
        width: j(40);
        height: j(40);
        /*background-color: #D8D8D8;*/
        background: url("../assets/ls/wxz.png") no-repeat;
        background-size: 100% 100%;
        /*border-radius: 50%;*/
        margin-bottom: j(-8);
      }
      :nth-child(3){
        font-size: 12px;
        color: #333333;
        display: inline-block;
        width: 170px;
        height: 16px;
      }
    }
  }
  /*.contract-operate_recode_date li:nth-child(n+1):after {*/
    /*content: '';*/
    /*display: block;*/
    /*clear: both;*/
    /*width: 2px;*/
    /*height: j(116);*/
    /*background-color: #C7D6E2;*/
    /*margin-left: j(16);*/
  /*}*/
  /*.contract-operate_recode_date li:nth-last-child(1):after {*/
    /*content: '';*/
    /*display: block;*/
    /*clear: both;*/
    /*width: 2px;*/
    /*height: j(116);*/
    /*background-color: #ffffff;*/
    /*margin-left: j(16);*/
  /*}*/
  /*.contract-operate_recode_date li:nth-child(2):after {*/
  /*content: '';*/
  /*display: block;*/
  /*clear: both;*/
  /*width: 2px;*/
  /*height: j(116);*/
  /*background-color: #C7D6E2;*/
  /*margin-left: j(16);*/
  /*}*/
  /*.contract-operate_recode_date li:nth-child(3):after {*/
  /*content: '';*/
  /*display: block;*/
  /*clear: both;*/
  /*width: 2px;*/
  /*height: j(116);*/
  /*background-color: #C7D6E2;*/
  /*margin-left: j(16);*/
  /*}*/
  /*.contract-operate_recode_date li:nth-child(4):after {*/
  /*content: '';*/
  /*display: block;*/
  /*clear: both;*/
  /*width: 2px;*/
  /*height: j(116);*/
  /*background-color: #C7D6E2;*/
  /*margin-left: j(14);*/
  /*}*/
  .contract-operate_recode_date li{
    position: relative;
  }
  .liT{
    width: j(602);
    min-height: j(148);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    position: relative;
    top: j(-50);
    left: j(60);
  }
  .liAct{
    /*background-color: #09B9C1 !important;*/
    background: url("../assets/ls/xz.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .operate-name{
    margin-left: j(42);
    margin-top: j(34);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: #1F2226;
  }
  .operate-time{
    margin-left: j(42);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .gengxin_btn{
    width: 100%;
    height: j(88);
    line-height: j(88);
    background: #F47D48;
    position: fixed;
    bottom: 0;
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
  }
  .gengxin_btnls{
    width: 100%;
    height: j(88);
    line-height: j(88);
    background: #1C6DB1;
    position: fixed;
    bottom: 0;
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
  }
  .ls_dian{
    width: j(30);
    height: j(28);
    background: #5B5F65;
    position: absolute;
    right: 0;
    top: 0;
  }
  .line {
    position: absolute;
    top: 16px;
    left: 9px;
    width: 1px;
    height: 100%;
    background: #C7D6E2;
    z-index: -1;
  }
  .liTL{
    float: left;
  }
  .liTR{
    float: right;
    width: j(148);
    height: j(40);
    line-height: j(40);
    background: #1C6DB1;
    border-radius: j(8);
    margin-bottom: j(34);
    margin-right: j(24);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
  .liTR img{
    width: j(32);
    height: j(32);
    vertical-align: middle;
    margin-top: j(-4);
    margin-left: j(4);
  }
  .liTRj img{
    float: right;
    width: j(30);
    height: j(30);
    margin-top: j(42);
    margin-right: j(42);
  }
  .operate-bottom{
    width:j(522) ;
    margin: j(40) auto 0 ;
    padding: j(30) 0;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6C757C;
    border-top: 2px solid #E8EEF3;
  }
  .operate-bottomNo{
    width:j(522) ;
    margin: j(40) auto 0 ;
    padding: j(30) 0;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6C757C;
    border-top: 2px solid #E8EEF3;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .liT_B{
    float: right;
    width: j(148);
    height: j(40);
    line-height: j(40);
    background: #F47D48;
    border-radius: j(8);
    margin-top: j(16);
    margin-right: j(24);
    margin-bottom: j(24);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
  .liT_B img{
    width: j(32);
    height: j(32);
    vertical-align: middle;
    margin-top: j(-4);
    margin-left: j(4);
  }

  /*空白页*/
  .kong{
    width: j(544);
    margin: 0 auto;
  }
  .kong img{
    width: j(544);
    height: j(544);
  }
  .kongT{
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    text-align: center;
  }
  .kongB{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 500;
    color: #797E85;
    text-align: center;
  }
  .kong_btn{
    width: j(202);
    height: j(68);
    line-height: j(68);
    background: #1C6DB1;
    border-radius: j(16);
    text-align: center;
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    margin: j(44) auto 0;
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
