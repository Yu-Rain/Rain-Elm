<template>
  <div id="msite">
    <div class="wrap">
      <h3>这是外卖页面</h3>

      <h4>{{addressName}}</h4>


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

  import rainFooter from '@/components/footer';

  export default {
    name: 'msite',
    data() {
      return {
        location: null, // 存储获取到的定位坐标
        address: null, //当前地址
        weather: null, // 当前天气
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
      }


    },

    methods: {
      initData() {

        // 获取地址信息
        getAddress(this.location.latitude, this.location.longitude).then(response => {
          this.address = response;
          this.addressName = response.name;
        }).catch(error => {
          console.log('没有获取到地址');
          console.log(error);
        });


        // 获取天气信息
        getWeather(this.location.latitude, this.location.longitude).then(response => {
          this.weather = response;


        }).catch(reject => {
            console.log(reject);
          }
        );



        // 获取热门搜索词汇
        getHotSearchWords(this.location.latitude, this.location.longitude).then(response => {
          this.hotSearchWords = response;
        });

        // 获取首页分类
        getEntries(this.location.latitude, this.location.longitude).then(response => {
          this.entries = response[0].entries;

        });

      },
    }








  }
</script>



<style>

</style>