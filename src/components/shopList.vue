<template>
  <div class="shop-list">

    <!-- 商家列表 -->
    <section v-for="shop in shops" :key="shop.id" class="list-item">
      <router-link to="">
        <!-- 商标 -->
        <div class="shop-logo">
          <div class="logo-img">
            <img :src="imgURL(shop.image_path, '130x130')" alt="shop.name">
          </div>

        </div>

        <!-- 商家信息 -->
        <div class="shop-message">

          <!-- 商家基本信息 -->
          <section class="shop-base">

            <div class="base-first">
              <h3 class="shop-name">{{shop.name}}</h3>

              <!-- 保障 -->
              <div class="supports">
                <span v-for="sup in shop.supports" class="sup">{{sup.icon_name}}</span>
              </div>
            </div>
            <div class="base-second">
              <div class="shop-score">

                <rating-star :rating="shop.rating"></rating-star>

                <span>{{shop.rating}}</span>
                <span> 月售{{shop.recent_order_num}}单</span>

              </div>
              <!-- 蜂鸟专送-->
              <div class="bird" v-if="shop.delivery_mode">
                <span>蜂鸟专送</span>

              </div>
            </div>
            <div class="base-third">
              <!-- 配送价格 -->
              <div class="distribution-price">
                <span>¥{{shop.float_minimum_order_amount}}起送</span>
                <span>{{shop.piecewise_agent_fee.description}}</span>
              </div>

              <!-- 配送时间 -->
              <div class="distribution-time">

                <span>{{shopDistance(shop.distance)}} </span>

                <span>{{shop.order_lead_time}}分钟</span>

              </div>
            </div>

          </section>
          <!-- 商家基本信息 结束-->

          <!-- 优惠 -->
          <section class="shop-discount">

            <!-- 活动数量 -->
            <div class="activity-count" v-if="shop.activities.length > 2" @click="activityCount">

              <span>{{shop.activities.length}}个活动</span>
              <i class="fa fa-caret-down"></i>
            </div>

            <!-- 商家活动  -->
            <div class="activities">

              <activity style="color: #666" v-for="(active, index) in shop.activities" :key="active.id" :active="active" v-show="index < 2"></activity>

            </div>
            <!-- 商家活动 结束 -->

          </section>
          <!-- 优惠 结束-->

        </div>

      </router-link>
    </section>
    <!-- 商家列表 结束-->


    <!-- 加载动画 -->
    <div class="loader-wrapper">
      <i class="fa fa-spinner fa-spin"></i>
      <span>正在加载</span>
    </div>

  </div>


</template>


<script type="text/ecmascript-6">

  import {
    getShopList,
  } from '@/data/getData';

  import {
    mixinOfImgURL
  } from '@/config/until';

  import ratingStar from '@/components/ratingStar';
  import activity from '@/components/activity';



  export default {
    name: 'shopList',
    data() {
      return {
        shops:[], // 商铺列表
        offset: 0,
        isBottom: true, // 防止多次触底.
      }
    },

    /* 方式1: 使用父子组件传递数据. */
    props: ['locationProps'],

    components: {
      ratingStar,
      activity
    },


    watch: {
      // 监测状态中的location, 发生变化就重新获取数据
      locationProps(newValue) {
        console.log('shopList 监测');

        getShopList(this.locationProps.latitude, this.locationProps.longitude,0).then(respnse => {

          this.shops = respnse;
          console.log('shops');
        }).catch(error => {
          console.log(error);
        })

      }
    },

    mixins: [mixinOfImgURL],

    methods: {

      // 送餐距离的单位换算
      shopDistance(distance) {
        var str = distance + 'm';
        if (distance >= 1000) {
          str = (distance / 1000).toFixed(2) + 'km';
        }
        return str;
      },

//    活动数量点击方法
      activityCount: function(ev){

        ev = ev || window.event;

//      获取活动item
        var activities = ev.currentTarget.nextElementSibling.children;

        // 从第3个活动开始设置display
        for (var i = 2; i < activities.length; i++) {
          activities[i].style.display = (activities[i].style.display === 'none') ? 'block' : 'none';
        }

      },


      // 上拉加载更多页面
      loadMore(event) {
        console.log('loadMore');


        event = event || window.event;

        var body = document.body;

        if (body.scrollTop + body.offsetHeight >= body.scrollHeight) {

          console.log('到达底部');
          if (!this.isBottom) {
            console.log('l false');
            return
          }

          this.isBottom = false;

          console.log('l true');

          this.offset += 20;
          getShopList(this.locationProps.latitude, this.locationProps.longitude, this.offset).then(response => {
            console.log('this.offset', this.offset);

            this.shops = this.shops.concat(response);

            this.isBottom = true;
          });

        }


      }



    },

    created() {
      window.addEventListener('scroll', this.loadMore);
    },

    beforeDestroy() {
      window.removeEventListener('scroll', this.loadMore, false);
    }




  }

