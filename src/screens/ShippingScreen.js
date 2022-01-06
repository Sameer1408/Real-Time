import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {saveShippingAddress} from '../actions/cartAction'
import { useHistory } from 'react-router';
import CheckOutSteps  from './CheckOutSteps';


function ShippingScreen() {

    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart;

    const history = useHistory();

    const [address,setAddress] = useState(shippingAddress.address);
    const [city,setCity] = useState(shippingAddress.city);
    const [pincode,setPincode] = useState(shippingAddress.pincode);
    const [phoneNo,setPhoneNo] = useState(shippingAddress.phoneNo);
    const [firstName,setFirstName] = useState(shippingAddress.firstName);
    const [lastName,setLastName] = useState(shippingAddress.lastName);
    const [email, setEmail] = useState('')
    const [state,setState] = useState(shippingAddress.state);


    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(saveShippingAddress({address,city,state,phoneNo,pincode,name:{firstName,lastName},email}))
        history.push('/payment')
    }


    return (
        <div className="container" style={{position:"relative",top:"100px"}}>
        <CheckOutSteps step1 step2/>
        <form onSubmit={handleSubmit}>
        <input type="text" id="firstName" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="First Name"/>
        <input type="text" id="lastName" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Last Name"/>
        <br/>
        <input type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <br/>
        <input type="text" id="address" value={address} onChange={e=>setAddress(e.target.value)} placeholder="Please enter your complete address"></input>
        <br/>
        <input type="text" id="city" value={city} onChange={e=>setCity(e.target.value)} placeholder="City Name"/>
        <br/>
        <input type="text" id="state" value={state} onChange={e=>setState(e.target.value)} placeholder="State Name"/>
        <br/>
        <input type="number" id="phoneNo" value={phoneNo} onChange={e=>setPhoneNo(e.target.value)} placeholder="Phone Number"/>
        <br/>
        <input type="number" id="pincode" value={pincode}  onChange={e=>setPincode(e.target.value)} placeholder="Pincode"></input>
        <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default ShippingScreen
