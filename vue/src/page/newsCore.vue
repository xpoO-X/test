<template>
  <transition :name="transitionName">
    <div
      id="newsCore"
      ref="putaway"
    >
      <div>
        <div class="navBar">
          <div class="goback" @click="returns"></div>
          <div @click="returns">消息中心</div>
          <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
        </div>
        <div class="newsCore_box">
          <div class="Lsku_top">
            <ul class="newsCore_NavTab">
              <!--<li-->
              <!--v-for="(item,index) in items"-->
              <!--:key="index"-->
              <!--:class="{list_active:istrue==index}"-->
              <!--@click="listTab(index)"-->
              <!--&gt;-->
              <!--{{item.name}}-->
              <!--<span :class="{list_bor:istrue==index}"></span>-->
              <!--</li>-->
              <!--<li class="newsCore_liOne">共<span>281</span>条消息</li>-->
              <!--<li class="newsCore_liTwo">未读 <div>23</div></li>-->

            </ul>
          </div>
          <div id="newsCore-list">
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
                    <li @click="redirects('/newsdetails',item.serviceId,item.serviceType)">
                      <!--<div class="newsCore_Li">-->
                       <!--<div class="newsCore_LiLeft">-->
                         <!--<img src="../assets/ls/lingdnag.png" alt="">-->
                         <!--<div class="newsCore_dian"></div>-->
                       <!--</div>-->
                        <!--<div class="newsCore_LiRight">-->
                          <!--<div class="newsCore_RightT">解惑大师的解惑大师的市场活动解惑大师的市场活动市场活动</div>-->
                          <!--<div class="newsCore_RightTs">2020-09-12 12:45:45</div>-->
                          <!--<div class="newsCore_RightB">7月，科技产业惊传大新闻。大陆企业立讯以7月，科技产业惊传大新闻。大陆企业立讯以7月，科技产业惊传大新闻。大陆企业立讯以</div>-->
                          <!--<div class="newsCore_Del" @click.stop="del"><img src="../assets/ls/newsDel.png" alt=""></div>-->
                        <!--</div>-->
                      <!--</div>-->
                      <van-swipe-cell :right-width="60" :left-width="0" :on-close='onClose'>
                        <van-cell-group>
                          <div ref="left">
                            <div class="newsCore_Li">
                            <div class="newsCore_LiLeft">
                            <img src="../assets/ls/lingdnag.png" alt="">
                            <div class="newsCore_dian" v-if="item.status !== 'READ'"></div>
                            </div>
                            <div class="newsCore_LiRight">
                            <div class="newsCore_RightT">{{item.title}}</div>
                            <div class="newsCore_RightTs">{{item.notifyTime}}</div>
                            <div class="newsCore_RightB">{{item.message}}</div>
                            <!--<div class="newsCore_Del" @click.stop="del"><img src="../assets/ls/newsDel.png" alt=""></div>-->
                            </div>
                            </div>
                          </div>
                        </van-cell-group>
                        <span class="cancel" slot="right" @click="leftcancel(item.id)">删除</span>
                      </van-swipe-cell>
                    </li>
                  </van-cell>
                  <!--<div-->
                    <!--style="text-align:center"-->
                    <!--class="nomore"-->
                    <!--v-show="nomore"-->
                  <!--&gt;没有更多数据了</div>-->
                </van-list>
              <!--</van-pull-refresh>-->
            </ol>
          </div>

        <div class="newsCore_btn" @click="quan">
          全部标记为已读
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
        isID: "",
        showBar:false,
        transitionName: 'slide-left'//默认动画
      };
    },
    methods: {
      leftcancel(id){
        var that=this;
        var postDatast = qs.stringify({
          id:id,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/notify/delete",postDatast)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          // console.log(res.data.body)
          Toast('删除成功!');
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
      onClose(clickPosition, instance){
        var e = window.event;
        e.preventDefault();
        e.stopPropagation()
        instance.close();//这个函数就是让滑动的模块返回的操作  e.preventDefault()阻止默认行为;e.stopPropagation()阻止冒泡
        console.log('正在左滑')
      },
      del(){
          Toast('删除');
      },
      returns() {
        this.$router.go(-1);
      },
      redirects(url,id,type) {
        this.intd(id)
        if(type == 'CASE'){
          this.$router.push('/azdetails');
          localStorage.setItem('myID',id)
        }else if(type == 'IMPOWER'){
          this.$router.push('/downloadS');
          localStorage.setItem('CDid',id)
        }else if(type == 'NEWCASE'){
          this.$router.push('/newest');
        }
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
          userId:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/notify/list",postDatasn)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          setTimeout(function () {
            console.log(res.data.body)
            that.array =res.data.body

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

        // var that = this;
        // that.array=[{
        //   "id": '01'
        // },{
        //   "id": '02'
        // },{
        //   "id": '03'
        // },{
        //   "id": '04'
        // }]
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
      intd(id){
        var that=this;
        var postDatast = qs.stringify({
          userId:that.isID,
          id:that.id,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/notify/read",postDatast)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          // console.log(res.data.body)

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
      quan(){
        var that=this;
        var postDatast = qs.stringify({
          userId:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/notify/read",postDatast)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          // console.log(res.data.body)

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


  #newsCore .newsCore_NavTab {
    /*font-size: j(24);*/
    /*font-weight: 400;*/
    /*!*margin-left: j(20);*!*/
    /*position: fixed;*/
    /*top: j(88);*/
    /*width: 95%;*/
    /*height: j(96);*/
    /*!*line-height: j(96);*!*/
    /*background: #f5f5f5;*/
    /*!*left: 50%;*!*/
    /*//margin-left: -47.5%;*/
    /*z-index: 99;*/
  }
  #newsCore .newsCore_NavTab li {
    /*width: j(74);*/
    /*text-align: center;*/
    /*float: left;*/
    /*margin-right: j(30);*/
    /*line-height: 1;*/
  }
  .newsCore_liOne{
    border-right: 1px solid;
    padding-right: j(30);
    margin-top: j(34);
  }
  .newsCore_liOne span{
     padding: 0 j(6);
  }
  .newsCore_liTwo div{
    display: inline-block;
    margin-top: j(32);
    padding: j(2) j(12);
    background: #DA4A6D;
    border-radius: j(8) j(8) j(8) 0;
    font-size: j(24);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }

  .newsCore_box{
    margin-top: j(10);
    margin-left: j(24);
    margin-right: j(24);
  }


  /*LI内容*/
  #newsCore-list ol {
    width: j(702);
    /*margin-left: j(24);*/
    /*margin-right: j(24);*/
    /*margin-top: j(190);*/
    margin-top: j(120);
    margin-bottom: j(150);
  }

  #newsCore-list ol li {
    width: 100%;
    min-height: j(268);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(24);
    position: relative;
  }
  #newsCore-list ol .van-cell {
    /*margin-bottom: 10px;*/
    /*border-radius: 15px;*/
    padding: 0;
    background: transparent;
  }
  .newsCore_Li{
    width: j(702);
    min-height: j(268);
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    /*background: #FFFFFF;*/
    /*box-shadow: 0px 4px 12px 0px rgba(28,109,177,0.1);*/
    /*border-radius: 16px;*/
  }

  .newsCore_shou{
    position: fixed;
    right: 0;
    bottom: j(168);
  }
  .newsCore_shou img{
    width: j(158);
    height: j(160);
  }

  .newsCore_btn{
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
  .newsCore_LiLeft img{
    float: left;
    width: j(40);
    height: j(40);
    margin-left: j(20);
    margin-top: j(38);
    margin-right: j(20);
    position: relative;
  }
  .newsCore_LiRight{
    float: left;
    width: j(602);
    margin-top: j(34);
  }
  .newsCore_RightT{
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }

  .newsCore_Rights{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .newsCore_RightB{
    width: j(602);
    height: j(84);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    border-top: 2px solid #E8EEF3;
    margin-top: j(16);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    padding-top: j(20);
  }
  .newsCore_btn{
    width: j(702);
    height: j(88);
    line-height: j(88);
    background: #1C6DB1;
    border-radius: j(16);
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
    margin: 0 auto;
    position: fixed;
    bottom: j(50);
  }
  .newsCore_dian{
    width: j(16);
    height: j(16);
    background: #DA4A6D;
    position: absolute;
    left: j(44);
    top: j(38);
  }
  .newsCore_Del{
    width: j(44);
    height: j(44);
    position: absolute;
    right: j(24);
    top: 0;
    background: #F4F7FA;
  }
  .newsCore_Del img{
    width: j(44);
    height: j(44);
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
    /*width: j(48);*/
    /*height: j(48);*/
    /*position: fixed;*/
    /*right: j(20);*/
    /*top: j(110);*/
    /*z-index: 99999999;*/
  }
  .cancel {
    width: j(110);
    display: inline-block;
    height: j(268);
    line-height: j(268);
    text-align: center;
    background: red;
    /*margin-left: j(10);*/
    font-size: j(28);
    color: #ffffff;
    border-radius: 0 j(16) j(16) 0;
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
