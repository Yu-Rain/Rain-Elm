
import {
  SAVE_LOCATION,
  ADD_CAR,
  REDUCE_CAR,
  CLEAR_CAR
} from './mutation-types';


export default {

  [SAVE_LOCATION](state, location) {
    state.location = location;
  },



  // ES6 参数结构语法
  [ADD_CAR](state, {shopId, foodId, name, original_price, price, spec, menuIndex, foodIndex}) {

    let car = state.carList;

    let shop = car[shopId] = (car[shopId] || {});

    if (shop[foodId]) {
      shop[foodId].count += 1;
    } else {

      shop[foodId] = {
        name,
        original_price,
        price,
        spec,
        menuIndex,
        foodIndex,
        count: 1
      }

    }

    state.carList = {...car};

  },

  [REDUCE_CAR](state, {shopId, foodId}) {
    let car = state.carList;
    let shop = car[shopId];
    shop[foodId].count--;

    if (shop[foodId].count === 0) {
      delete shop[foodId];

      if (!Object.keys(shop).length) {
        car[shopId] = null;
      }
    }

    state.carList = {...car};
  },

  [CLEAR_CAR](state, shopId) {
    let car = state.carList;
    car[shopId] = null;
    state.carList = {...car};
  }
  
}

