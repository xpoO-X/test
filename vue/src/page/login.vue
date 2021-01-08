<template >
  <div>
    <div class="loginBox">
         <div class="loginBox_bg">
           <img src="../assets/ls/loginbg.png" alt="">
         </div>
         <div class="loginBox_conent">
             <div class="loginBox_middle">
               <div class="login_wen">
                 欢迎登录
               </div>
               <div class="login_swen">
                 WELCOME
               </div>
               <div class="loginBox_int">
                 <!--<van-cell-group>-->
                 <!--<div class="input">-->
                 <!--<van-field v-model="phoneNum" maxlength="11" placeholder="请输入手机号"/>-->
                 <!--</div>-->
                 <!--<div class="input" id="inT">-->
                 <!--<van-field v-model="codeNum" maxlength="6" placeholder="请输入验证码">-->
                 <!--<van-button slot="button" size="normal" :type="btnType" plain :disabled="disabled" @click="getCode()">{{verificationText}}</van-button>-->
                 <!--</van-field>-->
                 <!--</div>-->
                 <!--</van-cell-group>-->
                 <!--<div class="loginBox_check">-->
                      <!--<img src="../assets/wxz.png" alt="" v-show="noshowCheck" @click="wxuan()">-->
                      <!--<img src="../assets/xz.png" alt="" v-show="showCheck" @click="xuan()">-->
                      <!--<span class="loginBox_ag">同意</span><span class="loginBox_xy"  @click="go('/')">《用户协议手册》</span>-->
                 <!--</div>-->
                 <div class="login_int">
                    <div class="login_intL">+86</div>
                    <div class="login_intR"><input v-model="phoneNum" type="text" placeholder="请输入手机号"></div>
                 </div>
                 <div class="login_int intp">
                   <div class="login_codeL"><input v-model="codeNum" type="text" placeholder="请输入验证码"></div>
                   <div class="login_shu"></div>
                   <div class="login_codeR">
                     <div v-if="isDj"><van-button slot="button" size="normal" :type="btnType" plain :disabled="disabled" @click="getCode()">{{verificationText}}</van-button></div>
                     <div v-else class="login_codeBtn"><van-button slot="button" size="normal" :type="btnType" plain :disabled="disabled">{{verificationText}}</van-button></div>
                   </div>
                 </div>
                 <div style="clear: both"></div>
                 <div class="login_Ts">
                   使用密码登录
                 </div>
                 <div class="loginBox_Btn" @click="redirects('/Home')">
                   登录
                 </div>
                 <div class="login_noCode">收不到验证码？</div>
               </div>
             </div>
         </div>
    </div>
  </div>
</template>

