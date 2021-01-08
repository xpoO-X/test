<template>
  <transition :name="transitionName">
  <div id="down">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">授权确认</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="down_Box">
      <div class="down_top">
         <div class="down_topL">《授权协议》.pdf</div>
         <div class="down_topR"><input class="isfile" type="file" id="file" ref="file" v-on:change="handleFileUpload($event)"><img src="../assets/ls/shangchuan.png" alt="">上传</div>
      </div>
      <div style="clear: both"></div>
      <div class="down_content">
           <div class="down_contentT">{{title}}</div>
           <div class="down_contentText">
             <h4>一、合作原则</h4>
             <div class="sJ">
               甲方与乙方决定建立战略合作伙伴关系，互为重要战略合作伙伴，本着发挥各自优势、互惠互利、共赢共享的发展原则，在相关领域进一步深化业务合作。有鉴于此，双方决定协商一致，达成一致协议如下：
             </div>
             <h4>二、合作内容</h4>
             <div class="sJ">
               1、应甲方要求，乙方为甲方的重大经营决策提供法律和政策依据，为甲方的业务策划提供法律咨询、协助甲方草拟、制订重要项目的内部合约化制度。
             </div>
             <div class="sJ">
               2、应甲方要求，乙方协助甲方草拟、制订、审查或修改各类合同、协议等法律文件；应甲方要求，参与甲方高层会议、企业策划、商务谈判，进行法律分析、论证，办理资信调查、可行性研究、风险预测和项目投资论证等非诉法律事务。
             </div>
             <div class="sJ">
               3、应甲方要求，乙方就甲方已经面临或者可能发生的纠纷，进行法律论证，提出解决方案，出具律师函，发表律师意见，或参与非诉讼谈判、协调、调解。             </div>
             <div class="sJ">
               4、应甲方要求，乙方为企业职工提供法制宣传、教育、培训；帮助甲方建立劳动合同、人事管理体系制度、企业内部规章制度、合同管理制度，解答甲方有关劳动法的问题，并协助甲方处理劳动争议。
             </div>
             <div class="sJ">
               5、应甲方要求，乙方接受甲方委托担任代理人，参加甲方涉及经济、民事、知识产权、劳动、行政、刑事等诉讼、非诉、调解、仲裁活动；经甲方特别授权，乙方签署、送达或接收法律文书。
             </div>
             <div class="sJ">
               6、甲方以“战略合作伙伴”名义对外宣传乙方，并向自己的社会资源、客户资源推荐乙方，打开乙方社会知名度。
             </div>
             <h4>三、合作方式</h4>
             <div class="sJ">
               双方保持长期、持续战略合作关系，每一次实际业务合作以双方签订的合同或协议为准。
             </div>
             <h4>四、信息保密</h4>
             <div class="sJ">
               甲乙双方均应对双方的合作内容及有关数据和资料负永久保密义务，不得提供、透露予任何第三人或许可第三人使用，亦不得将相关资料用于本合作项目以外的任何用途。如有违约情形，由违约方承担由此造成的损失。
             </div>
             <h4>五、知识产权</h4>
             <div class="sJ">
               甲乙双方应本着互相尊重、互为合作，保护对方利益为前提的原则进行合作，对包括但不限于任何专利权、专有技术、版权、商标权、技术秘密以及商业秘密等所产生的任何侵权和赔偿，双方应在充分协商的基础上，协调解决。
             </div>
             <h4>六、免责条款</h4>
             <div class="sJ">
               因不可抗力导致甲乙双方或一方不能履行或不能完全履行本协议项下有关义务时，双方相互不承担违约责任。在不可抗力影响消除后的合理时间内，一方或双方应当继续履行合同。
             </div>
             <h4>七、协议变更与解除</h4>
             <div class="sJ">
               1、除非另有约定，本协议生效后，任何一方不得单方解除本协议；对本协议的修改或变更须经双方协商一致，并达成书面协议。
             </div>
             <div class="sJ">
               2、如遇国家法律、法规或政策变化，致使本协议的全部或部分条款不再符合国家法律、法规或政策的要求，双方应及时协商，尽快修改有关条款。
             </div>
             <div class="sJ">
               3、合作期限内，合作内容可根据双方实际业务需求，在双方充分协商的基础上，自愿扩展本协议合作范围，并签署书面补充协议加以确认。
             </div>
             <h4>八、争议管辖</h4>
             <div class="sJ">
               甲乙双方因本协议引起的或与本协议有关的任何争议，均应本着平等互利的原则协商解决。如协商无法解决，任何一方均可向北京仲裁委员会申请仲裁解决。
             </div>
             <h4>九、协议其他事项</h4>
             <div class="sJ">
               1、本协议自双方法定代表人或授权代表签字、加盖公章或合同专用章之日起生效。协议期满，如双方均未向对方发出书面解除通知，协议持续有效。本协议附件为本协议组成部分，与本协议具有同等效力。
             </div>
             <div class="sJ">
               2、本协议一式两份，双方各执一份，具有同等效力。
             </div>

           </div>
      </div>
      <div class="down_btn" v-if="showBtn" @click="isYes">
          同意
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
        showBtn: false,
        maxNum: 9,
        isID:'',
        CDid:'',
        title:'',
        columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      isYes(){
        var that=this;
        var postDatam = qs.stringify({
          id:that.CDid,
          userId:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/impower/confirm",postDatam)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
            Toast({
              message:'已同意！',
              duration:2000
            });
            setTimeout(function () {
              that.$router.push('/Me');
            },2000)
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
      init(){
        var that=this;
        var postDatau = qs.stringify({
          id:that.CDid,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/case/impower/detail",postDatau)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          if(JSON.stringify(res.data.body) !== "{}"){
            that.title =res.data.body.title;
            if(res.data.body.status == 'SUCCESS'){
              that.showBtn =false
            }else {
              that.showBtn =true
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
    },
    mounted(){
      window.scrollTo(0,0);
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      if(localStorage.getItem('CDid')){
        this.CDid =localStorage.getItem('CDid')
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
    width: j(600);
    margin: 0 auto;
    font-size: j(32);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: #1F2226;
    text-align: center;
    padding-top: j(52);
    padding-bottom: j(24);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
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
  .sJ{
    text-indent:2em
  }
  .gH img{
    margin-left: j(450);
    width: j(40);
    height: j(40);
  }
</style>
