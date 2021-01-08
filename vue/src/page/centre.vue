<template>
  <transition :name="transitionName">
    <div
      id="centre"
      ref="putaway"
    >
      <div>
        <div class="navBar">
          <div class="goback" @click="returns"></div>
          <div @click="returns">授权中心</div>
          <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
        </div>
        <div class="boxHC">
          <div class="Lsku_top">
            <ul class="NavTab">
              <!--<li-->
              <!--v-for="(item,index) in items"-->
              <!--:key="index"-->
              <!--:class="{list_active:istrue==index}"-->
              <!--@click="listTab(index)"-->
              <!--&gt;-->
              <!--{{item.name}}-->
              <!--<span :class="{list_bor:istrue==index}"></span>-->
              <!--</li>-->
              <li :class="{list_active:istrue==0}" @click="listTab(0)">全部 <span :class="{list_bor:istrue==0}"></span></li>
              <!--<li :class="{list_active:istrue==1}" @click="listTab(1)">律师 <span :class="{list_bor:istrue==1}"></span></li>-->
              <!--<li :class="{list_active:istrue==2}" @click="listTab(2)">平台 <span :class="{list_bor:istrue==2}"></span></li>-->

            </ul>
          </div>
          <div id="centre-list">
            <ol v-if="nulls">
              <van-pull-refresh
                v-model="isLoading"
                class="pulls"
              >
                <van-list
                  v-model="loading"
                  :finished="finished"
                  @load="onLoad"
                  class="productList"
                >
                  <van-cell
                    class="list"
                    v-for="(item,index) in array"
                    :key="index"
                  >
                    <li @click="redirects('/downloadS',item.id)">
                      <div class="centre_time">
                        <div class="fl">最后更新时间：</div>
                        <div class="fr">{{item.updateTime}}</div>
                      </div>
                      <div class="centre_Li">

                        <div style="clear: both"></div>
                        <div class="centre_liText">
                          {{item.caseVo.caseTitle}}
                        </div>
                        <div class="centre_liTob">
                          <!--<div class="centre_liRblue">著作权</div>-->
                          <div class="centre_liRred">{{item.caseVo.protectType}}</div>
                        </div>
                        <div style="clear: both"></div>
                        <div v-if="isLawyer">
                          <div class="centre_lsName">{{item.caseVo.creationName}}</div>
                          <!--<div class="centre_lsGs">大唐盛世律师所</div>-->
                        </div>
                      </div>
                      <div class="centre_tu">
                        <img v-if="item.status =='SUCCESS'" src="../assets/ls/shenguo.png" alt="">
                        <img v-if="item.status =='ERROR'" src="../assets/ls/yichang.png" alt="">
                      </div>
                    </li>
                  </van-cell>
                  <div
                    style="text-align:center"
                    class="nomore"
                    v-show="nomore"
                  >没有更多数据了</div>
                </van-list>
              </van-pull-refresh>
            </ol>
            <div class="kong" v-else>
              <img src="../assets/ls/kongbai.png" alt="">
              <div class="kongT">您当前没有任何案件</div>
              <div class="kongB">在这里可以查看您案件的所有状态</div>
              <div class="kong_btn" @click="redirects('/Home')">返回首页</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { Popup, Toast, Field } from "vant";
  import normalHome from "../assets/Jnohome.png";
  import activeWhole from "../assets/Jacfabu.png";
  import global_ from "../components/Global";

  import xz from "../assets/xz.png";
  import wxz from "../assets/wxz.png";

  import normalMe from "../assets/Jnome.png";
  import normalgwcw from "../assets/gwcw.png";
  var qs = require("qs");
  var formData;
  var add = new Object();

  export default {
    data() {
      return {
        scroll: "",
        serverSrc: global_.serverSrc,
        tabarActive: 1,
        icon: {
          normal: normalHome,
          whole: activeWhole,
          me: normalMe,
          gwcw: normalgwcw,
        },
        istrue: 0,
        nulls: true,
        show: false,
        remove: false,
        isLoading: false,
        finished: false,
        loading: false,
        nomore: false,
        pageNum: 1,
        array:[],
        tel: "",
        isID: "",
        showBar:false,
        isLawyer:false,/*律师*/
        transitionName: 'slide-left'//默认动画
      };
    },
    methods: {
      returns() {
        this.$router.go(-1);
      },
      redirects(url,a) {
        this.$router.push(url);
        localStorage.setItem('CDid',a)
      },
      listTab(a) {
        this.istrue = a;
        window.scrollTo(0,0);
        this.pageNum=1;
        this.nomore=false
        this.isLoading=false
        this.array =[]
        this.onLoad()
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        // localStorage.setItem('publishNum',a);
      },
      onLoad() {
        if (this.isLoading) {
          return false;
        }

        var that = this;
        // that.array=[{
        //   "id": '01',
        //   "num":'20'
        // },{
        //   "id": '02',
        //   "num":'30'
        // },{
        //   "id": '03',
        //   "num":'40'
        // },{
        //   "id": '04',
        //   "num":'50'
        // }]
        var postDatasE = qs.stringify({
          userId:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/my/impower",postDatasE)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          setTimeout(function () {
              that.array =res.data.body;
              if(res.data.body.length>0){
                that.nulls =true;
                that.isNo =true
              }else {
                that.nulls =false;
              }
            that.finished =true
            that.loading =false
            Toast.clear();
          },200)
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
        // if(that.istrue == 0){
        //   that.isDel =true
        // }else {
        //   that.isDel =false
        // }
        // var postData = qs.stringify({
        //   type: that.istrue,
        //   pageNum: that.pageNum,
        //   TEL: that.tel
        // });
        //
        // this.$axios
        //   .post(that.serverSrc + "mall/mine/list.do", postData, { timeout: 5000 })
        //   .then(function(res) {
        //     var typeNums = postData.split("&")[0].split("=")[1];
        //
        //     if (res.data.code == "SUCCESS") {
        //       Toast.clear();
        //       that.isShowContent = true;
        //       if (res.data.info.pageList.length == 0) {
        //         that.nulls = false;
        //       } else {
        //         that.nulls = true;
        //       }
        //       if (res.data.info.pageList.length > 0) {
        //         setTimeout(() => {
        //           for (let i = 0; i < res.data.info.pageList.length; i++) {
        //             if (that.istrue == typeNums) {
        //               that.array.push(res.data.info.pageList[i]);
        //             }
        //           }
        //           that.loading = false;
        //           if (
        //             res.data.info.pageList.length < 10 ||
        //             res.data.info.pageNum == res.data.info.pages
        //           ) {
        //             //  不再加载数据时
        //             that.finished = true;
        //             that.nomore = true;
        //           }
        //         }, 200);
        //       } else {
        //         that.loading = false;
        //         that.finished = true;
        //         setTimeout(() => {
        //           if (that.array.length == 0) {
        //             that.hasProduct = true;
        //             that.homeShow = false;
        //           } else {
        //             that.nomore = false;
        //             that.homeShow = true;
        //           }
        //         }, 200);
        //       }
        //       that.pageNum++;
        //     } else if (res.data.code == "FAIL_MEMBER_INVALID") {
        //       Toast({
        //         message: res.data.message,
        //         duration: 2000
        //       });
        //       setTimeout(function() {
        //         that.$router.push("/");
        //         localStorage.clear();
        //       }, 2500);
        //     } else {
        //       Toast({
        //         message: res.data.message,
        //         duration: 2000
        //       });
        //     }
        //   })
        //   .catch(err => {
        //     var str = err + "";
        //     if (str.search("timeout") !== -1) {
        //     } else {
        //       Toast({
        //         message: "网络异常！",
        //         duration: 2000
        //       });
        //     }
        //   });
      }
    },
    mounted() {
      this.tel = localStorage.getItem("TEL");
      window.scrollTo(0,0);
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      if(localStorage.getItem('AType')){
        if(localStorage.getItem('AType') == '"BARRISTER"'){
          this.isLawyer =true
        }else {
          this.isLawyer =false
        }
      }
      // let ua = navigator.userAgent.toLowerCase(); //Ios终端
      // //Android终端
      // let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      // if (
      //   (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) &&
      //     ua.match(/MicroMessenger/i) == "micromessenger") ||
      //   !!ua.match(/mqqbrowser|qzone|qqbrowser/i)
      // ) {
      //   $(".down input").on("blur", function() {
      //     window.scroll(0, document.body.scrollTop);
      //   });
      // }
      //
      // function IsPC() {
      //   var userAgentInfo = navigator.userAgent;
      //   var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];
      //   var flag = true;
      //   for (var v = 0; v < Agents.length; v++) {
      //     if (userAgentInfo.indexOf(Agents[v]) > 0) {
      //       flag = false;
      //       break;
      //     }
      //   }
      //   if(window.screen.width>=768){
      //     flag = true;
      //   }
      //   return flag;
      // }
      // if(IsPC()){
      //   $('.van-tabbar').css("height", "60px");
      //   $('.van-tabbar').css("padding-bottom", "10px");
      // }
    }
  };
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
    .van-tabbar--fixed {
      /*padding-bottom: env(safe-area-inset-bottom);*/
      padding-bottom: j(34);
    }
  }
  .van-tabbar-item--active {
    color: #1C6DB1 !important;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
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


  #centre .NavTab {
    font-size: j(24);
    font-weight: 400;
    /*margin-left: j(20);*/
    position: fixed;
    top: j(88);
    width: 95%;
    height: j(96);
    line-height: j(96);
    background: #f5f5f5;
    /*left: 50%;*/
    //margin-left: -47.5%;
    z-index: 99;
  }
  #centre .NavTab li {
    /*width: j(74);*/
    text-align: center;
    float: left;
    margin-right: j(40);
  }

  #centre .NavTab .list_active {
    position: relative;
    color: #1C6DB1;
    font-weight: 700;
    font-size: j(36);
  }
  #centre .NavTab .list_bor {
    display: block;
    width: 100%;
    height: j(10);
    background: #F47D48;
    border-radius: 5px;
    position: absolute;
    /*left:50%;*/
    top: j(60);
    //margin-left: j(-40);
    opacity: 0.6;
  }
  .boxHC{
    margin-top: j(200);
    margin-left: j(24);
    margin-right: j(24);
  }

  /*LI内容*/
  #centre-list ol {
    width: j(702);
    /*margin-left: j(24);*/
    /*margin-right: j(24);*/
    margin-top: j(120);
    margin-bottom: j(100);
  }

  #centre-list ol li {
    width: 100%;
    /*height: j(228);*/
    min-height: j(288);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(60);
    position: relative;
  }
  #centre-list ol .van-cell {
    /*margin-bottom: 10px;*/
    /*border-radius: 15px;*/
    padding: 0;
    background: transparent;
  }

  .centre_time{
    width: j(662);
    height: j(84);
    line-height: j(84);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    margin: 0 auto;
    border-bottom: 2px solid #E8EEF3;
  }
  .centre_Li{
    width: j(702);
    /*min-height: j(288);*/
    background: #FFFFFF;
    border-radius: 16px;
    padding-bottom: j(26);
  }
  .centre_liTob{
    width: j(702);
  }
  .centre_liRblue{
    float: left;
    padding: j(6) j(14);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1C6DB1;
    background: #F0F8FF;
    border-radius: 4px;
    border: 2px solid #1C6DB1;
    line-height:1;
    margin-right: j(8);
    margin-left: j(22);
    margin-bottom: j(16);
  }
  .centre_liRred{
    float: left;
    margin-left: j(22);
    padding: j(6) j(14);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #F47D48;
    background: #FFF6F3;
    border-radius: 4px;
    border: 2px solid #F56B47;
    line-height:1;
    margin-right: j(8);
    margin-bottom: j(16);
  }
  .centre_liText{
    min-height: j(90);
    padding: j(24) j(20) j(8);
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .centre_lsName{
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1F2226;
    padding-left: j(20);
  }
  .centre_lsGs{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    padding-left: j(20);
  }
  .centre_tu{
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .centre_tu img{
    width: j(148);
    height: j(148);
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
