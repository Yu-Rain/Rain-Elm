/**
 * Created by rain on 2017/9/5.
 */

import Vue from 'vue';
import router from './router';
import './config/rem.js'; // 引入rem布局.

Vue.config.productionTip = false;


new Vue({
  el:'#elm',
  router,

});
