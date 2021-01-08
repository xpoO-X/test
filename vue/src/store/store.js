
import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions.js'
import mutations from './mutations.js'
import {HIDELOADING, SHOWLOADING} from "./type";

Vue.use(Vuex)
const state = {
  count:0,
}
export default new Vuex.Store({
  modules:{
    mutations
  },
  actions,
  state,
})
