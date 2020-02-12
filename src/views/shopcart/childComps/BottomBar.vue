<template>
  <div class="bottom-menu">
    <check-button class="select-all" 
    :is-checked="isSelectAll"
    @click.native="isChecked"
    ></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{checkedLength}})</span>
  </div>
</template>

<script>
 import CheckButton from 'components/context/checkButton/CheckButton'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      totalPrice() {
        const cartList = this.$store.state.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.newPrice
        }, 0)
      },
      checkedLength(){
         const cartList = this.$store.state.cartList;
        return cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        const cartList = this.$store.state.cartList;
        if(cartList.length === 0) return false;
        //方法1
        // return !cartList.filter(item => !item.checked).length

        //方法2  只要找到一个就返回  比上面遍历每一个性能要好
        return !cartList.find(item => !item.checked)

        //方法3

      }
    },
    methods:{
      //点击全选，分两种情况
      isChecked(){
         const cartList = this.$store.state.cartList;
        if(this.isSelectAll){//全部选中,点击后全不选中
          cartList.forEach(item => item.checked = false)
        }else{//部分选中或者全部不选中,点击后全选中
          cartList.forEach(item => item.checked = true)
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
