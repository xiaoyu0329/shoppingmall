<template>
    <div class="tab-control">
        <div class="tab-control-item" v-for="(item,index) in title" :key="index" :class="{active:currentIndex===index}" @click="titleClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TabControl',
  props:{
      title:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data(){
      return{
          currentIndex:0,
      }
  },
  methods:{
    titleClick(index){
       this.currentIndex = index;
       this.$emit('tabClick',index);
    }
  },
  components: {
   
  }
}
</script>

<style scoped>
.tab-control{
    display:flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
}
.tab-control-item{
    flex:1;
}
.tab-control-item span{
    padding: 5px;
}
.active{
     color: var(--color-high-text);
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
</style>
