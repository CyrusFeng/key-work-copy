<template>
  <div id="app">
    <!--<router-view/>-->
    <!--<keep-alive>-->
      <!--<router-view/>-->
    <!--</keep-alive>-->
    <keep-alive include="processdetail">
      <router-view></router-view>
    </keep-alive>

    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
    <!--<keep-alive :include="catchList">-->
      <!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
    <!--</keep-alive>-->
  </div>
</template>
<script>
  import store from './store'
  import router from './router'
  export default {
    mounted(){
      // window.onpopstate = function() {
      //   alert('onpopstate')
      //   alert(!store.state.allowBack)
      //   if (!store.state.allowBack) {    //    这个allowBack 是存在vuex里面的变量
      //     history.go(1)
      //   }
      // }
      window.addEventListener("popstate", function(e) {
        // alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        e.preventDefault()
        router.backward(1)
      }, false);
    },
    computed:{
      catchList(){
        return this.$store.state.catchList
      }
    },
    methods:{
      getTime(){
        return new Date().getTime()
      }
    }
  }
</script>
<style lang="scss">
  body{
    background-color: #F2F6F9;
  }
</style>
