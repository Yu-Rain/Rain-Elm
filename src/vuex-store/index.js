
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
  location: null, // 经纬度坐标值
  carList: {}, // 加入购物车的商品列表.
};

export default new Vuex.Store({
  state,
  mutations
})

