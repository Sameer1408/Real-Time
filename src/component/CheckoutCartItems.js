import React from 'react'

function CheckoutCartItems(props) {
    return (
        <div>
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <img src={props.item.image} style={{ width: "100%" }} />
                    </div>
                    <div class="col-8">
                        <p  className="CheckoutCartProductQty" style={{marginBottom:"-4px"}}>{props.item.name}</p>
                        <p className="CheckoutCartProductPrice">Rs {props.item.price}</p>
                        <p  className="CheckoutCartProductQty" style={{marginTop:"-20px"}}>{props.item.quantity} pcs</p>
                      </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCartItems
