import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILS, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILS,
    PRODUCT_FILTER_REQUEST,
    PRODUCT_FILTER_FAIL,
    PRODUCT_FILTER_SUCCESS,
} from '../constants/productConstant'

export const ListProducts = (shopName) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/fetchProducts`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
           body: JSON.stringify({ shopName})
          });
          const json = await response.json();
          dispatch({
              type:PRODUCT_LIST_SUCCESS,
              payload:json
          })
    }
    catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAILS,
            payload:error
        })
    }
}



export const FilterProductList = (category,shopName)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_FILTER_REQUEST})
    
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/fetchProducts/filter/category`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
           body: JSON.stringify({ category,shopName})
          });

        const json = await response.json();
        dispatch({
            type:PRODUCT_FILTER_SUCCESS,
            payload:json
        })
    }
    catch (error) {
        dispatch({
            type:PRODUCT_FILTER_FAIL,
            payload:error
        })
}

}


export const DetailsProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('token')
            },
     //      body: JSON.stringify({ shopName})
          });
          const json = await response.json();
          dispatch({
              type:PRODUCT_DETAILS_SUCCESS,
              payload:json
          })
    }
    catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAILS,
            payload:error
        })
    }
}
