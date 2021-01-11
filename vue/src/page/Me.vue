<template>
  <!--<transition :name="transitionName">-->
  <div id="Me_box">
    <div>
      <div class="navBar">
        <div class="goback" @click="returns"></div>
        <div @click="returns">个人中心</div>
      </div>
      <div class="me_box">
          <div class="me_Top" @click="redirects('/newsCore')" v-if="wNum != '0'">
            <img class="me_bel" v-if="isBnum" src="../assets/ls/bel.png" alt="">
            <img class="me_bel"  v-else :class="[{'r1': shrinkPacket}, {'r2': !shrinkPacket}]" src="../assets/ls/bel.png" alt="">
            <div>您有{{wNum}}条未读信息！</div>
            <img class="me_mores" src="../assets/ls/meMore.png" alt="">
          </div>
          <div class="me_Topp" v-else>

          </div>
        <!--权利人-->
          <div class="me_info" v-if="obligee">
              <div class="me_tu" @click="redirects('/edit')">
                <img :src=imageId alt="">
              </div>
              <div class="me_name" @click="redirects('/edit')">
                  <div class="me_nameT">{{name}}</div>
                  <div class="me_nameB">{{businessName}}</div>
              </div>
              <div class="me_jian">
                <img src="../assets/ls/xuanzhe.png" alt="" @click="redirects('/edit')">
              </div>
          </div>

        <!--律师-->
        <div class="me_info" v-if="lawyer">
          <div class="me_tu" @click="redirects('/edit')">
            <img :src=imageId alt="">
          </div>
          <div class="me_namels" @click="redirects('/edit')">
            <div class="me_nameT"><div class="me_isname">{{name}}</div><div class="me_lsLiwatr"><img src="../assets/ls/zuan.png" alt="">LV{{level}}</div></div>
            <div style="clear: both"></div>
            <div class="me_nameB">{{businessName}}</div>
            <div class="me_lsnum">律师号：{{postNumber}}</div>
          </div>
          <div class="me_jian">
            <img src="../assets/ls/xuanzhe.png" alt="" @click="redirects('/edit')">
          </div>
        </div>

        <div style="clear: both"></div>
         <div class="me_three">
           <div class="me_num">
             <div class="me_zhi me_threeL"  @click="redirects('/myCase')">
               <div>
                 <div class="me_zt"><img src="../assets/ls/m1.png" alt=""></div>
                 <div class="me_zb">我的案件</div>
               </div>
             </div>
             <div class="me_zhi" @click="redirects('/centre')">
               <div>
                 <div class="me_zt"><img src="../assets/ls/m2.png" alt=""></div>
                 <div class="me_zb">我的授权</div>
               </div>
             </div>
             <!--权利人-->
             <div class="me_zhi" @click="redirects('/newsCore')" v-if="obligee">
               <div>
                 <div class="me_zt"><img src="../assets/ls/m3.png" alt=""></div>
                 <div class="me_zb">消息中心</div>
               </div>
               <div class="me_ti" v-if="wNum != '0'">{{wNum}}</div>
             </div>

             <!--律师-->
             <div class="me_zhi" @click="redirects('/newest')" v-if="lawyer">
               <div>
                 <div class="me_zt"><img src="../assets/ls/m4.png" alt=""></div>
                 <div class="me_zb">最新案源</div>
               </div>
             </div>

           </div>
         </div>
        <!--li-->
        <!--律师-->
        <!--<div class="me_list">-->
           <!--<div class="me_liThree">-->
             <!--<div class="me_lis" @click="redirects('/perfect')">-->
               <!--<div class="me_lisimg">-->
                 <!--<img src="../assets/ls/mli.png" alt="">-->
               <!--</div>-->
               <!--<div class="me_liswenan">完善信息</div>-->
               <!--<div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>-->
             <!--</div>-->
             <!--<div class="me_lis" @click="redirects('/extension')">-->
               <!--<div class="me_lisimg">-->
                 <!--<img src="../assets/ls/metg.png" alt="">-->
               <!--</div>-->
               <!--<div class="me_liswenan">推广中心</div>-->
               <!--<div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>-->
             <!--</div>-->
             <!--<div class="me_lis" @click="redirects('/myMark')">-->
               <!--<div class="me_lisimg">-->
                 <!--<img src="../assets/ls/mebj.png" alt="">-->
               <!--</div>-->
               <!--<div class="me_liswenan">我的标记</div>-->
               <!--<div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>-->
             <!--</div>-->
           <!--</div>-->

          <!--<div class="me_liTwo">-->
            <!--<div class="me_lis">-->
              <!--<div class="me_lisimg">-->
                <!--<img src="../assets/ls/mwe.png" alt="">-->
              <!--</div>-->
              <!--<div class="me_liswenan">关于我们</div>-->
              <!--<div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>-->
            <!--</div>-->
            <!--<div class="me_lis">-->
              <!--<div class="me_lisimg">-->
                <!--<img src="../assets/ls/mwen.png" alt="">-->
              <!--</div>-->
              <!--<div class="me_liswenan">常见问题</div>-->
              <!--<div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>-->
            <!--</div>-->
          <!--</div>-->

          <!--<div class="me_liOne">-->
            <!--<div class="me_lis">-->
              <!--<div class="me_lisimg">-->
                <!--<img src="../assets/ls/mtui.png" alt="">-->
              <!--</div>-->
              <!--<div class="me_liswenan">退出登录</div>-->
              <!--<div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>-->
            <!--</div>-->
          <!--</div>-->

        <!--</div>-->

        <!--权利人-->
        <div class="me_list">
          <div class="me_liTwo" v-if="obligee">
            <div class="me_lis" @click="redirects('/perfect')">
              <div class="me_lisimg">
                <img src="../assets/ls/mli.png" alt="">
              </div>
              <div class="me_liswenan">完善信息</div>
              <div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>
            </div>
            <div class="me_lis" @click="redirects('/lawyer')">
              <div class="me_lisimg">
                <img src="../assets/ls/mls.png" alt="">
              </div>
              <div class="me_liswenan">律师入驻</div>
              <div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>
            </div>
          </div>
          <!--律师-->
          <div class="me_liThree" v-if="lawyer">
            <div class="me_lis" @click="redirects('/perfect')">
              <div class="me_lisimg">
              <img src="../assets/ls/mli.png" alt="">
              </div>
              <div class="me_liswenan">完善信息</div>
              <div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>
              </div>
              <div class="me_lis" @click="redirects('/extension')">
              <div class="me_lisimg">
              <img src="../assets/ls/metg.png" alt="">
              </div>
              <div class="me_liswenan">推广中心</div>
              <div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>
              </div>
              <div class="me_lis" @click="redirects('/myMark')">
              <div class="me_lisimg">
              <img src="../assets/ls/mebj.png" alt="">
              </div>
              <div class="me_liswenan">我的标记</div>
              <div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>
            </div>
          </div>

          <div class="me_liTwo">
            <div class="me_lis">
              <div class="me_lisimg">
                <img src="../assets/ls/mwe.png" alt="">
              </div>
              <div class="me_liswenan">关于我们</div>
              <div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>
            </div>
            <div class="me_lis">
              <div class="me_lisimg">
                <img src="../assets/ls/mwen.png" alt="">
              </div>
              <div class="me_liswenan">常见问题</div>
              <div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>
            </div>
          </div>

          <div class="me_liOne" @click="out">
            <div class="me_lis">
              <div class="me_lisimg">
                <img src="../assets/ls/mtui.png" alt="">
              </div>
              <div class="me_liswenan">退出登录</div>
              <div class="me_lisgo"> <img src="../assets/ls/xuanzhe.png" alt=""></div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <!-- tabBar -->
    <!--蒙层-->
    <div class="test" v-if="isText" @click="mask"></div>

    <div style="clear: both"></div>
    <transition name="slide-fade">
      <div class="ani_box" v-if="showBar">
        <div class="ani_L" @click="isLeft">举报</div>
        <div class="ani_R" @click="isRight">维权</div>
      </div>
    </transition>

    <!-- tabBar -->
    <div class="nba">
      <van-tabbar v-model="tabarActive">
        <van-tabbar-item  icon="wap-home" @click="redirects('/Home')">
          <span>首页</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="props.tabarActive ? icon.active : icon.normal"
          >
        </van-tabbar-item>
        <van-tabbar-item icon="pending-evaluate"  @click="redirects('/putaway')">
          <span>案件</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="icon.whole"
          >
        </van-tabbar-item>
        <van-tabbar-item @click.native="touchEnd">
          <!--<van-tabbar-item @touchstart.native="show = !show" @touchend.native="show = !show" @touchend="touchEnd(e)">-->
          <!--<img class="tui" src="http://sucai.suoluomei.cn/sucai_zs/images/20200604173603-12.png" alt="">-->
          <div class="tui">
            <div id="exCircle">
              <img src="../assets/ls/weiquan.png" alt="" v-if="homeX">
              <div id="inCircle" v-if="homex">
                <img src="../assets/ls/homeX.png" alt="">
              </div>
            </div>
          </div>
          <div class="BT_text">维护权益</div>
        </van-tabbar-item>
        <van-tabbar-item icon="pending-evaluate"  @click="redirects('/Lsku')">
          <span>律师</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="icon.gwcw"
          >
        </van-tabbar-item>
        <van-tabbar-item v-if="isBnum" icon="contact" @click="redirects('/Me')">
          <span>我的</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="icon.me"
          >
        </van-tabbar-item>
        <van-tabbar-item v-else dot icon="contact" @click="redirects('/Me')">
          <span>我的</span>
          <img
            slot="icon"
            slot-scope="props"
            :src="icon.me"
          >
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <dialog-bar v-model="succsees"
                type="danger"
                title="提示"
                content="<div class='tiTest'>您确定要退出登录吗？
                </div>"
                v-on:cancel="clickCancel()"
                @danger="clickDanger()"
                @confirm="clickConfirm()"
                dangerText="取消"
                cancelText="确定"
                confirmText="返回首页">

    </dialog-bar>
    <dialog-bar v-model="Ysuccsees"
                type=""
                id="Ys"
                title=""
                content="<div class='tiTests'>去完善完个人信息</div>"
                v-on:cancel="clickCancels()"
                cancelText="确定">

    </dialog-bar>
  </div>
  <!--</transition>-->
