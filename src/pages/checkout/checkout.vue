<template>
  <div id="checkout">
    <h1>确认订单</h1>
  </div>

</template>


<script type="text/ecmascript-6">
  import {getStore} from '@/config/localStore';

  export default {
    name: 'checkout',


    beforeRouteEnter (to, from, next) {

      let name = getStore('username');
      if (!name) {
        next({path: '/login', query: {id: from.query.id}});
      } else {
        next();
      }

    },

    mounted() {
      console.log(this.$route.query.id);
    }


  }



</script>

<style lang="scss">

</style>