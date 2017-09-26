
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
  location: null, // 经纬度坐标值
};

export default new Vuex.Store({
  state,
  mutations
})

