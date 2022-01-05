import React, { useState ,useLayoutEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutCartItems from '../component/CheckoutCartItems';
import { useHistory } from 'react-router';


function Checkout() {
  
  useLayoutEffect(() => {
    getUser();
  }, []);

  const [person, setPerson] = useState({})
  const getUser = async () => {
    if (localStorage.getItem('token')) {
      const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/auth/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json()
      setPerson(json.user);
      console.log(json.user)
    }
  }
  
  const history = useHistory();

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const [loading, setLoading] = useState("");

  //Variables for Payment Confirmation
   const [paymentId, setPaymentId] = useState('')
   const [orderId, setOrderId] = useState('')
   const [razorpaySignature,setRazorpaySignature] = useState('');

  const handleSubmit = async () => {
    const amount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)
    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/cart/order/${amount}`, {
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

          setPaymentId(response.razorpay_payment_id)
          setOrderId(response.razorpay_order_id)
          setRazorpaySignature(response.razorpay_signature)
          
          console.log("success")
          saveOrder();

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

  const saveOrder=async()=>{
 let name = {
      firstName:person.name,
      lastName:"LastName"
    }
    let email = person.email;
    let shop = cartItems[0].shop
    let shippingInfo = {
      address,
      city,
      state:"Mp",
      pinCode:123456,
      phoneNo,
    }
    let orderItems = {
      cart
    }
    let totalAmount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.price)), 0)

    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/cart/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        name,
        shop,
        email,
        shippingInfo,
        orderItems,
        totalAmount
      })
    });

    const json = await response.json();
    console.log(json)
    history.push('/profile')
    localStorage.removeItem('cartItems')
       window.location.reload();
  }

  


  return (
    <div className="container" style={{ position: 'relative', top: '90px', marginBottom: "20px" }}>
      <h1 className="checkoutHeading">Checkout</h1>
      <hr style={{marginTop:'-2px'}}/>
      <div className="my-5" >
        <div className="row">
          <div className="col-lg-8 BillingAddress">
            <h4>Billing address </h4>
            <form class="needs-validation" novalidate>
              {/* <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="firstName">First name</label>
                  <input type="text" class="form-control" id="firstName" placeholder="First Name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} required />
                  <div class="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lastName">Last name</label>
                  <input type="text" class="form-control" id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} required />
                  <div class="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div> */}

              {/* <div class="mb-3">
                <label for="email">Email </label>
                <input type="email" class="form-control" id="email" value={email} placeholder="you@example.com" onChange={(e) => { setEmail(e.target.value) }} required />
                <div class="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div> */}

              <div class="mb-3">
                <label for="address">Address <i class="fas fa-map-marker-alt"></i></label>
                <input type="text" class="form-control" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} placeholder="1234 Main St" required />
                <div class="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>

              <div class="mb-3">
                <label for="phoneNumber">Phone Number <i class="fas fa-phone"></i></label>
                <input type="number" class="form-control" id="phoneNumber" value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value) }} placeholder="Phone Number" required />
              </div>

              <div class="row">
                {/* <div class="col-md-6 mb-3">
                  <label for="state">State</label>
                  <input type="text" class="form-control" id="state" placeholder="State" value={state} onChange={(e) => { setState(e.target.value) }} required />
                  <div class="invalid-feedback">
                    Valid  State is required.
                  </div>
                </div> */}
                <div class="col-md-6 mb-3">
                  <label for="city">City <i class="fas fa-globe"></i></label>
                  <input type="text" class="form-control" id="city" placeholder="City" value={city} onChange={(e) => { setCity(e.target.value) }} required />
                  <div class="invalid-feedback">
                    Valid  City is required.
                  </div>
                </div>
                {/* <div class="col-md-3 mb-3">
                  <label for="zip">Pincode</label>
                  <input type="text" class="form-control" id="pincode" value={pinCode} onChange={(e) => { setPinCode(e.target.value) }} placeholder="" required />
                  <div class="invalid-feedback">
                    Zip code required.
                  </div>
                </div> */}
              </div>
          </form>
          </div>
          
          <div className="col-lg-4 " >
           <hr/>
            <h4 style={{ color: "grey", display: "inline-block" }}>Cart Items</h4>
            <button className="btn btn-dark" style={{ display: "inline-block", float: "right" }}>{cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}</button>

            <div className="CheckoutCartItems" >
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

export default Checkout
