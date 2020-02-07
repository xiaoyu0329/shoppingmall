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
      probeType:this.probeType,//通过外界传进来  不固定死 之后可以灵活运用
      pullUpLoad:this.pullUpLoad,
      click:true //div监听点击事件的时候，必须要在这里设置true 否则监听不到，button不用
    })

    // 2.监听滚动的位置
    this.scroll.on('scroll',(postion)=>{
      // console.log(this.pullUpLoad);
       this.$emit('scrollpostion',postion);
      //  console.log(this.scroll.x)
      //  console.log(this.scroll.y)//向下拉的距离
    })

    // 3.监听上拉事件
     this.scroll.on('pullingUp',()=>{
       this.$emit('pullingUp')
    })
    // console.log(this.scroll.scrollerHeight);
 
  },
  methods:{
    scrollTo(x,y,time=500){
      //防止因为this.scroll加载不出来后面的异常
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    scrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
