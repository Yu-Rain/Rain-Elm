<template>
  <div class="rating-star">
    <div class="star-grey">

      <i class="fa fa-star" v-for="n in 5"></i>

    </div>
    <div class="star-yellow" :style="{width: starWidth}">
      <i class="fa fa-star" v-for="n in 5"></i>
    </div>

  </div>



</template>


<script type="text/ecmascript-6">

  export default {
    name: 'rating-star',
    props: {
      rating: Number
    },
    computed: {
      starWidth() {
        return (this.rating * 20) + '%';
      }

    },

  }



</script>

<style lang="scss">
  @import "../css/mixin";
  .rating-star {
    display: inline-block;
    position: relative;
    height: pxToRem(20px);
    width: pxToRem(104px);
    font-size: pxToRem(20px);

    i {
      margin-right: pxToRem(3px);
    }
    i:last-child {
      margin-right: 0px;
    }

    .star-grey {
      color: #ddd;
      width: 100%;
      white-space: nowrap;

    }



    .star-yellow {

      color: orange;
      white-space: nowrap;
      overflow-x: hidden;
      position: absolute;
      top: 0;
      left: 0;

    }


  }

</style>