<template>
   <swiper>
        <swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" @load="imgLoad" />
          </a>
        </swiper-item>
    </swiper> 
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name: 'HomeSwiper',
  props:{
      banners:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data(){
    return {
      isSend:false
    }
  },
  methods:{
    imgLoad(){
      if(!this.isSend){
          this.$emit('swpierImgLoad');
          this.isSend = true;
      }    
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
</style>
