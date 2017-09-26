import fetch from '@/config/fetch';


// 获取定位
export const getPosition = function () {

  return  navigator.geolocation ? new Promise(function (resolve, reject) {

    navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 10000,maximumAge:1e4});

  }) : Promise.reject('浏览器不支持地理定位');

};


// 获取地址数据
export const getAddress = (latitude, longitude) => fetch('/bgs/poi/reverse_geo_coding', {latitude, longitude});


// 获取天气数据
export const getWeather = (latitude, longitude) => fetch('/bgs/weather/current', {latitude, longitude});

// 热门搜索词汇
export const getHotSearchWords = (latitude, longitude) => fetch('/shopping/v3/hot_search_words', {latitude, longitude});

// 获取分类
export const getEntries = (latitude, longitude) => fetch('/shopping/v2/entries', {
  'templates[]':'main_template',
  latitude, longitude
});

// 获取推荐商家列表
export const getShopList = (latitude, longitude, offset) => fetch('/shopping/restaurants', {
  latitude, longitude,
  offset: offset,
  limit: 20,
  'extras[]': 'activities',
  terminal: 'h5'
});

// 获取商家页面中商家的信息
export const getShopMessage = (id,latitude, longitude) => fetch('/shopping/restaurant/' + id + '?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&latitude=' + latitude + '&longitude=' + longitude
);

// 获取商家页面中商品信息
export const getShopGoods = (id) => fetch('/shopping/v2/menu', {
  'restaurant_id': id,
});






