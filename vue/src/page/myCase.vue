<template>
  <transition :name="transitionName">
    <div
      id="maCase"
      ref="putaway"
    >
      <div>
        <div class="navBar">
          <div class="goback" @click="returns"></div>
          <div @click="returns">我的案件</div>
          <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
        </div>
        <div class="boxHM">
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
              <li :class="{list_active:istrue==0}" @click="listTab(0)">我发起的 <span :class="{list_bor:istrue==0}"></span></li>
              <li v-if="oLs" :class="{list_active:istrue==1}" @click="listTab(1)">我受理的 <span :class="{list_bor:istrue==1}"></span></li>

            </ul>
            <img src="../assets/ls/sech.png" alt="" @click="redirects('/myCaseSearch')">
          </div>
          <div id="myCase-list">
            <ol v-if="nulls">
              <!--<van-pull-refresh-->
                <!--v-model="isLoading"-->
                <!--class="pulls"-->
              <!--&gt;-->
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
                    <li v-if="isNo">

                      <div class="myCase_Li">
                        <div style="clear: both"></div>
                        <div class="myCase_liText">
                          {{item.caseTitle}}
                        </div>
                        <div class="myCase_inreview">
                          <div class="myCase_inreviewT">{{item.caseStatusMessage}}</div>
                          <van-progress color="#1C6DB1" v-if="item.process" :percentage='item.process' :show-pivot="false" />
                        </div>

                        <div class="myCase_text">
                          <div class="myCase_textT">
                            {{item.progressRemark}}，{{item.createTime}}
                          </div>
                          <div class="myCase_textB">
                              <div class="myCase_tu"></div>
                              <div class="myCase_textBt">{{item.timeStr}}前更新</div>
                              <div class="myCase_textBb" v-if="istrue == '1'">{{item.creationName}}</div>
                              <div class="myCase_textBb" v-if="istrue == '0'">{{item.barristerName}}</div>
                          </div>
                          <div style="clear: both"></div>
                        </div>
                        <div style="clear: both"></div>
                        <div class="myCase_btns">
                           <div class="myCase_btn myCase_btnl" @click="update">
                             提醒更新
                             <div class="myCase_gang"></div>
                           </div>
                            <div class="myCase_btn">
                              相似案例
                              <div class="myCase_gang"></div>
                            </div>
                            <div class="myCase_btn myCase_btnr" v-if="item.caseProcessLevel<30">
                              查看详情
                            </div>
                            <div class="myCase_btn myCase_btnr" v-else @click="redirects('/azdetails',item.id)">
                              查看详情
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
              <!--</van-pull-refresh>-->
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
        isNo: false,
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
        isID:'',
        isEnd:null,
        oLs:false,
        transitionName: 'slide-left'//默认动画
      };
    },
    methods: {
      update(){
        Toast({
          message: '已提醒更新',
          duration: 1000
        });
      },
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
      redirects(url,id) {
        this.$router.push(url);
        localStorage.setItem('myID',id)
      },
      listTab(a) {
        this.array =[]
        this.istrue = a;
        window.scrollTo(0,0);
        this.pageNum=1;
        this.nomore=false
        this.isLoading=false
        this.array =[]
        this.onLoad()
        Toast.loading({
          message: '加载中...',
          forbidClick: false,
        });
        // localStorage.setItem('publishNum',a);
      },
      onLoad() {
        this.isNo ==false;
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
        var postDatasd = qs.stringify({
          userId:that.isID,
          isEnd:that.isEnd,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/my",postDatasd)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
            setTimeout(function () {
              console.log(res.data.body.protect)
              if(that.istrue == '0'){
                that.array =res.data.body.protect
                if(res.data.body.protect.length>0){
                  that.nulls =true;
                  that.isNo =true
                }else {
                  that.nulls =false;
                }
              }else {
                that.array =res.data.body.barrister;
                if(res.data.body.barrister.length>0){
                  that.isNo =true;
                  that.nulls =true;
                }else {
                  that.nulls =false;
                }
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
            this.oLs =true
        }else {
            this.oLs =false
        }
      }
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
  .van-tabbar-item--active {
    color: #1C6DB1 !important;
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


  #maCase .NavTab {
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
  #maCase .NavTab li {
    /*width: j(74);*/
    text-align: center;
    float: left;
    margin-right: j(40);
  }

  #maCase .NavTab .list_active {
    position: relative;
    color: #1C6DB1;
    font-weight: 700;
    font-size: j(36);
  }
  #maCase .NavTab .list_bor {
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
  .boxHM{
    margin-top: j(200);
    margin-left: j(24);
    margin-right: j(24);
  }



  /*LI内容*/
  #myCase-list ol {
    width: j(702);
    /*margin-left: j(24);*/
    /*margin-right: j(24);*/
    margin-top: j(120);
    margin-bottom: j(100);
  }

  #myCase-list ol li {
    width: 100%;
    /*height: j(228);*/
    min-height: j(428);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(60);
    position: relative;
  }
  #myCase-list ol .van-cell {
    /*margin-bottom: 10px;*/
    /*border-radius: 15px;*/
    padding: 0;
    background: transparent;
  }

  .myCase_Li{
    width: j(702);
    /*min-height: j(288);*/
    min-height: j(428);
    background: #FFFFFF;
    border-radius: 16px;
    margin-bottom: j(26);
  }

  .myCase_liText{
    min-height: j(90);
    padding: j(24) j(20) j(8);
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .myCase_inreview{
      width: j(662);
      margin: 0 auto j(30);
  }
  .myCase_inreview .van-progress{
    height: j(16) !important;
  }
  .myCase_inreviewT{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #F47D48;
    margin-bottom: j(12);
  }

  .myCase_text{
    width: j(662);
    margin: 0 auto j(30);
  }
  .myCase_textT{
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }
  .myCase_tu{
    width: j(26);
    height: j(26);
    background: url('../assets/ls/time.png') no-repeat;
    background-size: 100% 100%;
    float: left;
  }
  .myCase_textBt{
    padding: 0 j(10);
    border-right: 1px solid #999999;
    float: left;
    line-height: 1;
  }

  .myCase_textBb{
    padding: 0 j(10);
    float: left;
    line-height: 1;
  }
  .myCase_btns{
    margin-top: j(34);
  }
  .myCase_btn{
    width: j(234);
    height: j(88);
    line-height: j(88);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    text-align: center;
    position: relative;
    float: left;
    background: #F9FAFA;
  }
  .myCase_btnr{
    border-radius: 0 0 j(16) 0;
  }
  .myCase_btnl{
    border-radius: 0 0 0 j(16);
  }
  .myCase_gang{
    width: j(2);
    height: j(32);
    background: #DDE4E9;
    position: absolute;
    right: 0;
    top: j(28);
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
