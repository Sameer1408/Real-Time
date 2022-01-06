import React, {useContext,useEffect,useLayoutEffect } from 'react'
import Shops from '../component/Shops'
import shopContext from '../context/shops/shopContext';

function Home() {

    // var bool = false;
    // useEffect(() => {
    //     refresh();
    // }, [])

    // const refresh=(bool)=>{
    //     if(bool===false)
    //     {
    //         console.log(bool);
    //       //  window.location.reload();
    //         bool=true;
    //     }
    // }

  
    return (
        <div>
         {/* <Navbar/>  */}
         <Shops/>
        </div>
    )
}

export default Home
