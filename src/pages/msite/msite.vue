<template>
  <div id="msite">
    <div class="wrap">
      <!-- 头部 -->
      <!--<header class="msite-header">-->

        <!-- 地址天气 -->
        <div class="header-top msite-header">

          <div class="location-name">
            <i class="fa fa-map-marker"></i>
            <span>{{addressName}}</span>
            <i class="fa fa-caret-down"></i>
          </div>

          <div class="weather" v-if="weather">
            <div>
              <p>{{temperature}}度</p>
              <p>{{description}}</p>
            </div>
            <img :src="imgURL(weather.image_hash, '69x69')" alt="">
          </div>



        </div>
        <!-- 地址天气 结束-->

        <!-- 搜索 -->
        <div class="search msite-header">
          <router-link to="" class="link">
            <i class="fa fa-search"></i>
            <span>搜索商家, 商品名称</span>
          </router-link>
        </div>
        <!-- 搜索 结束-->

        <!-- 热门搜索词汇 -->
        <div class="hot msite-header">
          <div class="keyword">
            <router-link to="" v-for="(a, index) in hotSearchWords" :key="index">{{a.word}}</router-link>
          </div>

        </div>
        <!-- 热门搜索词汇 结束-->


      <!--</header>-->
      <!-- 头部 结束 -->

      <!-- 分类 -->
      <div class="entries" v-show="entries">

        <div class="entry-wrap" @touchstart="start" @touchmove="move" @touchend="endOrCancel"  v-if="entries.length">


          <!-- 分类第一页 -->
          <div class="entries-page" :class="{active: isActive}" >
            <router-link to="" v-for="(n, index) in 8" :key="index">

              <img :src="imgURL(entries[index].image_hash, '90x90')" alt="">
              <p>{{entries[index].name}}</p>

            </router-link>
          </div>

          <!-- 分类第2页 -->
          <div class="entries-page" :class="{active: !isActive}">

            <router-link to="" v-for="(n, index) in (entries.length - 8)" :key="index">

              <img :src="imgURL(entries[index + 8].image_hash, '90x90')" alt="">
              <p>{{entries[index + 8].name}}</p>
            </router-link>


          </div>

        </div>

        <div class="dots">

          <div class="dot" :class="{active: isActive}"></div>
          <div class="dot" :class="{active: !isActive}"></div>

        </div>


      </div>
      <!-- 分类结束 -->



      <!-- 推荐商家 标题-->
      <h3 class="list-title">推荐商家</h3>

      <!-- 商家列表 组件-->
      <shop-list :locationProps="location"></shop-list>
      <!-- 商家列表 组件结束-->

    </div>

    <rain-footer></rain-footer>

  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getPosition,
    getAddress,
    getWeather,
    getHotSearchWords,
    getEntries,
    getShopList,
  } from '@/data/getData';

  import {
    setStore,
    getStore
  } from '@/config/localStore';

  import {
    mixinOfImgURL,
  } from '@/config/until'


  import rainFooter from '@/components/footer';

  import shopList from '@/components/shopList';

  export default {
    name: 'msite',
    data() {
      return {
        location: null, // 存储获取到的定位坐标
        address: null, //当前地址
        weather: null, // 当前天气
        temperature: '', // 天气气温
        description: '', // 天气描述
        hotSearchWords: [], // 热门搜索词汇
        entries: [], //首页分类
        addressName: '获取地址中...',// 地址名称
        preClientX: 0, // 记录手指触摸开始时的坐标.
        touchPage: null, // 记录手指触摸的元素
        touchPageSibling: null, //记录手指触摸的兄弟元素.
        touchPageX: 0, // 记录手指触摸到元素的X.
        touchPageSiblingX: 0, // 记录触摸元素兄弟元素的X.
        isActive: true, // 判断是否添加active类.

      }
    },
    components: {
      rainFooter,
      shopList
    },

    watch: {
      // 监测location属性, 发生变化就重新获取接口数据
      location(newValue, oldValue) {
        console.log('msite watch');
        this.initData();
        setStore('location', newValue);
      }
    },

    mixins: [mixinOfImgURL],

    async mounted() {
      console.log('msite mounted');
      try {

        let position = await getPosition();

        this.location = {
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        };

      }catch (error) {
        console.log('获取定位坐标失败');

        console.log(error);
        // 从本地存储获取坐标
        this.location = getStore('location');
        console.log(this.location);
      }


    },

    methods: {

      initData() {
        console.log('initData');

        // 获取地址信息
        getAddress(this.location.latitude, this.location.longitude).then(response => {
          this.address = response;
          this.addressName = response.name;
        }).catch(error => {
          console.log('没有获取到地址');
          this.addressName = '地址出错';
          console.log(error);
        });


        // 获取天气信息
        getWeather(this.location.latitude, this.location.longitude).then(response => {
          this.weather = response;
          this.temperature = response.temperature;
          this.description = response.description;


        }).catch(reject => {
            console.log(reject);
          });



        // 获取热门搜索词汇
        getHotSearchWords(this.location.latitude, this.location.longitude).then(response => {
          this.hotSearchWords = response;
        });

        // 获取首页分类
        getEntries(this.location.latitude, this.location.longitude).then(response => {
          this.entries = response[0].entries;

        });

      },
//      imgURL: getImgPath,

      // 分类的触摸事件
      start: function(event) {

        event = event || window.event;

        // 获取当前页面的元素.
        this.touchPage = document.querySelector('.entries-page.active');

        // 获取当前页面元素的兄弟元素
        this.touchPageSibling = touchPage.nextElementSibling || touchPage.previousElementSibling;


        this.touchPageSibling.style.display = 'block';
        // 记录手指触摸的X轴坐标值
        this.preClientX = event.changedTouches[0].clientX;

      },

      move: function(event){
        event = event || window.event;

        // 计算手指移动距离
        var currentx = event.changedTouches[0].clientX;
        var movex = this.preClientX - currentx;

        // 计算兄弟元素的translatex的距离
        var siblingx = 0;
        if (movex < 0) { // 代表向右滑动, mx为负, tpx为正, 等于-mx, tpsx为负, 等于750-Math.abs(mx)之后取负值.
          siblingx = -document.documentElement.clientWidth - movex;

        } else { // 代表向左滑动, mx为正, tpx为负, 等于-mx, tpsx为正, 等于750-mx
          siblingx = document.documentElement.clientWidth - movex;
        }

        // 记录元素平移的坐标
        this.touchPageX = -movex;
        this.touchPageSiblingX = siblingx;

        // 更改元素的transform
        this.touchPage.style.transform = 'translate3d(' + this.touchPageX + 'px, 0, 0)';
        this.touchPageSibling.style.transform = 'translate3d(' + this.touchPageSiblingX + 'px, 0, 0)';


      },

      endOrCancel: async function () {

        // 元素样式字符串.
        var touchPageStyle = '';
        var touchPageSiblingStyle = '';

        // 设置过渡时间
        this.touchPage.setAttribute('style', 'transition: transform 300ms ease-in-out;');
        this.touchPageSibling.setAttribute('style', 'display: block;transition: transform 300ms ease-in-out;');


        // 比较两个页面移动的距离, 显示绝对值小的页面.
        if (Math.abs(this.touchPageX) < Math.abs(this.touchPageSiblingX)) {

          touchPageStyle = this.touchPage.getAttribute('style') + ';transform: translate3d(0px, 0px, 0px);';

          var x = document.documentElement.clientWidth;
          if (this.touchPageX > 0) { // 向右滑
            x = -document.documentElement.clientWidth;
          }

          touchPageSiblingStyle = this.touchPageSibling.getAttribute('style') + ';transform: translate3d('+x+'px, 0px, 0px);';

        } else {
          var x = -document.documentElement.clientWidth;

          if (this.touchPageX > 0) { // 向右滑
            x = document.documentElement.clientWidth;
          }

          touchPageStyle = this.touchPage.getAttribute('style') + 'transform: translate3d('+x+'px, 0px, 0px);';
          touchPageSiblingStyle = this.touchPageSibling.getAttribute('style') + ';transform: translate3d(0px, 0px, 0px);';

        }


        var timer01Promise = new Promise((resolve, reject) => {

          // 5毫秒后再设置transform, 否则没有过渡
          var timer01Id = setTimeout(()=> {

            this.touchPage.setAttribute('style', touchPageStyle);
            this.touchPageSibling.setAttribute('style', touchPageSiblingStyle);
            console.log('timer01Id', timer01Id);
            resolve(timer01Id);
          }, 5);
        });

        var timer02Promise = new Promise((resolve, reject) => {

          // 300毫秒后再清除所有的内联样式
          var timer02Id = setTimeout(()=>{
            this.touchPage.setAttribute('style', '');
            this.touchPageSibling.setAttribute('style', '');

            if(Math.abs(this.touchPageX) > Math.abs(this.touchPageSiblingX)) {
              this.isActive = !this.isActive;
            }
            console.log('timer02Id', timer02Id);

            resolve(timer02Id);

          }, 300);


        });

        // 执行定时器, 清除定时器.
        try {
          const timer01Id = await timer01Promise;
          clearTimeout(timer01Id);

          const timer02Id = await timer02Promise;
          clearTimeout(timer02Id);

        } catch(error) {
          console.log('timer error', error);
        }

      }

    }
  }
