import {debounce} from 'common/utils'
import BackTop from 'components/context/backTop/BackTop'

export const itemImgListener = {
    data(){
        return {
            newrefresh:null
        }
    },
    mounted(){
        //图片加载完成的事件监听
          this.newrefresh = debounce(this.$refs.scroll.refresh, 100)
         this.itemImgListener = ()=>{
            this.newrefresh();
         }
         this.$bus.$on('imageLoad',this.itemImgListener);
         console.log('我是混入')
    },
}

export const backTopMixin = {
    data(){
        return {
            isShow: false,  
        }
    },
    components:{
       BackTop
      },
    // mounted(){
    //     console.log('混入1111')
    // },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0,300);
          },
    },
}