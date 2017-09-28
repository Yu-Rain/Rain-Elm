<template>

  <div id="shop">

    <!-- 头部 -->
    <div ref="header" class="header">

      <!-- 头部背景图片 -->
      <div class="header-background" :style="{backgroundImage: headerBackground}" v-if="message.image_path"></div>

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
              <span v-if="message.piecewise_agent_fee">{{message.piecewise_agent_fee.tips}}</span>
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

    <div class="shop-wrap" :style="{height: shopWrapHeight}">

      <!-- 商品页面 -->
      <div class="goods" v-show="isGoods">
        <!-- 侧边栏 -->
        <aside class="goods-category" ref="aside">
          <ul ref="category">
            <li ref="categoryLi" class="category" v-for="(item, index) in goods" :key="item.id" :class="{'category-active': (index === currentIndex)}" @click="clickCategory(index)">

              <img :src="imgURL(item.icon_url, '18x18')" alt="icon" v-if="item.icon_url">
              <span>{{item.name}}</span>
              <span class="count" v-show="categoryCount[index]">{{categoryCount[index]}}</span>
            </li>
          </ul>
          <!---->
        </aside>

        <!-- 商品详细信息 -->
        <section class="goods-menu" v-if="goods">

          <div ref="menuScroller" class="menu-scroller" @scroll="menuScroll">

            <!-- 商品 -->
            <dl class="dls" ref="foodHook" v-for="(menu, menuIndex) in goods">

              <!-- 商品分类名称 -->
              <dt>
                <span class="category-name">{{menu.name}}</span>
                <span class="category-description" v-if="menu.description">{{menu.description}}</span>

              </dt>

              <!-- 商品具体 信息 -->
              <dd v-for="(food, foodIndex) in menu.foods" :key="foodIndex">
                <div class="food-details">
                  <!-- 商品图片 -->
                  <span class="food-img">
                    <img :src="imgURL(food.image_path, '140x140')" alt="">
                  </span>


                  <div class="food-message">

                    <!-- 商品名称 -->
                    <h3 class="food-name" v-if="food.name">
                      {{food.name}}
                    </h3>

                    <!-- 商品描述 -->
                    <p v-if="food.description" class="food-description">
                      {{food.description}}
                    </p>

                    <!-- 月售, 好评 -->
                    <p class="food-sales">
                      <span>月售{{food.month_sales}}</span>
                      <span>好评率{{food.satisfy_rate}}%</span>
                    </p>

                    <!-- 促销活动 -->
                    <p class="food-activity" v-if="food.activity">
                      <span class="benefit-text">{{food.activity.benefit_text}}</span>
                      <span class="quantity-text">{{food.activity.applicable_quantity_text}}</span>
                    </p>


                    <p class="food-price">
                      <span class="icon">¥</span>
                      <span class="price">{{food.specfoods[0].price}}</span>
                      <span class="start" v-if="food.specifications.length">起</span>
                    </p>

                    <!-- 购买选择 -->
                    <div class="buy">

                      <!-- 减号 -->
                      <div class="minus" v-show="foodCount[menuIndex][foodIndex]" @click="clickMinus(menuIndex, foodIndex)">

                        <i class="fa fa-minus"></i>

                      </div>

                      <!-- 数量 -->
                      <div class="countNumber" v-show="foodCount[menuIndex][foodIndex]">
                        <span>{{foodCount[menuIndex][foodIndex]}}</span>
                      </div>
                      <!-- 选规格 -->
                      <div class="select" v-if="food.specifications.length">
                        <span>选规格</span>
                      </div>
                      <!-- 加号 -->
                      <div class="plus" @click="clickPlus(menuIndex, foodIndex, $event)" v-else><i class="fa fa-plus-circle"></i></div>

                    </div>

                  </div>
                </div>

              </dd>
            </dl>
          </div>




        </section>
        <!-- 商品详细信息 结束-->

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
        listsHeight: [], // 存储每个分类的高度
        scrollLength: 0, // 滚动过的距离

        foodCount: [], // 购买数量数组, 里面元素为分类数组, 分类数组中存储各个食物对应的数量


      };
    },

    computed: {
      ...mapState(['location']),

      categoryCount() {
        var arr = [];
        for (let i = 0; i < this.foodCount.length; i++) {
          var count = 0;
          var foods = this.foodCount[i];
          for (let j =0; j < foods.length; j++) {
            count += foods[j];
          }
          arr.push(count);
        }
        return arr;
      },

      // 计算 头部 模糊背景图片的路径
      headerBackground() {

        var url = 'url(' + this.getBlurImgPath(this.message.image_path, '40', '50x40') + ')';
        return url;
      },

      // 计算当前滚动位置对应元素的下标值.
      currentIndex(){

        for (let i = 0; i < this.listsHeight.length; i++) {
          if (this.scrollLength < this.listsHeight[i]) {
            return i;
          }
        }
      }

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

      clickCategory(index) {

        let top = index ? this.listsHeight[index-1] : 0;

        this.$refs.menuScroller.scrollTop = top;


      },

      // 点击加号
      clickPlus(menuIndex, foodIndex, event) {
        console.log('加号');

        // 计算数量
        var arr = this.foodCount[menuIndex];
        arr[foodIndex] += 1;
        // 只有这么写才可以触发数组的响应式
        this.$set(this.foodCount, menuIndex, arr);

        this.isSelectContent = false;


      },
      // 点击减号
      clickMinus(menuIndex, foodIndex) {
        console.log('减号');
        var arr = this.foodCount[menuIndex];
        arr[foodIndex] -= 1;
        this.$set(this.foodCount, menuIndex, arr);
      },

      // 商品列表滚动的方法
      menuScroll() {


        // 获取右侧菜单列表滚动元素.
        var menu = this.$refs.menuScroller;

        var shop = document.getElementById('shop');

        // 获取右侧菜单列表滚动元素 滚动的值.
        var scrollLength = menu.scrollTop;

        // 让头部和menu一起滚动.
        if (scrollLength <= this.$refs.header.offsetHeight) {
          shop.scrollTop = scrollLength;
        } else {
          shop.scrollTop = this.$refs.header.offsetHeight;
        }

        // 右侧和侧边栏联动
        this.scrollLength = menu.scrollTop;

        // 当侧边栏需要滚动的时候,
        if (this.currentIndex >= 5) {
          this.$refs.aside.scrollTop = (this.currentIndex - 5) * this.$refs.categoryLi[0].offsetHeight;

        }

      },

      // 计算各区间高度
      computedHeights() {


        var menu = this.$refs.menuScroller;
        // 获取右侧菜单列表子元素.
//        console.log('mle', menu); // 此时menu还没有子元素.
        var menuListElement = menu.children;

        var height = menuListElement[0].offsetHeight;
        this.listsHeight.push(height);
        console.log('0', this.listsHeight[0]);

        for (let i = 1; i < menuListElement.length; i++) {
          height += menuListElement[i].offsetHeight;
          this.listsHeight.push(height);
          console.log(i, this.listsHeight[i]);
        }


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
        response.forEach((element) => {
          console.log('foodCount');
          var countArray = new Array(element.foods.length);
          countArray.fill(0);
          console.log(countArray);
          this.foodCount.push(countArray);
        });

        this.goods = response;

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
    height: 100vh;
    overflow-y: auto;

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


    .shop-wrap {
      padding-bottom: pxToRem(96px);
      overflow-y: auto;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 99;

      /* 商品页面 */
      .goods {
        height: 100%;
        display: flex;
        overflow-y: auto;

        /* 商品分类侧边栏 */
        .goods-category {
          overflow-y: auto;
          position: sticky;
          height: 100%;
          top: pxToRem(80px);
          left: 0;
          z-index: 10;
          overflow-x: hidden;
          ul {
            list-style-type: none;
            width: pxToRem(170px);
            li.category {
              border-bottom: 1px solid #ededed;
              position: relative;
              @include property-of-rem('padding', 35px, 15px);
              font-size: pxToRem(26px);
              color: #666;

              img {
                width: pxToRem(18px);
                height: pxToRem(25px);
              }

              .count {
                position: absolute;
                top: 6px;
                right: 6px;
                font-size: pxToRem(20px);
                color: #fff;
                background-color: #ff461d;
                padding-left: pxToRem(8px);
                padding-right: pxToRem(8px);
                border-radius: 50%;
                line-height: 28px;



              }

            }

            li.category-active {
              background-color: #fff;
              position: relative;

              &::after {
                content: "";
                width: pxToRem(6px);
                background-color: #3190e8;
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
              }


            }


          }


        }

        /* 商品详细信息 */
        .goods-menu {

          height: 100%;
          flex: 1;
          width: pxToRem(580px);

          /* 右侧详细菜单 */
          .menu-scroller {

            overflow-x: hidden;
            background-color: #fff;
            height: 100%;
            overflow-y: auto;

            /* 菜单分类列表 */
            dl {

              /* 菜单分类名称 */
              dt {
                /*position: sticky;*/
                /*top: 0;*/
                /*left: 0;*/
                background-color: #f1f1f1;
                @include property-of-rem('padding', 15px, 60px, 15px, 20px);

                .category-name {
                  font-size: pxToRem(28px);
                  font-weight: bold;
                  color: #666;
                  margin-right: pxToRem(10px);
                }

                .category-description {
                  font-size: pxToRem(20px);
                  color: #999;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }


              }

              /* 菜品信息 */
              dd {

                .food-details {
                  width: 100%;
                  @include property-of-rem('padding', 30px, 20px);
                  @include flex-content('flex-start', 'flex-start');

                  /* 图片 */
                  .food-img {
                    width: pxToRem(162px);
                    height: pxToRem(162px);

                    img {
                      border-radius: pxToRem(4px);
                      width: 100%;
                    }

                  }

                  /* 食物详细信息 */
                  .food-message {
                    flex: 1;
                    margin-left: pxToRem(20px);
                    position: relative;
                    text-align: left;

                    /* 食物名称 */
                    h3.food-name {
                      font-size: pxToRem(30px);
                      font-weight: bold;
                    }

                    /* 食物描述 */
                    .food-description {
                      color: #999;
                      font-size: pxToRem(19px);
                      @include property-of-rem('margin', 10px, 0px);
                    }
                    /* 食物 月售, 好评*/
                    .food-sales {
                      font-size: pxToRem(22px);
                      color: #666;
                      @include property-of-rem('margin', 13px, 0px);
                    }

                    /* 促销活动 */
                    .food-activity {

                      transform: scale(.8);

                      /* transform-origin CSS属性让你更改一个元素变形的原点 */
                      transform-origin: left;
                      color: #f07373;
                      font-size: pxToRem(22px);
                      .benefit-text {
                        display: inline-block;
                        height: pxToRem(26px);
                        color: #fff;
                        background-color: #ff3c15;
                        font-size: pxToRem(20px);
                        border: 1px solid #ff3c15;
                        /*vertical-align: top;*/

                        @include property-of-rem(padding, 0px, 6px);

                      }

                      .quantity-text {
                        display: inline-block;
                        height: pxToRem(26px);
                        vertical-align: top;
                        border: 1px solid #ff3c15;
                        margin-left: -4px;
                        @include property-of-rem(padding, 0px, 6px);
                      }

                    }

                    /* 食物价格*/
                    .food-price {
                      color: #f60;
                      font-size: 24px;

                      .price {
                        color: #f60;
                        font-size: pxToRem(32px);
                        font-weight: 700;
                        margin-right: pxToRem(4px);
                      }

                    }

                    /* 购买选择 */
                    .buy {
                      @include flex-content();
                      position: absolute;
                      right: 0;
                      bottom: pxToRem(-5px);
                      font-size: pxToRem(24px);

                      /* 减号 */
                      .minus {
                        color: #3199e8;
                        font-size: pxToRem(30px);
                        width: pxToRem(38px);
                        height: pxToRem(38px);
                        border-radius: 50%;
                        border: 2px solid #3199e8;
                        text-align: center;
                        line-height: 38px;

                      }

                      /* 数量 */
                      .countNumber {

                        font-size: pxToRem(28px);
                        @include property-of-rem('margin', 0px, 20px);

                      }

                      /* 选规格 */
                      .select {
                        background-color: #3199e8;
                        @include property-of-rem('padding', 11px, 15px);
                        /*padding: pxToRem(7px);*/
                        border-radius: pxToRem(26px);
                        color: #fff;
                      }
                      /* 加号 */
                      .plus {
                        color: #3199e8;
                        font-size: pxToRem(44px);
                      }






                    }


                  }

                }
              }
            }
          }
        }


      }
    }



  }


</style>