<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data(){
    return {
      scroll:''
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0,
    },
    pullUpLoad:{
      type:Boolean,
      default:false,
    },
  },
  mounted(){
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
      click:true
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll',(postion)=>{
      // console.log(this.pullUpLoad);
       this.$emit('scrollpostion',postion)
    })

    // 3.监听上拉事件
     this.scroll.on('pullingUp',()=>{
       this.$emit('pullingUp')
    })
    
  },
  methods:{
    scrollTo(x,y,time=500){
      this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
