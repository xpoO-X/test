<template>
  <transition :name="transitionName">
    <div
      id="ranking"
      ref="putaway"
    >
      <div>
        <div class="navBar">
          <div class="goback" @click="returns"></div>
          <div @click="returns">律师排行</div>
          <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
        </div>
        <div class="ranking_box">
          <div id="ranking-list">
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
                    <li>
                       <div class="ranking_Li">
                         <div class="ranking_lsLi">
                           <div class="ranking_lsLiL" v-if="index == 0">
                             <img src="../assets/ls/one.png" alt="">
                           </div>
                           <div class="ranking_lsLiL" v-else-if="index == 1">
                             <img src="../assets/ls/two.png" alt="">
                           </div>
                           <div class="ranking_lsLiL" v-else-if="index == 2">
                             <img src="../assets/ls/three.png" alt="">
                           </div>
                           <div class="ranking_lsLiL" v-else>
                             <div class="ranking_lsLiBg">{{index+1}}</div>
                           </div>
                           <div class="ranking_lsLiR">
                             <div class="ranking_lsLitu fl">
                               <img src="../assets/ls/ren.png" alt="">
                             </div>
                             <div class="ranking_lsLiwa fl">
                               <div class="ranking_lsLiwat">
                                 <div class="ranking_lsLiwatl fl">王律师</div>
                                 <div class="ranking_lsLiwatr fr"><img src="../assets/ls/zuan.png" alt="">LV3</div>
                               </div>
                               <div style="clear: both"></div>
                               <div class="ranking_lsLiwab">
                                 北京荣耀律师事务所
                               </div>
                             </div>
                           </div>
                         </div>
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
        istrue: 2,
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
        showBar:false,
        msg:false,
        transitionName: 'slide-left'//默认动画
      };
    },
    methods: {
      msgClosen() {
        this.msg = false;
      },
      returns() {
        this.$router.go(-1);
      },
      redirects(url) {
        this.$router.push(url);
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
        that.array=[{
          "id": '01'
        },{
          "id": '02'
        },{
          "id": '03'
        },{
          "id": '04'
        }]
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
      let ua = navigator.userAgent.toLowerCase(); //Ios终端
      //Android终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (
        (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) &&
          ua.match(/MicroMessenger/i) == "micromessenger") ||
        !!ua.match(/mqqbrowser|qzone|qqbrowser/i)
      ) {
        // $(".down input").on("blur", function() {
        //   window.scroll(0, document.body.scrollTop);
        // });
      }

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



  .ranking_box{
    margin-top: j(88);
    margin-left: j(24);
    margin-right: j(24);
  }


  /*LI内容*/
  #ranking-list ol {
    width: j(702);
    /*margin-left: j(24);*/
    /*margin-right: j(24);*/
    margin-top: j(120);
    margin-bottom: j(100);
  }

  #ranking-list ol li {
    width: 100%;
    /*height: j(228);*/
    min-height: j(176);
    /*background: #FFFFFF;*/
    /*box-shadow: 0px 4px 12px 0px rgba(28,109,177,0.1);*/
    /*border-radius: 16px;*/
    margin-bottom: j(24);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    padding-bottom: j(30);
  }
  #ranking-list ol .van-cell {
    /*margin-bottom: 10px;*/
    /*border-radius: 15px;*/
    padding: 0;
    background: transparent;
  }

  .ranking_Li{
    width: j(702);
    /*min-height: j(288);*/
    /*background: #FFFFFF;*/
    /*box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);*/
    /*border-radius: 16px;*/
  }
  .ranking_lsList{
    margin-top: j(24);
    width: j(702);
    height: j(646);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
  }
  .ranking_lsLi{
    width: j(662);
    height: j(176);
    margin: 0 auto;
  }
  .ranking_lsLiL{
    width: j(96);
    height: j(96);
    float: left;
    margin-top: j(42);
  }
  .ranking_lsLiL img{
    width: j(96);
    height: j(96);
  }
  .ranking_lsLiL .ranking_lsLiBg{
    width: j(64);
    height: j(64);
    line-height: j(64);
    background: url("../assets/ls/paiBG.png") no-repeat;
    background-size: 100% 100%;
    margin-left: j(22);
    margin-top: j(12);
    font-size: j(32);
    font-family: Impact;
    color: #FFFFFF;
    text-align: center;
  }
  .ranking_lsLiR{
    float: left;
    /*width: j(350);*/
    height: j(96);
    margin-left: j(46);
    margin-top: j(40);
  }
  .ranking_lsLitu{
    width: j(96);
    height: j(96);
    border-radius: 50%;
  }
  .ranking_lsLitu img{
    width: j(96);
    height: j(96);
    border-radius: 50%;
  }
  .ranking_lsLiwa{
    margin-left: j(22);
  }
  .ranking_lsLiwatl{
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
  }
  .ranking_lsLiwatr{
    width: j(96);
    height: j(32);
    font-size: j(24);
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #FFFFFF;
    background: #1C6DB1;
    border-radius: j(16);
    display: flex;
    align-items: center;
    margin-top: j(4);
    margin-left: j(12);
  }
  .ranking_lsLiwatr img{
    width: j(28);
    height: j(28);
    margin-left: j(10);
    margin-right: j(4);
  }
  .ranking_lsLiwab{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    margin-top: j(8);
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
  /*Lsku_top*/
  .Lsku_top{
    width: 100%;
    position: absolute;
  }
  .Lsku_top img{
    width: j(48);
    height: j(48);
    position: fixed;
    right: j(20);
    top: j(110);
    z-index: 99999999;
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
