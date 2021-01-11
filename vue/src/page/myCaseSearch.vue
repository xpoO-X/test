<!--<template>-->
  <!--<transition :name="transitionName">-->
  <!--<div id="search">-->
    <!--<div class="navBar">-->
      <!--<div class="goback" @click="returns"></div>-->
      <!--<div>搜索</div>-->
    <!--</div>-->
    <!--<div class="search_Box">-->
      <!--<div class="search_searchBox">-->
        <!--<div class="search_search">-->
          <!--<div class="search_searchL"><input type="text" placeholder="案件名称"></div>-->
          <!--<div class="search_searchR">-->
            <!--<img src="../assets/ls/search1.png" alt="">-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="search_List_more" v-if="false">-->
         <!--<div class="search_ListT">搜索记录</div>-->
         <!--<div class="search_Li">-->
           <!--<div class="search_LiL">  <img src="../assets/ls/time.png" alt=""></div>-->
           <!--<div class="search_LiName">王律师</div>-->
           <!--<div class="search_LiR"><img src="../assets/ls/close1.png" alt=""></div>-->
         <!--</div>-->
        <!--<div class="search_Li">-->
          <!--<div class="search_LiL">  <img src="../assets/ls/time.png" alt=""></div>-->
          <!--<div class="search_LiName">王律师</div>-->
          <!--<div class="search_LiR"><img src="../assets/ls/close1.png" alt=""></div>-->
        <!--</div>-->
        <!--<div class="search_Li">-->
          <!--<div class="search_LiL">  <img src="../assets/ls/time.png" alt=""></div>-->
          <!--<div class="search_LiName">王律师</div>-->
          <!--<div class="search_LiR"><img src="../assets/ls/close1.png" alt=""></div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="more_box_s" v-else>-->
        <!--<div id="myCase-list">-->
          <!--<ol v-if="nulls">-->
            <!--<van-pull-refresh-->
              <!--v-model="isLoading"-->
              <!--class="pulls"-->
            <!--&gt;-->
              <!--<van-list-->
                <!--v-model="loading"-->
                <!--:finished="finished"-->
                <!--@load="onLoad"-->
                <!--class="productList"-->
              <!--&gt;-->
                <!--<van-cell-->
                  <!--class="list"-->
                  <!--v-for="(item,index) in array"-->
                  <!--:key="index"-->
                <!--&gt;-->
                  <!--<li>-->

                    <!--<div class="myCase_Li">-->
                      <!--<div style="clear: both"></div>-->
                      <!--<div class="myCase_liText">-->
                        <!--北京市司法局关于批准佟珂在内地从事律师职业的决定-->
                      <!--</div>-->
                      <!--<div class="myCase_inreview">-->
                        <!--<div class="myCase_inreviewT">审核进行中</div>-->
                        <!--<van-progress color="#1C6DB1" :percentage="50" :show-pivot="false" />-->
                      <!--</div>-->

                      <!--<div class="myCase_text">-->
                        <!--<div class="myCase_textT">-->
                          <!--案件资料已经准备完毕，2020年9月10-->
                        <!--</div>-->
                        <!--<div class="myCase_textB">-->
                          <!--<div class="myCase_tu"></div>-->
                          <!--<div class="myCase_textBt">2分钟前更新</div>-->
                          <!--<div class="myCase_textBb">王阳明律师</div>-->
                        <!--</div>-->
                        <!--<div style="clear: both"></div>-->
                      <!--</div>-->
                      <!--<div style="clear: both"></div>-->
                      <!--<div class="myCase_btns">-->
                        <!--<div class="myCase_btn myCase_btnl">-->
                          <!--提醒更新-->
                          <!--<div class="myCase_gang"></div>-->
                        <!--</div>-->
                        <!--<div class="myCase_btn">-->
                          <!--相似案例-->
                          <!--<div class="myCase_gang"></div>-->
                        <!--</div>-->
                        <!--<div class="myCase_btn myCase_btnr">-->
                          <!--查看详情-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</li>-->
                <!--</van-cell>-->
                <!--<div-->
                  <!--style="text-align:center"-->
                  <!--class="nomore"-->
                  <!--v-show="nomore"-->
                <!--&gt;没有更多数据了</div>-->
              <!--</van-list>-->
            <!--</van-pull-refresh>-->
          <!--</ol>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->
  <!--</div>-->
  <!--</transition>-->
<!--</template>-->

