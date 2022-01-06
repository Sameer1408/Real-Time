import React,{useEffect,useState} from 'react'
import AdminAllOrder from '../component/AdminAllOrder';

function AdminPage() {

    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        getAllOrders();
    }, [])

    const filterItem=(x)=>{
        setSearchTerm(x)
    }

    const  getAllOrders = async()=>{
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/auth/admin/allorders`, {
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
        <div className="admin" style={{position:"relative",top:"80px"}}>
            {loading?<h1>loading.. .</h1>:
            <>
            <button onClick={() => filterItem('Chunabhatti')}>chunabhatti</button>
            <button onClick={() => filterItem('Manisha')}>manisha</button>
             {
                  allOrders.filter((e)=>{
                    if(searchTerm=='')
                    {return e}
                  if(e.shop.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
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

export default AdminPage
