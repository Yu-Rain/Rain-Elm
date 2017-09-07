/**
 * Created by rain on 2017/9/6.
 */

// 获取定位
export const getPosition = function () {

  return  navigator.geolocation ? new Promise(function (resolve, reject) {

    navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 10000,maximumAge:1e4});

  }) : Promise.reject();

};


