<template>
<div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="detail-scroll" 
            ref="scroll" 
            :probeType="3" 
            @scrollpostion="scrollpostion">
      <detail-swiper :swiperimg="swiperimg"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shopInfo"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImgLoad="detailImgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendList"  ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <toast :message="message" :show="show"></toast>
</div>   
</template>

<script>
import DetailNavBar from './detailChild/DetailNavBar'
import DetailSwiper from './detailChild/DetailSwiper'
import DetailBaseInfo from './detailChild/DetailBaseInfo'
import DetailShopInfo from './detailChild/DetailShopInfo'
import DetailGoodsInfo from './detailChild/DetailGoodsInfo'
import DetailParamInfo from './detailChild/DetailParamInfo'
import DetailCommentInfo from './detailChild/DetailCommentInfo'
import DetailBottomBar from './detailChild/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/context/goods/GoodsList'
import Toast from 'components/common/toast/Toast'

import {getDetailSwiper,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemImgListener,backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'

export default {
  name: 'Detail',
  mixins :[itemImgListener,backTopMixin],
  data(){
    return {
        iid:'',
        swiperimg:[],
        goods:{},
        shopInfo:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommendList:[],
        itemImgListener:null,
        titleTopYs:[],
        getTitleTopYs:'',
        currentIndex:'',
        message:'',
        show:false,
    }
  },
  created(){
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //根据传入的id请求详情页数据
       getDetailSwiper(this.iid).then(res=>{
         const data = res.result;
        //    console.log(11111)
        //  console.log(data)

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
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

         // 6.保存评论信息
          if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }         
      })   

      //2.获取推荐数据
      getRecommend().then(res=>{
        this.recommendList = res.data.list;
        // console.log(this.recommendList)
      })

      
    //3.获取高度，防抖
    this.getTitleTopYs = debounce(()=>{
        this.titleTopYs = [],
        //获取推荐，评论，参数的高度
        this.titleTopYs.push(0,this.$refs.param.$el.offsetTop,this.$refs.comment.$el.offsetTop,this.$refs.recommend.$el.offsetTop)
        
        //压入一个最大值
        this.titleTopYs.push(Number.MAX_VALUE)
        // console.log(this.titleTopYs)
    },100)
  },
  mounted(){
  },
  destroyed(){
     //取消监听图片加载
    this.$bus.$off('imageLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(['addCart']),
    detailImgLoad(){
      // this.$refs.scroll.refresh();//使用这个图片有几张就会加载几张
      //防抖
      this.newrefresh(); //使用这个只会加载一次
      this.getTitleTopYs();
    
    },
    //点击推荐，评论等滑动到相应位置
    titleClick(index){    
      this.$refs.scroll.scrollTo(0,-this.titleTopYs[index],300);
    },
    //接受scroll组件传过来的滑动的位置，活动时显示对应标题
    scrollpostion(position){
      var positionY = Math.abs(position.y);

       //1.判断BackTop是否显示
      this.isShow = positionY > 1000 ;

    //2.接受scroll组件传过来的滑动的位置，活动时显示对应标题
      var length = this.titleTopYs.length;
      // console.log(this.titleTopYs)
      for(var i = 0; i < length - 1;i++){

        //方法1 判断太过复杂
        // if(this.currentIndex!==i && ((i < length - 1 && positionY >= this.titleTopYs[i] && positionY < this.titleTopYs[i+1])||(i === length-1 && positionY < this.titleTopYs[i]))){
        //     // this.currentIndex = i;
        //     // this.$refs.nav.currentIndex = this.currentIndex;
        //     // console.log(i)
        // }
        
        //方法2 给this.titleTopYs最后压入一个无穷大的值  不需要用上面那个或者的条件了
        if(this.currentIndex!==i && (positionY >= this.titleTopYs[i] && positionY < this.titleTopYs[i+1])){
              this.currentIndex = i;
              this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    //点击加入购物车
    addCart(){
      var product = {};
       product.iid = this.iid;
       product.imgURL = this.swiperimg[0]
       product.title = this.goods.title
       product.desc = this.goods.desc;
       product.newPrice = this.goods.newPrice;
      //  this.$store.commit('addCart',product);
      //方法1 
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res)
      // })

      //方法2  使用了mapActions，将直接映射到detail此页面中了
        this.addCart(product).then(res => {
          console.log(11111)
          // console.log(res)
        }) //用这个方法报错 还没找到原因
    }
  },
  components:{
     DetailNavBar,
     DetailSwiper,
     DetailBaseInfo,
     DetailShopInfo,
     Scroll,
     DetailGoodsInfo,
     DetailParamInfo,
     DetailCommentInfo,
     GoodsList,
     DetailBottomBar,
     Toast
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
