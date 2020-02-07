<template>
<div class="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll">
      <detail-swiper :swiperimg="swiperimg"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    </scroll>
 
    
</div>   
</template>

<script>
import DetailNavBar from './detailChild/DetailNavBar'
import DetailSwiper from './detailChild/DetailSwiper'
import DetailBaseInfo from './detailChild/DetailBaseInfo'
import DetailShopInfo from './detailChild/DetailShopInfo'
import DetailGoodsInfo from './detailChild/DetailGoodsInfo'
import DetailParamInfo from './detailChild/DetailParamInfo'

import Scroll from 'components/common/scroll/Scroll'

import {getDetailSwiper,Goods,Shop,GoodsParam} from 'network/detail'

export default {
  name: 'Detail',
  data(){
    return {
        iid:'',
        swiperimg:[],
        goods:{},
        shopInfo:{},
        detailInfo:{},
        paramInfo:{}
    }
  },
  created(){
      // 保存传入的iid
      this.iid = this.$route.params.iid

      //根据传入的id请求详情页数据
       getDetailSwiper(this.iid).then(res=>{
         const data = res.result;
         //1 获取顶部的图片轮播数据
         this.swiperimg = res.result.itemInfo.topImages;

          // 2.获取商品信息
         this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        
        // 3.创建店铺信息的对象
        this.shopInfo = new Shop(data.shopInfo);

         // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
        // console.log(this.detailInfo)

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      })   
  },
  methods:{
    imgLoad(){
      this.$refs.scroll.refresh();
    }
  },
  components:{
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     Scroll,
     DetailGoodsInfo,
     DetailParamInfo
  }
}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
   position: relative;
   z-index: 9;
   background-color: #fff;
}
.detail-scroll{
  height: calc(100% - 44px)
}
</style>
