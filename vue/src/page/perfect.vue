<template>
  <transition :name="transitionName">
  <div id="perfect">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">完善信息</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="carBox">
        <div class="car_titleT"></div>
        <div class="car_List">
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">权利人</div>
            <input class="car_input" v-model="realName" type="text" placeholder="请输入权利人">
          </div>
          <div class="car_Li"  @click="showPicker = true">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">证件类型</div>
            <div class="car_zheng">{{value}}</div>
            <img class="car_xuan" src="../assets/ls/xuanzhe.png" alt="">
          </div>
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">证件号</div>
            <input class="car_input" v-model="identityNumber" type="text" placeholder="请输入权利人证件号">
          </div>
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">联系方式</div>
            <input class="car_input" v-model="phone" type="text" placeholder="请输入权利人联系方式">
          </div>
        </div>

      <div class="car_btn" @click="seveBtn">
          提交
      </div>


      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

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
        radio: '1',
        showPicker:false,
        value: '',
        isID: '',
        realName: '',
        identityNumber: '',
        phone: '',
        columns: ['组织机构代码', '身份证'],
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      seveBtn(){
        var that=this;
        var loadingAlert1 = Toast.loading({
          mask: true,
          message: '加载中...',
          duration:1000
        });
        var isType = '';
        if(that.value == '组织机构代码'){
          isType ='BUSINESSID'
        }else {
          isType ='IDCARD'
        }
        var postDataes = qs.stringify({
          realName:that.realName,
          identityType:isType,
          identityNumber:that.identityNumber,
          phone:that.phone,
          id:that.isID,
        });
        that.$axios.post(that.serverSrc+"/u/protect/update",postDataes)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          setTimeout(()=>{
            loadingAlert1.clear();
          Toast({
            message:"修改成功！",
            duration:2000
          })
          that.init()
        },1000)
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
      init(){
        var that=this;
        var postDatas = qs.stringify({
          id:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/u/desc",postDatas)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          console.log(res.data.body)
          if(JSON.stringify(res.data.body.user) !== "{}"){
            if(res.data.body.user.realName!=undefined){
              that.realName =res.data.body.user.realName;
            }
            if(res.data.body.user.identityNumber!=undefined){
              that.identityNumber =res.data.body.user.identityNumber;
            }
            if(res.data.body.user.phone!=undefined){
              that.phone =res.data.body.user.phone;
            }
            if(res.data.body.user.identityType!=undefined){
              if(res.data.body.user.identityType == 'IDCARD'){
                that.value = '身份证'
              }else {
                that.value = '组织机构代码'
              }
            }
            // that.columns =res.data.body.user.identityType;
            // that.isaddress=res.data.body.user.province+res.data.body.user.city+res.data.body.user.area;
            // that.province=res.data.body.user.province;
            // that.city=res.data.body.user.city;
            // that.area=res.data.body.user.area;
            // that.addressDetail =res.data.body.user.address;
            // if(JSON.stringify(res.data.body.user.barrister) !== "{}"){
            //   that.workTime = res.data.body.user.barrister.workTime
            //   that.postNumber = res.data.body.user.barrister.postNumber
            //   if(JSON.stringify(res.data.body.user.barrister.voucharImg) !== "{}"){
            //     that.list.push(res.data.body.user.barrister.voucharImg.filePath);
            //     if (that.list.length == that.maxNum) {
            //       that.imgType = false;
            //     }else {
            //       that.imgType = true;
            //     }
            //     console.log(res.data.body.user.barrister.voucharImg.filePath)
            //     console.log(that.list)
            //   }
            // }


            that.businessName =res.data.body.user.businessName;
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
      clickRadio(val){
        // console.log(val)
        if(this.radio!==val){
          if(this.radio==val){
            // this.radio=0;
          }else{
            this.radio=val;
          }
        }

      },
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
      },
      returns() {
        this.$router.go(-1);
      },
      goLog(){
        this.$router.push('/');
      },
      redirects(url) {
        this.$router.push(url);
      },
    },
    mounted(){
      window.scrollTo(0,0);
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      this.init();
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
  .carBox{
    margin-top: j(88);
  }
  .car_titleT{
    margin-left: j(28);
    margin-top: j(114);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .car_List{
    width: j(702);
    margin: j(30) auto 0;
  }
  .car_Li{
    width: j(702);
    height: j(98);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    display: flex;
    align-items: center;
    margin-bottom: j(24);
    position: relative;
  }
  .car_Li .car_xing{
    width: j(20);
    height: j(20);
    margin-left: j(16);
    margin-right: j(16);
  }
  .car_name{
    width: j(232);
    height: j(98);
    line-height: j(98);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
  }
  .car_input{
    width: j(280);
    height: j(98);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1F2226;
    line-height: j(98);
    background:none;
    outline:none;
    border:none;
  }
  .car_input::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: j(28);
    color: #BEC0C1;
  }
  .car_input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    font-size: j(28);
    color: #BEC0C1;
  }
  .car_input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: j(28);
    color: #BEC0C1;
  }
  .car_input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-size: j(28);
    color: #BEC0C1;
  }

  .car_Li .car_xuan{
    width: j(32);
    height: j(32);
    position: absolute;
    right: j(12);
  }
  .car_Lid{
    width: j(702);
    height: j(198);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(24);
    position: relative;
  }
  .car_Lid .car_xing{
    width: j(20);
    height: j(20);
    margin-left: j(18);
    margin-top: j(38);
    margin-right: j(16);
    float: left;
  }
  .selfRadios{
    cursor: pointer;
    margin-bottom: j(36);
    height: j(40);
    line-height: j(40);
    img{
      width: j(40);
      height: j(40);
      /*height: j(32);*/
      /*line-height: j(32);*/
      vertical-align: middle;
      margin-top: j(-6);
      margin-right: j(6);
    }
    .selfRadioText{
      margin-left:10px;
    }
  }
  .cml{
    margin-left: j(64);
  }
  .cmll{
    margin-left: j(54);
  }
  .car_radio{
    margin-top: j(20);
  }
  .car_wei{
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .car_Lix{
    width: j(702);
    height: j(138);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(24);
    position: relative;
  }
  .car_Lix .car_xing{
    width: j(20);
    height: j(20);
    margin-left: j(18);
    margin-top: j(38);
    margin-right: j(16);
    float: left;
  }
  .car_Lix .car_xuan{
    width: j(32);
    height: j(32);
    position: absolute;
    top: j(30);
    right: j(12);
  }
  .car_Lix .car_name{
    width: j(232);
    height: j(98);
    line-height: j(98);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
    float: left;
  }
  .car_shang{
    /*width: j(384);*/
    float: left;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    margin-top: j(28);
  }
  .car_wenjian{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1C6DB1;
    border-bottom: 1px solid #1C6DB1;
    margin-top: j(12);
  }
  .car_btn{
    width: j(702);
    height: j(88);
    line-height: j(88);
    background: #1C6DB1;
    border-radius: j(16);
    margin: j(80) auto j(56);
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .car_tishi{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    text-align: center;
    margin-bottom: j(100);
  }
  .car_tishi img{
     width: j(28);
     height: j(28);
     vertical-align: middle;
  }
  .car_tishi span{
    display: inline-block;
    border-bottom: 1px solid #999999;
  }
  .car_zheng{
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1F2226;
    margin-left: j(16);
  }

  .van-picker__cancel{
    font-size: j(32) !important;
    color: #999999 !important;
  }
  .van-picker__confirm{
    font-size: j(32) !important;
    color: #1C6DB1 !important;
  }
  .van-picker-column__item--selected{
    color: #1C6DB1 !important;
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
