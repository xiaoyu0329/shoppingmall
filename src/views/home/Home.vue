<template>
  <div id="home">
      <nav-bar class="homebar"><div slot="center">购物车</div></nav-bar>
      <tab-control class="tabcontrol" 
                    :title="['流行','新款','精选']" 
                    @tabClick="tabClick"
                    ref="tabcontrol02"
                    v-show="tabContIsShow">
                    </tab-control>
      <scroll class="content" 
               ref="scroll"
               :probe-type="3"
               @scrollpostion="scrollpostion"
              :pull-up-load="true"
               @pullingUp="loadingMore">
        <home-swiper :banners="banners" @swpierImgLoad="getHeight"></home-swiper>
        <home-recommend :recommends="recommends"></home-recommend>
        <home-feature-view></home-feature-view>
        <tab-control class="tabcontrol" 
                    :title="['流行','新款','精选']" 
                    @tabClick="tabClick"
                    ref="tabcontrol01">
                    </tab-control>
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
import {debounce} from 'common/utils'
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
      currentTabClick: 'pop',
      isShow: false,
      offsetTop: 0,
      tabContIsShow: false,
      scrollLen:0,
    }
  },
  activated(){
    //取出之前记录的滑动的位置
    // console.log('active');
     this.$refs.scroll.scrollTo(0,this.scrollLen,0);
     this.$refs.scroll.refresh();
  },
   deactivated(){
     //记录滑动的距离
    // console.log('deactive');
    this.scrollLen = this.$refs.scroll.scrollY()
  },
  created(){    
    this.getHomeMultidata();
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    // this.tabClick(0) 写在这里会报错，因为created里面dom还没加载玩成，获取不到tabcontrol01
  },
  mounted(){
    this.tabClick(0)
    //图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('imageLoad',()=>{
       refresh();
    })

    //获取tabcontrol高度
    // console.log(this.$refs.tabcontrol.$el.offsetTop)
  },
  computed:{
    tabClickIndex(){
      return this.goods[this.currentTabClick].list
    }
  },
  methods:{
    getHeight(){
      this.offsetTop = this.$refs.tabcontrol01.$el.offsetTop;
      // console.log(this.offsetTop)
    },
    loadingMore(){
      this.getHomeGoods(this.currentTabClick)
    },
    scrollpostion(position){
      //判断BackTop是否显示
      this.isShow = Math.abs(position.y) > 1000 ;

      //决定tabControl是否吸顶(position: fixed)
      this.tabContIsShow = Math.abs(position.y)> this.offsetTop;
      // console.log(this.tabContIsShow)
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
      this.$refs.tabcontrol01.currentIndex = index;
      this.$refs.tabcontrol02.currentIndex = index;
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
  /* padding-top:44px; */
  height: 100vh;
  position: relative;
}
.homebar{
    background-color: var(--color-tint);
    color: #fff;

  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /* position:fixed;
    left:0;
    top:0;
    right:0;
    z-index:9; */
}
.tabcontrol{
  /* position: sticky;
  top:44px; */
  position: relative;
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
