<template>
  <transition :name="transitionName">
  <div id="down">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">下载协议</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="down_Box">
      <div class="down_top">
         <div class="down_topL">《W*****协议》.pdf</div>
         <div class="down_topR"><input class="isfile" type="file" id="file" ref="file" v-on:change="handleFileUpload($event)"><img src="../assets/ls/shangchuan.png" alt="">上传</div>
      </div>
      <div style="clear: both"></div>
      <div class="down_content">
           <div class="down_contentT">权利人维权协议</div>
           <div class="down_contentText">
             黄某1向本院提出诉讼请求：1.终止原被告签订的《资益+资产管理服务合同》编号[SHGZWDXXXXXXXXX]；2.被告将本市金桥路XXX弄XXX号XXX室房屋(钥匙连同室外配置物品)完整交付原告，清除门前杂物；3.被告承担上述房屋自2018年6月20日起至今所发生的水电煤费用。事实和理由：原告为上海市金桥路XXX弄XXX号XXX室房屋(以下简称系争房屋)所有权人。2018年6月5日，原告找到被告“链家”门店，打算挂牌出租系争房屋。被告工作人员说服原告把系争房屋交被告接管，双方遂签订30页的《资益+资产管理服务合同》，被告未就合同条款向原告作充分说明和告知。合同约定由被告管理运营系争房屋，对外进行出租供他人居住，管理期限自2018年6月20日至2023年12月26日。乙方(被告)运营系争房屋所实际代收的租金为实际收益，乙方根据协议规定的每个结算周期结束后从实际收益中扣除乙方应得的增值收益分成及各项甲方(原告)应付费用，将授予收益部分支付给甲方。6月20日，被告要求原告清空室内物件及构造物，原告清出的木床、木板、木料等放置在102室底层走道一侧。原告要求被告装修时照看一下，被告工作人员同意还用手机录像以示重视。被告承诺一条龙服务。然而，原告搬离后数日，发现木床等留置物不见踪影，被被告擅自处理。系争房屋经简单装修后被对外出租。后原告发现，合同中多处条款有损害原告权益、有失公平市场交易准则、并有悖于国家法律规定。原告诉至法院，请求判如诉请。 经查，《资益+资产管理服务合同》第7.4条争议解决约定，因解释和履行本合同而发生的任何争议，任何一方可依法向乙方(即被告)所在地人民法院起诉处理。
           </div>
      </div>
      <div class="report_radio">
                <span class="selfRadios retcmll" @click="clickRadio(1)">
                  <img v-show="radio==1" src="../assets/ls/xz.png" alt="选中图标">
                  <img v-show="radio!=1" src="../assets/ls/wxz.png" alt="未选中图标">
                  我已阅读《权利人维权协议》
                </span>
      </div>
      <div class="down_btn">
          同意并下载
      </div>
      <div class="down_tishi">
        下载此协议，盖章后上传
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
        remark: '',
        guanbi: true,
        list: [],
        imgType: true,
        maxNum: 9,
        columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      handleFileUpload(event){

        event.preventDefault();

        // this.file = this.$refs.file.files[0].name;

        console.log(this.$refs.file.files[0].name)
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
          if (_size[i] / 1024 / 1024 > 1) {
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
  .down_Box{
    margin-top: j(88);
    padding-bottom: j(100);
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

  .down_btn{
    width: j(702);
    height: j(88);
    line-height: j(88);
    background: #1C6DB1;
    border-radius: j(16);
    margin: j(32) auto 0;
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }

  .down_top{
    width: 100%;
    margin-top: j(106);
  }
  .down_topL{
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1C6DB1;
    float: left;
    border-bottom: 1px solid #1C6DB1;
    margin-left: j(24);
    max-width: j(400);
    height: j(40);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .down_topR{
    float: right;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
    margin-right: j(32);
    position: relative;
  }
  .down_topR img{
    width: j(36);
    height: j(36);
    vertical-align: middle;
    margin-top: j(-8);
  }
  .down_content{
    width: j(750);
    background: #FFFFFF;
    margin-top: j(20);
    padding-bottom: j(74);
    margin-bottom: j(38);
  }
  .down_contentT{
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    text-align: center;
    padding-top: j(52);
    padding-bottom: j(24);
  }
  .down_contentText{
    padding: 0 j(62);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
  }
  .down_tishi{
    margin-left: j(24);
    margin-top: j(24);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .isfile{
    width: j(100);
    opacity: 0;
    position: absolute;
    left: 0;
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
