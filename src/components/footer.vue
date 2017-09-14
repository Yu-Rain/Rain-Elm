<template>
  <footer id="rain-footer">

    <router-link to="/msite" :class="{active: isMsite}">
      <i class="fa fa-edge"></i>
      <span>外卖</span>
    </router-link>

    <router-link to="/discover" :class="{active: isDiscover}">
      <i class="fa fa-safari"></i>
      <span>发现</span>
    </router-link>

    <router-link to="/order" :class="{active: isOrder}">
      <i class="fa fa-file-text-o"></i>
      <span>订单</span>
    </router-link>

    <router-link to="/profile" :class="{active: isProfile}">
      <i class="fa fa-user-o"></i>
      <span>我的</span>

    </router-link>
  </footer>

</template>


<script type="text/ecmascript-6">

  export default {
    name: 'footer',
    data(){
      return {
        isMsite: false,
        isDiscover: false,
        isOrder: false,
        isProfile: false,
      };
    },

    created() {

      // 判断当前是哪个页面
      switch (this.$route.path) {
        case '/msite':
          this.isMsite = true;
          break;
        case '/discover':
          this.isDiscover = true;
          break;
        case '/order':
          this.isOrder = true;
          break;
        case '/profile':
          this.isProfile = true;
          break;
        default:
          this.isMsite = true;
      }

    },
  }

</script>

<style lang="scss">

  @import "../css/mixin";

  #rain-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 100%;
    height: pxToRem(100px);
    background-color: #fff;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,0.1);
    padding-top: pxToRem(9px);
    text-align: center;


    @include flex-content(space-around);

    a {
      flex: 1;
      @include font-dpr(18px);

      /* 方法1: 通过切换类. */
      &.active {
        color: #0089dc;
      }

      /* 方法2: 通过vue添加的类名, 改变字体颜色. */
      &.router-link-exact-active.router-link-active {
        color: #0089dc;
      }

      span {
        display: block;
        font-size: pxToRem(20px);
      }


    }


  }


</style>
