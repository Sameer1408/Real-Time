import React, { useState } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import CheckOutSteps from './CheckOutSteps'
import { useHistory } from 'react-router';


function PaymentScreen() {
    let history = useHistory();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart;

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('');

    const PaypalHandler=()=>{
        setPaymentMethod('paypal')
    }

    const UpiHandler=()=>{
        setPaymentMethod('upi')
    }

    const submitHandler = (e) => {
       e.preventDefault();
       dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
        console.log(paymentMethod)
    }

    return (
        <div className="container">
            <CheckOutSteps step1 step2 step3 />
            <h1>Paymethod</h1>
            <form onSubmit={submitHandler}>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" onClick={PaypalHandler}/>
                    <label class="form-check-label" for="exampleRadios1">
                        Paypal
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" onClick={UpiHandler}/>
                    <label class="form-check-label" for="exampleRadios2">
                        Upi
                    </label>
                </div>
                
                <button type="submit" className="btn" disabled={paymentMethod===''?true:false}>submit</button>
            </form>
        </div>
    )
}

export default PaymentScreen
