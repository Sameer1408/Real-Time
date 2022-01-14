import React,{useContext,useState} from 'react'
import shopContext from '../context/shops/shopContext';
import {
    Link,useParams
   } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

function Product(props) {
    const {} = useContext(shopContext);
    const history =  useHistory();
    const [productId, setproductId] = useState(0)
    const bottleSize1L=()=>{
      console.log("bottleSize")
    }

    const [selectedPrice, setSelectedPrice] = useState('')
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;    
    const [pop, setpop] = useState("none")
    
    const showShortCutDiv=(id)=>{
      console.log(id)
      setproductId(id)
    }

    const cancel=()=>{
      setproductId(0)  
    }

    const onClickYes=()=>{
      localStorage.removeItem('cartItems')
      history.push(`/${props.product._id}/${1}/${selectedPrice}`)
      window.location.reload();
    }
  
    const onClickNo=()=>{
      setpop("none")
    }

    const AddToCart=(price)=>{
      setSelectedPrice(price)
      addToCartHandler(props.product._id,1,price)
    }

    const addToCartHandler = (id=props.product._id,qty,selectedPrice) => {
      if(cartItems.length==0)
      {
        if(selectedPrice!==''){
          history.push(`/${id}/${qty}/${selectedPrice}`)}
          else{
            props.showAlret('Please Select Size of bottle','warning')
          }
      }
      else{
        let currentShop = cartItems[0].shop
        if(currentShop==props.product.shop)
        {
  
          if(selectedPrice!==''){
            history.push(`/${id}/${qty}/${selectedPrice}`)}
            else{
              props.showAlret('Please Select Size of bottle','warning')
            }
        }
        else{
          localStorage.removeItem('cartItems')
          history.push(`/${props.product._id}/${1}/${selectedPrice}`)
          window.location.reload();
        }
      }
    
    }

    return (
           <>
         <div className="mx-3 child" style={{textAlign:"left"}}>
         <i class="fas fa-plus plus" onClick={()=>showShortCutDiv(props.product._id)}></i>
          {
            productId==props.product._id?<div className="ShortcutToCart" id={props.product._id}>
            <i class="fas fa-times cancelPlus" onClick={cancel}></i>
              <p onClick={()=>AddToCart(props.product.price.price1000ml)} className="productSizeShortCut"><strong>1000ML</strong> Rs {props.product.price.price1000ml}</p>
              <p onClick={bottleSize1L(props.product.price.price750ml)} className="productSizeShortCut"><strong>750ML</strong> Rs {props.product.price.price750ml}</p>
              <p onClick={bottleSize1L(props.product.price.price350ml)} className="productSizeShortCut"><strong>350ML</strong> Rs {props.product.price.price350ml}</p>
              <p onClick={bottleSize1L(props.product.price.price180ml)} className="productSizeShortCut"><strong>180ML</strong> Rs {props.product.price.price180ml}</p>
            </div>:null
          }
           
           <Link to={`/${props.product._id}`}>
            <div className="products_image">
            <img className="card-img-top product_img" src={props.product.image.url} alt="Card image cap"/>
           </div>
           <p class="products_productName">{props.product.name}</p>
            <p className="products_ActuallPrice">Rs {props.product.price.price1000ml} of 1liter</p>
            <p className="products_discountPrice">Rs{props.product.price.price1000ml+100}</p>
          </Link>
        </div>
        {cartItems.length==0?null:
      <>
      <div className="popDivCart" style={{ display: `${pop}` }}>
      <p className="ReplaceHeading">Relpace items already in cart</p>
      <p className="ReplacePara">Your cart contains drinks from {cartItems[0].shop} Shop.Do you want to discard the secetion and add drinks from {props.product.shop} Shop </p>
      <button className="btn btn-outline-dark" style={{marginRight:'10px'}} onClick={onClickYes}>yes</button>
      <button className="btn btn-outline-dark" onClick={onClickNo}>no</button>
      </div>
      </>
      }
      </>
    )
}

export default Product