</script>

<style lang="scss">
  @import "../css/mixin";

  /* 商家列表 */
  .shop-list {
    background-color: #fff;
    margin-bottom: pxToRem(100px);



    /* 列表项 */
    .list-item {
      /*min-height: pxToRem(283px);*/
      a {
        display: block;
        @include flex-content(space-between, flex-start);
        /*<!--@include font-dpr(11px);-->*/
        font-size: pxToRem(22px);
        color: #666;
        /* 商家商标图片 */
        .shop-logo {
          @include property-of-rem(padding, 30px, 20px);

          &>div.logo-img {
            width: pxToRem(130px);
            height: pxToRem(130px);

            & img {
              width: 100%;
              height: 100%;
            }
          }
        }

        /* 商家信息 */
        .shop-message {
          width: pxToRem(580px);
          @include property-of-rem(padding, 30px, 20px, 30px, 0px);
          /* 可以让flex-item的宽度随着flex-container的宽度变化变化.*/
          flex-grow: 1;

          /* 商家基本信息 */
          .shop-base {
            border-bottom: 1px solid #aaa;
            margin-bottom: pxToRem(10px);

            .base-first, .base-second, .base-third {
              @include flex-content();
              margin-bottom: pxToRem(15px);
            }

            /* 第一行 */
            .base-first {

              /* 商家名称 */
              .shop-name {
                color: #333;
                /*<!--@include font-dpr(15px);-->*/
                font-size: pxToRem(30px);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                height: pxToRem(32px);
                max-width: pxToRem(375px);
              }

              .supports {
                span.sup {
                  color: #999;
                  /*<!--@include font-dpr(12px);-->*/
                  font-size: pxToRem(24px);
                  border: 1px solid rgb(221, 221, 221);
                  border-radius: pxToRem(4px);
                  color: rgb(153, 153, 153);
                  margin-left: pxToRem(5px);
                  display: inline-block;
                  width: pxToRem(32px);
                  height: pxToRem(32px);
                  text-align: center;

                }
              }

            }

            /* 第二行 */
            .base-second {

              .bird {
                color: #fff;
                /*<!--@include font-dpr(10px);-->*/
                font-size: pxToRem(20px);
                background-image: linear-gradient(45deg, #0085ff, #0af);
                border-radius: pxToRem(4px);
                border: 1px solid rgb(68, 165, 255);
                height: pxToRem(26px);
                @include property-of-rem(padding, 0px, 4px);


              }
            }

            /* 第三行 */
            .base-third {
              .distribution-price, .distribution-time {
                & span:first-child {
                  padding-right: pxToRem(5px);
                  border-right: 1px solid #aaa;
                  margin-right: pxToRem(10px);
                }
              }

              .distribution-time {
                color: #999;
              }




            }

          }

          /* 优惠 */
          .shop-discount {
            position: relative;

            /* 商家活动 */
            .activities {
              width: pxToRem(560px);

              .activitie-item {
                @include flex-content(flex-start);

                margin-top: pxToRem(5px);
                font-size: pxToRem(22px);

                .icon_name {
                  font-size: pxToRem(22px);
                  margin-right: pxToRem(12px);
                  border-radius: pxToRem(4px);
                  width: pxToRem(28px);
                  height: pxToRem(28px);
                  text-align: center;
                  color: #fff;
                }

                .active-tips {
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }

              }





            }

            /* 活动数量 */
            .activity-count {
              position: absolute;
              right: 0;
              color: #999;

            }


          }

        }

      }


    }


    /* 加载动画 */
    .loader-wrapper {
      color: #555;
      /*<!--@include font-dpr(13px);-->*/
      font-size: pxToRem(26px);
      text-align: center;
      min-height: pxToRem(80px);
      line-height: pxToRem(80px);
    }

  }

</style>