import { SHOWLOADING,HIDELOADING } from './type.js'

const state = {
  showLoading:false,
  arrList:[],
  cartCount:0
}

const mutations = {
  [SHOWLOADING](state){
    state.showLoading = true;
  },
  [HIDELOADING](state){
    state.showLoading = false;
  },
  initCartCount(state, cartCount) {
    state.cartCount = cartCount
    window.localStorage.setItem('cartCount', state.cartCount);
    console.log(state.cartCount,222)
  },
}

const getters = {
  showLoading(state){
    return state.showLoading
  }
}

export default {
  state,mutations,getters
}
