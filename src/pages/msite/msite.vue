<template>
  <div id="msite">
    <div class="wrap">
      <h3>这是外卖页面</h3>
    </div>

    <rain-footer></rain-footer>
  </div>
</template>


<script type="text/ecmascript-6">
  import {
    getPosition
  } from '@/data/getData';

  import rainFooter from '@/components/footer';

  export default {
    name: 'msite',
    data() {
      return {
        lat: '',
        log: ''
      }
    },

    mounted() {

        getPosition().then((position)=>{

          this.lat = position.coords.latitude;
          this.log = position.coords.longitude;

        }).catch(error => {
          console.log(error.code);
          console.log(error.message);
        });


    },


    components: {
      rainFooter
    },



  }
</script>



<style>

</style>
