import React from 'react'

function TestingPayment(props) {
 
    const buyNow=async()=>{
       const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/cart/order/785`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            //   'auth-token': localStorage.getItem('token')
            },
            //  body: JSON.stringify({ })
          });
           const json = await response.json();
           //console.log(json.amount);
           const options = {
            "key": "rzp_test_pppYbBFMTMCtvk", // Enter the Key ID generated from the Dashboard
            "amount": json.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": json.currency,
            "name": "Acme Corp",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id":json.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
                var settings = {
                    "url": "/api/payment/verify",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                      "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({response}),
                  }
            },
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response){
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
        });
    }

    return (
        <div style={{display:"inline-block",border:'2px solid black',marginTop:"120px",padding:"40px"}}> 
            {/* <h3>{props.product.name}</h3>
            <p>{props.product.price}</p> */}
            {/* <button onClick={()=>{buyNow(props.product.id)}} className="btn">Buy Now</button> */}
            <button className="btn" onClick={buyNow}>Buy</button>
          
        </div>
    )
}

export default TestingPayment
