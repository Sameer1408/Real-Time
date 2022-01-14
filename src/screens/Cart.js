import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartAction'
import {
    useParams
} from "react-router-dom";
import CartItems from '../component/CartItems';
import { useHistory } from "react-router-dom";

function Cart() {

    const dispatch = useDispatch();

    let id = useParams().id;
    let qty = useParams().qty;
    let price = useParams().price
    let shop = useParams().shop

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    useEffect(() => {
        if (id) {
            dispatch(addToCart(id, qty, price, shop))
        }
        window.scrollTo(0, 0)
    }, [dispatch, id, qty, price]);

    const history = useHistory();

    const handleContinueShopingClick = () => {
        history.push(`/products/${localStorage.getItem('currentShop')}`)
    }

    const handleCheckoutClick = () => {
        history.push('/checkout')
    }

    return (
        <>
            <div className="container" style={{ position: "relative", top: "100px" }}>
                <h1 className="ShopingCartHeading">Shopping Cart</h1>
                <button className="btn checkOutBtn" onClick={handleCheckoutClick} style={{marginTop:'-70px'}} >Checkout</button>
            <hr className="ShopingCartHeading_underLine"/>
                <div className="cartSections">
                    <h3 className="cart_product cart_top">Product</h3>
                    <h3 className="cart_qty cart_top">Quantity</h3>
                    <h3 className="cart_price cart_top">Price</h3>
                </div>

                <div className="row">
                    <div className="col-lg-8">
                        {
                            cartItems.length === 0 ? <>
                                <h2>Your Cart is Empty</h2>
                            </>
                                :
                                <>
                                    {cartItems.map((e) => {
                                        return <CartItems e={e} />
                                    })}
                                </>
                        }
                    </div>
                    <div className="col-lg-4">
                        <div className="balance">
                        <p id="selfBrandingCart">Some SelfBranding</p>
                            <p className="totlaDrinks">Total Drinks </p><p className="cartNumber">({cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)})</p>                           <div>
                           <p className="subtotal">SubTotal </p><p className="cartNumber"> Rs{cartItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)}</p>
                            <hr/>
                           </div>
                        </div>
                    </div>
                </div>
                <button className="btn checkOutBtn" onClick={handleCheckoutClick} >Checkout</button>
                <button className="btn btn-outline-dark" onClick={handleContinueShopingClick} style={{ marginLeft: "20px" }}>Continue Shoping</button>
            </div>
        </>
    )
}
export default Cart