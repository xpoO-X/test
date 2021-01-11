<template>
  <transition :name="transitionName">
  <div id="Cartd">
    <div class="navBar">
      <div class="goback" @click="returns"></div>
      <div @click="returns">律师入驻</div>
      <div class="gH" @click="redirects('/Home')"><img src="../assets/ls/hA.png" alt=""></div>
    </div>
    <div class="carBox">
        <div class="car_titleT"></div>
        <div class="car_List">
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">律师名称</div>
            <input class="car_input" v-model="realName" type="text" placeholder="请输入律师名称">
          </div>
          <!--<div class="car_Li">-->
            <!--<img class="car_xing" src="../assets/ls/xing.png" alt="">-->
            <!--<div class="car_name">从业时间</div>-->
            <!--<input class="car_input" v-model="workTime" type="text" placeholder="请输入从业时间（年）">-->
          <!--</div>-->
          <div class="car_Li"  @click="showDate = true">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">从业时间</div>
            <div class="car_zheng">{{workTime}}</div>
            <img class="car_xuan" src="../assets/ls/xuanzhe.png" alt="">
          </div>
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">就职律所</div>
            <input class="car_input" v-model="businessName" type="text" placeholder="请输入就职律所">
          </div>
          <div class="car_Li">
            <img class="car_xing" src="../assets/ls/xing.png" alt="">
            <div class="car_name">执业证号</div>
            <input class="car_input" v-model="postNumber" type="text" placeholder="请输入职业证号">
          </div>
          <!--<div class="car_Li"  @click="showPicker = true">-->
            <!--<img class="car_xing" src="../assets/ls/xing.png" alt="">-->
            <!--<div class="car_name">城市区域</div>-->
            <!--<div class="car_zheng">{{value}}</div>-->
            <!--<img class="car_xuan" src="../assets/ls/xuanzhe.png" alt="">-->
          <!--</div>-->
          <div class="edit_inpTwocs">
          <div class="edit_inpTc"  id="chooseLocation" :areaCode=areaCode>
            <div class="edit_starT"></div>
            <div class="edit_name">城市区域</div>
            <div class="edit_inputT"><span id="isAdd" ref="isAdds">{{isaddress}}</span></div>
            <div class="edit_goc"><img src="../assets/ls/xuanzhe.png" alt=""></div>
          </div>
          </div>
        </div>
      <div>
        <div class="report_titleT">律师执照上传</div>
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
      <div class="report_btn" @click="report">
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

    <van-popup v-model="showDate" round position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="showDate = false"
        @confirm="confirmPicker"
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
        showDate:false,
        value: '',
        remark: '',
        guanbi: true,
        list: [],
        imgType: true,
        maxNum: 1,
        address: "",
        datas: [],
        citys: [],
        countys: [],
        towns: [],
        titles: [],
        addressDetail:'',
        areaCode: "",
        isID: "",
        realName: "",
        workTime: "",
        businessName: "",
        postNumber: "",
        isaddress: "",
        columCity: [],
        columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
        minDate: new Date(1990, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(),
        className: '',
        timeValue: '',
        transitionName: 'slide-left'//默认动画
      }
    },
    methods: {
      confirmPicker(val){
        let year = val.getFullYear()
        let month = val.getMonth() + 1
        let day = val.getDate()
        let hour = val.getHours()
        let minute = val.getMinutes()
        if (month >= 1 && month <= 9) { month = `0${month}` }
        if (day >= 1 && day <= 9) { day = `0${day}` }
        // if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
        // if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
        this.className = 'timeClass'
        this.timeValue = `${year}-${month}-${day}`
        this.showDate =false;
        this.workTime =this.timeValue;
        console.log(this.timeValue)
      },
      report(){
        var that=this;
        console.log(that.columCity)
        if(that.columCity.length>0){
          that.province =that.columCity[0]
          that.city =that.columCity[1]
          that.area =that.columCity[2]
        }
        var loadingAlert1 = Toast.loading({
          mask: true,
          message: '加载中...',
          duration:1000
        });
        var postDatae = qs.stringify({
          province:that.province,
          city:that.city,
          area:that.area,
          workTime:that.workTime,
          postNumber:that.postNumber,
          businessName:that.businessName,
          realName:that.realName,
          userId:that.isID,
        });
        that.$axios.post(that.serverSrc+"/u/bster/update",postDatae)
          .then(res=>{
          if(res.data.code =="SUCCESS"){
          setTimeout(()=>{
            loadingAlert1.clear();
          Toast({
            message:"修改成功！",
            duration:2000
          })
          setTimeout(function () {
            that.$router.push('/Me');
          },2000)
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
            that.realName =res.data.body.user.realName
            if(res.data.body.user.province != undefined&& res.data.body.user.city!=undefined&& res.data.body.user.area!=undefined){
              that.isaddress=res.data.body.user.province+res.data.body.user.city+res.data.body.user.area;
              that.province=res.data.body.user.province;
              that.city=res.data.body.user.city;
              that.area=res.data.body.user.area;
            }else {
              that.isaddress =''
            }
            that.addressDetail =res.data.body.user.address;
            if(JSON.stringify(res.data.body.user.barrister) !== "{}" && JSON.stringify(res.data.body.user.barrister) !== undefined){
              that.workTime = res.data.body.user.barrister.workTime
              this.currentDate = new Date(res.data.body.user.barrister.workTime)
              that.postNumber = res.data.body.user.barrister.postNumber
              if(JSON.stringify(res.data.body.user.barrister.voucharImg) !== "{}"){
                that.list = []
                that.list.push(res.data.body.user.barrister.voucharImg.filePath);
                if (that.list.length == that.maxNum) {
                  that.imgType = false;
                }else {
                  that.imgType = true;
                }
                console.log(res.data.body.user.barrister.voucharImg.filePath)
                console.log(that.list)
              }
            }


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
      this.get()
      this.init()
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
    width: j(300);
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
  .car_zheng{
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1F2226;
    margin-left: j(16);
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
  /*区域*/
  .edit_inpTwocs{
    width: j(702);
    min-height: j(98);
    background: #FFFFFF;
    box-shadow: 0 j(4) j(12) 0 rgba(28,109,177,0.1);
    border-radius: j(16);
    margin-top: j(24);
    /*padding-bottom: j(20);*/
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
  .edit_starT{
    width: j(20);
    height: j(20);
    background: url(../assets/ls/xing.png) no-repeat;
    background-size: 100% 100%;
    margin-right: j(16);
  }
  .edit_starT{
    width: j(20);
    height: j(20);
    background: url(../assets/ls/xing.png) no-repeat;
    background-size: 100% 100%;
    margin-right: j(16);
  }
  #isAdd{
    display: inline-block;
    margin-left: j(16);
  }
  .edit_goc img{
    width: j(32);
    height: j(32);
  }
  .edit_goc{
    margin-top: j(10);
  }
  .edit_inputT{
    width: j(400);
    font-size: j(28);
    background:none;
    outline:none;
    border:none;
  }
  .edit_name{
    width: j(190);
    font-size: j(28);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #53575A;
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
  .van-picker__title{
    font-size: j(26);
  }
</style>
