<template>
  <!--<transition :name="transitionName">-->
    <div class="home_BBox">
      <div>
        <div class="home_logo">
          <img src="../assets/ls/logo.png" alt="">
        </div>

        <div class="home_search" @click="redirects('/search')">
          <div class="home_searchL"><input type="text" placeholder="案件名称、律师"></div>
          <div class="home_searchR">
            <img src="../assets/ls/search.png" alt="">
          </div>
        </div>

        <div class="home_num">
          <div class="home_numL">
            <div class="home_numLtop">28900</div>
            <div class="home_numLbottom">累计维权量（次）</div>
          </div>
          <div class="home_numR">

            <!--<van-circle v-model="currentRate"  layer-color="#ebedf0" :rate="rate" size="120px" text="大小定制" />-->
            <van-circle v-model="currentRate" :rate="80"  :stroke-width="60"  color="#1C6DB1"  layer-color="#ebedf0" :clockwise="false" size="80px" :speed="100"/>
            <div class="home_numRtop">103</div>
            <div class="home_numRbottom">昨日</div>
          </div>
        </div>

        <!--最新维权动态-->
        <div class="home_stitle">
          最新维权动态<div class="home_new"></div>
        </div>

        <div>
          <div>
            <div id="category">
              <div class="catbox" v-for="(item,index) in sList" :key="index">
                <div class="catboxT">
                  <div class="catboxTname">{{item.creation.realName}} <div class="catboxTag">{{item.creationType == 'INFORM'?'举报':'维权'}}</div></div>
                  <div class="catboxText">{{item.creation.businessName}}</div>
                </div>
                <div class="catboxB">
                  <div class="catboxBnum">索赔金额：{{item.caseTotalPrice}}万</div>
                  <div class="catboxBdate">{{item.updateTime}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both"></div>
        <!--轮播-->
        <div class="home_banner">
          <van-swipe @change="onChange" :autoplay="4000">
            <van-swipe-item><img src="../assets/ls/banner5.jpg" alt=""></van-swipe-item>
            <van-swipe-item><img src="../assets/ls/banner6.jpg" alt=""></van-swipe-item>
            <van-swipe-item><img src="../assets/ls/banner10.jpg" alt=""></van-swipe-item>
            <!--<van-swipe-item><div class="banner_img"><img src="../assets/ls/banner1.jpg" alt=""></div></van-swipe-item>-->
            <!--<van-swipe-item><div class="banner_img"><img src="../assets/ls/banner2.jpg" alt=""></div></van-swipe-item>-->
            <!--<van-swipe-item><div class="banner_img"><img src="../assets/ls/banner3.jpg" alt=""></div></van-swipe-item>-->
            <template #indicator>
              <div class="custom-indicator">{{ current + 1 }}/4</div>
            </template>
          </van-swipe>
        </div>

        <!--案件-->
        <div class="home_case">
          <div class="home_caseTop">
            <ul class="NavTab fl">
              <!--<li-->
              <!--v-for="(item,index) in items"-->
              <!--:key="index"-->
              <!--:class="{list_active:istrue==index}"-->
              <!--@click="listTab(index)"-->
              <!--&gt;-->
              <!--{{item.name}}-->
              <!--<span :class="{list_bor:istrue==index}"></span>-->
              <!--</li>-->
              <li :class="{list_active:istrue==0}" @click="listTab(0)">维权直击 <span :class="{list_bor:istrue==0}"></span></li>
              <!--<li :class="{list_active:istrue==1}" @click="listTab(1)">更多案件 <span :class="{list_bor:istrue==1}"></span></li>-->
              <li :class="{list_active:istrue==1}" @click="redirects('/putaway')">更多案件 <span :class="{list_bor:istrue==1}"></span></li>

            </ul>
            <div class="home_caseMore fr" @click="redirects('/putaway')"></div>
          </div>

          <div class="home_caseList" v-if="pList.length !=0 ? true:false">
            <div class="home_caseLi" v-if="pList[0]" @click="redirects('/azdetailH',pList[0].id)">
              <div class="home_caseLiTop" v-if="pList[0].caseTitle">{{pList[0].caseTitle}}</div>
              <div class="home_caseLiBottom">
                <div class="fl">{{pList[0].barristerName}}</div>
                <div class="fr">{{pList[0].updateTime}}</div>
              </div>
            </div>
            <div class="home_caseLi" v-if="pList[1]" @click="redirects('/azdetailH',pList[1].id)">
              <div class="home_caseLiTop">{{pList[1].caseTitle}}</div>
              <div class="home_caseLiBottom">
                <div class="fl">{{pList[1].barristerName}}</div>
                <div class="fr">{{pList[1].updateTime}}</div>
              </div>
            </div>
            <div class="home_caseLi" v-if="pList[2]" @click="redirects('/azdetailH',pList[2].id)">
              <div class="home_caseLiTop">{{pList[2].caseTitle}}</div>
              <div class="home_caseLiBottom">
                <div class="fl">{{pList[2].barristerName}}</div>
                <div class="fr">{{pList[2].updateTime}}</div>
              </div>
            </div>
            <div class="home_caseBtext" @click="redirects('/putaway')">
              <img class="home_caseBimgL" src="../assets/ls/more-line-left.png" alt="">
              展示更多
              <img  class="home_caseBimgR" src="../assets/ls/more-line-right.png" alt="">
            </div>
          </div>

        </div>


        <!--律师排行-->
        <div class="home_ls">
          <div class="home_lsThead">
            <div class="home_lsTheadL">律师排行<img src="../assets/ls/paihang.png"></div>
            <div class="home_lsTheadR" @click="redirects('/Lsku')"></div>
          </div>
          <div class="home_lsList" v-if="lsList.length !=0 ? true:false">
            <div class="home_lsLi">
              <div class="home_lsLiL">
                <img src="../assets/ls/one.png" alt="">
              </div>
              <div class="home_lsLiR">
                <div class="home_lsLitu fl">
                  <img :src=lsList[0].headerImg.filePath alt="">
                </div>
                <div class="home_lsLiwa fl">
                  <div class="home_lsLiwat">
                    <div class="home_lsLiwatl fl">{{lsList[0].realName}}</div>
                    <div class="home_lsLiwatr fl"><img src="../assets/ls/zuan.png" alt="">LV{{lsList[0].barrister.level}}</div>
                  </div>
                  <div style="clear: both"></div>
                  <div class="home_lsLiwab">
                    {{lsList[0].businessName}}
                  </div>
                </div>
              </div>
            </div>
            <div class="home_lsLi">
              <div class="home_lsLiL">
                <img src="../assets/ls/two.png" alt="">
              </div>
              <div class="home_lsLiR">
                <div class="home_lsLitu fl">
                  <img :src=lsList[1].headerImg.filePath alt="">
                </div>
                <div class="home_lsLiwa fl">
                  <div class="home_lsLiwat">
                    <div class="home_lsLiwatl fl">{{lsList[1].realName}}</div>
                    <div class="home_lsLiwatr fl"><img src="../assets/ls/zuan.png" alt="">LV{{lsList[1].barrister.level}}</div>
                  </div>
                  <div style="clear: both"></div>
                  <div class="home_lsLiwab">
                    {{lsList[1].businessName}}
                  </div>
                </div>
              </div>
            </div>
            <div class="home_lsLi">
              <div class="home_lsLiL">
                <img src="../assets/ls/three.png" alt="">
              </div>
              <div class="home_lsLiR">
                <div class="home_lsLitu fl">
                  <img :src=lsList[2].headerImg.filePath alt="">
                </div>
                <div class="home_lsLiwa fl">
                  <div class="home_lsLiwat">
                    <div class="home_lsLiwatl fl">{{lsList[2].realName}}</div>
                    <div class="home_lsLiwatr fl"><img src="../assets/ls/zuan.png" alt="">LV{{lsList[2].barrister.level}}</div>
                  </div>
                  <div style="clear: both"></div>
                  <div class="home_lsLiwab">
                    {{lsList[2].businessName}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--合作公司-->
        <div class="home_gs">
          <div class="home_lsThead">
            <div class="home_lsTheadL">合作公司<img src="../assets/ls/paihang.png"></div>
            <div class="home_lsTheadR"  @click="redirects('/company')"></div>
          </div>
          <div class="home_gsList">
            <div class="home_gsLi"  v-for="item in uList">
              <div class="home_gsLiTop">{{item.businessName}}</div>
              <div class="home_gsLiBottom">
                <div class="fl">维权案件{{item.creationCaseCount}}例</div>
              </div>
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
  import { Toast } from "vant";
  import normalHome from "../assets/ls/yhome.png";
  import normalWhole from "../assets/ls/nanjian.png";
  import normalMe from "../assets/ls/nme.png";
  import normalgwcw from "../assets/ls/nls.png";
  import global_ from "../components/Global";
  import dialogBar from "../components/dialog";
  var qs = require("qs");
  export default {
    components: {
      "dialog-bar": dialogBar,
    },
    data() {
      return {
        serverSrc: global_.serverSrc,
        imgSrc: global_.imgSrc,
        tabarActive: 0,
        icon: {
          normal: normalHome,
          whole: normalWhole,
          me: normalMe,
          gwcw: normalgwcw
        },
        istrue: 0,
        active: 1,
        isSteps: 3,
        isShow: true,
        homex: false,
        homeX: true,
        isText: false,
        showBar: false,
        goInfo: false,
        ratingTageIndex: 0,
        datalist: [{
          id: '01',
          name: 'ddd'
        },
          {
            id: '02',
            name: 'dfdd'
          },
          {
            id: '03',
            name: 'dfds'
          },
          {
            id: '04',
            name: 'dfdsd'
          }
        ],
        shows: false,
        current: 0,
        currentRate: 0,
        isBnum: true,
        isID: '',
        lsList: [],
        pList: [],
        uList: [],
        sList: [],
        timer: null,  // 定时器名称
        transitionName: 'slide-left',//默认动画
      };
    },
    methods: {
      clickCancels(){
        this.$router.push('/perfect');
      },
      mask(){
        this.isText =false
        this.showBar =false
        this.homex = false;
        this.homeX = true;
      },
      returns() {
        this.$router.go(-1);
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
            // Toast('举报');
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
      isKo(){
        this.shows = !this.shows
        if(this.shows){
          this.isText =true
        }else {
          this.isText =false
        }

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
        // this.$router.push(url);
        this.isText =false
        this.showBar =false
        this.homex = false;
        this.homeX = true;
      },
      listTab(a) {
        this.istrue = a;
        window.scrollTo(0,0);
        // localStorage.setItem('publishNum',a);
      },
      changeTgeIndex(index, name,id){
        // console.log(index,name,id)
        // this.ratingTageIndex = index;

      },
      touchEnd(){
        // var event = e || window.event;
        // var element = document.elementFromPoint(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
        // this.showBar =false;
        // console.log(element)
        // if(element.className =='ani_L'){
        //   Toast('左');
        // }else if(element.className =='ani_R') {
        //   Toast('右');
        // }

        this.showBar = !this.showBar;
        this.homex = !this.homex;
        this.homeX = !this.homeX;
        if(this.showBar){
          this.isText =true
        }else {
          this.isText =false
        }
      },
      onChange(index) {
        this.current = index;
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
      initGet(){
        var that = this;
        var postDatasn = qs.stringify({

        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/u/main",postDatasn)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
             if(res.data.body.barristerList){
               console.log(res.data.body.barristerList);
               that.lsList = res.data.body.barristerList;
               that.pList = res.data.body.processCaseList;
               that.uList = res.data.body.userList;
               that.sList = res.data.body.successCaseList;
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
      }
    },
    mounted() {
      var that =this
      window.scrollTo(0,0);
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      that.initGet()
      that.getNum()
      this.timer=setInterval(function () {
        that.getNum()
      },5000)
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
  @supports (bottom: env(safe-area-inset-bottom)) {
    .van-tabbar--fixed{
      /*padding-bottom: env(safe-area-inset-bottom);*/
      padding-bottom: j(34);
    }
    .bgg{
      color: fuchsia;
    }
  }
  .fl{
    float: left;
  }

  .fr{
    float: right;
  }

  .home_BBox{
    min-height: 100vh;
    padding-bottom: j(300);
  }
  .van-tabbar-item{
    z-index: 9 !important;
  }
  .van-tabbar-item--active {
    color: #1C6DB1 !important;
  }
  .home_caseTop .NavTab {
    font-size: j(24);
    font-weight: 400;
    /*margin-left: j(20);*/
    /*position: fixed;*/
    /*top: j(86);*/
    width: 80%;
    height: j(96);
    line-height: j(96);
    background: #f5f5f5;
    /*left: 50%;*/
    //margin-left: -47.5%;
    z-index: 99;
  }
  .home_caseTop .NavTab li {
    width: j(120);
    text-align: center;
    float: left;
    margin-right: j(40);
  }

  .home_caseTop .NavTab .list_active {
    position: relative;
    color: #1C6DB1;
    font-weight: 700;
    font-size: j(24);
  }
  .home_caseTop .NavTab .list_bor {
    display: block;
    width: j(100);
    height: j(10);
    background: #F47D48;
    border-radius: 5px;
    position: absolute;
    left:50%;
    top: j(60);
    margin-left: j(-50);
    opacity: 0.6;
  }


  /*滑动*/
  #category{
    width: 100%;
    height:j(270);
    display: inline;
    white-space: nowrap;
    overflow-x: scroll;
    float: left;
    overflow-y: hidden;
  }
  #category .catbox{
    display:inline-block;
    width: j(444);
    height:j(248);
    background: #ffffff;
    box-shadow: j(0) j(4) j(12) j(0) rgba(28,109,177,0.1);
    border-radius: 8px;
    border: 2px solid #E8EEF3;
    margin-left: j(20);
  }

  #category::-webkit-scrollbar {display:none}



  .unsatisfied{
    background-color: #f5f5f5;
    color: #aaa;
  }
  .tagActivity{
    background: #1C6DB1 !important;
    box-shadow: 0px 4px 12px 0px rgba(28,109,177,0.1) !important;
    color: #fff !important;
  }
  .tagActivity .catL{
    color: #fff !important;
  }
  .tagActivity .catR{
    background: red !important;
  }
  .tagActivity .catboxB{
    color: #fff !important;
  }

  .catboxT{
    display: inline-block;
    width: j(396);
    height: j(132);
    margin-left: j(24);
    border-bottom: 2px solid #E8EEF3;
    font-size: j(32);
    font-weight: 600;
    color: #1F2226;
  }
  .catboxTag{
    display: inline-block;
    width: j(72);
    height: j(36);
    background: #F0F8FF;
    border-radius: j(4);
    border: j(2) solid #1C6DB1;
    font-size: j(22);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1C6DB1;
    line-height: j(36);
    text-align: center;
  }
  .catboxTname{
    margin-top: j(32);
  }
  .catboxText{
    width: j(360);
    height: j(34);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    line-height: j(34);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    margin-top: j(10);
  }
  .catboxB{
    width: j(396);
    height: j(114);
    margin-left: j(24);
    border-bottom: 2px solid #E8EEF3;
    font-size: j(28);
    color: #1F2226;
  }
  .catboxBnum{
    margin-top: j(12);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
  }
  .catboxBdate{
    margin-top: j(4);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
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



  /*底部*/
/*  .ani_box{
    width: j(300);
    height: j(404);
    !*background: red;*!
    !*border: 1px solid;*!
    position: fixed;
    left: 50%;
    margin-left: j(-150);
    bottom: j(300);
    z-index: 98;
  }
  .tui{
    width: j(150);
    height: j(150);
    margin-top: j(-40);
    z-index: 100000;
    pointer-events:none;!* 禁止长按图片保存 *!
  }
  [class*=van-hairline]::after{
    border:none!important
  }*/

/*  .ani_L{
    float: left;
    width: j(150);
    height: j(150);
    background:url('../assets/LL.png') no-repeat;
    background-size: 100% 100%;
  }
  .ani_R{
    float: right;
    width: j(150);
    height: j(150);
    background:url('../assets/R.png') no-repeat;
    background-size: 100% 100%;
  }*/



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

  #circle {
    width: j(200);
    height: j(200);
    background-color:blue;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
  }

  .nba .van-tabbar--fixed{
    z-index:99 !important;
  }



  /*底部*/

 /* .tui{
    width: j(100);
    height: j(100);
    margin-top: j(-100);
    z-index: 100000;
    border-radius: 50%;
    pointer-events:none;!* 禁止长按图片保存 *!
  }
  [class*=van-hairline]::after{
    border:none!important
  }
  .BT_text{
    margin-top: j(20);
  }

  .Nani_L{
    float: left;
    width: j(150);
    height: j(100);
    background: red;
    z-index:99 !important;
  }
  .Nani_R{
    float: right;
    width: j(150);
    height: j(100);
    background: blue;
    z-index:99 !important;
  }*/




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

  /*开始*/
  .home_logo{
    width: 100%;
    height: j(88);
    background: #FFFFFF;
  }
  .home_logo img{
    width: j(374);
    height: j(68);
    margin-left: j(20);
    margin-top: j(8);
  }
  .home_search{
    width: j(702);
    height: j(68);
    line-height: j(68);
    background: #ffffff;
    margin: j(22) auto j(24);
    border-radius: j(34);
  }
  .home_searchL{
    float: left;
    width: j(500);
    margin-left: j(40);
  }
  .home_searchL input{
    width: j(500);
    height: j(68);
    font-size: j(24);
    background:none;
    outline:none;
    border:none;
  }
  .home_searchL input::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: j(24);
    color: #999999;
  }
  .home_searchL input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: j(24);
    color: #999999;
  }
  .home_searchL input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: j(24);
    color: #999999;
  }
  .home_searchL input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-size: j(24);
    color: #999999;
  }
  .home_searchR img{
    float: right;
    margin-right: j(28);
    margin-top: j(10);
    width: j(48);
    height: j(48);
  }
  .home_num{
    width: j(702);
    height: j(258);
    background: url('../assets/ls/BG.png') no-repeat;
    background-size: 100% 100%;
    border-radius: j(16) j(48) j(16) j(48);
    margin: 0 auto;
  }
  .home_numL{
    width: j(368);
    height: j(258);
    float: left;
  }
  .home_numLtop{
    /*width: 100%;*/
    height: j(100);
    margin-top: j(48);
    font-size: j(72);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin-left: j(50);
    /*text-align: center;*/
  }
  .home_numLbottom{
    width: j(200);
    height: j(34);
    margin-left: j(50);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #B6DCFB;
  }
  .home_numR{
    float: left;
    margin-top: j(30);
    width: j(292);
    height: j(196);
    background: #FFFFFF;
    border-radius: j(16) j(32) j(16) j(32);
    position: relative;
  }
  .home_numR .van-circle{
    width: j(160)!important;
    height: j(160)!important;
    margin-left: j(68);
    margin-top: j(18);
  }
  .home_numRtop{
    width: 100%;
    font-size: j(48);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1C6DB1;
    text-align: center;
    position: absolute;
    top: j(56);
  }
  .home_numRbottom{
    width: 100%;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #B4CDE3;
    text-align: center;
    position: absolute;
    top: j(116);
  }
  .home_stitle{
    width: j(702);
    height: j(28);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8E959C;
    margin: j(32) auto;
  }
  .home_new{
    display: inline-block;
    width: j(72);
    height: j(24);
    background: url('../assets/ls/icon-new.png') no-repeat;
    background-size: 100% 100%;
    font-size: j(16);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: j(24);
    text-align: center;
  }



  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
  }
  .home_banner{
    /*width: 100%;*/
    width: j(702);
    height: j(320);
    /*margin-top: j(8);*/
    /*background: #ffffff;*/
    /*padding-top: j(20);*/
    /*padding-bottom: j(20);*/
    margin: j(8) auto 0;
    border-radius: j(16);
    overflow: hidden;
  }
  .home_banner img{
    width: j(702);
    height: j(320);
    border-radius: j(16);
  }
  .van-swipe{
    border-radius: j(16)!important;
  }
  .banner_img{
    width: j(702);
    height: j(320);
    background: #F0F0F0;
    margin: 0 auto;
    border-radius: j(16);
  }
  .banner_img img{
    width: j(702);
    height: j(320);
    border-radius: j(16);
  }


  .home_case{
    width: j(702);
    margin: 0 auto;
  }
  .home_caseTop{
    width: j(702);
    height: j(96);
    line-height: j(96);
  }
  .home_caseMore{
    width: j(44);
    height: j(12);
    background: url('../assets/ls/mores.png') no-repeat;
    background-size: 100% 100%;
    margin-top: j(40);
  }
  .home_caseList{
    width: j(702);
    min-height: j(528);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    padding-bottom: j(26);
  }
  .home_caseLi{
    width: j(674);
    min-height: j(132);
    border-bottom: 2px solid #E8EEF3;
    margin: 0 auto;
    padding-bottom: j(10);
  }
  .home_caseLiTop{
    width: j(674);
    min-height: j(72);
    font-size: j(28);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    /*overflow:hidden;*/
    /*text-overflow:ellipsis;*/
    /*white-space:nowrap;*/
    padding-top: j(34);
    /*padding-top: j(24);*/
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .home_caseLiBottom{
    width: j(674);
    height: j(34);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    padding-bottom: j(20);
    margin-top: j(20);
  }
  .home_caseBtext{
    width: 100%;
    height: j(34);
    line-height: j(34);
    text-align: center;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1C6DB1;
    margin-top: j(40);
    vertical-align: middle;
  }
  .home_caseBimgL{
    margin-right: j(30);
    vertical-align: middle;
  }
  .home_caseBimgR{
    margin-left: j(30);
    vertical-align: middle;
  }
  /*律师*/
  .home_ls{
    width: j(702);
    margin: j(40) auto;
  }
  .home_lsThead{
    width: j(702);
    height: j(44);
    line-height: j(44);
  }
  .home_lsTheadL{
    float: left;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8E959C;
  }
  .home_lsTheadL img{
    width: j(44);
    height: j(44);
    vertical-align: middle;
  }
  .home_lsTheadR{
    float: right;
    width: j(44);
    height: j(12);
    background: url('../assets/ls/mores.png') no-repeat;
    background-size: 100% 100%;
    margin-top: j(15);
  }
  .home_lsList{
    margin-top: j(24);
    width: j(702);
    height: j(646);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
  }
  .home_lsLi{
    width: j(662);
    height: j(176);
    margin: 0 auto;
    border-bottom: 2px solid #E8EEF3;
  }
  .home_lsLiL{
    width: j(96);
    height: j(96);
    float: left;
    margin-top: j(42);
  }
  .home_lsLiL img{
    width: j(96);
    height: j(96);
  }
  .home_lsLiR{
    float: left;
    /*width: j(350);*/
    height: j(96);
    margin-left: j(46);
    margin-top: j(40);
  }
  .home_lsLitu{
    width: j(96);
    height: j(96);
    border-radius: 50%;
  }
  .home_lsLitu img{
    width: j(96);
    height: j(96);
    border-radius: 50%;
  }
  .home_lsLiwa{
    margin-left: j(22);
  }
  .home_lsLiwatl{
    min-width: j(140);
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
  }
  .home_lsLiwatr{
    float: left;
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
  .home_lsLiwatr img{
    width: j(28);
    height: j(28);
    margin-left: j(8);
    margin-right: j(4);
  }
  .home_lsLiwab{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    margin-top: j(8);
  }

  /*公司*/
  .home_gs{
    width: j(702);
    margin: 0 auto;
  }
  .home_gsList{
    margin-top: j(24);
    width: j(702);
    min-height: j(160);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    padding-bottom: j(60);
  }
  .home_gsLi{
    width: j(674);
    min-height: j(130);
    border-bottom: 2px solid #E8EEF3;
    margin: 0 auto;
    padding-bottom: j(10);
  }
  .home_gsLiTop{
    width: j(674);
    min-height: j(86);
    font-size: j(28);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #333333;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    /*padding-top: j(26);*/
    padding-top: j(36);

  }
  .home_gsLiBottom{
    width: j(674);
    height: j(34);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    padding-bottom: j(16);
    margin-top: j(20);
  }
  .van-swipe__indicator--active{
    background-color: #1C6DB1 !important;
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
</style>
