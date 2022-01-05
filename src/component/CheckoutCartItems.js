import React from 'react'

function CheckoutCartItems(props) {
    return (
        <div className="" style={{ margin: "5px 0px",backgroundColor:'white',borderRadius:"20px" }}>
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <img src={props.item.image} style={{ width: "100%" }} />
                    </div>
                    <div class="col-8">
                        {props.item.name}
                        <p style={{ color: "green" }}>Rs {props.item.price}</p>
                      </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutCartItems
