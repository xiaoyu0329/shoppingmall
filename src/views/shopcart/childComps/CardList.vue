<template>
    <div class="cardlist">
        <scroll class="content" ref="scroll">
            <card-list-item v-for="(item,index) in cart" :key="index" :itemInfo="item"> 
                    {{item}}
            </card-list-item>
        </scroll>      
    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CardListItem from './CardListItem'

import {mapGetters} from 'vuex'

export default {
  name: 'CardList',
  components:{
    CardListItem,
    Scroll,
  },
  computed:{
      //从vuex取出购物车列表
       ...mapGetters(['cartLength','cart'])
  },
   activated(){
       this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .cardlist{
    height: calc(100% - 44px - 49px - 44px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
