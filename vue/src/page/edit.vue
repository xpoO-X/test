<template>
  <transition :name="transitionName">
  <div id="edit_box">
    <div>
      <div class="navBar">
        <div class="goback" @click="returns"></div>
        <div @click="returns">编辑资料</div>
        <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
      </div>
      <div class="edit_conment">
          <div class="edit_Tou" >
            <div class="edit_Tu" :style="{backgroundImage: 'url(' + imgUrl + ')'}"><span class="btnd">
                  点击设置头像
                </span></div>
            <div class="edit_textT">上传头像</div>
          </div>
          <div class="edit_textC">免冠形象照片</div>
          <div class="edit_textB">.JPG 、.PNG不得大于2M</div>
      </div>
      <div class="edit_inps">
           <div class="edit_inp">
             <div class="edit_star"></div>
             <div class="edit_name">昵称</div>
             <div class="edit_input"><input v-model="name" type="text"></div>
           </div>
           <div class="edit_inp edtp">
             <div class="edit_star"></div>
             <div class="edit_name">性别</div>
             <div class="edit_sex"><div v-if="checked" class="edit_iSsex">男</div><div v-else class="edit_iSsex">女</div><van-switch v-model="checked" size="26px" /></div>
           </div>
            <div class="edit_inpTwoc edtp">
              <div class="edit_inpTc"  id="chooseLocation" :areaCode=areaCode>
                <div class="edit_starT"></div>
                <div class="edit_name">区域</div>
                <div class="edit_inputT"><span id="isAdd" ref="isAdds">{{isaddress}}</span></div>
                <div class="edit_goc"><img src="../assets/ls/xuanzhe.png" alt=""></div>
              </div>
              <div class="edit_inpT">
                <div class="edit_starT"></div>
                <div class="edit_name">详细地址</div>
                <div class="edit_inputT"><input v-model="addressDetail" type="text"></div>
                <!--<div class="edit_go"><img src="../assets/ls/xuanzhe.png" alt=""></div>-->
              </div>
            </div>
            <div class="edit_inp edtp">
              <div class="edit_star"></div>
              <div class="edit_name">单位</div>
              <div class="edit_input"><input v-model="businessName" type="text"></div>
            </div>
            <!--<div class="edit_inpTwocs" @click="showPicker = true">-->
              <!--<div class="edit_inpTD">-->
                <!--<div class="edit_starT"></div>-->
                <!--<div class="edit_name">单位</div>-->
                <!--<div class="edit_inputT"><span id="isAdds" ref="isAdds">{{value}}</span></div>-->
                <!--<div class="edit_goc"><img src="../assets/ls/xuanzhe.png" alt=""></div>-->
              <!--</div>-->
            <!--</div>-->
      </div>

      <div class="edit_btn" @click="okBtn">
          提交
      </div>
    </div>


    <div>
      <div class="cityMasking">
        <div id="citySelect">
          <div class="cityTitle">
            <p>地址选择</p>
            <span class="close">&times;</span>
          </div>
          <ul class="cityInfo">
            <li v-for="item in titles" class="infoList" @click="move($event)">{{item}}</li>
          </ul>
          <div class="linec"></div>
          <div class="address-content">
            <div class="loading-address">
              <img src="../assets/load1.gif" alt="">
              <p>正在加载 . . .</p>
            </div>
            <ul id="province" ref="province1">
              <li v-for="item in datas" :provinceId="item.code" @click="addList($event,item.childType,item.code)">{{item.name}}</li>
            </ul>
            <ul id="city">
              <li v-for="item in citys" :provinceId="item.code" @click="addList($event,item.childType,item.code)">{{item.name}}</li>
            </ul>
            <ul id="area">
              <li v-for="item in countys" :provinceId="item.code" @click="addList($event,item.childType,item.code)">{{item.name}}</li>
            </ul>
            <ul id="town">
              <li v-for="item in towns" :provinceId="item.code" @click="addList($event,item.childType,item.code)">{{item.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="clipbg displaynone">
      <div id="clipArea"></div>
      <div class="loading displaynone">正在载入图片...</div>
      <div class="footer">
        <div id="dl">
          <div class="dd" style="background: #1C6DB1; color: #ffffff;border: none;">打开相册<input type="file" id="file" accept="image/*" ></div>
          <div class="dd" id="clipBtn">完成裁剪</div>
        </div>
        <div class="backs">取消</div>
      </div>
    </div>


    <!--<van-popup v-model="showPicker" round position="bottom">-->
      <!--<van-picker-->
        <!--show-toolbar-->
        <!--:columns="columns"-->
        <!--@cancel="showPicker = false"-->
        <!--@confirm="onConfirm"-->
      <!--/>-->
    <!--</van-popup>-->
  </div>
  </transition>
</template>

<script>
  import {store} from '../store/store';
  import normalHome from '../assets/Jnohome.png'
  import normalWhole from '../assets/Jnofabu.png'
  import normalgwcw from '../assets/gwcw.png'
  import activeMe from '../assets/Jacme.png'
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
        tabarActive:3,
        icon: {
          normal: normalHome,
          whole:normalWhole,
          me:activeMe,
          gwcw:normalgwcw,
        },
        active:'A',
        show: false,
        imgUrl:'',
        url: "",
        checked: true,
        transitionName: 'slide-left',//默认动画
        isShowSelect: true,
        isaddress: "",
        datas: [],
        citys: [],
        countys: [],
        towns: [],
        titles: [],
        addressDetail:'',
        businessName:'',
        areaCode: "",
        showPicker: false,
        value: '',
        isID: '',
        name: '',
        province: '',
        city: '',
        area: '',
        columCity: []
      }
    },
    methods: {
      okBtn(){
        var that=this;
        console.log(that.columCity)
        if(that.columCity.length>0){
          that.province =that.columCity[0]
          that.city =that.columCity[1]
          that.area =that.columCity[2]
        }

        var Sex =''
        if(that.checked){
          Sex ='MAN'
        }else {
          Sex ='WOMAN'
        }
        var loadingAlert1 = Toast.loading({
          mask: true,
          message: '加载中...',
          duration:1000
        });
        var postDatad = qs.stringify({
          name:that.name,
          sex:Sex,
          province:that.province,
          city:that.city,
          area:that.area,
          businessName:that.businessName,
          address:that.addressDetail,
          id:that.isID,
        });
        // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
        that.$axios.post(that.serverSrc+"/u/update",postDatad)
          .then(res=>{
            if(res.data.code =="SUCCESS"){
          setTimeout(()=>{
            loadingAlert1.clear();
            Toast({
              message:"修改成功！",
              duration:2000
            })
            that.initial()
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
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
      },
      returns() {
        this.$router.go(-1);
      },
      //省市区tab切换
      move(_this) {
        var target = _this.target;
        var index = $(target).index();
        $(target)
          .siblings()
          .removeClass("listActive");
        $(target).addClass("listActive");
        $(".linec").css({ left: index * $(target).width() + "px" });
        $(".address-content").css({
          left: -index * $(".address-content ul").width() + "px"
        });
      },
      get() {
        var that = this;
        // let k ={ parentcode: 0, storeId: that.storeId }
        //
        // let rdw =that.randomWord(false, 7);
        // var sh1 = CryptoJS.MD5(rdw);
        // let t =sh1.toString(CryptoJS.enc.Base64);
        // let datas = that.cryptoJS.encrypts(JSON.stringify(k),sh1);
        // let vc =that.RSAencrypt(t);


        // let postData = qs.stringify({ voucher: vc ,data:datas });
        $.ajax({
          type: "post",
          // xhrFields: {
          //   withCredentials: true // 这里设置了withCredentials
          // },
          // url: "http://192.168.1.19:19042/commerce/getArea",
          url: "http://carstation.mocredit.cn/area/getArea.do",
          data: {
            // parentcode: 0,
            // storeId: that.storeId
            parentCode: ''
          },
          dataType: "json",
          success: function(res) {
            that.isShowContent = true;
            // res.info=JSON.parse(that.cryptoJS.decrypts(res.info,sh1))
            that.datas = res.info;
            that.titles.push("请选择");
          },
          error: function(res) {
            var str = err + '';
            if(str.search('timeout') !== -1){

            }else {
              that.isShowFloor = false;
              if(that.isShowBanner == false && that.isShowFloor == false){
                that.isShowContent = false;
              }
            }
          }
        });

        this.addList();
        $(function() {
          //遮罩层高度
          $(".cityMasking").height(window.innerHeight);
          //地址选择器开关
          $("#chooseLocation").click(function(e) {
            $(".cityMasking").show();
            e.stopPropagation();
          });
          $(document).click(function() {
            $(".cityMasking").hide();
          });
          $("#citySelect .close").click(function(e) {
            $(".cityMasking").hide();
          });
          $("#citySelect").click(function(e) {
            e.stopPropagation();
          });
        });
      },
      addList(_this, areaType, parentCode) {
        if (_this) {
          var html = [],
            that = this,
            target = _this.target,
            strAttr = "",
            index =
              $(".address-content")
                .find($(target).parents())
                .index() - 1,
            $infoList = $(target)
              .parents(".address-content")
              .siblings(".cityInfo")
              .find(".infoList");
          $(".cityInfo li")
            .eq(index)
            .attr("name", $(target).attr("provinceId"));
          $(target)
            .siblings()
            .removeClass("active");
          $(target).addClass("active");
          $infoList.siblings().removeClass("listActive");
          $infoList.eq(index).addClass("listActive");
          $(".cityInfo li")
            .eq(index)
            .text($(target).text());
          //
          // let k ={ parentcode: parentCode,
          //   storeId: that.storeId}
          //
          // let rdw =that.randomWord(false, 7);
          // var sh1 = CryptoJS.MD5(rdw);
          // let t =sh1.toString(CryptoJS.enc.Base64);
          // let datas = that.cryptoJS.encrypts(JSON.stringify(k),sh1);
          // let vc =that.RSAencrypt(t);


          // let postData = qs.stringify({ voucher: vc ,data:datas });

          $.ajax({
            type: "post",
            // url: "http://192.168.1.19:19042/commerce/getArea",
            url: "http://carstation.mocredit.cn/area/getArea.do",
            dataType: "json",
            // xhrFields: {
            //   withCredentials: true // 这里设置了withCredentials
            // },
            //子类参数
            data: {
              // areaType:areaType,
              // parentcode: parentCode,
              // storeId: that.storeId
              parentCode: parentCode,
            },
            success: function(res) {
              console.log(res.code)
              if(res.code == "SUCCESS" ){
                that.isShowContent = true;
                if (res.info.length > 0 && index + 1 < 4) {
                  if (
                    $infoList.eq(index + 1).attr("pId") !=
                    $(target).attr("provinceId")
                  ) {
                    // if($infoList.length == (($('.line').offset().left)/$('.cityInfo li').width())+1){
                    if (
                      $infoList.length ==
                      $infoList
                        .parent()
                        .find(".listActive")
                        .index() +
                      1
                    ) {
                      that.titles.push("请选择");
                    } else {
                      that.titles.splice(index + 1);
                      that.titles.push("请选择");
                    }
                    $(".linec").css({
                      left: (index + 1) * $(".cityInfo li").width() + "px"
                    });
                    $(".loading-address").show();
                    $(".address-content").css({
                      left: -(index + 1) * $(".address-content ul").width() + "px"
                    });
                    console.log(res.info[0].type)
                    if (res.info[0].type == "city") {
                      that.citys = res.info;
                    } else if (res.info[0].type == "county") {
                      that.countys = res.info;
                      console.log(that.countys)
                    } else if (res.info[0].type == "town") {
                      that.towns = res.info;
                    }
                    $(".loading-address").hide();
                  } else {
                    $(".linec").css({
                      left: (index + 1) * $(".cityInfo li").width() + "px"
                    });
                    $(".address-content").css({
                      left: -(index + 1) * $(".address-content ul").width() + "px"
                    });
                  }
                } else {
                  $(".cityMasking").hide();
                  for (let i = 0; i < $(".cityInfo").find("li").length; i++) {
                    let list = $(".cityInfo li")
                        .eq(i)
                        .text(),
                      attr = $(".cityInfo li")
                        .eq(i)
                        .attr("name");
                    html.push(list);
                    strAttr += attr + "|";
                    that.areaCode = $(".cityInfo li")
                      .last()
                      .attr("name");
                  }
                  strAttr = strAttr.substring(0, strAttr.length - 1);
                  $("#isAdd")
                    .text(html.join(""))
                    .attr("name", strAttr);
                  that.columCity =html
                }
              }
              // if (res.code == "SUCCESS" && res.info.length > 0 && index + 1 < 4) {

            },
            error:function(err){
              var str = err + '';
              if(str.search('timeout') !== -1){

              }else {
                that.isShowFloor = false;
                if(that.isShowBanner == false && that.isShowFloor == false){
                  that.isShowContent = false;
                }
              }
            }
          });
        }
      },
      redirects(url) {
        this.$router.push(url);
      },
      handleFileUpload(event){

        event.preventDefault();

        this.file = this.$refs.file.files[0].name;

      },
      /*初始*/
      initial(){
        var that=this;

          var postData = qs.stringify({
            id:that.isID,
          });
          // that.$axios.get(that.serverSrc+"app/mock/25/login",postData)
          that.$axios.post(that.serverSrc+"/u/desc",postData)
            .then(res=>{
            if(res.data.code =="SUCCESS"){
              console.log(res.data.body)
              if(JSON.stringify(res.data.body.user) !== "{}"){
                that.name =res.data.body.user.name
                if(res.data.body.user.sex =='WOMAN'){
                  that.checked=false;
                }else {
                  that.checked=true;
                }
                if(res.data.body.user.province != undefined&& res.data.body.user.city!=undefined&& res.data.body.user.area!=undefined){
                  that.isaddress=res.data.body.user.province+res.data.body.user.city+res.data.body.user.area;
                  that.province=res.data.body.user.province;
                  that.city=res.data.body.user.city;
                  that.area=res.data.body.user.area;
                }else {
                  that.isaddress =''
                }
                that.addressDetail =res.data.body.user.address;
                that.businessName =res.data.body.user.businessName;
                if(JSON.stringify(res.data.body.user.headerImg) !== "{}"){
                  that.imgUrl = res.data.body.user.headerImg.filePath
                }
              }
            }
            else {
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







        $('[type=file]').change(function(e) {
          var file = e.target.files[0]
          that.preview1(file,e)
          // that.addImg =true;
        });
      },
      preview1(file,e) {
        let _this = this;
        let _name = file.name;
        let _size = file.size;
        let fileType  = file.type;
        let imgType = "";
        var maxSize = 5000000;// 限制单张大小2.5M
        var minSize=100000;   //压缩临界 1M
        var  Orientation = null;
        var  newImageData  = '';
        if (file == undefined) return;
      },
      methods1:function(){
        var clipArea
        var that =this;
        $(".btnd").click(function(){
          if(!that.isdisabled){
            $(".clipbg").fadeIn()

          }

        })
        setTimeout(function () {
          clipArea = new PhotoClip("#clipArea", {
            size: [300, 300],//裁剪框大小
            outputSize:[0,0],//打开图片大小，[0,0]表示原图大小
            file: "#file",
            ok: "#clipBtn",
            loadStart: function() { //图片开始加载的回调函数。this 指向当前 PhotoClip 的实例对象，并将正在加载的 file 对象作为参数传入。（如果是使用非 file 的方式加载图片，则该参数为图片的 url）
              $(".loading").removeClass("displaynone");

            },
            loadComplete: function() {//图片加载完成的回调函数。this 指向当前 PhotoClip 的实例对象，并将图片的 <img> 对象作为参数传入。
              $(".loading").addClass("displaynone");

            },
            done: function(dataURL) { //裁剪完成的回调函数。this 指向当前 PhotoClip 的实例对象，会将裁剪出的图像数据DataURL作为参数传入。
              //console.log(dataURL);//dataURL裁剪后图片地址base64格式提交给后台处理
              var strLen = dataURL.length;
              var fileSize = strLen-(strLen/8)*2;

              if(fileSize/1024>2048){
                Toast("文件过大！")
              }else {
                that.imgUrl=dataURL;
                $('#headimg').css({
                  'background-image':'url('+dataURL+')'
                });
                $(".clipbg").fadeOut();
                that.addImg =true;
                clipArea.clear()
              }

            },
            loadError(e){
              // console.log(e)
            },
            fail(msg){
              // console.log(msg)
            }
          });
        },500)
        $(".backs").click(function(){
          $(".clipbg").fadeOut();
          if(that.imgUrl != tou){

            if(that.url==''){
              that.imgUrl=tou;
            }else {
              that.imgUrl=that.url;
            }
          }
          that.addImg =false
          clipArea.clear()
        })
      },

    },
    mounted(){
      window.scrollTo(0,0);
      if(localStorage.getItem('ID')){
        this.isID =localStorage.getItem('ID')
      }
      this.initial();
      this.methods1()
      this.get()
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
  .edit_box{
    min-height: 100vh;
  }


  /*动画的style*/
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
  .edit_conment{
    margin-top: j(88);
  }

  .edit_Tou{
    width: j(218);
    height: j(276);
    background: #EEF2F6;
    margin: j(168) auto 0;
  }
  .edit_Tu{
    width: j(218);
    height: j(218);
    margin: auto;
    /*background-image: url("../assets/me.png");*/
    background-size:100% 100% !important;
    background-repeat:no-repeat;
    background-position: center center;
    position: relative;
  }
  .edit_textT{
    width: j(218);
    height: j(44);
    line-height: j(44);
    text-align: center;
    background: #F47D48;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }
  .edit_textC{
    width: 100%;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    text-align: center;
    margin-top: j(32);
  }
  .edit_textB{
    width: 100%;
    font-size: j(24);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #BBBEC1;
    text-align: center;
    margin-top: j(4);
  }

  .edit_inps{
    width: j(702);
    margin: j(62) auto j(32);
  }
  .edit_inp{
    width: j(702);
    height: j(98);
    line-height: j(98);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    display: flex;
    align-items: center;
  }


  .edit_star{
    width: j(20);
    height: j(20);
    background: url(../assets/ls/xing.png) no-repeat;
    background-size: 100% 100%;
    margin-left: j(18);
    margin-right: j(16);
  }
  .edit_name{
    width: j(190);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
  }

  .edit_input input{
    width: j(400);
    font-size: j(28);
    background:none;
    outline:none;
    border:none;
  }
  .edtp{
    margin-top: j(24);
  }
  .edit_sex{
    width: j(134);
    height: j(52);
    line-height: j(52);
    margin-left: j(302);
  }
  .edit_iSsex{
    float: left;
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    margin-right: j(14);
  }
  .edit_swc{
    width:j(84);
    height: j(52);
    float: left;
  }
  .edit_inpTwoc{
    width: j(702);
    min-height: j(196);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    /*padding-bottom: j(20);*/
  }
  .edit_inpTwocs{
    width: j(702);
    min-height: j(98);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-top: j(24);
    /*padding-bottom: j(20);*/
  }
  .edit_goc img{
    width: j(32);
    height: j(32);
  }
  .edit_inpT{
    width: j(662);
    height: j(98);
    line-height: j(98);
    background: #FFFFFF;
    /*border-bottom: 2px solid #E8EEF3;*/
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  .edit_inpT input{
    width: j(350);
    font-size: j(28);
    background:none;
    outline:none;
    border:none;
  }
  .edit_inpTc{
    width: j(662);
    /*height: j(98);*/
    /*line-height: j(98);*/
    padding-top: j(30);
    padding-bottom: j(30);
    background: #FFFFFF;
    border-bottom: 2px solid #E8EEF3;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  .edit_inpTc input{
    width: j(300);
    font-size: j(28);
    background:none;
    outline:none;
    border:none;
  }
  .edit_inpTD{
    width: j(662);
    /*height: j(98);*/
    /*line-height: j(98);*/
    padding-top: j(30);
    padding-bottom: j(30);
    background: #FFFFFF;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
  .edit_inpTD input{
    width: j(300);
    font-size: j(28);
    background:none;
    outline:none;
    border:none;
  }
  .edit_starT{
    width: j(20);
    height: j(20);
    background: url(../assets/ls/xing.png) no-repeat;
    background-size: 100% 100%;
    margin-right: j(16);
  }
  .edit_inputT{
    width: j(400);
    font-size: j(28);
    background:none;
    outline:none;
    border:none;
  }
  .edit_go{
    margin-top: j(30);
  }
  .edit_goc{
    margin-top: j(10);
  }
  .edit_btn{
    width: j(702);
    height: j(88);
    line-height: j(88);
    text-align: center;
    margin: j(34) auto;
    background: #1C6DB1;
    border-radius: j(16);
    font-size: j(32);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
  }








  /*截图上传页面*/
  .clipbg{
    position: fixed;
    background: black;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    left: 0;
  }
  .loading{
    position: absolute;
    top: 40%;
    width: 38%;
    left: 31%;
    height: 1.6rem;
    line-height: 1.6rem;
    z-index: 99999;
    text-align: center;
    color: #ffffff;
    border-radius:0.2rem ;
    background: #9f9f9f;
  }
  .clipbg #clipArea{
    width: 100%;
    height: 70%;
    margin: auto;

  }
  .clipbg .footer{
    width: j(700);
    height: j(360);
    position: fixed;
    left: 50%;
    margin-left: j(-350);
    bottom: 0px;
    text-align: center;
  }
  .clipbg #dl{
    background: #ffffff;
    border-radius: j(20);
    overflow: hidden;
    margin-bottom: 0.6rem;
  }
  .clipbg .dd{
    position: relative;
    height: j(100);
    line-height:j(100);
    border-bottom:1px solid #999999 ;
  }
  .clipbg .backs{
    height: j(100);
    line-height:j(100);
    border-radius: j(20);
    margin-bottom: 0.4rem;
    background: #ffffff;
  }
  .clipbg .dd input{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 11;
    filter:alpha(opacity=0);
    -moz-opacity:0;
    -khtml-opacity: 0;
    opacity: 0;
  }
  .btnd{
    /*position: relative;*/
    /*z-index: 10;*/
    /*padding: 0.5rem;*/
    /*height: 1.6rem;*/
    /*line-height: 1.6rem;*/
    /*margin: auto;*/
    /*font-size: 0.8rem;*/
    /*color: #fd1142!important;*/
    /*border:1px solid  #fd1142;*/
    /*border-radius:0.2rem ;*/

    height: j(232);
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1111111111;
  }
  .van-switch--on{
    background: #1C6DB1 !important;
  }
  .van-switch{
    background: #cccccc;
  }
   #isAdd{
     display: inline-block;
     margin-left: j(16);
   }
  #isAdds{
    display: inline-block;
    margin-left: j(16);
  }

  /*地址*/
  .address_choose{
    width: 100%;
    height: 100%;
    background: #ffffff;
  }
  .address_zhi{
    width: j(702);
    height: j(88);
    line-height: j(88);
    border-bottom: 2px solid #D3D3D3;
    margin: 0 auto;
  }
  .address_choose img{
    width: j(42);
    height: j(42);
    vertical-align: middle;
  }
  .address_sz{
    font-size: j(32);
    color: #0E2725;
  }
  .address_ok{
    width:j(702);
    height:j(88);
    line-height: j(88);
    background:#1C6DB1;
    border-radius:j(8);
    color: #ffffff;
    font-size: j(36);
    text-align: center;
    margin: 0 auto;
  }
  .address_tishi{
    font-size: j(24);
    color: red;
    margin-left: j(18);
    margin-top: j(24);
    margin-bottom: j(22);
  }


  .cityTitle {
    position: relative;
    width: 100%;
    height: j(88);
    border-bottom: 1px solid #ccc;
  }
  .cityTitle p {
    text-align: center;
    color: #666;
    line-height: j(88);
    font-size: j(28);
    margin: 0;
  }
  .cityTitle .close {
    position: absolute;
    right: j(24);
    top: j(8);
    font-size: j(48);
    color: #d3d3d3;
    z-index: 999999;
  }
  #citySelect {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: j(950);
    background: #fff;
    z-index: 99999998;
    box-shadow: 0 -1px 3px 1px #ccc;
  }
  .cityInfo {
    position: relative;
    width: 100%;
    list-style: none;
    height: j(68);
    border-bottom: 1px solid #ccc;
  }
  .cityInfo li {
    float: left;
    width: 25%;
    height: j(68);
    text-align: center;
    line-height: j(68);
    font-size: j(28);
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .linec {
    position: absolute;
    top: j(156);
    left: 0;
    width: 25%;
    height: j(3);
    border-radius: j(1.5);
    transition: 0.5s ease;
    background: #1C6DB1;
  }
  /*.cityInfo li.active{*/
  /*border-bottom: 4px solid #C59A4E;*/
  /*}*/
  .address-content {
    position: relative;
    width: 400%;
    height: j(794);
    transition: 0.5s ease;
    left: 0;
    overflow: hidden;
  }
  .address-content .loading-address {
    position: fixed;
    top: 67%;
    left: j(250);
    width: j(250);
    height: j(60);
    background: rgba(0, 0, 0, 0.8);
    border-radius: j(10);
    z-index: 9999999999;
    display: none;
  }
  .address-content .loading-address img {
    float: left;
    width: j(50);
    height: j(50);
    padding: j(5) j(15);
  }
  .address-content .loading-address p {
    float: left;
    font-size: j(24);
    line-height: j(60);
    color: #fff;
  }
  .address-content ul {
    float: left;
    display: block;
    width: 25%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    padding-top: j(8);
    padding-bottom: j(88);
  }
  .address-content ul li {
    height: j(72);
    line-height: j(72);
    padding-left: j(24);
    width: 100%;
    box-sizing: border-box;
    font-size: j(26);
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
    /*cursor: pointer;*/
  }
  .address-content ul li.active {
    background-color: #1C6DB1;
    color: #fff;
  }
  .cityMasking {
    position: fixed;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99999997;
    width: 100%;
    display: none;
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
