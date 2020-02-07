<template>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="detail">
            <div v-for="(item,index) in titles" 
            :key="index" 
            class="detail-item"
            :class="{active:currentIndex===index}"
            @click="titleClick(index)"
            >{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data(){
      return{
          titles:['商品','参数','评论','推荐'],
          currentIndex: 0,
      }
  },
  methods:{
      backClick(){
          this.$router.back();
      },
      titleClick(index){
          this.currentIndex = index;
      }
  },
  components:{
      NavBar,
  }
}
</script>

<style scoped>
.detail{
    display: flex;
    font-size: 13px;
}
.detail-item{
    flex:1
}
.back img{
    margin-top: 10px;
}
.active{
    color: var(--color-high-text)
}
</style>
