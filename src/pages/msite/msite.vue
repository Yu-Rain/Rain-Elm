<template>
  <div id="msite">
    <div class="wrap">
      <!-- 头部 -->
      <header class="msite-header">

        <!-- 地址天气 -->
        <div class="header-top">

          <div class="location-name">
            <i class="fa fa-map-marker"></i>
            <span>{{addressName}}</span>
            <i class="fa fa-caret-down"></i>
          </div>

          <div class="weather">
            <div>
              <p>{{temperature}}度</p>
              <p>{{description}}</p>
            </div>
            <img :src="imgURL(weather.image_hash, '69x69')" alt="">
          </div>



        </div>
        <!-- 地址天气 结束-->

        <!-- 搜索 -->
        <div class="search">
          <router-link to="" class="link">
            <i class="fa fa-search"></i>
            <span>搜索商家, 商品名称</span>
          </router-link>
        </div>
        <!-- 搜索 结束-->

        <!-- 热门搜索词汇 -->
        <div class="hot">
          <div class="keyword">
            <router-link to="" v-for="(a, index) in hotSearchWords" :key="index">{{a.word}}</router-link>
          </div>

        </div>
        <!-- 热门搜索词汇 结束-->


      </header>
      <!-- 头部 结束 -->


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
    getImgPath
  } from '@/config/until'


  import rainFooter from '@/components/footer';

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


      }
    },
    components: {
      rainFooter
    },

    watch: {
      // 监测location属性, 发生变化就重新获取接口数据
      location(newValue, oldValue) {
        console.log('watch');
        this.initData();
        setStore('location', newValue);
      }
    },


    async mounted() {

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
          this.entries = response.entries;

        });

      },

      imgURL: getImgPath
    }








  }
</script>


<style lang="scss">
  @import "../../css/mixin";

  #msite {

    .wrap {
      /* msite页的头部 */
      .msite-header {
        background-image: linear-gradient(90deg, #0af, #0085ff);
        color: #fff;
        @include property-of-rem(padding, 20px, 28px);

        /* 地址, 天气 */
        .header-top {
          @include flex-content();
          @include property-of-rem(margin-bottom, 14px);

          /* 地址 */
          & > .location-name {
            @include flex-content(flex-start);

            /*<!--@include font-dpr(18px);-->*/
            font-size: pxToRem(36px);
            font-weight: 700;
            width: 60%;
            @include property-of-rem(height, 69px);
            /* 地址名称 */
            span {
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
          @include property-of-rem(margin-bottom, 14px);
          .link {
            width: 100%;
            @include property-of-rem(height, 72px);
            @include flex-content(center);
            /*<!--@include font-dpr(13px);-->*/
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

          .keyword {
            white-space: nowrap;
            overflow-x: auto;

            a {
              color: #fff;
              @include property-of-rem(margin-right, 30px);
            }
          }

        }

      }


    }


  }


</style>