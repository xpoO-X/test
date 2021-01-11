<template>
  <!--<transition :name="transitionName">-->
    <div
      id="Case"
      ref="putaway"
    >
      <div>
        <div class="navBar">
          <div class="goback" @click="returns"></div>
          <div @click="returns">案件中心</div>
        </div>
        <div class="box_Case">
          <!--<div class="Case_top">-->
            <!--<ul class="Case_NavTab">-->
              <!--&lt;!&ndash;<li&ndash;&gt;-->
              <!--&lt;!&ndash;v-for="(item,index) in items"&ndash;&gt;-->
              <!--&lt;!&ndash;:key="index"&ndash;&gt;-->
              <!--&lt;!&ndash;:class="{list_active:istrue==index}"&ndash;&gt;-->
              <!--&lt;!&ndash;@click="listTab(index)"&ndash;&gt;-->
              <!--&lt;!&ndash;&gt;&ndash;&gt;-->
              <!--&lt;!&ndash;{{item.name}}&ndash;&gt;-->
              <!--&lt;!&ndash;<span :class="{list_bor:istrue==index}"></span>&ndash;&gt;-->
              <!--&lt;!&ndash;</li>&ndash;&gt;-->
              <!--<li :class="{list_active:istrue==0}" @click="listTab(0)">全部 <span :class="{list_bor:istrue==0}"></span></li>-->
              <!--<li :class="{list_active:istrue==1}" @click="listTab(1)">著作权 <span :class="{list_bor:istrue==1}"></span></li>-->
              <!--<li :class="{list_active:istrue==2}" @click="listTab(2)">专利权 <span :class="{list_bor:istrue==2}"></span></li>-->
              <!--<li :class="{list_active:istrue==3}" @click="listTab(3)">集成电路 <span :class="{list_bor:istrue==3}"></span></li>-->

            <!--</ul>-->
            <!--<img src="../assets/ls/sech.png" alt="" @click="redirects('/CaseSearch')">-->
          <!--</div>-->
          <div class="search_searchBox">
            <div class="search_search">
              <div class="search_searchL"><input v-model="searchStr" type="text" placeholder="律师名称/案件名称/案件编号"></div>
              <div class="search_searchR" @click="searchInp">
                <img src="../assets/ls/search1.png" alt="">
              </div>
            </div>
          </div>
          <div id="Case-list">
            <ol v-if="true">
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
                    <li>
                      <div class="Case_Li" @click="redirects('/azdetailH',item.id)">

                        <div class="Case_liTob">
                          <!--<div class="Case_liRblue">著作权</div>-->
                          <div class="Case_liRred" v-if="item.protectType">{{item.protectType}}</div>
                          <div class="Case_liRH" v-else>0</div>
                          <!--<div class="Case_liHq"><img src="../assets/ls/newhq.png" alt=""></div>-->
                        </div>

                        <div style="clear: both"></div>
                        <div class="Case_liText">
                          {{item.caseTitle}}
                        </div>


                        <div class="Case_liBBT">
                          <div class="Case_gps">
                            {{item.updateTime}}
                          </div>
                          <div class="Case_xing">
                            <!--<img src="../assets/ls/newxing.png" alt="">-->
                            <img class="newxingz" src="../assets/ls/newxingz.png" alt="">
                            {{item.viewCount}}
                          </div>
                          <div class="Case_liu">
                            <img src="../assets/ls/newliu.png" alt="">
                            {{item.collectCount}}
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
              <div class="kong_btn">返回首页</div>
            </div>
          </div>




        </div>
      </div>
      <!--蒙层-->
      <div class="test" v-if="isText" @click="mask"></div>

      <div style="clear: both"></div>
      <transition name="slide-fade">
        <div class="ani_box" v-if="showBar">
          <div class="ani_L" @click="isLeft">举报</div>
          <div class="ani_R" @click="isRight">维权</div>
        </div>
      </transition>

      <!-- tabBar -->
      <div class="nba">
        <van-tabbar v-model="tabarActive">
          <van-tabbar-item  icon="wap-home" @click="redirects('/Home')">
            <span>首页</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="props.tabarActive ? icon.active : icon.normal"
            >
          </van-tabbar-item>
          <van-tabbar-item icon="pending-evaluate"  @click="redirects('/putaway')">
            <span>案件</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="icon.whole"
            >
          </van-tabbar-item>
          <van-tabbar-item @click.native="touchEnd">
            <!--<van-tabbar-item @touchstart.native="show = !show" @touchend.native="show = !show" @touchend="touchEnd(e)">-->
            <!--<img class="tui" src="http://sucai.suoluomei.cn/sucai_zs/images/20200604173603-12.png" alt="">-->
            <div class="tui">
              <div id="exCircle">
                <img src="../assets/ls/weiquan.png" alt="" v-if="homeX">
                <div id="inCircle" v-if="homex">
                  <img src="../assets/ls/homeX.png" alt="">
                </div>
              </div>
            </div>
            <div class="BT_text">维护权益</div>
          </van-tabbar-item>
          <van-tabbar-item icon="pending-evaluate"  @click="redirects('/Lsku')">
            <span>律师</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="icon.gwcw"
            >
          </van-tabbar-item>
          <van-tabbar-item v-if="isBnum" icon="contact" @click="redirects('/Me')">
            <span>我的</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="icon.me"
            >
          </van-tabbar-item>
          <van-tabbar-item v-else dot icon="contact" @click="redirects('/Me')">
            <span>我的</span>
            <img
              slot="icon"
              slot-scope="props"
              :src="icon.me"
            >
          </van-tabbar-item>
        </van-tabbar>
      </div>

      <dialog-bar v-model="goInfo"
                  type=""
                  id="Ys"
                  title=""
                  content="<div class='tiTests'>去完善完个人信息</div>"
                  v-on:cancel="clickCancels()"
                  cancelText="确定">

      </dialog-bar>
    </div>
  <!--</transition>-->
