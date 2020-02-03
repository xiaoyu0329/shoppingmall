<template>
    <div class="tabbar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="tab-img"></slot>  
    </div>
    <div v-else>
      <slot name="tab-img-active"></slot>
    </div>
    <!-- <div :class="{active:isActive}">
      <slot name="tab-word"></slot>
    </div> -->
    <div :style="activeStyle">
      <slot name="tab-word"></slot>
    </div>
    </div>
</template>

<script>
export default {
  name: 'TabbarItem',
  props:{
      path:String,
      activeColor:{
          type:String,
          default:'red'
      }
  },
  data(){
      return {
        //   isActive:true
      }
  },
  computed:{
      isActive(){
          return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
          return this.isActive ? {color:this.activeColor} : {}
      }
  },
  methods:{
     itemClick(){
        //  console.log(this.activeColor)
        //  console.log(this.$route.path)
        //  console.log(11111)
         this.$router.replace(this.path)
     } 
  }
}
</script>

<style>
.tabbar-item {
    flex: 1;
    text-align: center;
     height: 49px;
}
.tabbar-item img{
    width:20px
}
.active{
    color:red
}
</style>
