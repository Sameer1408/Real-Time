// import {
//     MYORDER_LIST_REQUEST,
//     MYORDER_LIST_SUCCESS,
//     MYORDER_LIST_FAIL ,
// } from '../constants/myOders'

// const MyOrders =()=>async(dispatch) =>{
//     try{
//         dispatch({type:MYORDER_LIST_REQUEST})
//         const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/cart/getMyOrder`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'auth-token': localStorage.getItem('token')
//             },
//         //    body: JSON.stringify({ shopName})
//           });
//           const json = await response.json();
//           dispatch({
//               type:MYORDER_LIST_SUCCESS,
//               payload:json
//           })
    
//     } catch (error) {
//         dispatch({
//             type:MYORDER_LIST_FAIL,
//             payload:error
//         })
// }
// }
// export default MyOrders;
import {
    MYORDER_CREATE_REQUEST,
    MYORDER_CREATE_SUCCESS,
    MYORDER_CREATE_FAIL ,
} from '../constants/myOders'

export const createOrder=(order)=>async(dispatch,getState)=>{

    try{
        dispatch({
            type: MYORDER_CREATE_REQUEST,
        })
        // const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/cart/order`, {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'auth-token': localStorage.getItem('token')
        //     },
        //     body: JSON.stringify(order)
        //   });
        //  const json = await response.json();
        // console.log(json)
        console.log(order)
        dispatch({type:MYORDER_CREATE_SUCCESS})
    }catch(error){
        dispatch({
            type:MYORDER_CREATE_FAIL,
            payload:error
        })
    }

}