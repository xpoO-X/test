<template>
  <transition :name="transitionName">
  <div id="speedEdit">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">案件进度</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="speedEdit_Box">
      <div class="speedEdit_List">
        <div class="speedEdit_Li"  @click="showPicker = true">
          <img class="speedEdit_xing" src="../assets/ls/xing.png" alt="">
          <div class="speedEdit_name">案件阶段</div>
          <div>{{value}}</div>
          <img class="speedEdit_xuan" src="../assets/ls/xuanzhe.png" alt="">
        </div>
        <div class="speedEdit_Lis">
          <img class="speedEdit_xing" src="../assets/ls/xing.png" alt="">
          <div class="speedEdit_name">您的案件描述</div>
          <div style="clear: both"></div>
          <div class="speedEdit_textarea">
            <textarea maxlength="100" @input="descInput" placeholder="请输入您对案件的描述" v-model="desc" />
            <div class="speedEdit_num">{{remnant}}<span>/100个字符</span></div>
          </div>
        </div>
      </div>
      <div class="speedEdit_Btn" @click="tijiao">
        提交
      </div>
      <div class="speedEdit_Btnx" @click="jiean">
        结案
      </div>
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
  var add = new Object();
  var qs=require('qs');
  var fromName =global_.Arr;
  export default {
    data() {
      return {
        serverSrc:global_.serverSrc,
        imgSrc:global_.imgSrc,
        jian: true,
        isSteps: 4,
        remnant: 100,
        value: '',
        desc: '',
        message: '',
        showPicker: false,
        itemList: [
        { id: '1', name: '王源'},
        { id: '2', name: '易烊千玺'},
        { id: '3', name: '王俊凯'}
        ],
        isShow: -1,
        addTo:false,
        isID:'',
        azId:'',
        columns: ['案件资料准备', '案件一审等待', '案件一审资料准备', '案件开庭', '案件一审胜诉', '案件一审败诉', '案件二审资料准备', '案件二审胜诉', '最终裁决', '胜诉', '败诉'],
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      jiean(){
        var that=this;
        var postDatau = qs.stringify({
          barristerId:that.isID,
          caseId:that.azId,
          caseProgressName:that.value,
          caseProgressRemark:that.desc,
        });
        var loadingAlert1 = Toast.loading({
          mask: true,
          message: '加载中...',
          duration:1000
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/process/end",postDatau)
          .then(res=>{
          if(res.data.code =="SUCCESS"){

          setTimeout(()=>{
            loadingAlert1.clear();
          Toast({
            message:'提交成功！',
            duration:2000
          });
          setTimeout(function () {
            that.$router.push('/speed');
          },1000)
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
      tijiao(){
          var that=this;
          var postDatau = qs.stringify({
            barristerId:that.isID,
            caseId:that.azId,
            caseProgressName:that.value,
            caseProgressRemark:that.desc,
          });
          var loadingAlert1 = Toast.loading({
            mask: true,
            message: '加载中...',
            duration:1000
          });
          // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
          that.$axios.post(that.serverSrc+"/case/process/update",postDatau)
            .then(res=>{
            if(res.data.code =="SUCCESS"){

          setTimeout(()=>{
              loadingAlert1.clear();
              Toast({
                message:'提交成功！',
                duration:2000
              });
              setTimeout(function () {
                that.$router.push('/speed');
              },1000)
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
      descInput(){
        var txtVal = this.desc.length;
        this.remnant = 100 - txtVal;
      },
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
      },
      open(index, id){
        // this.isS =!this.isS;
        // this.jian =!this.jian
        let that = this;
         if (that.isShow === index) {
           that.isShow = -1;  //在这里就将它赋值为-1  由于：-1 !=  index 所以其他内容隐藏 ，被点击的则打开
         } else {
           that.isShow = index;   //这里是把index赋值给isShow，isShow=index则显示
         }
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
      if(localStorage.getItem('azId')){
        this.azId =localStorage.getItem('azId')
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
  .speedEdit_Box{
    margin-top: j(150);
  }
  .speedEdit_List{
    width: j(702);
    margin: j(30) auto 0;
  }
  .speedEdit_Li{
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
  .speedEdit_Li .speedEdit_xing{
    width: j(20);
    height: j(20);
    margin-left: j(16);
    margin-right: j(16);
  }
  .speedEdit_name{
    width: j(232);
    height: j(98);
    line-height: j(98);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
  }
  .speedEdit_Li .speedEdit_xuan{
    width: j(32);
    height: j(32);
    position: absolute;
    right: j(12);
  }

  .speedEdit_Lis{
    width: j(702);
    height: j(368);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    /*display: flex;*/
    /*align-items: center;*/
    margin-bottom: j(24);
    position: relative;
  }
  .speedEdit_Lis .speedEdit_xing{
    width: j(20);
    height: j(20);
    margin-left: j(16);
    margin-right: j(16);
    margin-top: j(40);
    float: left;
  }
  .speedEdit_Lis .speedEdit_name{
    float: left;
    width: j(232);
    height: j(98);
    line-height: j(98);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
  }
  .speedEdit_Lis .speedEdit_xuan{
    width: j(32);
    height: j(32);
    position: absolute;
    right: j(12);
  }
  .speedEdit_textarea{
    width: j(662);
    margin: 0 auto;
    border-top: 2px solid #E8EEF3;
  }
  .speedEdit_textarea textarea{
    width: j(580) !important;
    height: j(150);
    margin-left: j(20);
    margin-top: j(22);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
    border: none;
    resize: none;
    outline:none
  }
  textarea::-webkit-input-placeholder {
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  textarea:-moz-placeholder {
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  textarea::-moz-placeholder {
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  textarea:-ms-input-placeholder {
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .speedEdit_num{
    float: right;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1C6DB1;
  }
  .speedEdit_num span{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1C6DB1;
  }
  .speedEdit_Btn{
    width: j(702);
    height: j(88);
    line-height: j(88);
    background: #1C6DB1;
    border-radius: j(16);
    text-align: center;
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    margin: j(80) auto 0;
  }
  .speedEdit_Btnx{
    width: j(702);
    height: j(88);
    line-height: j(88);
    background: #F56B47;
    border-radius: j(16);
    text-align: center;
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    margin: j(40) auto;
  }
  /*选择样式*/
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
