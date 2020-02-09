<template>
    <div class="shopcart">
       <!-- 导航 -->
        <nav-bar class="nav-bar">
          <div slot="center">购物车({{cartLength}})</div>
        </nav-bar> 

        <!-- 购物车列表 -->
        <card-list ></card-list>
        
        <!-- 底部 -->
        <bottom-bar></bottom-bar>
    </div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CardList from './childComps/CardList'
import BottomBar from './childComps/BottomBar'

import {mapGetters} from 'vuex'
export default {
  name: 'Shopcart',
  components:{
    NavBar,
    CardList,
    BottomBar,
  },
  computed:{
    ...mapGetters(['cartLength','cart'])
  },
 
}
</script>

<style scoped>
.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
  .shopcart{
    height: 100vh;
  }
</style>
