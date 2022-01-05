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
    <div>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            {props.order.shop}
          </div>
          <div class="col-sm">
            {props.order.name.firstName} {props.order.name.lastName}
          </div>
          <div class="col-sm">
            {props.order.email}
          </div>
          <div class="col-sm">
            {props.order.totalAmount}
          </div>
          <div class="col-sm">
            {props.order.shippingInfo.phoneNo}
          </div>
          <div class="col-sm">
            {props.order.shippingInfo.address}
          </div>
          {/* <div class="col-sm">
            {props.order.shippingInfo.pinCode}
          </div> */}
        </div>
        <form style={{ position: "relative", top: "20px", zIndex: 2 }}>
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