<template>
  <transition :name="transitionName">
    <div
      id="myMark"
      ref="putaway"
    >
      <div>
        <div class="navBar">
          <div class="goback" @click="returns"></div>
          <div @click="returns">我的标记</div>
          <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
        </div>
        <div class="myMark_box">
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
              <li :class="{list_active:istrue==0}" @click="listTab(0)">非常喜欢 <span :class="{list_bor:istrue==0}"></span></li>
              <li :class="{list_active:istrue==1}" @click="listTab(1)">不感兴趣 <span :class="{list_bor:istrue==1}"></span></li>

            </ul>
          </div>
          <div id="myMark-list">
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
                      <div class="myMark_Li">

                        <div class="myMark_liText">
                          北京市司法局关于批准佟珂在内地从事律师职业的决定
                        </div>

                        <div class="myMark_liBBT">
                          <div class="myMark_gps">
                            <img src="../assets/ls/newgps.png" alt="">
                            北京市
                          </div>
                          <div class="myMark_xing">
                            <!--<img src="../assets/ls/newxing.png" alt="">-->
                            <img class="newxingz" src="../assets/ls/newxingz.png" alt="">
                            2222222
                          </div>
                          <div class="myMark_liu">
                            <img src="../assets/ls/newliu.png" alt="">
                            22222
                          </div>
                        </div>
                        <div style="clear: both"></div>
                        <div class="myMark_btn">
                          取消标记
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
        istrue: 1,
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
        transitionName: 'slide-left'//默认动画
      };
    },
    methods: {
      touchEnd(e){
        var event = e || window.event;
        var element = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
        this.showBar =false;
        if(element.className =='ani_L'){
          Toast('左');
        }else if(element.className =='ani_R') {
          Toast('右');
        }
        console.log(element.className);
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


  #myMark .NavTab {
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
  #myMark .NavTab li {
    /*width: j(74);*/
    text-align: center;
    float: left;
    margin-right: j(40);
  }

  #myMark .NavTab .list_active {
    position: relative;
    color: #1C6DB1;
    font-weight: 700;
    font-size: j(36);
  }
  #myMark .NavTab .list_bor {
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
  .myMark_box{
    margin-top: j(88);
    margin-left: j(24);
    margin-right: j(24);
  }


  /*LI内容*/
  #myMark-list ol {
    width: j(702);
    /*margin-left: j(24);*/
    /*margin-right: j(24);*/
    margin-top: j(190);
    margin-bottom: j(100);
  }

  #myMark-list ol li {
    width: 100%;
    min-height: j(292);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(24);
  }
  #myMark-list ol .van-cell {
    /*margin-bottom: 10px;*/
    /*border-radius: 15px;*/
    padding: 0;
    background: transparent;
  }
  .myMark_Li{
    width: j(702);
    /*min-height: j(288);*/
    /*background: #FFFFFF;*/
    /*box-shadow: 0px 4px 12px 0px rgba(28,109,177,0.1);*/
    /*border-radius: 16px;*/
  }

  .myMark_liText{
    min-height: j(90);
    padding: j(28) j(20) j(8);
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

  }
  .myMark_gps{
    float: left;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    margin-left: j(24);
  }
  .myMark_gps img{
    width: j(40);
    height: j(40);
    vertical-align: middle;
    margin-top: j(-8);
  }
  .myMark_liu img{
    width: j(40);
    height: j(40);
    vertical-align: middle;
    margin-top: j(-8);
  }
  .newxingz{
    width: j(48);
    height: j(48);
    vertical-align: middle;
    margin-top: j(-8);
  }
  .myMark_xing img{
    width: j(40);
    height: j(40);
    vertical-align: middle;
    margin-top: j(-8);
  }
  .myMark_xing{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    float: right;
    margin-right: j(24);
  }
  .myMark_liu{
    float: right;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    margin-right: j(22);
  }
  .myMark_liBBT{
    margin-top: j(10);
    /*padding-bottom: j(80);*/
  }

  .myMark_shou{
    position: fixed;
    right: 0;
    bottom: j(168);
  }
  .myMark_shou img{
    width: j(158);
    height: j(160);
  }

  .myMark_btn{
    width: j(662);
    height: j(88);
    line-height: j(88);
    text-align: center;
    margin: 0 auto;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1F2226;
    border-top: 2px solid #E8EEF3;
    margin-top: j(24);
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
