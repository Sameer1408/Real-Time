import shopContext from "./shopContext";
import { useState } from "react";
const ShopState = (props)=>{

  // var [hasInputedTheAge, sethasInputedTheAge] = useState(false);
  const hasInputAge = ()=>
  {
    localStorage.setItem('hasInputedTheAge',true)
  }

  const shopinitial = [];
  const productInitial = [];
  const [shops,setShops] = useState(shopinitial);
  const [products, setProducts] = useState(productInitial);
  const [person,setPerson] = useState('');

 
  const getUser = async()=>{

    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/auth/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    //  body: JSON.stringify({ shopName})
    });
    const json = await response.json()
    setPerson(json.user); 
        
  }

  //Adding Products to add to Cart:
  // const addToCart = async(cartItems)=>{
  //   const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/cart/addtocart`,{
  //     method:'POST',
  //     headers:{
  //       'Content-Type': 'application/json',
  //       'auth-token':localStorage.getItem('token')
  //     },
  //     body:JSON.stringify({cartItems})
  //   })
  // }


  //Fetching products according to shop
  const fetchProducts = async(shopName)=>{
    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/fetchProducts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
       body: JSON.stringify({ shopName})
      });
      const json = await response.json()
      setProducts(json.products);   
  }
  
  //Fetching shops according to current location
  const fetching =async(longitude,latitude)=>{
  const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/shops/near`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify({longitude,latitude })
          });
          const json = await response.json();
          setShops(json);
}

  const getShop =async ()=>{
     if('geolocation' in navigator)
      {
      navigator.geolocation.getCurrentPosition(function(position)
        {
          const longitude = position.coords.longitude;
          const latitude =  position.coords.latitude;
          fetching(longitude,latitude);    
     })
     
      }
  }

return(
        <shopContext.Provider value={{hasInputAge,getShop,shops,fetchProducts,products,getUser,person}}>
            {props.children}
        </shopContext.Provider>
    )
}
export default ShopState;
    // const updatenote=async(id,title,description,tag)=>
    // {
    //   console.log(id,title, description,tag)
    //     const response = await fetch(`http://localhost:5500/api/notes/updatenote/${id}`, {
    //         method: 'PUT',
      
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'auth-token': localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({ title, description, tag })
    //       });
        
    //     for(let i=0;i<notes.length;i++)
    //     {
    //       let element = notes[i];
    //       if (element._id === id) {
    //         element.title = title;
    //         element.description = description;
    //         element.tag = tag;
    //       }
    //     }  
    // }
