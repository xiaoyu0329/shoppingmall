<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item" @load="imgLoad" alt="">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
			return {
        currentLoad: 0,
        imgLength: 0,
      }
    },
    methods:{
      imgLoad(){
        this.currentLoad += 1;
        //当图片全部加载完，然后只发送一个事件给父组件提示图片已经加载完成 防抖
        //否则会每加载完一张图片就告知父组件
        // 写法1
        // if(this.currentLoad == this.detailInfo.detailImage[0].list.length){
        //   this.$emit('imgLoad');
        // }

        //写法2 性能更好点 放到下面watch监听
        // if(this.currentLoad == this.imgLength){
          this.$emit('detailImgLoad');
          // this.$bus.$emit('detailImgLoad')//事件总线或者可以用
        // }
      }
    },
    watch:{
      //在此处监听的话只会调用一次
      detailInfo(){
        this.imgLength = this.detailInfo.detailImage[0].list.length;
        // console.log(this.imgLength)
      }
    }
  
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
