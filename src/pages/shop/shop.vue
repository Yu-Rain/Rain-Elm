<template>

  <div id="shop" style="overflow:scroll;overflow-y:hidden">

    <!-- 头部 -->
    <div ref="header" class="header">

      <!-- 头部背景图片 -->
      <div class="header-background" :style="{backgroundImage: headerBackground}"></div>

      <!-- 导航, 返回按钮-->
      <nav class="header-navbar">
        <div @click="$router.go(-1)">
          <i class="fa fa-angle-left"></i>
        </div>

      </nav>

      <!-- 商家信息 -->
      <div class="header-message">
          <img :src="imgURL(message.image_path, '130x130')" alt="message.name" style="width: 130px; height: 130px">
          <div class="description">
            <h2>{{message.name}}</h2>
            <div class="delivery">
              <span v-if="message.delivery_mode">{{message.delivery_mode.text}}</span>
              <span v-else>商家配送</span>
              /
              <span>{{message.order_lead_time}}分钟送达</span>
              /
              <span>{{message.piecewise_agent_fee.tips}}</span>
            </div>
            <div class="notice">
              <span>公告: </span>
              <span>{{message.promotion_info}}</span>
            </div>

          </div>
        </div>

      <!-- 商家活动 -->
      <div class="header-activities" v-if="message.activities">
        <activity :active="message.activities[0]"></activity>

        <span class="activity-count" @click="modalMessage">{{message.activities.length}}个活动</span>

      </div>


    </div>
    <!-- 头部 结束 -->

    <!-- 覆盖层 -->
    <transition name="fade">

      <div class="modal-message" v-show="modalShow">

        <!-- 头部标题和星级 -->
        <div class="modal-header">
          <h2>{{message.name}}</h2>
          <rating-star class="star" :rating="message.rating"></rating-star>
        </div>
        <!-- 头部标题和星级 结束 -->

        <!-- 优惠信息 -->
        <h3 class="modal-subtitle">
          <span>优惠信息</span>
        </h3>

        <activity v-for="item in message.activities" :active="item" :key="item.id" class="active"></activity>

        <!-- 优惠信息 结束 -->

        <!-- 商家公告 -->
        <h3 class="modal-subtitle">
          <span>商家公告</span>
        </h3>

        <p>{{message.promotion_info}}</p>



        <!-- 商家公告 结束 -->


        <!-- 关闭按钮 -->

        <div class="modal-close" @click="modalClose">
          <i class="fa fa-close"></i>
        </div>

        <!-- 关闭按钮 结束 -->
      </div>
    </transition>
    <!-- 覆盖层 结束 -->


    <!-- 商品 评价 店铺-->
    <div ref="tab" class="tab">

      <div class="tab-item" @click="clickGoods" :class="{'tab-active': isGoods}">
        <span>商品</span>
      </div>
      <div class="tab-item" @click="clickEvaluate" :class="{'tab-active': isEvaluate}">
        <span>评价</span>
      </div>
      <div class="tab-item" @click="clickStore" :class="{'tab-active': isStore}">
        <span>店铺</span>
      </div>

    </div>
    <!-- 商品 评价 店铺 结束 -->

    <div class="shop-wrap">

      <!-- 商品页面 -->
      <div class="goods" v-show="isGoods">
        <h1>商家</h1>

      </div>
      <!-- 商品页面 结束-->



      <!-- 评价页面 -->
      <div class="evaluate" v-show="isEvaluate">
        <h1>评价</h1>

      </div>
      <!-- 评价页面 结束-->

      <!-- 店铺页面 -->
      <div class="store" v-show="isStore">
        <h1>店铺</h1>
      </div>
      <!-- 店铺页面 结束-->

    </div>



  </div>

</template>


<script type="text/ecmascript-6">
import {
  getShopMessage,
  getShopGoods,
} from '@/data/getData';

import {
  mixinOfImgURL
} from '@/config/until';

import {mapState} from 'vuex';


import activity from '@/components/activity';

