<template>
  <transition :name="transitionName">
  <div id="Cart">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">选择授权类型</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
<div>
  <div class="car">
  <van-popup v-model="msg">
    <div class="msgBox">

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
  <!--授权类型-->
  <div
    id="type"
    v-show="true"
  >
    <van-nav-bar
      title="商品类型"
      left-arrow
      fixed
    ></van-nav-bar>
    <div id="type-list">
      <div id="list-left">
        <ul>
          <!-- <li class="active">虚拟商品</li> -->
          <li
            v-for="(item,index) in items"
            :key="index"
            :class="{active:istrue==index}"
            @click="listTab(index,item.code)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div id="list-right">
        <ul>
          <!-- <li @click="type">爱奇艺会员</li> -->
          <li
            @click="types(item.name,item.code, index)"
            v-for="(item,index) in type"
            :key="index"
            :class="{activeLi:isLitrue==index}"
          >{{item.name}}</li>
        </ul>
      </div>
      <div style="clear:both"></div>
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
  var qs=require('qs');
  var fromName =global_.Arr;
  export default {
    data() {
      return {
        serverSrc:global_.serverSrc,
        imgSrc:global_.imgSrc,
        tabarActive:2,
        icon: {
          normal: normalHome,
          whole:normalWhole,
          me:activeMe,
          gwcw:normalgwcw,
        },
        imgUrl:tou,
        msg:false,
        items:[{
          "id": 2,
          "code": "GIFTTYPEVIRTUAL",
          "name": "著作权",
          "introduction": "",
          "child": [{
            "id": 223,
            "code": "GIFTSUBTYPEDDDJ",
            "name": "滴滴代驾",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "e代驾",
            "introduction": "",
            "child": null
          }]
        },{
          "id": 1,
          "code": "GIFTTYPEVIRTUAL",
          "name": "专利权",
          "introduction": "",
          "child": [{
            "id": 223,
            "code": "GIFTSUBTYPEDDDJ",
            "name": "滴滴代驾",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "e代驾",
            "introduction": "",
            "child": null
          }]
        },{
          "id": 1,
          "code": "GIFTTYPEVIRTUAL",
          "name": "商标权",
          "introduction": "",
          "child": [{
            "id": 223,
            "code": "GIFTSUBTYPEDDDJ",
            "name": "滴滴代驾",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "e代驾",
            "introduction": "",
            "child": null
          }]
        }],
        type: [{
          "id": 223,
          "code": "GIFTSUBTYPEDDDJ",
          "name": "发表权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "署名权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "修改权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "保护作品完整权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "复制权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "发行权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "出租权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "展览权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "表演权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "放映权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "广播权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "信息网络传播权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "摄制权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "改编权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "翻译权",
          "introduction": "",
          "child": null
        }, {
          "id": 222,
          "code": "GIFTSUBTYPEEDJ",
          "name": "汇编权",
          "introduction": "",
          "child": null
        }],
        istrue: 0,
        isLitrue:-1,
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      returns() {
        this.$router.go(-1);
      },
      goLog(){
        this.$router.push('/');
      },
      redirects(url) {
        this.$router.push(url);
      },
      msgClosen() {
        this.msg = false;
      },
      listTab(a, b) {
        this.istrue = a;
        var that = this;
        if(a == '0'){
          that.type =[{
            "id": 223,
            "code": "GIFTSUBTYPEDDDJ",
            "name": "发表权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "署名权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "修改权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "保护作品完整权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "复制权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "发行权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "出租权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "展览权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "表演权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "放映权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "广播权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "信息网络传播权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "摄制权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "改编权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "翻译权",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "汇编权",
            "introduction": "",
            "child": null
          }]
        }else if(a == '1'){
          that.type =[{
            "id": 223,
            "code": "GIFTSUBTYPEDDDJ",
            "name": "发明专利",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "外观设计专利",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "文实用新型专利",
            "introduction": "",
            "child": null
          }]
        }else {
          that.type =[{
            "id": 223,
            "code": "GIFTSUBTYPEDDDJ",
            "name": "商品商标",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "防御商品",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "联合商品",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "服务商品",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "等级商品",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "集体商标",
            "introduction": "",
            "child": null
          }, {
            "id": 222,
            "code": "GIFTSUBTYPEEDJ",
            "name": "证明商标",
            "introduction": "",
            "child": null
          }]
        }

      //   var postData = qs.stringify({
      //     TEL: that.tel
      //   });
      //   this.$axios
      //     .post(that.serverSrc + "/mall/type.do", postData, { timeout: 5000 })
      //     .then(function(res) {
      //       if (res.data.code == "SUCCESS") {
      //         that.items = res.data.info;
      //
      //         for (var i = 0; i < res.data.info.length; i++) {
      //           that.type = res.data.info[a].child;
      //           that.giftFirstType = res.data.info[a].code;
      //         }
      //       } else {
      //         if (res.data.code == "FAIL_MEMBER_INVALID") {
      //           Toast({
      //             message: res.data.message,
      //             duration: 2000
      //           });
      //           setTimeout(function() {
      //             that.$router.push("/");
      //             localStorage.clear();
      //           }, 2500);
      //         } else {
      //           Toast({
      //             message: res.data.message,
      //             duration: 2000
      //           });
      //         }
      //       }
      //     })
      //     .catch(err => {
      //     var str = err + "";
      //   if (str.search("timeout") !== -1) {
      //   } else {
      //     Toast({
      //       message: "网络异常！",
      //       duration: 2000
      //     });
      //   }
      // });
      },
      types(a, b ,c) {
         this.isLitrue =c;
         this.$router.push('/power');
         localStorage.setItem('isSTYPE',a)
        console.log(a)
      },
    },
    mounted(){
      window.scrollTo(0,0);
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

  .car .van-popup {
    background: transparent;
  }
  .msgBox {
    width: j(660);
    height: j(306);
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
  #Cart .van-popup{
    top:70% !important;
  }




  #type-list {
    position: fixed;
    left: 50%;
    top: j(86);
    margin-left: j(-375);
  }

  #type-list #list-left {
    float: left;
    width: j(200);
  }
  #type-list #list-left ul li {
    width: j(200);
    // height: j(100);
    font-size: j(24);
    text-align: center;
    // line-height: j(100);
    /*padding: j(25) j(1);*/
    height: j(98);
    line-height: j(98);
    font-weight: bold;
    color: #53575A;
    border-left: j(6) solid #f5f5f5;
    box-sizing: border-box;
  }
  #type-list #list-left ul .active {
    font-size: j(28);
    background: #FAFAFA;
    color: #1C6DB1;
    border-left: j(6) solid #1C6DB1;
    box-sizing: border-box;
  }
  #type-list #list-right {
    float: right;
    width: j(550);
    height: 100vh;
    background: #fff;
  }
  #type-list #list-right ul li {
    float: left;
    width: auto;
    padding: j(10) j(20);
    background: #ffffff;
    border: j(2) solid #E0E3E6;
    text-align: left;
    line-height: j(50);
    color: #53575A;
    margin-top: j(25);
    margin-left: j(20);
    margin-right: j(20);
    border-radius: j(8);
  }
  .activeLi{
    border: j(2) solid #1C6DB1 !important;
    color: #1C6DB1 !important;
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
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
