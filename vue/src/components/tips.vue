<template>
    <div class="tips" @click="go" v-if="showTip">
      <div class="bgg fl"></div><span>{{counts}}</span>
    </div>
</template>
<script>
  import {store} from '../store/store';
  import global_ from './Global';
  var qs=require('qs');
  export default {
    props: {

    },
    data(){
      return{
        counts:'0',
        StoreId:'',
        serverSrc:global_.serverSrc,
        imgSrc:global_.imgSrc,
        userId:'',
        showTip:true
      }
    },
    methods:{
      Jump(){
        //方法二
        // if(JSON.parse(localStorage.getItem("tipNum")) == undefined){
        //   this.counts=this.$store.state.count;
        // }else {
        //   var num=JSON.parse(localStorage.getItem("tipNum"));
        //   this.counts=num;
        // }
        var that = this;
        var postDatas = qs.stringify({
          permissionKey:"PERMISSION_4a54f62a9c384415b09d568c3c71773a",
          storeId:that.StoreId
        });
        that.$axios.post(that.serverSrc+'commerce/verifyPermission',postDatas).then(res=>{
          if(res.data.code =="SUCCESS"){
            that.userId =res.data.info.id;
            let postData = qs.stringify({
              userId:that.userId,
              storeId:that.StoreId
            });
            this.$axios.post(that.serverSrc+'commerce/getMemberInfo'
              ,postData)
              .then(function (res) {
                if(res.data.code == 'SUCCESS'){
                  that.showTip=true
                  that.counts = res.data.info.integral;
                  localStorage.setItem('Count',res.data.info.integral)
                  // console.log(res.data.info.integral,555);
                }
              });

          }else {
            that.showTip=false;
            // that.$router.push('/login');
          }
        })

        // if(JSON.parse(localStorage.getItem("cartCount")) == undefined){
        //   this.counts=this.$store.state.mutations.cartCount;
        // }else {
        //   var num=JSON.parse(localStorage.getItem("tipNum"));
        //   this.counts=window.localStorage.getItem('cartCount');
        // }

        // this.counts=window.localStorage.getItem('cartCount');
        // this.counts=this.$store.state.mutations.cartCount;
        // console.log(this.$store.state.mutations.cartCount)
      },
      go(){
        this.$router.push('/integralDetail');
      }
    },
    mounted(){
      var url = window.location.href.split('?');
      if(url[0].indexOf('/#') != -1){
        var urlArr = url[0].split('/#');
      }else if(url[0].indexOf('#') != -1 && url[0].indexOf('/#') == -1){
        var urlArr = url[0].split('#')
      }
      var index = urlArr[0] .lastIndexOf("\/");
      var str  = urlArr[0] .substring(index + 1, urlArr[0] .length);
      this.StoreId =str;
      this.Jump()
      // this.counts=this.$store.state.count
      // console.log(this.$store.state.count)
    },
    // computed:{
    //   cartCount() {
    //     console.log('变！！！！！！！！！！')
    //     let localData = window.localStorage.getItem('cartCount')
    //     if(this.$store.state.cartCount===0&&localData){
    //       this.$store.commit('initCartCount',localData)//同步操作
    //     }
    //     return this.$store.state.cartCount
    //   }
    // }
  }
</script>
<style lang="scss">
  @function j($px, $base-font-size: 75px) {
    @if (unitless($px)) {
      @return j($px + 0px); // That may fail.
    } @else if (unit($px) == rem) {
      @return $px;
    }
    @return ($px / $base-font-size) * 1rem;
  }
  .tips{
    max-width: j(400);
    height: j(68);
    line-height: j(74);
    background: rgba(75,75,75,0.8);
    position: fixed;
    bottom: j(160);
    right: 0;
    color: #E81239;
    font-size: j(24);
    font-weight: bold;
    border-top-left-radius:j(50);
    border-bottom-left-radius:j(50)
  }
  .bgg{
    width: j(50);
    height: j(50);
    margin-left: j(20);
    margin-top: j(8);
    background: url("../assets/jizi.png") no-repeat;
    background-size: 100% 100%;
  }
  .tips span{
    margin-left: j(10);
    margin-right: j(20);
    margin-top: j(8);
  }
</style>