<script>
import phone from '../assets/phone.png'
import code from '../assets/verification.png'
import global_ from '../components/Global'
import { Toast } from 'vant';
var qs=require('qs');
  export default {
    data() {
      return {
        noshowCheck:true,
        showCheck:false,
        serverSrc:global_.serverSrc,
//         imgSrc:global_.imgSrc,
        phoneNum:'15210923161',
        codeNum:'',
        isCode:'',
        verificationText:'获取验证码',
        disabled:false,
        btnType:'danger',
        timer: null,
        isDj:true
      }
    },
    methods: {
      xuan(){
        // if(this.noshowCheck){
        //   this.noshowCheck=false;
        // }else {
        //   this.noshowCheck=true;
        // }
        this.showCheck = false;
        this.noshowCheck = true;
      },
      wxuan(){
        this.showCheck = true;
        this.noshowCheck = false;
      },
      go(){
        this.$router.push('/rule');
        if(this.phoneNum !== ''){
          localStorage.setItem('loginPhone',this.phoneNum);
        }
        if(this.codeNum !== ''){
          localStorage.setItem('logincode',this.codeNum);
        }
        localStorage.setItem('loginxuan',this.showCheck);
      },
      redirects(url) {
        // this.$router.push(url);
        const that = this;
        that.verification();
        if(that.verification()){
          if(that.codeNum ==''){
            Toast({
              message:"请输入验证码！",
              duration:2000
            });
          }else if(that.codeNum != '0000'){
            Toast({
              message:"验证码错误！",
              duration:2000
            });
          } else {
              var loadingAlert = Toast.loading({
                mask: true,
                message: '加载中...',
                duration:1000
              });
              var postData = qs.stringify({
                accountId:that.phoneNum,
                valCode:that.codeNum,
              });
              // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
              that.$axios.post(that.serverSrc+"/u/lgn",postData)
                    .then(res=>{
                    setTimeout(()=>{
                    loadingAlert.clear();
                    if(res.data.code =="SUCCESS"){
                        localStorage.setItem('body',JSON.stringify(res.data.body));
                        localStorage.setItem('ID',JSON.stringify(res.data.body.id));
                        localStorage.setItem('AType',JSON.stringify(res.data.body.accountType));
                        that.$router.push(url);
                    }
                    else {
                      Toast({
                        message:res.data.message,
                        duration:2000
                      });
                    }
                  },1000)
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
        }

      },
      getCode(){
        let that = this;
        const TIME_COUNT = 60;
        that.isDj =false;
        // that.verification();
        // if(that.verification()){
        //     let codeData = qs.stringify({
        //         mobile:that.phoneNum,
        //         type:0
        //     });
        //     // that.$axios.get(that.serverSrc+"app/mock/25/getSmsCode",codeData)
        //     that.$axios.post(that.serverSrc+"util/sendSmsCode.do",codeData)
        //     // that.$axios.post("http://192.168.1.201:21071/util/sendSmsCode.do",codeData)
        //     .then(res=>{
        //         if(res.data.code == "SUCCESS"){
                    that.isCode=1;
                    if (!this.timer) {
                        that.disabled = true;
                        that.btnType = '';
                        this.count = 60;
                        that.verificationText = this.count+'秒';
                        this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= 60) {
                            this.count--;
                            that.verificationText = this.count+'秒';
                        }else {
                            clearInterval(this.timer);
                            this.timer = null;
                            that.disabled = false;
                            that.btnType = 'danger';
                            that.verificationText = '获取验证码';
                            that.isDj =true;
                            }
                        }, 1000)
                    }
        //         }else{
        //           Toast({
        //             message:res.data.message,
        //             duration:2000
        //           });
        //         }
        //     })
        //     .catch(err => {
        //         var str = err + '';
        //         if(str.search('timeout') !== -1){
        //
        //         }else {
        //           Toast({
        //             message:"网络异常！",
        //             duration:2000
        //           })
        //         }
        //     });
        // }
      },
      verification(){
        const that = this;
        return true
        // let valid_rule = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/; // 手机号码校验规则
        // if(that.phoneNum == "" || that.phoneNum == undefined){
        //   Toast({
        //             message:"请填写手机号！",
        //             duration:2000
        //         });
        //   return false
        // }else{
        //     if(!valid_rule.test(that.phoneNum)){
        //       Toast({
        //         message:"手机号格式错误！",
        //         duration:2000
        //       });
        //       return false
        //     }else {
        //       return true
        //     }
        //
        // }
      }
    },
    mounted(){
      Toast.clear();
      var u = navigator.userAgent, app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
      }
      if (isIOS) {
        $('#inT input').on('blur',function(){
          window.scrollTo(0,0);
        });
        $('#inT .van-button').on('click',function(){
          window.scrollTo(0,0);
        });
        //这个是ios操作系统
      }
      // $('#inT input').on('blur',function(){
      //   window.scroll(0,0);
      // });
      // $('#inT .van-button').on('click',function(){
      //   window.scroll(0,0);
      // });

      // if(localStorage.getItem('loginPhone')){
      //   this.phoneNum =localStorage.getItem('loginPhone');
      //   localStorage.removeItem('loginPhone')
      // }
      // if(localStorage.getItem('logincode')){
      //   this.codeNum=localStorage.getItem('logincode');
      //   localStorage.removeItem('logincode')
      // }
      // if(localStorage.getItem('loginxuan')){
      //   if(localStorage.getItem('loginxuan') == 'true'){
      //     this.showCheck=true;
      //     this.noshowCheck=false;
      //   }else {
      //     this.showCheck=false
      //   }
      //   localStorage.removeItem('loginxuan')
      // }
    },
    beforeCreate(){
        document.getElementsByTagName("body")[0].style.background = "#F5F5F5";
    },
    created(){
      let that =this;
      if(localStorage.getItem('TEL')){
        let telData = qs.stringify({
          TEL:localStorage.getItem('TEL')
        });
        that.$axios.post(that.serverSrc+'/user/get.do',telData)
          .then(function (res) {
            if(res.data.code == 'SUCCESS'){
              that.$router.push('/Home');
            }
          }).catch(err=>{
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

    }
  }
</script>
<style lang="scss" src="../assets/css/reset.css"></style>
<style lang="scss">
    @function j($px, $base-font-size: 75px) {
        @if (unitless($px)) {
        @return j($px + 0px); // That may fail.
        } @else if (unit($px) == rem) {
        @return $px;
        }
        @return ($px / $base-font-size) * 1rem;
    }
    /*[class*=van-hairline]::after{*/
      /*border:0 !important;*/
    /*}*/


    /* 适配 iPhone X 顶部填充*/
    @supports (top: env(safe-area-inset-top)){
      body{
        padding-top: constant(safe-area-inset-top, 40px);
        padding-top: env(safe-area-inset-top, 40px);
        padding-top: var(safe-area-inset-top, 40px);
      }
    }

    .loginBox{
      position: relative;
      height: j(1470);
    }
    .loginBox_bg{
      width: j(750);
      height: j(683);
      /*background: url("../assets/bgg.png") no-repeat;*/
      /*background-size: 100% 100%;*/
      background: #1C6DB1;
      border-radius: j(0) j(0) j(48) j(48);
      margin: 0 auto;
      position: relative;
    }
    .loginBox_bg img{
      width: 100%;
      height: 100%;
    }
    .loginBox_conent{
      width: j(700);
      height: j(1092);
      /*background: #00c000;*/
      position: absolute;
      top: j(432);
      left: 50%;
      margin-left: j(-350);
    }
    .loginBox_middle{
      width:j(700);
      height: j(1092);
      background: #ffffff;
      border: 1px solid #ffffff;
      margin-top: j(28);
      border-radius: j(20);
      margin-bottom: j(44);
    }
   .loginBox_int{
      width: j(642);
      height: j(440);
      /*border: 1px solid;*/
      margin: 0 auto;
      margin-top: j(66);
   }

    .loginBox_int .van-button{
      width: j(220);
      height: j(60);
      line-height: j(44);
      font-weight: 600 !important;
      color: #1C6DB1 !important;
      background: #ffffff !important;
      border:none !important;
      /*border-left: 2px solid #DFDFDF !important;*/
    }
    .login_codeBtn .van-button{
      color: #cccccc !important;
      /*border-left: 2px solid #DFDFDF !important;*/
    }
    /*.loginBox_int .van-button--danger{*/
      /*color: #666666 !important;*/
      /*background: #ffffff !important;*/
    /*}*/
    /*.loginBox_int .van-button--plain{*/
      /*color: #666666 !important;*/
      /*background: #ffffff !important;*/
    /*}*/
    .loginBox_int .van-button::before{
      box-sizing: border-box;
      /*width:j(150);*/
    }
    .loginBox_check{
      width: 100%;
      height: j(90);
      line-height: j(90);
      vertical-align: middle;
      /*background: #00c000;*/
    }
    .loginBox_check img{
      width: j(30);
      height: j(30);
      vertical-align:middle;
      margin-top: j(-10);
    }
    .loginBox_check .loginBox_ag{
      font-size: j(28);
      margin-left: j(10);
    }
    .loginBox_check .loginBox_xy{
      font-size: j(28);
      margin-left: j(4);
      color:#4F5195;
      font-weight: 500;
    }
    .loginBox_Btn{
      width: 100%;
      height:j(90);
      line-height: j(90);
      text-align: center;
      background: #1C6DB1;
      font-size: j(32);
      color: #ffffff;
      border-radius: j(12);
      margin-top: j(32);
    }
    .loginBox_text{
      width: 100%;
      text-align: center;
      position: absolute;
      font-size: j(20);
      bottom: j(40);
      color: #666666;
    }

    .login_wen{
      width: 100%;
      text-align: center;
      height: j(58);
      font-size: j(42);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #1F2226;
      line-height: j(58);
      margin-top: j(64);
    }
    .login_swen{
      text-align: center;
      font-size: j(24);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #AAB0B5;
    }

    .login_int{
      width: j(642);
      height: j(98);
      line-height: j(98);
      background: #FFFFFF;
      box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
      border-radius: j(16);
    }
    .login_intL{
      float: left;
      width: j(128);
      height: j(98);
      line-height: j(98);
      color: #959A9F;
      font-size: j(32);
      text-align: center;
      background: #F1F3F3;
      border-radius: j(16) 0 0 j(16);
    }
    .login_intR input{
      width: j(440);
      float: left;
      margin-left: j(24);
      margin-top: j(-4);
      font-size: j(28);
      background:none;
      outline:none;
      border:none;
    }
    .login_intR input::-webkit-input-placeholder {
      /* WebKit browsers */
      font-size: j(28);
      color: #BEC0C1;
    }
    .login_intR input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      font-size: j(28);
      color: #BEC0C1;
    }
    .login_intR input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-size: j(28);
      color: #BEC0C1;
    }
    .login_intR input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      font-size: j(28);
      color: #BEC0C1;
    }


    .login_codeL input::-webkit-input-placeholder {
      /* WebKit browsers */
      font-size: j(28);
      color: #BEC0C1;
    }
    .login_codeL input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      font-size: j(28);
      color: #BEC0C1;
    }
    .login_codeL input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      font-size: j(28);
      color: #BEC0C1;
    }
    .login_codeL input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      font-size: j(28);
      color: #BEC0C1;
    }

    .intp{
      margin-top: j(24);
    }
    .login_codeL{
      width: j(370);
      float: left;
    }
    .login_codeL input {
      width: j(370);
      float: left;
      margin-left: j(24);
      margin-top: j(-4);
      font-size: j(28);
      background:none;
      outline:none;
      border:none;
    }
    .login_codeR{
      float: left;
      /*width: j(220);*/
    }
    .login_Ts{
      font-size: j(24);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      margin-top: j(30);
    }
    .login_noCode{
      width: 100%;
      text-align: center;
      font-size: j(24);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #B4B9BD;
      margin-top: j(66);
    }
    .login_codeBtn .van-button::before{
      border-radius: 0 !important;
    }
  .login_shu{
    float: left;
    width: j(2);
    height: j(44);
    margin-top: j(25);
    background: #DFDFDF;
  }
</style>

