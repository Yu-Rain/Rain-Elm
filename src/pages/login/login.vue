<template>

  <div id="login">

    <form action="">

      <label for="username">用户名</label>
      <input type="text" id="username" v-model="username" placeholder="请输入用户名">

      <br>
      <button type="button" @click="clickLogin">登录</button>

    </form>


  </div>

</template>


<script type="text/ecmascript-6">
  import {setStore} from '@/config/localStore';
  export default {
    name: 'login',
    data() {
      return {
        username: '',
      }
    },
    methods: {
      clickLogin() {

        setStore('username', username);

        this.$router.push({path: '/checkout', query:{id: this.$route.query.id}})
      }


    }
  }

</script>

<style lang="scss">
  @import "../../css/mixin";
  #login {
    font-size: pxToRem(36px);

    #username {
      width: 60%;
      height: pxToRem(66px);
      font-size: pxToRem(36px);
    }

    button {
      font-size: pxToRem(36px);
    }


  }


</style>