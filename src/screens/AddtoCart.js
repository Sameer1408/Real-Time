import React, { useEffect, useState } from 'react'
import CartItems from '../component/CartItems';

function AddtoCart() {

    // const [loading, setLoading] = useState(true)
    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     getCartItems();
    // }, [])

    // const getCartItems = async () => {
    //     const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/cart/showCart`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': localStorage.getItem('token')
    //         },
    //     });
    //     const json = await response.json();
    //     setItems(json.cartItems);
    //     setLoading(false)
    // }

   

    return (
        <div className="my-4">
            <div style={{ position: "relative", top: "100px" }}>
                    hello
            </div>
        </div>
    )
}

export default AddtoCart
// {loading ? <h1>Loading...</h1> :
//     <>
//         {
//             items.map((product)=>{
//               //  console.log(product.quantity);
//              //  return <h1>Done{product.quantity}</h1>
//              return <CartItems productQuantity={product.quantity} productId={product.product} productPrice={product.price}/>
//             })
//         }
//       {/* {  <h1>Done</h1>} */}
//     </>
// }