import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
    addCart(context,payload){
        return new Promise((resovle,reject)=>{
            var oldProduct =context.state.cartList.find(function(item){
                return item.iid === payload.iid
            })
    
            if(oldProduct){
                // oldProduct.count += 1
                context.commit(ADD_COUNTER,oldProduct)
                console.log('购物车数量+1')
            }else{
                payload.count = 1;
                // context.state.cartList.push(payload)
                context.commit(ADD_TO_CART,payload)
                console.log('加入购物车成功')
            }
            // console.log(context.state.cartList)
        })
       
    }  
}