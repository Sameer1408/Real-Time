import React,{useContext} from 'react'
import shopContext from '../context/shops/shopContext';
import {
    Link,useParams
   } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Product(props) {
    const {} = useContext(shopContext);
    
    return (
           <>
         <div className="mx-3 child" style={{textAlign:"left"}}>
           <Link to={`/${props.product._id}`}>
            <div className="products_image">
            <img className="card-img-top product_img" src={props.product.image.url} alt="Card image cap"/>
            </div>
            <p class="products_productName">{props.product.name}</p>
            <p className="products_ActuallPrice">Rs {props.product.price.price1000ml} of 1liter</p>
            <p className="products_discountPrice">Rs{props.product.price.price1000ml+100}</p>
          </Link>
        </div>
      </>
    )
}

export default Product