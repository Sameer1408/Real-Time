import React, { useContext, useState, useEffect } from 'react'
import loading from '../images/loading2.gif'
import Product from '../component/Product';
import { ListProducts, FilterProductList } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
import {
    useParams
} from "react-router-dom";

function Products(props) {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)


    const shopName = useParams().shopName;
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('All Product')

    useEffect(() => {
        dispatch(ListProducts(shopName));
        window.scrollTo(0, 0)
    }, [])

    let { loading, error, products } = productList;

  

    const filterItem = (cate) => {
        if (cate !== '') {
            setCategory(cate)
        }
        else if (cate === '') {
            setCategory("All Product")
        }
        dispatch(FilterProductList(cate, shopName))
    }


    //console.log(products)
    return (
        <>
            <div className="my-5" style={{ position: "relative", top: "40px" }}>
        {
            loading?
            <img src={loading}></img>
            :
            <>
               {/* <input type="search" className="search mr-sm-2" placeholder="search here" onChange={e => { setSearchTerm(e.target.value) }} /> */}
                {/* <form class="form-inline my-2 my-lg-0"> */}
                <div class="container features">
                    <div class="row">
                        <div class="col-sm">
                            <div className="searchDiv">
                                <input class="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search" onChange={e => { setSearchTerm(e.target.value) }} />
                                <button class="btn  my-2 my-sm-0 searchBtn"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                        <div className="col-sm ">
                            {/* <div className="wrapper"> */}
                            <div className='wrapper'>
                            <div className="item"><button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('')}>All</button></div>
                                <div className="item"> <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Rum')}>Rum</button></div>
                                <div className="item"> <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Beer')}>Beer</button></div>
                                <div className="item"> <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('')}>All</button></div>
                                <div className="item"> <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Beer')}>Beer</button></div>
                                <div className="item">  <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Rum')}>Rum</button></div>
                            </div>
                                
                            {/* </div> */}
                        </div>
                        {/* <div class="col-sm categoryButtonsDiv text-center">
                        <div>
                    <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('')}>All</button>
                    <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Rum')}>Rum</button>
                    <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Beer')}>Beer</button>
                    <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('')}>All</button>
                    <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Rum')}>Rum</button>
                    <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Beer')}>Beer</button>
                    <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('')}>All</button>
                    <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Rum')}>Rum</button>
                    
                </div>
                        </div> */}
                    </div>
                </div>

                {/* </form> */}

                <hr className="allProductsMargin text-center" />
                <h1 className="allProductWithCategoryHeading">
                    {category}s
                </h1>
                <div className="parent products row my-2" style={{ width: "100%", }}>

                    {
                        products.filter((product) => {
                            if (searchTerm == "") {
                                return product
                            }

                            else if (product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return product
                            }
                        }).map((product) => {
                            return <div className="col-6 col-lg-3">
                                <Product product={product} />
                            </div>
                        })
                    }
                </div>
            </>
        }

             
            </div>

        </>
    )
}

export default Products
