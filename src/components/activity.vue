<template>
  <div id="activity">
    <span class="icon_name" :style="{backgroundColor: '#'+ active.icon_color}">{{active.icon_name}}</span>
    <span class="activity-tips">{{active.tips}}</span>
  </div>

</template>


<script type="text/ecmascript-6">
  export default {
    name: 'activity',
    props: ['active'],
  }

</script>

<style lang="scss">
  @import "../css/mixin";

  #activity {
    &::after {
      content: '';
      display: table;
      clear: both;
    }
    font-size: pxToRem(22px);
    color: #fff;
    .icon_name {
      font-size: pxToRem(22px);
      margin-right: pxToRem(12px);
      border-radius: pxToRem(4px);
      width: pxToRem(28px);
      height: pxToRem(28px);
      text-align: center;
      color: #fff;
      float: left;
    }

    .activity-tips {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      float: left;
    }

  }


</style>