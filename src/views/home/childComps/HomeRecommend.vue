<template>
   <div class='homerecommend'>
       <div class="recommend" v-for="(item,index) in recommends" :key="index">
           <a :href="item.link">
               <img :src="item.image"/>
            </a>
            <div>{{item.title}}</div>
       </div>
   </div>
</template>

<script>

export default {
  name: 'HomeRecommend',
  props:{
      recommends:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components: {

  }
}
</script>

<style scoped>
.homerecommend{
    display:flex;
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
}
.recommend{
    flex:1
}
.recommend img{
    width:70px;
    height:70px;
    margin-bottom: 10px;
}
</style>