</template>

<script>
  import {store} from '../store/store';
  import normalHome from '../assets/ls/nhome.png'
  import normalWhole from '../assets/ls/nanjian.png'
  import normalgwcw from '../assets/ls/nls.png'
  import activeMe from '../assets/ls/yme.png'
  import mrt from '../assets/ls/mrt.png'
  import tou from '../assets/Jmo.png'
  import global_ from '../components/Global'
  import { Toast } from 'vant';
  import dialogBar from "../components/dialog";
  var qs=require('qs');
  var fromName =global_.Arr;
  var add = new Object();
  export default {
    components: {
      "dialog-bar": dialogBar,
    },
    data() {
      return {
        serverSrc:global_.serverSrc,
        imgSrc:global_.imgSrc,
        tabarActive:4,
        icon: {
          normal: normalHome,
          whole:normalWhole,
          me:activeMe,
          gwcw:normalgwcw,
        },
        obligee:true,/*权利人*/
        lawyer:false,/*律师*/
        active:'A',
        show: false,
        guanbi: true,
        list: [],
        isJson:{},
        imgType: true,
        maxNum: 9,
        homex: false,
        homeX: true,
        isText: false,
        showBar: false,
        succsees: false,
        Ysuccsees: false,
        name:'',
        postNumber:'',
        level:0,
        businessName:'',
        imageId:mrt,
        shrinkPacket:false,
        isBnum: true,
        isID: '',
        wNum: '0',
        timer: null,  // 定时器名称
        timed: null,  // 定时器名称
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      clickCancels(){
        this.$router.push('/perfect');
      },
      startRotate() {
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
          this.shrinkPacket = !this.shrinkPacket
      },100);
      },
      clickCancel(){
        console.log('确认')
        this.$router.push('/');
        localStorage.clear()
      },
      clickDanger(){
        console.log('取消')
      },
      out(){
      //退出登录
        this.succsees =true;
      },
      mask(){
        this.isText =false
        this.showBar =false
        this.homex = false;
        this.homeX = true;
      },
      returns() {
        this.$router.go(-1);
      },
      isLeft(){
        if(localStorage.getItem('ID')){
          this.showBar = !this.showBar;
          this.homex = !this.homex;
          this.homeX = !this.homeX;
          if(this.showBar){
            this.isText =true
          }else {
            this.isText =false
          }
          if(localStorage.getItem('isStatus')){
            if(JSON.parse(localStorage.getItem('isStatus')) == 'UN_DESC'){
              this.Ysuccsees =true;
            }else {
              this.$router.push('/power');
            }
          }else {
            this.$router.push('/report');
          }
        }else {
          this.$router.push('/');
        }

      },
      isRight(){
        if(localStorage.getItem('ID')){
          this.showBar = !this.showBar
          this.homex = !this.homex;
          this.homeX = !this.homeX;
          if(this.showBar){
            this.isText =true
          }else {
            this.isText =false
          }
          if(localStorage.getItem('isStatus')){
            if(JSON.parse(localStorage.getItem('isStatus')) == 'UN_DESC'){
              this.Ysuccsees =true;
            }else {
              this.$router.push('/power');
            }
          }else {
            this.$router.push('/power');
          }
        }else {
          this.$router.push('/');
        }

      },
      touchEnd(){
        // this.showBar = !this.showBar;
        // this.homex = !this.homex;
        // this.homeX = !this.homeX;
        // if(this.showBar){
        //   this.isText =true
        // }else {
        //   this.isText =false
        // }

          this.showBar = !this.showBar;
          this.homex = !this.homex;
          this.homeX = !this.homeX;
          if(this.showBar){
            this.isText =true
          }else {
            this.isText =false
          }

      },
      redirects(url) {
        //
        if(url != '/Home'){
          if(localStorage.getItem('ID')){
            if(url == '/perfect'){
              if(this.obligee){
                this.$router.push(url);
              }else {
                this.$router.push('/lawyer');
              }
            }else {
              this.$router.push(url);
            }
          }else {
            this.$router.push('/');
          }
        }else {
          if(url == '/perfect'){
            if(this.obligee){
              this.$router.push(url);
            }else {
              this.$router.push('/lawyer');
            }
          }else {
            this.$router.push(url);
          }
        }

        this.isText =false
        this.showBar =false
        this.homex = false;
        this.homeX = true;
      },
      handleFileUpload(event){

        event.preventDefault();

        this.file = this.$refs.file.files[0].name;

      },
      func:function(c){
        this.active=c;
        // this.block=c;
      },
      showPopup() {
        this.show = true;
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
          // localStorage.setItem('body',JSON.stringify(res.data.body));
          // if(localStorage.getItem('body')){
          //   console.log(res.data.body.user.status)
          if(res.data.body.user.status){
            localStorage.setItem('isStatus',JSON.stringify(res.data.body.user.status));
          }
          that.isJson =JSON.parse(localStorage.getItem('body'))
            if(res.data.body.user.accountType =='PROTECT'){
              /*权利人*/
              that.obligee=true;
              that.lawyer=false;
              that.name =res.data.body.user.name;
              that.businessName =res.data.body.user.businessName;
              if(res.data.body.user.headerImg !== "{}"){
                that.imageId =res.data.body.user.headerImg.filePath
              }
              console.log(this.imageId)
            }
            if(res.data.body.user.accountType =='BARRISTER'){
              /*律师*/
              that.lawyer=true;
              that.obligee=false;
              that.name =res.data.body.user.name;
              that.businessName =res.data.body.user.businessName;
              if(res.data.body.user.barrister !== "{}"){
                that.level =res.data.body.user.barrister.level
                that.postNumber =res.data.body.user.barrister.postNumber
              }
              if(res.data.body.user.headerImg !== "{}"){
                that.imageId =res.data.body.user.headerImg.filePath
              }

            }
          // }
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
      getNum(){
        var that=this;
        var postDatast = qs.stringify({
          userId:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/notify/count",postDatast)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          // console.log(res.data.body)
          if(res.data.body>0){
            that.isBnum=false;
            that.wNum=res.data.body;
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
      var that =this
      window.scrollTo(0,0);
      this.startRotate()
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      this.init();
      that.getNum()
      this.timed=setInterval(function () {
        that.getNum()
      },5000)
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
    },
    beforeDestroy() {
      clearInterval(this.timed);
      this.timed = null;
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
  .Me_box{
    min-height: 100vh;
  }
  .van-tabbar-item--active {
    color: #1C6DB1 !important;
  }
  #Me_box .navBar{
    top: 0;
    left: 0;
    width: j(750);
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
    z-index: 97;
  }
  #Me_box .goback{
    width: j(40);
    height: j(40);
    background: url("../assets/ls/back.png") no-repeat;
    background-size: 100% 100%;
    float: left;
    margin-left: j(20);
    margin-right: j(20);
  }

  .me_box{
    margin-top: j(88);
    margin-bottom: j(210);
  }
  .me_Top{
    width: j(702);
    height: j(96);
    background: #FFF3F0;
    border-radius: j(8);
    margin: j(126) auto  0;
    display: flex;
    align-items: center;
    position: relative;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #F47D48;
  }
  .me_Topp{
    width: j(702);
    height: j(96);
    margin: j(126) auto  0;
    display: flex;
    align-items: center;
    position: relative;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
  }
  .me_bel{
    width: j(32);
    height: j(32);
    margin-left: j(48);
    margin-right: j(20);
  }
  .me_mores{
    width: j(48);
    height: j(20);
    position: absolute;
    right: j(34);
  }

  /*信息*/
  .me_info{
    width: j(702);
    height: j(242);
    margin: 0 auto;
  }

  .me_tu{
    width: j(152);
    height: j(152);
    border-radius: 50%;
    overflow: hidden;
    float: left;
    margin-left: j(20);
    margin-top: j(46);
  }
  .me_tu img{
    width: 100%;
    height: 100%;
  }
  .me_name{
    margin-top: j(80);
    margin-left: j(30);
    float: left;
  }
  .me_namels{
    margin-top: j(50);
    margin-left: j(30);
    float: left;
  }
  .me_nameT{
    font-size: j(36);
    font-weight: 600;
    color: #333333;
  }
  .me_nameB{
    margin-top: j(2);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
  }
  .me_jian img{
    margin-top: j(108);
    width: j(32);
    height: j(32);
    float: right;
    margin-right: j(20);
  }
  .me_isname{
    float: left;
  }
  .me_lsLiwatr{
    float: left;
    width: j(108);
    height: j(38);
    line-height: j(42);
    font-size: j(24);
    font-family: Arial-BoldMT, Arial;
    font-weight: normal;
    color: #FFFFFF;
    background: #1C6DB1;
    border-radius: j(16);
    margin-top: j(4);
    margin-left: j(12);
  }
  .me_lsLiwatr img{
    width: j(28);
    height: j(28);
    margin-left: j(12);
    margin-right: j(6);
    margin-top: j(2);
    vertical-align: middle;
  }
  .me_lsnum{
    margin-top: j(18);
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
  }
  /*三等分*/
  .me_threeL{
    margin-left: j(24);
  }
  .me_three{
    width: j(750);
    height: j(148);
    /*margin-top: j(80);*/
    /*position: relative;*/
    /*top: j(90);*/
    color: #333333;
    /*padding: 0 j(44);*/
    margin: 0 auto;
  }

  .me_value .me_val {
    font-size: j(28);
    font-weight: 600;
    margin-bottom: j(24);
  }

  .me_num .me_zhi {
    float: left;
    width: j(220);
    height: j(148);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(24);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .me_num > .me_zhi:nth-child(3n-1) {
    margin-left: j(20);
    margin-right: j(20);
  }

  .me_num .me_zhi .me_zt {
    font-size: j(42);
    /*padding-left: j(54);*/
    text-align: center;
    /*padding-top: j(24);*/
    font-weight: 700;
    color: #8E9397;
  }
  .me_zt img{
    width: j(64);
    height: j(64);
  }


  .me_num .me_zhi .me_zb {
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6F7275;
    text-align: center;
  }
  .me_ti{
    background: #DA4A6D;
    border-radius: j(8) j(8) j(8) 0;
    font-size: j(24);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1;
    padding: j(4) j(6);
    position: absolute;
    top: j(20);
    left: j(130);
  }
  /*li*/
  .me_list{
    width: j(702);
    margin: j(34) auto 0;
  }
  .me_liThree{
    width: j(702);
    height: j(294);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(32);
  }
  .me_liTwo{
    width: j(702);
    height: j(196);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(32);
  }
  .me_liOne{
    width: j(702);
    height: j(98);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-bottom: j(32);
  }
  .me_lis{
    width: j(702);
    height: j(98);
    border-radius: j(16);
  }
  .me_lisimg img{
    width: j(48);
    height: j(48);
  }
  .me_lisimg{
    float: left;
    margin-left: j(24);
    margin-top: j(26);
    margin-right: j(24);
  }
  .me_liswenan{
    float: left;
    height: j(98);
    line-height: j(98);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
  }
  .me_lisgo{
    float: right;
    margin-top: j(30);
    margin-right: j(26);
  }
  .me_lisgo img{
    width: j(32);
    height: j(32);
  }


  /*底*/
  #exCircle{
    margin:auto;
    width: j(100);
    height: j(100);
    border-radius: 150px;
    background-color: #1C6DB1;
    /*background: url("../assets/ls/weiquan.png") no-repeat;*/
    /*background-size: 100% 100%;*/
  }
  #exCircle img{
    margin-left: j(19);
    margin-top: j(19);
    width: j(62);
    height: j(62);
  }
  #inCircle{
    margin-top: j(15);
    margin-left: j(15);
    position: absolute;
    width: j(70);
    height: j(70);
    border-radius: 100px;
    background-color: #ffffff;
  }
  /*底部*/
  .ani_box{
    width: j(120);
    height: j(404);
    /*background: red;*/
    /*border: 1px solid;*/
    position: fixed;
    left: 50%;
    margin-left: j(-60);
    bottom: j(120);
    z-index: 98;
  }

  .ani_L{
    /*float: left;*/
    width: j(120);
    height: j(120);
    line-height: j(120);
    background: #F56B47;
    box-shadow: 0 j(12) j(12) 0 rgba(255,96,56,0.2);
    border-radius: 50%;
    margin-bottom: j(40);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .ani_R{
    /*float: right;*/
    width: j(120);
    height: j(120);
    line-height: j(120);
    background: #1C6DB1;
    box-shadow: 0 j(12) j(12) 0 rgba(28,109,177,0.1);
    border-radius: 50%;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .tui{
    width: j(100);
    height: j(100);
    margin-top: j(-64);
    z-index: 100000;
    border-radius: 50%;
    pointer-events:none;/* 禁止长按图片保存 */
  }
  /*[class*=van-hairline]::after{*/
    /*border:none!important*/
  /*}*/
  .BT_text{
    margin-top: j(10);
  }
  #inCircle img{
    width: j(40);
    height: j(40);
    margin-left: j(15);
    margin-top: j(15);
  }
  .test {
    width:100%;
    height:100%;
    background:rgba(0,0,0,.75);
    position:absolute;
    z-index:98;
    top:0;
    left:0;
    color:#FFF;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
    transform: translateY(200px);
    opacity: 0;
  }


  /* 设置持续时间和动画函数 */
  .slide-fadeS-enter-active {
    transition: all .3s ease;
  }
  .slide-fadeS-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fadeS-enter, .slide-fadeS-leave-to
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */ {
    transform: translateY(60px);
    opacity: 0;
  }
  .van-tabbar-item{
    z-index: 9 !important;
  }
  .van-tabbar{
    z-index: 99 !important;
  }


  .tiTest{
    width: 100%;
    text-align: center;
    font-size: j(38)  !important;
    margin-top: j(100) !important;
    color: #999999 !important;
  }
  .tiTests{
    width: 100%;
    text-align: center;
    font-size: j(38)  !important;
    margin-top: j(120) !important;
    color: #999999 !important;
  }
  .tiTestwo{
    width: 100%;
    text-align: center;
    font-size: j(28)  !important;
    margin-top: j(30) !important;
    color: #999999 !important;
  }
  .r1 {
    transform:rotate(-10deg);
  }
  .r2 {
    transform:rotate(6deg);
  }
  .van-tabbar-item__icon--dot::after{
    right: j(-2)!important;
  }
</style>
