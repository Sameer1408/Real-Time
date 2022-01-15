import {CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants'

export const addToCart =(id,qty,price)=>async(dispatch,getState)=>{
    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },

      });
      const json = await response.json();

      dispatch({
          type:CART_ADD_ITEM,
          payload:{
          product:id,
          name:json.product.name,
          image:json.product.image.url,
          price:price,
          quantity:qty,
          shop:json.product.shop
          }
      })
      
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
//console.log(JSON.stringify(getState().cart.cartItem))
}

export const removeFromCart = (id,price)=>(dispatch,getState)=>{
  dispatch({
    type:CART_REMOVE_ITEM,payload:{id,price}
  })
  localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const saveShippingAddress = (data)=>(dispatch)=>{
  dispatch({type:CART_SAVE_SHIPPING_ADDRESS,payload:data})
  localStorage.setItem('shippingAddress',JSON.stringify(data));
}

export const savePaymentMethod=(data)=>(dispatch)=>
{
  dispatch({
    type:CART_SAVE_PAYMENT_METHOD,
    payload:data
  })
  localStorage.setItem('paymentMethod',JSON.stringify(data));

}