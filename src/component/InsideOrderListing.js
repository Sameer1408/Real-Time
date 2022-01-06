import React from 'react'

function InsideOrderListing(props) {
    const {product,name,image,quantity} = props.order

    return (
        <div>
            <img src={image} style={{width:"60px"}}/>
            {name}
            
        </div>
    )
}

export default InsideOrderListing
