<template>
    <div class="wrapper" ref='aaaa'>
      <ul class="content">
        <li v-for="(item,index) in 100" :key="index">我是哈哈哈哈{{item}}</li>
      </ul>
    </div>  
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data(){
    return {
      scroll:null,
    }
  },
 mounted() {
    // console.log(this.$refs.aaaa);
    // console.log(document.querySelector('.wrapper'));
    this.scroll = new BScroll(this.$refs.aaaa, {
      probeType: 3,
      pullUpLoad: true

    })
    this.scroll.on('scroll',(position)=>{
      // console.log(position)
    })
    this.scroll.on('pullingUp',()=>{
      console.log('ending.......')
    })
 }
}
</script>

<style scoped>
.wrapper{
  height:200px;
  background-color: red;
  /* overflow-y:scroll */
}
</style>
