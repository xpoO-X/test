<template>
  <transition :name="transitionName">
    <div
      id="newest"
      ref="putaway"
    >
      <div>
        <div class="navBar">
          <div class="goback" @click="returns"></div>
          <div @click="returns">最新案源</div>
          <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
        </div>
        <div class="newest_boxH">
          <!--<div class="Lsku_top">-->
            <!--<ul class="NavTab">-->
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
            <!--<img src="../assets/ls/search.png" alt="">-->
          <!--</div>-->
          <div id="newest-list">
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
                    <li @click="accept(item.id)">
                       <div class="newest_time">{{item.updateTime}}</div>
                       <div class="newest_Li">

                         <div class="newest_liTob">
                           <!--<div class="newest_liRblue">著作权</div>-->
                           <div class="newest_liRred" v-if="item.protectType">{{item.protectType}}</div>
                           <div class="newest_liHq" @click="accept(item.id)"><img src="../assets/ls/newhq.png" alt=""></div>
                         </div>

                         <div style="clear: both"></div>
                         <div class="newest_liText">
                           {{item.caseTitle}}
                         </div>

                         <!--<div class="newest_liRcc">非常喜欢</div>-->

                         <div class="newest_liBBT">
                           <div class="newest_gps">
                             <img src="../assets/ls/newgps.png" alt="">
                             {{item.city}}
                           </div>
                           <div class="newest_xing">
                             <img src="../assets/ls/newxing.png" alt="">
                             <!--<img class="newxingz" src="../assets/ls/newxingz.png" alt="">-->
                             {{item.viewCount}}
                           </div>
                           <div class="newest_liu">
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
              </van-pull-refresh>
            </ol>
          </div>

          <div class="newest_shou" @click="redirects('/collect')">
            <img src="../assets/ls/newshou.png" alt="">
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
        isID:'',
        isEnd:null,
        creationId:'',
        transitionName: 'slide-left'//默认动画
      };
    },
    methods: {
      yesBtn(){
        var that = this;
        that.msg = false;
        var postDatasn = qs.stringify({
          barristerId:that.isID,
          caseId:that.creationId,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/confirm",postDatasn)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          Toast({
            message:'已接受！',
            duration:2000
          });
          that.onLoad()
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
          caseId:that.creationId,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/cancel",postDatasn)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          Toast({
            message:'已拒绝！',
            duration:2000
          });
          that.onLoad()
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
      accept(cid){
        // this.msg = true;
        // this.creationId = cid;
        this.$router.push('/newdetail');
        localStorage.setItem('newdetailId',cid)
      },
      msgClosen() {
        this.msg = false;
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
        // that.array=[{
        //   "id": '01'
        // },{
        //   "id": '02'
        // },{
        //   "id": '03'
        // },{
        //   "id": '04'
        // }]

        var postDatasn = qs.stringify({
          barristerId:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/news",postDatasn)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          setTimeout(function () {
            console.log(res.data.body)
              that.array =res.data.body
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



  .newest_boxH{
    margin-top: j(88);
    margin-left: j(24);
    margin-right: j(24);
  }


  /*LI内容*/
  #newest-list ol {
    width: j(702);
    /*margin-left: j(24);*/
    /*margin-right: j(24);*/
    margin-top: j(120);
    margin-bottom: j(100);
  }

  #newest-list ol li {
    width: 100%;
    /*height: j(228);*/
    min-height: j(300);
    /*background: #FFFFFF;*/
    /*box-shadow: 0px 4px 12px 0px rgba(28,109,177,0.1);*/
    /*border-radius: 16px;*/
    margin-bottom: j(60);
  }
  #newest-list ol .van-cell {
    /*margin-bottom: 10px;*/
    /*border-radius: 15px;*/
    padding: 0;
    background: transparent;
  }

  .newest_time{
    width: 100%;
    text-align: center;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .newest_Li{
    width: j(702);
    /*min-height: j(288);*/
    background: #FFFFFF;
    box-shadow: 0px 4px 12px 0px rgba(28,109,177,0.1);
    border-radius: 16px;
  }

  .newest_liTob{
    width: j(702);
  }
  .newest_liRblue{
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
  .newest_liRred{
    margin-left: j(22);
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
    margin-right: j(8);
    margin-top: j(26);
  }
  .newest_liRcc{
    display: inline-block;
    padding: j(6) j(14);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #E0E3E6;
    border-radius: 4px;
    border: 2px solid #E0E3E6;
    line-height:1;
    margin-right: j(8);
    margin-left: j(22);
  }
  .newest_liHq{
    float: right;
    margin-top: j(20);
    margin-right: j(10);
  }
  .newest_liHq img{
    width: j(48);
    height: j(48);
  }
  .newest_liText{
    min-height: j(90);
    padding: 0 j(20) j(8);
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .newest_gps img{
    width: j(40);
    height: j(40);
    vertical-align: middle;
    margin-top: j(-8);
  }
  .newest_liu img{
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
  .newest_xing{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    float: right;
    margin-right: j(24);
  }
  .newest_liu{
    float: right;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    margin-right: j(22);
  }
  .newest_liBBT{
    margin-top: j(10);
    padding-bottom: j(80);
  }
  .newest_gps{
    float: left;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    margin-left: j(24);
  }
  .newest_shou{
    position: fixed;
    right: 0;
    bottom: j(168);
  }
  .newest_shou img{
    width: j(158);
    height: j(160);
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
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
