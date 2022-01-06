import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutCartItems from '../component/CheckoutCartItems';
import { useHistory } from 'react-router';
import {createOrder} from '../actions/orderAction';

function PlaceOrderScreen() {
    
    const history = useHistory();

    const cart = useSelector(state => state.cart)
    const myOrder = useSelector(state => state.myOrder)

    const { cartItems } = cart;

    const dispatch = useDispatch();

    const {order,success,error} = myOrder

    const handleSubmit = async () => {
    
    let totalAmount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)    

    dispatch(
       createOrder({
            orderItems:cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            totalAmount:totalAmount
       }) 
    )    

     // history.push('/profile')
    }
    
    useEffect(() => {
        if(success){
            history.push('/profile')
        }
        ///
    }, [history,success])

    return (
        <div className="container" style={{ position: 'relative', top: '90px', marginBottom: "20px" }}>
      <h1>Checkout</h1>
      <div className="my-5" >
        <div className="row">
          <div className="col-lg-8" style={{ border: "1px solid grey" }}>
          
          </div>
          <div className="col-lg-4" style={{ border: "1px solid grey" }}>
            <h4 style={{ color: "grey", display: "inline-block" }}>Cart Items</h4>
            <button className="btn btn-dark" style={{ display: "inline-block", float: "right" }}>{cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}</button>

            <div style={{ height: "50vh", overflowY: "auto", width: "100" }}>
              {
                cartItems.map((e) => {
                  return <CheckoutCartItems item={e} />
                })
              }
            </div>
            <h4 style={{ marginTop: "20px" }}>Total: Rs{cartItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)}</h4>
            <h4>Taxes : </h4>
            <h4>Shipping: </h4>
            <h4>Ammount:</h4>
          </div>
        </div>
      </div>
      <button className="btn btn-outline-primary" style={{ width: "50%" }} onClick={handleSubmit}>Order Now</button>
      <div style={{ height: "80px" }}></div>
    </div>
    )
}

export default PlaceOrderScreen