import RatingStar from "../../components/ratingStar";

  export default {
    data() {
      return {
        shopWrapHeight: 0, // shop-wrap的高度
        message: {}, // 商家信息
        goods: [], // 商品信息
        modalShow: false, // 是否显示覆盖层
        isGoods: true,
        isEvaluate: false,
        isStore: false,

      };
    },

    computed: {
      ...mapState(['geohash', 'location']),

      // 计算 头部 模糊背景图片的路径
      headerBackground() {

        var url = 'url(' + this.getBlurImgPath(this.message.image_path, '40', '50x40') + ')';
        return url;
      },
    },

    components: {
      RatingStar, activity
    },


    methods: {

      // 头部点击活动数量的方法.
      modalMessage() {
        this.modalShow = true;
      },

      // 关闭活动页面
      modalClose() {
        this.modalShow = false;
      },

      clickEvaluate() {
        this.isEvaluate = true;
        this.isGoods = false;
        this.isStore = false;
      },

      clickGoods() {
        this.isEvaluate = false;
        this.isGoods = true;
        this.isStore = false;
      },

      clickStore() {
        this.isEvaluate = false;
        this.isGoods = false;
        this.isStore = true;
      },

    },

    mixins: [mixinOfImgURL],



    mounted() {

      // 获取商铺信息
      getShopMessage(this.$route.query.id, this.location.latitude, this.location.longitude).then((response)=>{
        this.message = response;
      }).catch((error)=>{
        console.log(error);
      });

      // 获取商品信息.
      getShopGoods(this.$route.query.id).then((response)=>{

        console.log('goods success');
        this.goods = response;

        this.goods.forEach((element) => {
          var countArray = new Array(element.foods.length);
          countArray.fill(0);
          this.foodCount.push(countArray);
        });

        // 获取到数据之后, 根据数据编译的HTML代码才会编译成功,存在DOM节点
        this.$nextTick(function () {
          // 在DOM加载完成后, 计算高度.
          this.computedHeights();

         this.shopWrapHeight = document.documentElement.offsetHeight - this.$refs.tab.offsetHeight + 'px';
        });

      }).catch((error)=> {

      });
    }

  }
</script>

<style lang="scss">

  @import "../../css/mixin";

  #shop {

    /* 过渡属性 */
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0
    }

    width: 100%;

    /* 头部 */
    .header {
      position: relative;

      /* 头部背景图片 */
      .header-background{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #3190e8;
        z-index: -10;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(119,103,137,.43);
        }

      }

      /* 头部导航栏 */
      nav.header-navbar {
        height: pxToRem(73px);
        @include property-of-rem('padding', 4px, 30px);

        font-size: pxToRem(64px);
        color: #fff;

      }

      /* 头部信息 */
      .header-message {
        width: 100%;
        @include flex-content(flex-start, center);
        @include property-of-rem('padding', 20px, 30px, 0px);

        img {
          width: pxToRem(130px);
          height: pxToRem(130px);
          border-radius: pxToRem(4px);
          border: 1px solid #fff;

        }

        .description {
          margin-left: pxToRem(24px);
          color: #fff;
          font-size: pxToRem(22px);
          width: pxToRem(540px);
          flex: 1;


          h2 {
            font-size: pxToRem(35px);
            font-weight: 700;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

          }

          .delivery {
            height: pxToRem(50px);
            line-height: pxToRem(50px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

          }

          .notice {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            height: pxToRem(40px);
            line-height: pxToRem(40px);

          }



        }





      }

      /* 头部商家活动 */
      .header-activities {
        @include flex-content();
        @include property-of-rem('padding', 12px, 30px);
        color: #fff;
        font-size: pxToRem(22px);

        .activity-count::after {
          content: "";
          margin-left: pxToRem(8px);
          display: inline-block;
          border-width: pxToRem(6px);
          border-style: solid;
          border-color: transparent transparent transparent #fff;

        }

      }

    }

    /* 覆盖层 */
    .modal-message {
      height: 100%;
      width: 100%;
      background-color: #262626;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1000;
      color: #fff;
      @include property-of-rem('padding', 80px, 60px, 180px);

      .modal-header {
        text-align: center;
        h2 {
          font-size: pxToRem(36px);
        }

        .star {
          margin-top: pxToRem(10px);

          text-align: left;
          font-size: pxToRem(40px) !important;
          width: pxToRem(197px);


        }
      }

      .modal-subtitle {
        text-align: center;
        @include property-of-rem('margin', 60px, 0px, 40px);
        span {
          @include property-of-rem('padding', 10px, 20px);

          border: 1px solid #888;
          border-radius: 50px;
          font-size: pxToRem(24px);

        }
      }

      .active {
        margin-bottom: pxToRem(14px);
      }



      .modal-close {
        position: fixed;
        bottom: pxToRem(50px);
        left: 0;
        right: 0;
        border: 1px solid #888;
        width: pxToRem(90px);
        height: pxToRem(90px);
        margin: 0 auto;
        text-align: center;
        border-radius: 50%;

        .fa.fa-close {
          color: #888;
          font-size: pxToRem(50px);
          line-height: pxToRem(90px);

        }

      }


    }

    /* 商品, 评价, 店铺*/
    .tab {
      display: flex;
      border-bottom: 1px solid #eee;
      background-color: #fff;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;

      .tab-item {
        flex: 1;
        text-align: center;
        color: #666;
        font-size: pxToRem(28px);
        line-height: pxToRem(80px);

      }
      .tab-active {

        span {
          color: #3190e8;
          position: relative;
          font-weight: 700;

          &::after {
            content: "";
            height: pxToRem(6px);
            background-color: #3190e8;
            position: absolute;
            bottom: pxToRem(-20px);
            left: 0px;
            right: 0px;

          }
        }
      }

    }



  }


</style>