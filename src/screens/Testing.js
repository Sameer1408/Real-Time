import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import shopContext from '../context/shops/shopContext';
import {
  useParams
} from "react-router-dom";
import { useSelector } from 'react-redux';
import Reviews from '../component/Reviews'
import Ask from '../component/Ask'
function Testing(props) {
  const history = useHistory();
  let id = useParams().id;
   const [product, setproduct] = useState({})
  const [qty, setQty] = useState(1)

  const [selectedPrice, setSelectedPrice] = useState('')
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;
 
  const [pop, setpop] = useState("none")


  let productsShop = product.shop

  const addToCartHandler = () => {
    // const cartItems = {
    //   product: id,
    //   quantity: qty,
    //   price: product.price
    // }
    
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
      if(currentShop==productsShop)
      {

        if(selectedPrice!==''){
          history.push(`/${id}/${qty}/${selectedPrice}`)}
          else{
            props.showAlret('Please Select Size of bottle','warning')
          }
      }
      else{
       setpop("block")
      }
    }
  
  }

  const addQuantity = (e) => {
    let add = qty + 1;
    setQty(add)
  }

  const substractQuantity = (e) => {
    let sub = qty - 1;
    setQty(sub)
  }


  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')


  useEffect(() => {
    getdtails(id)
  }, [])

  const getdtails = async (id) => {
    const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      //      body: JSON.stringify({ shopName})
    });
    const json = await response.json();
    setproduct(json.product);
    setLoading(false)
  }

  const onClickYes=()=>{
    localStorage.removeItem('cartItems')
    history.push(`/${id}/${qty}/${selectedPrice}`)
    window.location.reload();
  }

  const onClickNo=()=>{
    setpop("none")
  }

  const handleReviewClick = async () => {
    // console.log(rating)
    // console.log(id);
    // console.log(name);
    // console.log(comment);
    // console.log(rating)
    if (name !== '' && comment !== '') {
      const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/product/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ name, rating, comment, productId: id })
      });
      const json = await response.json();
      console.log(json)
      window.location.reload();
    }
    else {
      props.showAlret('please fill the required details', 'warning');
    }
  }

  let pricetick=(p)=>{
    setSelectedPrice(p)
  }




  return (
    <div style={{ marginTop: "140px" }}>
      {loading ? <h1>loading</h1> :
        <>
          <div class="container">
            <div class="row">
              <div class="col-sm" style={{ overflow: 'hidden' }}>
                <div className="largeImage_product">
                  <img className="largeImage" src={product.image.url}></img>
                </div>
              </div>

              <div class="col-sm">
                <p className='branding'>Some SelfBranding</p>

                <h1 className="product_heading">{product.name}</h1>
                <div className="ml">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onClick={()=>pricetick(product.price.price1000ml)}/>
                    <label class="form-check-label" for="exampleRadios1">
                      <p className="price"><strong>1000ML</strong> Rs {product.price.price1000ml}</p>
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onClick={()=>pricetick(product.price.price750ml)}/>
                    <label class="form-check-label" for="exampleRadios2">
                      <p className="price"> <strong>750ML</strong> Rs {product.price.price750ml}</p>
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" onClick={()=>pricetick(product.price.price350ml)}/>
                    <label class="form-check-label" for="exampleRadios3">
                      <p className="price">  <strong>350ML</strong>Rs {product.price.price350ml}</p>
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" onClick={()=>pricetick(product.price.price180ml)}/>
                    <label class="form-check-label" for="exampleRadios3">
                      <p className="price">   <strong>180ML</strong>Rs {product.price.price180ml}</p>
                    </label>
                  </div>
                  <div>
                  </div>
                  <button className="btn btn-outline-dark" style={{ margin: "3px" }} onClick={addQuantity}>+</button>
                  <h4 style={{ display: 'inline-block', margin: "5px" }} >Quantity : {qty} </h4>
                  <button className="btn btn-outline-dark" style={{ margin: "3px" }} onClick={substractQuantity} disabled={qty <= 1}  >-</button>
                </div>
                <button className="btn addToCartBtn" onClick={addToCartHandler}><i class="fas fa-shopping-cart"></i> Add to Cart</button>
              </div>
            </div>
          </div>
          <div className="review_Section">
            <h4 className="text-center reviewHeading1">What are Customers</h4>
            <h3 className="text-center reviewHeading2"> Are Saying</h3>
            <div className="reviews">
              {product.reviews.map((e) => {
                return <Reviews review={e} />
              })}
            </div>
            <div className="addARiview" style={{ marginBottom: "200px" }}>
              <div class="container">
                <div class="row">
                  <div class="col-sm">
                    <div className="row">

                      <div className="col-sm">
                        <input type="text" className="form-control my-4" id="name" value={name} onChange={e => { setName(e.target.value) }} placeholder="Enter Name" required />
                      </div>

                      <div className="col-sm">
                        <select class="form-control my-4" value={rating} onChange={e => { setRating(e.target.value) }}>
                          <option>5</option>
                          <option>4</option>
                          <option>3</option>
                          <option>2</option>
                          <option>1</option>
                        </select></div>

                    </div>

                    <label for="exampleFormControlTextarea1" className="my-3">Your Valuable Comment</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={comment} onChange={e => { setComment(e.target.value) }}></textarea>

                  </div>
                  <div class="col-sm">
                    <button className="btn btn-danger btn-lg my-4" onClick={handleReviewClick}>Submite Review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      {cartItems.length==0?null:
      <>
      <div className="popDivCart" style={{ display: `${pop}` }}>
      <p>Relpace items already in cart</p>
      <p>Your cart contains drinks from {cartItems[0].shop} Shop.Do you want to discard the secetion and add drinks from {productsShop} Shop </p>
      <button onClick={onClickYes}>yes</button>
      <button onClick={onClickNo}>no</button>
      </div>
      </>
      }
     
    </div>
  )
}

export default Testing