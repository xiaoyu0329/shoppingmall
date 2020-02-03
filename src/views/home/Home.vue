<template>
  <div id="home">
      <nav-bar class="homebar"><div slot="center">购物车</div></nav-bar>
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature-view></home-feature-view>
      <tab-control class="tabcontrol" :title="['流行','新款','精选']"></tab-control>
      <goods-list :goods="goods['pop'].list"/>
      <ul>
        <li v-for="(item,index) in 200" :key="index">{{item}}</li>
      </ul>
  </div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/context/tabControl/TabControl'
import GoodsList from 'components/context/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeatureView from './childComps/HomeFeatureView'

import {getHomeMultidata,getHomeGoods} from 'network/home'
export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeatureView,
    TabControl,
    GoodsList,
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      }
    }
  },
  created(){    
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  methods:{
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          console.log(type)
          console.log(this.goods[type].list)
      })
      
    }
  }
}
</script>

<style>
#home{
  padding-top:44px;
}
.homebar{
    background-color: var(--color-tint);
    color: #fff;

    position:fixed;
    left:0;
    top:0;
    right:0;
    z-index:9;
}
.tabcontrol{
  position: sticky;
  top:44px;
  z-index:9;
}

</style>