</template>
<script>
  import { Popup, Toast, Field } from "vant";
  import normalHome from "../assets/ls/nhome.png";
  import activeWhole from "../assets/ls/yanjian.png";
  import global_ from "../components/Global";

  import xz from "../assets/xz.png";
  import wxz from "../assets/wxz.png";

  import normalMe from "../assets/ls/nme.png";
  import normalgwcw from "../assets/ls/nls.png";
  import dialogBar from "../components/dialog";
  var qs = require("qs");
  var formData;
  var add = new Object();

  export default {
    components: {
      "dialog-bar": dialogBar,
    },
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
        homex: false,
        homeX: true,
        isText: false,
        showBar: false,
        goInfo: false,
        isBnum: true,
        isID: '',
        searchStr: '',
        timer: null,  // 定时器名称
        transitionName: 'slide-left'//默认动画
      };
    },
    methods: {
      searchInp(){
        this.onLoad()
      },
      clickCancels(){
        this.$router.push('/perfect');
      },
      mask(){
        this.isText =false
        this.showBar =false
        this.homex = false;
        this.homeX = true;
      },
      isLeft(){
        if(localStorage.getItem('ID')){
          this.showBar = !this.showBar;
          this.homex = !this.homex;
          this.homeX = !this.homeX;
          if(this.showBar){
            this.isText =true
          }else {
            this.isText =false
          }
          if(localStorage.getItem('isStatus')){
            if(JSON.parse(localStorage.getItem('isStatus')) == 'UN_DESC'){
              this.goInfo =true;
            }else {
              this.$router.push('/power');
            }
          }else {
            this.$router.push('/report');
          }
        }else {
          this.$router.push('/');
        }
      },
      isRight(){
        if(localStorage.getItem('ID')){
          this.showBar = !this.showBar
          this.homex = !this.homex;
          this.homeX = !this.homeX;
          if(this.showBar){
            this.isText =true
          }else {
            this.isText =false
          }
          if(localStorage.getItem('isStatus')){
            if(JSON.parse(localStorage.getItem('isStatus')) == 'UN_DESC'){
              this.goInfo =true;
            }else {
              this.$router.push('/power');
            }
          }else {
            this.$router.push('/power');
          }
        }else {
          this.$router.push('/');
        }
      },
      touchEnd(){

          this.showBar = !this.showBar;
          this.homex = !this.homex;
          this.homeX = !this.homeX;
          if(this.showBar){
            this.isText =true
          }else {
            this.isText =false
          }

      },
      returns() {
        this.$router.go(-1);
      },
      redirects(url,aid) {
        if(url != '/Home'){
          if(localStorage.getItem('ID')){
            if(url == '/azdetailH'){
              this.$router.push('/azdetailH');
              localStorage.setItem('myIdH',aid)
            }else {
              this.$router.push(url);
            }
          }else {
            this.$router.push('/');
          }
        }else {
          this.$router.push(url);
        }
        this.isText =false
        this.showBar =false
        this.homex = false;
        this.homeX = true;
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
        //   "id": '01'
        // },{
        //   "id": '02'
        // },{
        //   "id": '03'
        // },{
        //   "id": '04'
        // }]

        var postDatasp = qs.stringify({
          searchStr:that.searchStr,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/repostory",postDatasp)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          setTimeout(function () {
            console.log(res.data.body)
            that.array =res.data.body
            if(res.data.body.length>0){
              that.nulls =true;
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
      },
      getNum(){
        var that=this;
        var postDatast = qs.stringify({
          userId:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/notify/count",postDatast)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          // console.log(res.data.body)
          if(res.data.body>0){
            that.isBnum=false;
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
    mounted() {
      var that =this
      this.tel = localStorage.getItem("TEL");
      window.scrollTo(0,0);
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      that.getNum()
      this.timer=setInterval(function () {
        that.getNum()
      },5000)
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
    },
    beforeDestroy() {
      clearInterval(this.timer);
      this.timer = null;
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
    z-index: 97;
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


  #Case .Case_NavTab {
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
    z-index: 97;
  }
  #Case .Case_NavTab li {
    /*width: j(74);*/
    text-align: center;
    float: left;
    margin-right: j(40);
  }

  #Case .Case_NavTab .list_active {
    position: relative;
    color: #1C6DB1;
    font-weight: 700;
    font-size: j(36);
  }
  #Case .Case_NavTab .list_bor {
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
  .box_Case{
    margin-top: j(200);
    margin-left: j(24);
    margin-right: j(24);
  }

  .Case_time{
    width: 100%;
    text-align: center;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .Case_Li{
    width: j(702);
    /*min-height: j(288);*/
    background: #FFFFFF;
    box-shadow: 0px 4px 12px 0px rgba(28,109,177,0.1);
    border-radius: 16px;
  }

  .Case_liTob{
    width: j(702);
  }
  .Case_liRblue{
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
    margin-top: j(26);
  }
  .Case_liRred{
    float: left;
    padding: j(6) j(14);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #F47D48;
    background: #FFF6F3;
    border-radius: 4px;
    border: 2px solid #F56B47;
    line-height:1;
    margin-left: j(22);
    margin-right: j(8);
    margin-top: j(26);
  }
  .Case_liRH{
    float: left;
    padding: j(6) j(14);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    background: #ffffff;
    border-radius: 4px;
    line-height:1;
    margin-left: j(22);
    margin-right: j(8);
    margin-top: j(26);
  }
  .Case_liHq{
    float: right;
    margin-top: j(20);
    margin-right: j(10);
  }
  .Case_liHq img{
    width: j(48);
    height: j(48);
  }
  .Case_liText{
    min-height: j(90);
    padding: j(10) j(20) j(8);
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .Case_liu img{
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
  .newest_xing img{
    width: j(40);
    height: j(40);
    vertical-align: middle;
    margin-top: j(-8);
  }
  .Case_xing{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    float: right;
    margin-right: j(24);
  }
  .Case_liu{
    float: right;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    margin-right: j(22);
  }
  .Case_liBBT{
    margin-top: j(10);
    padding-bottom: j(80);
  }
  .Case_gps{
    float: left;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    margin-left: j(24);
  }
  .Case_shou{
    position: fixed;
    right: 0;
    bottom: j(168);
  }
  .Case_shou img{
    width: j(158);
    height: j(160);
  }





  /*LI内容*/
  #Case-list ol {
    width: j(702);
    /*margin-left: j(24);*/
    /*margin-right: j(24);*/
    margin-top: j(120);
    margin-bottom: j(220);
  }

  #Case-list ol li {
    width: 100%;
    /*height: j(228);*/
    min-height: j(248);
    background: #FFFFFF;
    box-shadow: 0px 4px 12px 0px rgba(28,109,177,0.1);
    border-radius: 16px;
    margin-bottom: j(60);
    position: relative;
  }
  #Case-list ol .van-cell {
    /*margin-bottom: 10px;*/
    /*border-radius: 15px;*/
    padding: 0;
    background: transparent;
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
  .Case_top{
    width: 100%;
    position: absolute;
  }
  .Case_top img{
    width: j(48);
    height: j(48);
    position: fixed;
    right: j(20);
    top: j(110);
    z-index: 97;
  }


  /*底*/
  #exCircle{
    margin:auto;
    width: j(100);
    height: j(100);
    border-radius: 150px;
    background-color: #1C6DB1;
    /*background: url("../assets/ls/weiquan.png") no-repeat;*/
    /*background-size: 100% 100%;*/
  }
  #exCircle img{
    margin-left: j(19);
    margin-top: j(19);
    width: j(62);
    height: j(62);
  }
  #inCircle{
    margin-top: j(15);
    margin-left: j(15);
    position: absolute;
    width: j(70);
    height: j(70);
    border-radius: 100px;
    background-color: #ffffff;
  }
  /*底部*/
  .ani_box{
    width: j(120);
    height: j(404);
    /*background: red;*/
    /*border: 1px solid;*/
    position: fixed;
    left: 50%;
    margin-left: j(-60);
    bottom: j(120);
    z-index: 98;
  }

  .ani_L{
    /*float: left;*/
    width: j(120);
    height: j(120);
    line-height: j(120);
    background: #F56B47;
    box-shadow: 0 j(12) j(12) 0 rgba(255,96,56,0.2);
    border-radius: 50%;
    margin-bottom: j(40);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .ani_R{
    /*float: right;*/
    width: j(120);
    height: j(120);
    line-height: j(120);
    background: #1C6DB1;
    box-shadow: 0 j(12) j(12) 0 rgba(28,109,177,0.1);
    border-radius: 50%;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .tui{
    width: j(100);
    height: j(100);
    margin-top: j(-64);
    z-index: 100000;
    border-radius: 50%;
    pointer-events:none;/* 禁止长按图片保存 */
  }
  /*[class*=van-hairline]::after{*/
    /*border:none!important*/
  /*}*/
  .BT_text{
    margin-top: j(10);
  }
  #inCircle img{
    width: j(40);
    height: j(40);
    margin-left: j(15);
    margin-top: j(15);
  }
  .test {
    width:100%;
    height:100%;
    background:rgba(0,0,0,.75);
    position:absolute;
    z-index:98;
    top:0;
    left:0;
    color:#FFF;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
    transform: translateY(200px);
    opacity: 0;
  }


  /* 设置持续时间和动画函数 */
  .slide-fadeS-enter-active {
    transition: all .3s ease;
  }
  .slide-fadeS-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fadeS-enter, .slide-fadeS-leave-to
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
    transform: translateY(60px);
    opacity: 0;
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
  .van-tabbar-item{
    z-index: 9 !important;
  }
  .van-tabbar{
    z-index: 99 !important;
  }
  .van-tabbar-item__icon--dot::after{
    right: j(-2)!important;
  }
  .tiTests{
    width: 100%;
    text-align: center;
    font-size: j(38)  !important;
    margin-top: j(120) !important;
    color: #999999 !important;
  }

  /*搜索*/
  .search_searchBox{
    width: j(702);
    height: j(108);
    background: #f5f5f5;
    position: fixed;
    /*left: j(22);*/
    top: j(88);
    /*margin: j(22) auto j(24);*/
    z-index: 97;
  }
  .search_search{
    width: j(702);
    height: j(68);
    line-height: j(68);
    background: #ffffff;
    border-radius: j(34);
    /*position: fixed;*/
    /*left: j(22);*/
    /*top: j(110);*/
    /*margin: 0 auto;*/
    margin-top: j(20);
    z-index: 97;
  }
  .search_searchL{
    float: left;
    width: j(500);
    margin-left: j(40);
  }
  .search_searchL input{
    width: j(500);
    height: j(68);
    font-size: j(24);
    background:none;
    outline:none;
    border:none;
  }
  .search_searchL input::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: j(24);
    color: #999999;
  }
  .search_searchL input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: j(24);
    color: #999999;
  }
  .search_searchL input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: j(24);
    color: #999999;
  }
  .search_searchL input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-size: j(24);
    color: #999999;
  }
  .search_searchR img{
    float: right;
    margin-right: j(28);
    margin-top: j(10);
    width: j(48);
    height: j(48);
  }
  .search_List_more{
    width: 100%;
    background: #ffffff;
    margin-top: j(196);
  }
  .search_ListT{
    width: j(662);
    height: j(96);
    line-height: j(96);
    border-bottom: 2px solid #E8EEF3;
    margin: 0 auto;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1F2226;
  }
  .search_Li{
    width: j(662);
    height: j(99);
    line-height: j(99);
    margin: 0 auto;
  }
  .search_Li .search_LiL img{
    width: j(32);
    height: j(32);
    float: left;
    margin-top: j(38);
    margin-right: j(20);
  }
  .search_Li .search_LiR img{
    width: j(28);
    height: j(28);
    float: right;
    margin-top: j(36);
  }
  .search_LiName{
    width: j(550);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    float: left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
</style>
