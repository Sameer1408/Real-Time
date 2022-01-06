import React, { useState,useEffect } from 'react'
import io from 'socket.io-client'
const socket = io.connect('https://salty-inlet-39033.herokuapp.com')

function AdminAllOrder(props) {
 
//   useEffect(() => {
//     socket.on('orderUpdated',()=>{
//         console.log("connected")
//     })
// }, [])

  const [status, setstatus] = useState(props.order.status)

  const onChangeStatus = (e) => {
    setstatus(e.target.value)
    updateStatus(e.target.value)
  }

  const updateStatus = async (state) => {
    const orderId = props.order._id
    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/auth/admin/orderStatus`, {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ orderId, status: state })
    });

    const json = await response.json();
    socket.emit('join',`order_${props.order._id}`)
  }



  return (
    <div className="ordersShopSideDiv">
      <div class="container">
     {props.order.orderItems.cart.cartItems.map((e)=>{
      return<>
        <img className="ordersShopSideDivImage" src={e.image}></img>
         <p  className="ordersShopSideDivProductName">{e.name}</p>       
     ,
      </>
     })

     }
     <p className="ordersShopSideDivName">Name - {props.order.name.firstName} </p>
       
       <p className="ordersShopSideDivPrice">Price -  {props.order.totalAmount}</p>
        
        <form className="ordersShopSideDivStatus">
          <div class="form-group">
            {/* <label for="exampleFormControlSelect1">Example select</label> */}
            <select class="form-control" id="exampleFormControlSelect1" value={status} onChange={onChangeStatus}>
              <option>Place Order</option>
              <option>Confirmed</option>
              <option>Dispatched</option>
              <option>Complete</option>
            </select>
          </div>
        </form>
      </div>

    </div>
  )
}

export default AdminAllOrder