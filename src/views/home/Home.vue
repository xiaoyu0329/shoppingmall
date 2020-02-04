<template>
  <div id="home">
      <nav-bar class="homebar"><div slot="center">购物车</div></nav-bar>
      <scroll class="content" 
               ref="scroll"
               :probe-type="3"
               @scrollpostion="scrollpostion"
              :pull-up-load="true"
              @pullingUp="loadingMore">
        <home-swiper :banners="banners"></home-swiper>
        <home-recommend :recommends="recommends"></home-recommend>
        <home-feature-view></home-feature-view>
        <tab-control class="tabcontrol" 
                    :title="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
        <goods-list :goods="tabClickIndex"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShow"></back-top>
     
  </div>  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/context/tabControl/TabControl'
import GoodsList from 'components/context/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/context/backTop/BackTop'

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
    Scroll,BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentTabClick:'pop',
      isShow:false,
    }
  },
  created(){    
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  computed:{
    tabClickIndex(){
      return this.goods[this.currentTabClick].list
    }
  },
  methods:{
    loadingMore(){
      this.getHomeGoods(this.currentTabClick)
    },
    scrollpostion(position){
      this.isShow = Math.abs(position.y) > 1000
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,300);
    },
    // 事件监听
    tabClick(index){
      switch(index){
        case 0:
          this.currentTabClick = 'pop';
        break;
        case 1:
          this.currentTabClick = 'new';
        break;
        case 2:
          this.currentTabClick = 'sell';
        break;
      }
    },

    // 网络请求
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
          // console.log(type)
          // console.log(this.goods[type].list)
          this.$refs.scroll.finishPullUp()
      })
      
    }
  }
}
</script>

<style scoped>
#home{
  padding-top:44px;
  height: 100vh;
  position: relative;
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
.content{
  overflow: hidden;
  position: absolute;
  top:44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>
