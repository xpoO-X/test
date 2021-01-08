<template>
  <transition :name="transitionName">
  <div id="CartH">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">我要举报</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="carBox">
        <div class="car_titleT">基本信息</div>
        <div class="car_List">
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">举报人</div>
            <input class="car_input" v-model="FrealName" type="text" placeholder="请输入举报人">
          </div>
          <div class="car_Li"  @click="showPicker = true">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">举报人证件类型</div>
            <div class="car_zheng">{{value}}</div>
            <img class="car_xuan" src="../assets/ls/xuanzhe.png" alt="">
          </div>
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">举报人证件号</div>
            <input class="car_input" v-model="FidentityNumber" type="text" placeholder="请输入举报人证件号">
          </div>
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">联系方式</div>
            <input class="car_input" v-model="Fphone" type="text" placeholder="请输入联系方式">
          </div>
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">被举报人姓名</div>
            <input class="car_input" v-model="reinformName" type="text" placeholder="请输入被举报人姓名">
          </div>
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">举例说明</div>
            <input class="car_input" v-model="remark" type="text" placeholder="请输入举例说明">
          </div>
          <!--<span class="R_textarea">-->
             <!--<img class="car_xxing" src="../assets/ls/xing.png" alt="">-->
          <!--<van-field-->
            <!--v-model="remark"-->
            <!--rows="1"-->
            <!--autosize-->
            <!--label="举例说明"-->
            <!--type="textarea"-->
            <!--maxlength="1000"-->
            <!--placeholder="请输入举例说明"-->
          <!--/>-->
          <!--</span>-->
        </div>
      <div>
        <div class="report_titleT">上传举报材料</div>
        <div class="list-img">
          <div
            id="imgs"
            v-if="guanbi"
          >
            <div
              class="imgarr"
              v-for="(item , index) in list"
              :key="index"
            >
              <div
                class='closen'
                @click="closen(index)"
              ><span></span></div>
              <img
                :src="item"
                alt=""
              >
            </div>
            <div
              id="uploading"
              v-show="imgType"
            >
              +
              <input
                accept="image/*"
                type="file"
                @change="upimg"
                multiple="multiple"
                id="file"
                ref="upimg"
              >
            </div>
          </div>
          <div class="imgtit"></div>
        </div>
        <!--<div @click="getimg">获取img</div>-->
      </div>
      <div class="report_radio">
                <span class="selfRadios retcmll" @click="clickRadio(1)">
                  <img v-show="radio==1" src="../assets/ls/xz.png" alt="选中图标">
                  <img v-show="radio!=1" src="../assets/ls/wxz.png" alt="未选中图标">
                  我已阅读《权利人维权协议》
                </span>
      </div>
      <div class="report_btn" @click="repBtn">
          提交
      </div>
      <div class="car_tishi" @click="redirects('/matterB')">
        <img src="../assets/ls/zhuyi.png" alt="">
        <span>举报注意事项</span>
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
        radio: '1',
        showPicker:false,
        value: '',
        FidentityNumber: '',
        FrealName: '',
        Fphone: '',
        reinformName: '',
        remark: '',
        province: '',
        city: '',
        area: '',
        guanbi: true,
        list: [],
        imgType: true,
        maxNum: 9,
        columns: ['组织机构代码', '身份证'],
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      repBtn(){
        var that=this;
        var isType = '';
        if(that.value == '组织机构代码'){
          isType ='BUSINESSID'
        }else {
          isType ='IDCARD'
        }
        var loadingAlert1 = Toast.loading({
          mask: true,
          message: '加载中...',
          duration:1000
        });
        var postDataa = qs.stringify({
          creationType:'INFORM',
          creationPhone:that.Fphone,
          reinformName:that.reinformName,
          area:that.area,
          province:that.province,
          city:that.city,
          creationName:that.FrealName,
          creationIdentityType:isType,
          creationIdentityNumber:that.FidentityNumber,
          creationId:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/protect",postDataa)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          setTimeout(()=>{
            loadingAlert1.clear();
          Toast({
            message:"提交成功！",
            duration:2000
          })
          setTimeout(function () {
            that.$router.push('/myCase');
          },1000)
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
              that.FrealName =res.data.body.user.realName;
            }
            if(res.data.body.user.identityNumber!=undefined){
              that.FidentityNumber =res.data.body.user.identityNumber;
            }
            if(res.data.body.user.phone!=undefined){
              that.Fphone =res.data.body.user.phone;
            }
            if(res.data.body.user.identityType!=undefined){
              if(res.data.body.user.identityType == 'IDCARD'){
                that.value = '身份证';
                this.columns.defaultIndex = 1;
              }else {
                that.value = '组织机构代码';
                this.columns.defaultIndex = 0;
              }
            }
            if(res.data.body.user.province != undefined&& res.data.body.user.city!=undefined&& res.data.body.user.area!=undefined){
              that.province=res.data.body.user.province;
              that.city=res.data.body.user.city;
              that.area=res.data.body.user.area;
            }
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
      closen(e) {
        let _this = this;
        _this.list.splice(e, 1);
        let a = e + 1;
        let b = "array" + a;
        delete add[b];
        _this.imgType = true;
      },
      getimg(){
        console.log(this.list)
      },
      upimg(e) {
        let _this = this;
        var _size = [];
        var _type = [];
        var imgTypes = "";
        var files = e.target.files;

        for (var i = 0; i < files.length; i++) {
          _size.push(files[i].size);
          _type.push(files[i].type);
        }
        for (var i = 0; i < _size.length; i++) {
          if (_size[i] / 1024 / 1024 > 5) {
            return Toast("文件过大");
          } else {
            for (var j = 0; j < _type.length; j++) {
              imgTypes = _type[j].substring(0, 5);
              if (imgTypes !== "image") return Toast("格式不正确!");
            }
          }
        }
        for (var z = 0; z < files.length; z++) {
          let reader = new FileReader();

          reader.readAsDataURL(e.target.files[z]);
          reader.onloadend = function() {
            _this.src = this.result;
            if (_this.list.length < _this.maxNum) {
              _this.list.push(_this.src);

              var arr = _this.src.split(","),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }

              _this.arraynum++;
              _this.basy = new File([u8arr], "imges", { type: mime });

              var array = "array" + _this.arraynum;
              add[array] = _this.basy;

              _this.$refs.upimg.value = "";

              if (_this.list.length == _this.maxNum) {
                _this.imgType = false;
              }
            } else {
              return Toast("数量超出");
            }
          };
        }
      },
      clickRadio(val){
        // console.log(val)
          if(this.radio==val){
            this.radio=0;
          }else{
            this.radio=val;
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
  .report_titleT{
    margin-left: j(28);
    margin-top: j(20);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
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
    width: j(380);
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
  .car_zheng{
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1F2226;
    margin-left: j(16);
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
  .retcmll{
    margin-left: j(20);
  }
  .report_radio{

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
  .report_btn{
    width: j(702);
    height: j(88);
    line-height: j(88);
    background: #1C6DB1;
    border-radius: j(16);
    margin: j(32) auto j(56);
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
  .R_textarea{
    position: relative;
  }
  .R_textarea .van-field__control{
    color: #6B7372;
    font-size: j(28);
    padding-left:j(10);
  }
  .R_textarea .van-field__label{
    color:#0E2725 !important;
  }
  .R_textarea .van-field .van-cell__title{
    margin-left: j(18) !important;
    margin-right: j(48)!important;
    font-size: j(28) !important;
    color: #53575A !important;
  }
  .R_textarea .van-field__control{
    width: j(280)!important;
  }
  .R_textarea .van-cell{
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1) !important;
    border-radius: j(16) !important;
  }
  .car_xxing{
    width: j(20);
    height: j(20);
    position: absolute;
    top: j(40);
    left: j(16);
    z-index: 999;
  }


  //上传

  .list-img {
    margin-top: j(20);
    margin-left: j(18);
  }
  .list-img #imgs {
    float: left;
  }

  .list-img .imgarr img {
    max-width: 100%;
    max-height: 100%;
    vertical-align: middle;
  }

  .list-img .imgarr {
    width: j(148);
    height: j(148);
    line-height: j(138);
    text-align: center;
    position: relative;
    float: left;
    margin-right: j(20);
    margin-bottom: j(20);
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .list-img .closen {
    width: j(40);
    height: j(40);
    background: #ff4a6c;
    border-radius: j(40);
    position: absolute;
    right: -3px;
    top: -3px;
  }

  .list-img .closen span {
    display: block;
    width: j(26);
    height: j(4);
    background: #fff;
    margin-top: j(18);
    margin-left: j(7);
  }

  .list-img #imgPreview {
    width: 100%;
  }

  .list-img #uploading {
    width: j(146);
    height: j(146);
    border: j(2) dashed #5082ff;
    text-align: center;
    line-height: j(146);
    float: left;
    position: relative;
    font-size: j(120);
    color: #5082ff;
    overflow: hidden;
    margin-left: j(14);
  }

  .list-img #file {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
  }

  .list-img .imgtit {
    clear: both;
    padding-top: j(20);
    padding-bottom: j(25);
    font-size: j(24);
    color: #999;
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
