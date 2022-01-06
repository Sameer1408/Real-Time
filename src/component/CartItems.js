import React,{useContext,useState,useEffect} from 'react'
import shopContext from '../context/shops/shopContext';
import {removeFromCart} from '../actions/cartAction'
import {useDispatch,useSelector} from 'react-redux'

function CartItems(props) {

const dispatch = useDispatch();

const removeFromCartHandler=(id)=>{
    dispatch(removeFromCart(id));    
}

return (
        <div className="cartItems">
        <div className="row">
        <div className="col-sm-2">
        <img className="cartItems_image" src={props.e.image}/>
        </div>
        <div className="col-sm-10">
        <div className="row">
            <div className="col-sm-3 cartItemsProductNameDiv"> <p className="cartItems_heading cartItem" > {props.e.name} </p></div>
            <div className="col-sm-3 cartItemsProductQtyDiv"><p className="cartItems_qty cartItem"> {props.e.quantity}</p></div>
            <div className="col-sm-3 cartItemsProductPriceDiv"><p className="cartItems_price cartItem">Rs {props.e.price}</p></div>
            <div className="col-sm-3 cartItemsProductButtonDiv"> <button className="btn btn-outline-danger btn-sm cartItem cartItemBtn" onClick={()=>removeFromCartHandler(props.e.product)}><i class="fas fa-times"></i></button></div>
        </div>      
              
        </div>

        </div>     
     
        </div>
    )
}

export default CartItems