<!--<script>-->
  <!--import {store} from '../store/store';-->
  <!--import normalHome from '../assets/Jnohome.png'-->
  <!--import normalWhole from '../assets/Jnofabu.png'-->
  <!--import normalgwcw from '../assets/gwcz.png'-->
  <!--import activeMe from '../assets/Jnome.png'-->
  <!--import tou from '../assets/Jmo.png'-->
  <!--import global_ from '../components/Global'-->
  <!--import { Toast } from 'vant';-->
  <!--var add = new Object();-->
  <!--var qs=require('qs');-->
  <!--var fromName =global_.Arr;-->
  <!--export default {-->
    <!--data() {-->
      <!--return {-->
        <!--serverSrc: global_.serverSrc,-->
        <!--istrue: 2,-->
        <!--nulls: true,-->
        <!--isLoading: false,-->
        <!--finished: false,-->
        <!--loading: false,-->
        <!--nomore: false,-->
        <!--pageNum: 1,-->
        <!--array:[],-->
        <!--transitionName: 'slide-left'//默认动画-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--onLoad() {-->
        <!--if (this.isLoading) {-->
          <!--return false;-->
        <!--}-->
        <!--var that = this;-->
        <!--that.array=[{-->
          <!--"id": '01'-->
        <!--},{-->
          <!--"id": '02'-->
        <!--},{-->
          <!--"id": '03'-->
        <!--},{-->
          <!--"id": '04'-->
        <!--},{-->
          <!--"id": '04'-->
        <!--},{-->
          <!--"id": '04'-->
        <!--},{-->
          <!--"id": '04'-->
        <!--},{-->
          <!--"id": '04'-->
        <!--}]-->
        <!--// if(that.istrue == 0){-->
        <!--//   that.isDel =true-->
        <!--// }else {-->
        <!--//   that.isDel =false-->
        <!--// }-->
        <!--// var postData = qs.stringify({-->
        <!--//   type: that.istrue,-->
        <!--//   pageNum: that.pageNum,-->
        <!--//   TEL: that.tel-->
        <!--// });-->
        <!--//-->
        <!--// this.$axios-->
        <!--//   .post(that.serverSrc + "mall/mine/list.do", postData, { timeout: 5000 })-->
        <!--//   .then(function(res) {-->
        <!--//     var typeNums = postData.split("&")[0].split("=")[1];-->
        <!--//-->
        <!--//     if (res.data.code == "SUCCESS") {-->
        <!--//       Toast.clear();-->
        <!--//       that.isShowContent = true;-->
        <!--//       if (res.data.info.pageList.length == 0) {-->
        <!--//         that.nulls = false;-->
        <!--//       } else {-->
        <!--//         that.nulls = true;-->
        <!--//       }-->
        <!--//       if (res.data.info.pageList.length > 0) {-->
        <!--//         setTimeout(() => {-->
        <!--//           for (let i = 0; i < res.data.info.pageList.length; i++) {-->
        <!--//             if (that.istrue == typeNums) {-->
        <!--//               that.array.push(res.data.info.pageList[i]);-->
        <!--//             }-->
        <!--//           }-->
        <!--//           that.loading = false;-->
        <!--//           if (-->
        <!--//             res.data.info.pageList.length < 10 ||-->
        <!--//             res.data.info.pageNum == res.data.info.pages-->
        <!--//           ) {-->
        <!--//             //  不再加载数据时-->
        <!--//             that.finished = true;-->
        <!--//             that.nomore = true;-->
        <!--//           }-->
        <!--//         }, 200);-->
        <!--//       } else {-->
        <!--//         that.loading = false;-->
        <!--//         that.finished = true;-->
        <!--//         setTimeout(() => {-->
        <!--//           if (that.array.length == 0) {-->
        <!--//             that.hasProduct = true;-->
        <!--//             that.homeShow = false;-->
        <!--//           } else {-->
        <!--//             that.nomore = false;-->
        <!--//             that.homeShow = true;-->
        <!--//           }-->
        <!--//         }, 200);-->
        <!--//       }-->
        <!--//       that.pageNum++;-->
        <!--//     } else if (res.data.code == "FAIL_MEMBER_INVALID") {-->
        <!--//       Toast({-->
        <!--//         message: res.data.message,-->
        <!--//         duration: 2000-->
        <!--//       });-->
        <!--//       setTimeout(function() {-->
        <!--//         that.$router.push("/");-->
        <!--//         localStorage.clear();-->
        <!--//       }, 2500);-->
        <!--//     } else {-->
        <!--//       Toast({-->
        <!--//         message: res.data.message,-->
        <!--//         duration: 2000-->
        <!--//       });-->
        <!--//     }-->
        <!--//   })-->
        <!--//   .catch(err => {-->
        <!--//     var str = err + "";-->
        <!--//     if (str.search("timeout") !== -1) {-->
        <!--//     } else {-->
        <!--//       Toast({-->
        <!--//         message: "网络异常！",-->
        <!--//         duration: 2000-->
        <!--//       });-->
        <!--//     }-->
        <!--//   });-->
      <!--},-->
      <!--returns() {-->
        <!--this.$router.go(-1);-->
      <!--},-->
      <!--goLog(){-->
        <!--this.$router.push('/');-->
      <!--},-->
      <!--redirects(url) {-->
        <!--this.$router.push(url);-->
      <!--},-->
    <!--},-->
    <!--mounted(){-->
      <!--window.scrollTo(0,0);-->
      <!--function IsPC() {-->
        <!--var userAgentInfo = navigator.userAgent;-->
        <!--var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPod"];-->
        <!--var flag = true;-->
        <!--for (var v = 0; v < Agents.length; v++) {-->
          <!--if (userAgentInfo.indexOf(Agents[v]) > 0) {-->
            <!--flag = false;-->
            <!--break;-->
          <!--}-->
        <!--}-->
        <!--if(window.screen.width>=768){-->
          <!--flag = true;-->
        <!--}-->
        <!--return flag;-->
      <!--}-->
      <!--if(IsPC()){-->
        <!--$('.van-tabbar').css("height", "60px");-->
        <!--$('.van-tabbar').css("padding-bottom", "10px");-->
      <!--}-->
    <!--},-->
    <!--beforeCreate(){-->
      <!--document.getElementsByTagName("body")[0].style.background = "#f5f5f5";-->
    <!--}-->
  <!--}-->
