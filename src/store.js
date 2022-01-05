import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer} from './reducers/productReducer'
import { productDetailsReducer } from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducer'
import { myOrderCreateReducer } from './reducers/myorderReducer'

 const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
 JSON.parse(localStorage.getItem('shippingAddress')):{
 }

const cartItemsFromStorage = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:cartReducer,
    myOrder:myOrderCreateReducer,

})

const initialState = {
    //cart:{cartItems:'techinfo'}
   cart:{cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage
}
}
const middleware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));
export default store;