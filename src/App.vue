<template>
  <div id="app">
    <router-view></router-view>
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from 'components/context/mainTabbar/MainTabbar'

export default {
  name: 'app',
  components: {
   MainTabbar
  }
}
</script>

<style scoped>
  @import "assets/css/base.css";
</style>
