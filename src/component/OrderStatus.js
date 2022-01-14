import React,{useState,useEffect} from 'react'
import {
    Link,useParams
   } from "react-router-dom";


function OrderStatus() {
    const [status, setStatus] = useState('placeOrder')
    const currentStatus =  useParams().status
    // useEffect(() => {
    //     setStatus(currentStatus)
    // }, [])
    // console.log(currentStatus)
    // return (
    //     <div>
    //          <div className="orderStatusDiv">
    //                  <h2 className="trackHeading">Track Your Order</h2>
    //                  <i></i>
    //                  <div className="trackDivMain">
    //                  <div className="trackDiv">
    //                  <i class="fas fa-clipboard-check trackIcon trackIcon1"  style={{color:"grey"}}></i>
    //                <i class="fas fa-circle trackCircle"   style={{color:"grey"}}></i>
    //                <p className="trackTitle trackTitle1 "   style={{color:"grey"}}>Order Placed</p>
    //               </div>
    //               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"grey"}}></div>
    //               <div className="trackDiv">
    //                <i class="fas fa-check-double trackIcon trackIcon2" style={{color:"rgb(0, 101, 112)"}}></i>
    //                  <i class="fas fa-circle trackCircle" style={{color:"rgb(0, 101, 112)"}}></i>
    //                  <p className="trackTitle trackTitle2" style={{color:"rgb(0, 101, 112)"}}>Order Placed</p>
    //                 </div>
    //                 <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"rgb(0, 101, 112)"}}></div>
    //                 <div className="trackDiv">
    //                  <i class="fas fa-biking trackIcon trackIcon3"></i>
    //                 <i class="fas fa-circle trackCircle"></i>
    //                 <p className="trackTitle trackTitle3">Order Placed</p>
    //                </div>
    //                <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px'}}></div>
    //                <div className="trackDiv">
    //                 <i class="far fa-smile trackIcon trackIcon4"></i>
    //                 <i class="fas fa-circle trackCircle"></i>
    //                 <p className="trackTitle trackTitle4">Order Placed</p>
    //                </div>
    //                </div>
    //             </div>
    //         </div>

    // )
    if(currentStatus=='Place Order')
    {

        return (
            <div>
            <div className="orderStatusDiv">
                    <h2 className="trackHeading">Track Your Order</h2>
                    <i></i>
                    <div className="trackDivMain">
                    <div className="trackDiv">
                    <i class="fas fa-clipboard-check trackIcon trackIcon1" style={{color:"rgb(0, 101, 112)"}}></i>
                    <i class="fas fa-circle trackCircle"  style={{color:"rgb(0, 101, 112)"}}></i>
                    <p className="trackTitle trackTitle1 "  style={{color:"rgb(0, 101, 112)"}}>Order Placed</p>
                   </div>
                   <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px'}}></div>
                   <div className="trackDiv">
                    <i class="fas fa-check-double trackIcon trackIcon2"></i>
                    <i class="fas fa-circle trackCircle"></i>
                    <p className="trackTitle trackTitle2">Order Placed</p>
                   </div>
                   <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px'}}></div>
                   <div className="trackDiv">
                    <i class="fas fa-biking trackIcon trackIcon3"></i>
                    <i class="fas fa-circle trackCircle"></i>
                    <p className="trackTitle trackTitle3">Order Placed</p>
                   </div>
                   <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px'}}></div>
                   <div className="trackDiv">
                    <i class="far fa-smile trackIcon trackIcon4"></i>
                    <i class="fas fa-circle trackCircle"></i>
                    <p className="trackTitle trackTitle4">Order Placed</p>
                   </div>
                   </div>
                </div>
            </div>
        )
    }
     if(currentStatus=='Confirmed')
    { return (
        <div>
        <div className="orderStatusDiv">
                <h2 className="trackHeading">Track Your Order</h2>
                <i></i>
                <div className="trackDivMain">
                <div className="trackDiv">
                <i class="fas fa-clipboard-check trackIcon trackIcon1"  style={{color:"grey"}}></i>
                <i class="fas fa-circle trackCircle"   style={{color:"grey"}}></i>
                <p className="trackTitle trackTitle1 "   style={{color:"grey"}}>Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"grey"}}></div>
               <div className="trackDiv">
                <i class="fas fa-check-double trackIcon trackIcon2" style={{color:"rgb(0, 101, 112)"}}></i>
                <i class="fas fa-circle trackCircle" style={{color:"rgb(0, 101, 112)"}}></i>
                <p className="trackTitle trackTitle2" style={{color:"rgb(0, 101, 112)"}}>Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"rgb(0, 101, 112)"}}></div>
               <div className="trackDiv">
                <i class="fas fa-biking trackIcon trackIcon3"></i>
                <i class="fas fa-circle trackCircle"></i>
                <p className="trackTitle trackTitle3">Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px'}}></div>
               <div className="trackDiv">
                <i class="far fa-smile trackIcon trackIcon4"></i>
                <i class="fas fa-circle trackCircle"></i>
                <p className="trackTitle trackTitle4">Order Placed</p>
               </div>
               </div>
            </div>
        </div>
    )

   }
    if(currentStatus=='Dispatched')
    { return (
        <div>
        <div className="orderStatusDiv">
                <h2 className="trackHeading">Track Your Order</h2>
                <i></i>
                <div className="trackDivMain">
                <div className="trackDiv">
                <i class="fas fa-clipboard-check trackIcon trackIcon1" style={{color:"grey"}}></i>
                <i class="fas fa-circle trackCircle"  style={{color:"grey"}}></i>
                <p className="trackTitle trackTitle1"  style={{color:"grey"}}>Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"grey"}} ></div>
               <div className="trackDiv">
                <i class="fas fa-check-double trackIcon trackIcon2"  style={{color:"grey"}}></i>
                <i class="fas fa-circle trackCircle"  style={{color:"grey"}}></i>
                <p className="trackTitle trackTitle2" style={{color:"grey"}}>Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"grey"}}></div>
               <div className="trackDiv">
                <i class="fas fa-biking trackIcon trackIcon3" style={{color:"rgb(0, 101, 112)"}}></i>
                <i class="fas fa-circle trackCircle" style={{color:"rgb(0, 101, 112)"}}></i>
                <p className="trackTitle trackTitle3" style={{color:"rgb(0, 101, 112)"}}>Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"rgb(0, 101, 112)"}}></div>
               <div className="trackDiv">
                <i class="far fa-smile trackIcon trackIcon4"></i>
                <i class="fas fa-circle trackCircle"></i>
                <p className="trackTitle trackTitle4">Order Placed</p>
               </div>
               </div>
            </div>
        </div>
    )

    }
    if(currentStatus=='Complete')
    { return (
        <div>
        <div className="orderStatusDiv">
                <h2 className="trackHeading">Track Your Order</h2>
                <i></i>
                <div className="trackDivMain">
                <div className="trackDiv">
                <i class="fas fa-clipboard-check trackIcon trackIcon1" style={{color:"grey"}}></i>
                <i class="fas fa-circle trackCircle"  style={{color:"grey"}}></i>
                <p className="trackTitle trackTitle1 "  style={{color:"grey"}}>Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"grey"}}></div>
               <div className="trackDiv">
                <i class="fas fa-check-double trackIcon trackIcon2"  style={{color:"grey"}}></i>
                <i class="fas fa-circle trackCircle"  style={{color:"grey"}}></i>
                <p className="trackTitle trackTitle2"  style={{color:"grey"}}>Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"grey"}}></div>
               <div className="trackDiv">
                <i class="fas fa-biking trackIcon trackIcon3"  style={{color:"grey"}}></i>
                <i class="fas fa-circle trackCircle"  style={{color:"grey"}}></i>
                <p className="trackTitle trackTitle3"  style={{color:"grey"}}>Order Placed</p>
               </div>
               <div className="trackLine" style={{border:'1px solid',width:'1px',height:'60px',color:"grey"}}></div>
               <div className="trackDiv">
                <i class="far fa-smile trackIcon trackIcon4" style={{color:"rgb(0, 101, 112)"}}></i>
                <i class="fas fa-circle trackCircle" style={{color:"rgb(0, 101, 112)"}}></i>
                <p className="trackTitle trackTitle4" style={{color:"rgb(0, 101, 112)"}}>Order Placed</p>
               </div>
               </div>
            </div>
        </div>
    )

    }
}

export default OrderStatus
