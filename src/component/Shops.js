import React, { useContext,useState,useEffect } from 'react'
import shopContext from '../context/shops/shopContext';
import Shop from './Shop';

function Shops() {
    // const { getShop, shops } = useContext(shopContext);
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('')
    const [searchTerm, setSearchTerm] = useState('');
    
    const shopinitial = [];
    const AllShopinitial = [];
    const [shops,setShops] = useState(shopinitial);
    const [loading,setLoading] = useState(true)
    const [allShops,setAllShops] = useState(AllShopinitial);
    const [allLoading,setAllLoading] = useState(true)


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
            setLoading(false);
  }
  
    const getShop =async ()=>{
        console.log(loading)
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

    const fetchingAll =async()=>{
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/shops/allshops`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                //   body: JSON.stringify({longitude,latitude })
                  });
                  const json = await response.json();
                  setAllShops(json);
                  setAllLoading(false);
        }


     useEffect(() => {
        getShop();
        fetchingAll();
        getLetLong();
        window.scrollTo(0, 0)
    }, [])

   const getLetLong =()=>{       
    if('geolocation' in navigator)
    {
    navigator.geolocation.getCurrentPosition(function(position)
      {
        const long = position.coords.longitude;
        const lat =  position.coords.latitude;
        setLatitude(lat);
        setLongitude(long);
    })
    }
   } 

    return (
        <>
        <div className="shopsPageAdvertise">
         <h1 className=" shopsPageAdvertise_Heading"> Beer, Whiskey, Wine and Spirits delivered in under 25 minute</h1>
          <div className="seachShopDiv"> <input class="form-control mr-sm-2 search" type="search" placeholder="Search Near By Shop under 3kms" aria-label="Search"   onChange={e => { setSearchTerm(e.target.value) }}/>
         <button class="btn  my-2 my-sm-0 searchBtn"><i class="fas fa-search"></i></button></div>  
        </div>
        {loading?<h1>Loading .. .</h1>:
        <>
        <p className="nearByHeading">Near By Shops</p>
           <div className="my-5 parentShop row">
            {
                shops.filter((shop)=>{
                    if (searchTerm == "") {
                                return shop
                            }

                            else if (shop.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return shop
 }
                }).map((shop,index) => {
                 //   console.log(index)
                    return <div className="col-lg-4">
                     <Shop latitude={latitude} longitude={longitude} shop={shop}/> 
                    </div>
                })
            }
        </div>
        </>
        }
        {
            allLoading?<h1>Loading .. .</h1>:
            <>
            <h1 className="nearByHeading">All Registered Shops</h1>
           <div className="my-5 parentShop row">
            {
                allShops.filter((shop)=>{
                    if (searchTerm == "") {
                                return shop
                            }

                            else if (shop.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return shop
 }
                }).map((shop,index) => {
                 //   console.log(index)
                    return <div className="col-lg-4">
                     <Shop latitude={latitude} longitude={longitude} shop={shop}/> 
                    </div>
                })
            }
        </div>
        </>
        }
     
        </>
    )
}

export default Shops