<!--</script>-->
<!--<style lang="scss" src="../assets/css/reset.css" ></style>-->
<!--<style lang="scss">-->
  <!--@function j($px, $base-font-size: 75px) {-->
    <!--@if (unitless($px)) {-->
      <!--@return j($px + 0px); // That may fail.-->
    <!--} @else if (unit($px) == rem) {-->
      <!--@return $px;-->
    <!--}-->
    <!--@return ($px / $base-font-size) * 1rem;-->
  <!--}-->
  <!--.van-tabbar&#45;&#45;fixed{-->
    <!--padding-bottom: j(14);-->
  <!--}-->
  <!--@supports (bottom: env(safe-area-inset-bottom)) {-->
    <!--.van-tabbar&#45;&#45;fixed{-->
      <!--/*padding-bottom: env(safe-area-inset-bottom);*/-->
      <!--padding-bottom: j(34);-->
    <!--}-->
  <!--}-->

  <!--/*app.vue  的style*/-->
  <!--.slide-left-enter-active{-->
    <!--will-change: transform;-->
    <!--transition: all 600ms;-->
    <!--position: absolute;-->
  <!--}-->

  <!--.slide-left-enter {-->
    <!--opacity: 0;-->
    <!--transform: translate3d(100%, 0, 0);-->
  <!--}-->

  <!--.navBar{-->
    <!--top: 0;-->
    <!--left: 0;-->
    <!--width: 100%;-->
    <!--position: fixed;-->
    <!--height: j(88);-->
    <!--line-height: j(88);-->
    <!--background: #ffffff;-->
    <!--/*flex 布局*/-->
    <!--display: flex;-->
    <!--/*实现垂直居中*/-->
    <!--align-items: center;-->
    <!--font-size: j(36);-->
    <!--font-family: PingFangSC-Medium, PingFang SC;-->
    <!--color: #1F2226;-->
    <!--font-weight: 600;-->
    <!--z-index: 999;-->
  <!--}-->
  <!--.goback{-->
    <!--width: j(40);-->
    <!--height: j(40);-->
    <!--background: url("../assets/ls/back.png") no-repeat;-->
    <!--background-size: 100% 100%;-->
    <!--float: left;-->
    <!--margin-left: j(20);-->
    <!--margin-right: j(20);-->
  <!--}-->
  <!--.search_Box{-->
    <!--margin-top: j(120);-->
  <!--}-->


  <!--.search_logo img{-->
    <!--width: j(374);-->
    <!--height: j(68);-->
    <!--margin-left: j(20);-->
    <!--margin-top: j(8);-->
  <!--}-->
  <!--.search_searchBox{-->
    <!--width: 100%;-->
    <!--height: j(108);-->
    <!--background: #f5f5f5;-->
    <!--position: fixed;-->
    <!--/*left: j(22);*/-->
    <!--top: j(88);-->
    <!--/*margin: j(22) auto j(24);*/-->
    <!--z-index: 999999999;-->
  <!--}-->
  <!--.search_search{-->
    <!--width: j(702);-->
    <!--height: j(68);-->
    <!--line-height: j(68);-->
    <!--background: #ffffff;-->
    <!--border-radius: j(34);-->
    <!--/*position: fixed;*/-->
    <!--/*left: j(22);*/-->
    <!--/*top: j(110);*/-->
    <!--margin: j(22) auto j(22);-->
    <!--z-index: 999999999;-->
  <!--}-->
  <!--.search_searchL{-->
    <!--float: left;-->
    <!--width: j(500);-->
    <!--margin-left: j(40);-->
  <!--}-->
  <!--.search_searchL input{-->
    <!--width: j(500);-->
    <!--height: j(68);-->
    <!--font-size: j(24);-->
    <!--background:none;-->
    <!--outline:none;-->
    <!--border:none;-->
  <!--}-->
  <!--.search_searchL input::-webkit-input-placeholder {-->
    <!--/* WebKit browsers */-->
    <!--font-size: j(24);-->
    <!--color: #999999;-->
  <!--}-->
  <!--.search_searchL input:-moz-placeholder {-->
    <!--/* Mozilla Firefox 4 to 18 */-->
    <!--font-size: j(24);-->
    <!--color: #999999;-->
  <!--}-->
  <!--.search_searchL input::-moz-placeholder {-->
    <!--/* Mozilla Firefox 19+ */-->
    <!--font-size: j(24);-->
    <!--color: #999999;-->
  <!--}-->
  <!--.search_searchL input:-ms-input-placeholder {-->
    <!--/* Internet Explorer 10+ */-->
    <!--font-size: j(24);-->
    <!--color: #999999;-->
  <!--}-->
  <!--.search_searchR img{-->
    <!--float: right;-->
    <!--margin-right: j(28);-->
    <!--margin-top: j(10);-->
    <!--width: j(48);-->
    <!--height: j(48);-->
  <!--}-->
  <!--.search_List_more{-->
    <!--width: 100%;-->
    <!--background: #ffffff;-->
    <!--margin-top: j(196);-->
  <!--}-->
  <!--.search_ListT{-->
    <!--width: j(662);-->
    <!--height: j(96);-->
    <!--line-height: j(96);-->
    <!--border-bottom: 2px solid #E8EEF3;-->
    <!--margin: 0 auto;-->
    <!--font-size: j(28);-->
    <!--font-family: PingFangSC-Regular, PingFang SC;-->
    <!--font-weight: 400;-->
    <!--color: #1F2226;-->
  <!--}-->
  <!--.search_Li{-->
    <!--width: j(662);-->
    <!--height: j(99);-->
    <!--line-height: j(99);-->
    <!--margin: 0 auto;-->
  <!--}-->
  <!--.search_Li .search_LiL img{-->
    <!--width: j(32);-->
    <!--height: j(32);-->
    <!--float: left;-->
    <!--margin-top: j(38);-->
    <!--margin-right: j(20);-->
  <!--}-->
  <!--.search_Li .search_LiR img{-->
    <!--width: j(28);-->
    <!--height: j(28);-->
    <!--float: right;-->
    <!--margin-top: j(36);-->
  <!--}-->
  <!--.search_LiName{-->
    <!--width: j(550);-->
    <!--font-size: j(28);-->
    <!--font-family: PingFangSC-Regular, PingFang SC;-->
    <!--font-weight: 400;-->
    <!--color: #6F7275;-->
    <!--float: left;-->
    <!--overflow:hidden;-->
    <!--text-overflow:ellipsis;-->
    <!--white-space:nowrap-->
  <!--}-->



  <!--.more_box_s{-->
    <!--margin-top: j(200);-->
    <!--margin-left: j(24);-->
    <!--margin-right: j(24);-->
  <!--}-->

  <!--/*LI内容*/-->
  <!--#myCase-list ol {-->
    <!--width: j(702);-->
    <!--/*margin-left: j(24);*/-->
    <!--/*margin-right: j(24);*/-->
    <!--margin-top: j(120);-->
    <!--margin-bottom: j(100);-->
  <!--}-->

  <!--#myCase-list ol li {-->
    <!--width: 100%;-->
    <!--/*height: j(228);*/-->
    <!--min-height: j(428);-->
    <!--background: #FFFFFF;-->
    <!--box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);-->
    <!--border-radius: j(16);-->
    <!--margin-bottom: j(60);-->
    <!--position: relative;-->
  <!--}-->
  <!--#myCase-list ol .van-cell {-->
    <!--/*margin-bottom: 10px;*/-->
    <!--/*border-radius: 15px;*/-->
    <!--padding: 0;-->
    <!--background: transparent;-->
  <!--}-->

  <!--.myCase_Li{-->
    <!--width: j(702);-->
    <!--/*min-height: j(288);*/-->
    <!--min-height: j(428);-->
    <!--background: #FFFFFF;-->
    <!--border-radius: 16px;-->
    <!--margin-bottom: j(26);-->
  <!--}-->

  <!--.myCase_liText{-->
    <!--min-height: j(90);-->
    <!--padding: j(24) j(20) j(8);-->
    <!--font-size: j(32);-->
    <!--font-family: PingFangSC-Medium, PingFang SC;-->
    <!--font-weight: 600;-->
    <!--color: #1F2226;-->
    <!--overflow:hidden;-->
    <!--text-overflow:ellipsis;-->
    <!--white-space:nowrap;-->
  <!--}-->
  <!--.myCase_inreview{-->
    <!--width: j(662);-->
    <!--margin: 0 auto j(30);-->
  <!--}-->
  <!--.myCase_inreview .van-progress{-->
    <!--height: j(16) !important;-->
  <!--}-->
  <!--.myCase_inreviewT{-->
    <!--font-size: j(24);-->
    <!--font-family: PingFangSC-Regular, PingFang SC;-->
    <!--font-weight: 400;-->
    <!--color: #F47D48;-->
    <!--margin-bottom: j(12);-->
  <!--}-->

  <!--.myCase_text{-->
    <!--width: j(662);-->
    <!--margin: 0 auto j(30);-->
  <!--}-->
  <!--.myCase_textT{-->
    <!--font-size: j(28);-->
    <!--font-family: PingFangSC-Regular, PingFang SC;-->
    <!--font-weight: 400;-->
    <!--color: #666666;-->
  <!--}-->
  <!--.myCase_tu{-->
    <!--width: j(26);-->
    <!--height: j(26);-->
    <!--background: url('../assets/ls/time.png') no-repeat;-->
    <!--background-size: 100% 100%;-->
    <!--float: left;-->
  <!--}-->
  <!--.myCase_textBt{-->
    <!--padding: 0 j(10);-->
    <!--border-right: 1px solid #999999;-->
    <!--float: left;-->
    <!--line-height: 1;-->
  <!--}-->

  <!--.myCase_textBb{-->
    <!--padding: 0 j(10);-->
    <!--float: left;-->
    <!--line-height: 1;-->
  <!--}-->
  <!--.myCase_btns{-->
    <!--margin-top: j(34);-->
  <!--}-->
  <!--.myCase_btn{-->
    <!--width: j(234);-->
    <!--height: j(88);-->
    <!--line-height: j(88);-->
    <!--font-size: j(24);-->
    <!--font-family: PingFangSC-Regular, PingFang SC;-->
    <!--font-weight: 400;-->
    <!--color: #6F7275;-->
    <!--text-align: center;-->
    <!--position: relative;-->
    <!--float: left;-->
    <!--background: #F9FAFA;-->
  <!--}-->
  <!--.myCase_btnr{-->
    <!--border-radius: 0 0 j(16) 0;-->
  <!--}-->
  <!--.myCase_btnl{-->
    <!--border-radius: 0 0 0 j(16);-->
  <!--}-->
  <!--.myCase_gang{-->
    <!--width: j(2);-->
    <!--height: j(32);-->
    <!--background: #DDE4E9;-->
    <!--position: absolute;-->
    <!--right: 0;-->
    <!--top: j(28);-->
  <!--}-->


  <!--/*app.vue  的style*/-->
  <!--.slide-left-enter-active{-->
    <!--will-change: transform;-->
    <!--transition: all 600ms;-->
    <!--position: absolute;-->
  <!--}-->

  <!--.slide-left-enter {-->
    <!--opacity: 0;-->
    <!--transform: translate3d(100%, 0, 0);-->
  <!--}-->
<!--</style>-->
