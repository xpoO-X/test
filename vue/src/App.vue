<template>
  <div id="main">
    <!--<router-view ></router-view>-->

    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
   <div class="Router">
     <!--<transition :name="transitionName">-->
       <router-view v-if="!$route.meta.keepAlive"></router-view>
       <!--<Loading v-show="showLoading"></Loading>-->

     <!--</transition>-->
   </div>
  </div>
</template>

<script>
  // import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    data() {
      return {
        url: '',
        // transitionName: 'slide-left'//默认动画
      };
    },
    // watch: {
    //   '$route'(to, from) {
    //     //页面切换动画
    //     console.log(to)
    //     let toName = to.name
    //
    //     const toIndex = to.meta.index
    //     const fromIndex = from.meta.index
    //
    //     this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
    //   }
    // },
  }
</script>

<style>
  .Router{
    position: relative;
  }
  .Router>*{
    position: absolute;
    width: 100%;
    min-height: 100vh;
    /*text-align: center;*/
  }
  /*!*app.vue  的style*!*/
  /*.slide-right-enter-active,*/
  /*.slide-right-leave-active,*/
  /*.slide-left-enter-active,*/
  /*.slide-left-leave-active {*/
    /*will-change: transform;*/
    /*transition: all 600ms;*/
    /*position: absolute;*/
  /*}*/

  /*.slide-right-enter {*/
    /*opacity: 0;*/
    /*transform: translate3d(-100%, 0, 0);*/
  /*}*/

  /*.slide-right-leave-active {*/
    /*opacity: 0;*/
    /*transform: translate3d(100%, 0, 0);*/
  /*}*/

  /*.slide-left-enter {*/
    /*opacity: 0;*/
    /*transform: translate3d(100%, 0, 0);*/
  /*}*/

  /*.slide-left-leave-active {*/
    /*opacity: 0;*/
    /*transform: translate3d(-100%, 0, 0);*/
  /*}*/
  #main{
    font-size: 0.28rem;
    height: 100%;
  }

  #main .listHeader .yd-tab-box {
    width: 100vw;
  }
  #main .yd-checklist-item-icon>input[type=checkbox] {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  #main .yd-checkbox>input[type=checkbox] {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  #main .yd-scrollview:after {
    content: "";
    display: block;
    width: 100%;
    height: 0;
  }
  #main .yd-accordion-head-arrow {
    overflow: hidden;
    height: 100%;
    min-height: 1rem;
    display: none;
  }
  .login .yd-checkbox{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  #message .yd-cell-left{
    width: 80%;
  }
  .content .yd-cell-left{
    width: 80%;
  }
  .addItem .yd-textarea>textarea{
    height: 2.5rem;
  }
</style>
