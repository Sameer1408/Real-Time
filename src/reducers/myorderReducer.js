import {
    MYORDER_CREATE_REQUEST,
    MYORDER_CREATE_SUCCESS,
    MYORDER_CREATE_FAIL ,
} from '../constants/myOders'

export const myOrderCreateReducer=(state={},action)=>{
    switch(action.type){
        case MYORDER_CREATE_REQUEST:
        return {loading:true}
        case MYORDER_CREATE_SUCCESS:
            return {loading:false,success:true,order:action.payload}
        case MYORDER_CREATE_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state            
    }
}

// export const myOrderListReducer = (state={myOrders:[]},action)=>{
//     switch(action.type)
//     {
//         case MYORDER_LIST_REQUEST:
//             return {
//                 loading: true,
//                 myOrders: []
//             }
//         case MYORDER_LIST_SUCCESS:
//             return {
//                 loading: false,
//                 myOrders: action.payload
//             }
//         case MYORDER_LIST_FAIL:
//             return{
//                 loading: false,
//                 error: action.payload
//             }
//     }
// } 