<template>
  <div id="msite">
    <div class="wrap">
      <h3>这是外卖页面</h3>

      <h4>{{address.name}}</h4>


    </div>

    <rain-footer></rain-footer>
  </div>
</template>


<script type="text/ecmascript-6">
  import {
    getPosition,
    getAddress
  } from '@/data/getData';

  import rainFooter from '@/components/footer';

  export default {
    name: 'msite',
    data() {
      return {
        address: {}, //当前地址

      }
    },


    async mounted() {


      try {

        let position = await getPosition();

        getAddress(position.coords.latitude, position.coords.longitude).then(response => {
          this.address = response;
        }).catch(error => {
          console.log('没有获取到地址');
          console.log(error);
        });


      }catch (error) {

        console.log(error);
      }


    },


    components: {
      rainFooter
    },







  }
</script>



<style>

</style>