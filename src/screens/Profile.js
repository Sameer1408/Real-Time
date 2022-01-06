import React,{useEffect,useState} from 'react'
import  MyOrders  from '../actions/orderAction'
import {useDispatch,useSelector} from 'react-redux';
import OrderListingCompo from '../component/OrderListingCompo';
import io from 'socket.io-client'


import 'react-toastify/dist/ReactToastify.css'
const socket = io.connect('https://salty-inlet-39033.herokuapp.com')

socket.on('connect', () => {
    console.log(`I'm connected with the back-end`);
});

function Profile() {


    const [loading, setLoading] = useState(true)
    const [oders,setOders] = useState([])

    useEffect(() => {
        getMyOrder();
    }, [])        

    const getMyOrder=async()=>{     
    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/cart/getMyOrder`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
    //  body: JSON.stringify({ shopName})
      });
      const json = await response.json();
      setOders(json);
    //  console.log(json);
      socket.emit('join','adminRoom')
      setLoading(false);
    }

    return (
        <div className="container" style={{marginTop:"100px"}}>
        {loading?<h1>Loading...</h1>:
        <>
        <h2>My Oders</h2>
      
        {/* <table class="table">
       <thead class="thead-dark">
     <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
      </tr>
     </thead> */}
    {
      oders.slice(0).reverse().map((e)=>{
            return <OrderListingCompo order={e} />          
        })
    }
    
{/* // </table> */}
        </>
        }
                   
        </div>
    )
}

export default Profile
