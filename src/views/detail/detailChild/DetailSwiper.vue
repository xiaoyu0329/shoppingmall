<template>
  <swiper class="detail-swiper">
        <swiper-item v-for="(item,index) in swiperimg" :key="index">
          <img :src="item" alt="">
        </swiper-item>
    </swiper> 
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name: 'app',
  props:{
    swiperimg:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return { 

    }
  },
  components:{
    Swiper,
    SwiperItem,
  }
}
</script>

<style scoped>
.detail-swiper{
  height:300px;
  overflow: hidden;
}
</style>