</script>


<style lang="scss">
  @import "../../css/mixin";

  #msite {

    .wrap {
      /* msite页的头部 */

      /* msite页的头部 */
      .msite-header {
        background-image: linear-gradient(90deg, #0af, #0085ff);
        color: #fff;
        @include property-of-rem(padding, 20px, 28px);
      }

      /* 地址, 天气 */
      .header-top {
        @include flex-content();
        padding-bottom: 0px;
        /* 地址 */
        & > .location-name {
          @include flex-content(flex-start);

          /*<!--@include font-dpr(18px);-->*/
          font-size: pxToRem(36px);
          font-weight: 700;
          width: 60%;
          @include property-of-rem(height, 69px);
          /* 地址名称 */
          & span {
            margin: pxToRem(0px, 10px);
            max-width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            vertical-align: bottom;
          }

        }

        /* 天气 */
        & .weather {
          @include flex-content();
          /*<!--@include font-dpr(12px);-->*/
          font-size: pxToRem(24px);
          text-align: right;
          img {
            @include property-of-rem(width, 55px);
            @include property-of-rem(height, 55px);
            @include property-of-rem(margin-left, 8px);
          }
        }
      }

      /* 搜索 */
      .search {
        margin-top: -1px;
        position: sticky;
        top: 0;
        z-index: 1000;
        .link {
          width: 100%;
          @include property-of-rem(height, 72px);
          @include flex-content(center);
          font-size: pxToRem(26px);
          background-color: #fff;
          color: rgb(102, 102, 102);
          span {
            @include property-of-rem(margin-left, 10px);
          }
        }
      }

      /* 热门搜索词汇 */
      .hot {
        padding-bottom: pxToRem(10px);
        font-size: pxToRem(24px);
        padding-top: 0px;

        .keyword {
          white-space: nowrap;
          overflow-x: auto;

          a {
            color: #fff;
            @include property-of-rem(margin-right, 30px);
          }
        }

      }

      /* 分类 */
      .entries {
        background-color: #fff;
        position: relative;
        height: pxToRem(354px);

        .entry-wrap {
          position: relative;
          overflow: hidden;
          height: 100%;

          .entries-page {
            /* 使用绝对定位的方式, 让元素脱离文本流, 这样在手指拖动元素时, 才不会将整体页面一起拖动.*/
            position: absolute;
            width: 100%;
            height: 100%;
            display: none;
            /* TODO: transform渲染效率比定位高??? */
            transform: translateX(-100%);
            /*top: 0;*/
            /*left: 0;*/
            &.active {
              display: block;
              transform: none;
            }

            &::after {
              content: '';
              display: table;
              clear: both;
            }

            a {
              display: block;
              float: left;
              width: 25%;
              text-align: center;
              margin-top: pxToRem(22px);
              font-size: pxToRem(24px);
              img {
                width: pxToRem(90px);
                height: pxToRem(90px);
              }
            }

          }
        }

        .dots {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);

          .dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background-color: #ccc;
            &.active {
              background-color: #555;
            }
          }

        }

      }

      /* 推荐商家 */
      h3.list-title {
        margin-top: pxToRem(20px);
        font-weight: 600;
        /*<!--@include font-dpr(16px);-->*/
        font-size: pxToRem(32px);

        @include property-of-rem(padding, 32px, 20px, 0px);
        background-color: #fff;

      }



    }


  }


</style>