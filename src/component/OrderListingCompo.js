import React,{useEffect, useState} from 'react'
import InsideOrderListing from './InsideOrderListing';
import io from 'socket.io-client'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import sound from '../audio/sound.mp3'
import {Howl, Howler} from 'howler';
import { useHistory } from 'react-router';
const socket = io.connect('https://salty-inlet-39033.herokuapp.com')
socket.on('connect', () => {
    console.log(`I'm connected with the back-end`);
});

toast.configure()

function OrderListingCompo(props) {
    let history =  useHistory();
    const playSound = (src)=>{
        var sound = new Howl({
          src,
          volume: 0.5
        });
        sound.play();
      }
    const {orderItems,totalAmount,createdAt} = props.order;
    const {cart} = orderItems;
    const {cartItems} = cart;
    const [currentStatus, setCurrentStatus] = useState(props.order.status)
    let date = String(createdAt).slice(0,10);
    
    useEffect(() => {
        socket.emit('join',`order_${props.order._id}`) 
        socket.on('orderUpdated',(data)=>{
            updateStatus(data);
           // console.log(data)
        })
    }, [])

    const updateStatus=(data)=>{
        if(data.id==props.order._id){
        console.log(data.id)
        setCurrentStatus(data.status)
        toast(`Order status updated to ${data.status}`)}
        playSound(sound)
    }

    const getOrderStatus=()=>{
        history.push(`/orderStatus/${currentStatus}`)
    }

    return (
        <>
        <div className="myOdersListDiv" >
       <p className="ordredOn">Odered On  : {date}</p>
        {
            cartItems.map((e)=>{
            return <InsideOrderListing order={e} />
            })
        }
        <p className="myOdersListDivAmount">
        Total Amount : Rs {totalAmount}
        </p>
        {
            currentStatus!="Complete"?<button className="btn btn-outline-dark orderStatusBtn btn-full" onClick={getOrderStatus}>Order Status</button>:'Complete'
        }
        </div>
       
        </>
    )
}
export default OrderListingCompo