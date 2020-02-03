<template>
    <tabbar>
         <tabbar-item path="/home">
           <img slot="tab-img" src="~assets/img/tabbar/home.svg"/>
             <img slot="tab-img-active" src="~assets/img/tabbar/home_active.svg"/>
           <div slot="tab-word">首页</div>
       </tabbar-item>
        <tabbar-item path="/category">
           <img slot="tab-img" src="~assets/img/tabbar/category.svg"/>
             <img slot="tab-img-active" src="~assets/img/tabbar/category_active.svg"/>
           <div slot="tab-word">分类</div>
       </tabbar-item >
        <tabbar-item path="/shopcart">
           <img slot="tab-img" src="~assets/img/tabbar/shopcart.svg"/>
             <img slot="tab-img-active" src="~assets/img/tabbar/shopcart_active.svg"/>
           <div slot="tab-word">购物车</div>
       </tabbar-item >
        <tabbar-item path="/profile">
           <img slot="tab-img" src="~assets/img/tabbar/profile.svg"/>
             <img slot="tab-img-active" src="~assets/img/tabbar/profile_active.svg"/>
           <div slot="tab-word">我的</div>
       </tabbar-item >
    </tabbar>
</template>

<script>
import Tabbar from 'components/common/tabbar/Tabbar.vue';
import TabbarItem from 'components/common/tabbar/TabbarItem.vue'
export default {
  name: 'MainTabbar',
  components:{
      Tabbar,
      TabbarItem
  }
}
</script>

<style>

</style>

