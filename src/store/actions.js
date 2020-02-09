import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'

export default {
    addCart(context,payload){
        var oldProduct =context.state.cartList.find(function(item){
            return item.iid === payload.iid
        })

        if(oldProduct){
            // oldProduct.count += 1
            context.commit(ADD_COUNTER,oldProduct)
        }else{
            payload.count = 1;
            // context.state.cartList.push(payload)
            context.commit(ADD_TO_CART,payload)
        }
        console.log(context.state.cartList)
    }  
}