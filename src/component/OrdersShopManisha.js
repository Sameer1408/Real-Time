import React,{useEffect,useState} from 'react'
import AdminAllOrder from './AdminAllOrder';
import sound from '../audio/sound.mp3'
import {Howl, Howler} from 'howler';
import io from 'socket.io-client'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const socket = io.connect('https://salty-inlet-39033.herokuapp.com')
socket.on('connect', () => {
    console.log(`I'm connected with the back-end`);
});
toast.configure()

function OrdersShopManisha() {
    const playSound = (src)=>{
        var sound = new Howl({
          src,
          volume: 0.5
        });
        sound.play();
      }

    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    
    useEffect(() => {
        socket.emit('join','adminRoom')
        socket.on('orderPlaced',(data)=>{
            console.log('connected')
            updateOrderList(data.saveOrder)
        })
        getAllOrders();
    }, [])

    const updateOrderList =(data)=>{
       allOrders.push(data)
       console.log(data)
       getAllOrders();
       if(data.shop=='Manisha')
       {
           toast(`New Order Placed`)
            playSound(sound)
       }
    }

    const  getAllOrders = async()=>{
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/auth/admin/allorders/Manisha`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
           //body: JSON.stringify({ shopName})
          });
          const json = await response.json(); 
          setAllOrders(json);
          console.log(json)
          setLoading(false)
    }

    return (
        <div style={{position:"relative",top:"80px"}}>
         <h1>Manisha Shop</h1>
        {loading?<h1>loading.. .</h1>:
       <>
   
        {
             allOrders.filter((e)=>{
             if(e.shop=='Manisha')
             {
                 return e
             }
             }).slice(0).reverse().map((order)=>{
                 return <>
                  <AdminAllOrder order={order}/>
                 </>
             })
          } 
           
       </>
       }
       
   </div>
    )
}

export default OrdersShopManisha
