import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Product from '../component/Product';
import { ListProducts, FilterProductList } from '../actions/productActions'

import Shop from '../component/Shop';

function ShopsWithProduct() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)

    const AllShopinitial = [];
    const [allShops, setAllShops] = useState(AllShopinitial);
    const [allLoading, setAllLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');
    const [shop, setShop] = useState('')
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('')
    const [category, setCategory] = useState('All Product')


    const AllDistances = [];

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var R = 6371; // Radius of the earth in km
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d
        // console.log(d)
    }

    const nearestShop = (shops, latitude, longitude) => {
        let lat1 = latitude;
        let lon1 = longitude;

        shops.forEach(e => {
            AllDistances.push(getDistanceFromLatLonInKm(lat1, lon1, e.location.coordinates[0], e.location.coordinates[1]))
        })
        if (AllDistances.length == shops.length) {
            const min = AllDistances.indexOf(Math.min(...AllDistances))
            console.log(min)
            setShop(shops[min].title)
            localStorage.setItem('shop',shops[min].title)
            dispatch(ListProducts(shops[min].title));

        }
    }

    const getShop = async () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                console.log(latitude, longitude)
                fetchingAll(longitude, latitude)
            })

        }
    }

    const fetchingAll = async (longitude, latitude) => {
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/shops/allshops`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            //   body: JSON.stringify({longitude,latitude })
        });
        const json = await response.json();
        setAllShops(json);
        nearestShop(json, latitude, longitude)
        setAllLoading(false);
    }
  
    let { loading, error, products } = productList;


        
    const filterItem = (cate) => {
        if (cate !== '') {
            setCategory(cate)
        }
        else if (cate === '') {
            setCategory("All Drinks")
        }
        dispatch(FilterProductList(cate, shop))
    }



    useEffect(() => {
        getShop();
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className="shopsPageAdvertise">
                <h1 className=" shopsPageAdvertise_Heading"> Beer, Whiskey, Wine and Spirits delivered in under 25 minute</h1>
                <div className="seachShopDiv"> <input class="form-control mr-sm-2 search" type="search" placeholder="Search Near By Shop under 3kms" aria-label="Search" />
                    <button class="btn  my-2 my-sm-0 searchBtn"><i class="fas fa-search"></i></button>.
                </div>
            </div>
            <div style={{overflow:'hidden'}}>
            <div className='wrapper'>
                            <div className="item"><button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('')}>All</button></div>
                                <div className="item"> <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Rum')}>Rum</button></div>
                                <div className="item"> <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Beer')}>Beer</button></div>
                                <div className="item"> <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('')}>All</button></div>
                                <div className="item"> <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Beer')}>Beer</button></div>
                                <div className="item">  <button className="categoryButton btn btn-outline-dark" onClick={() => filterItem('Rum')}>Rum</button></div>
                            </div>
            </div>     
          
            {
                loading ? <h1>Product Loading</h1> :
                    <>
                    <h1 className="allProductWithCategoryHeadingFront">
                    {category}s
                </h1>

                        {products.length == 0 ? shop
                            :
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

                        }
                    </>
            }
            {
                allLoading ? <h1>Loading .. .</h1> :
                    <>
                        <h1 className="nearByHeading">All Registered Shops</h1>
                        <div className="my-5 parentShop row">
                            {
                                allShops.filter((shop) => {
                                    if (searchTerm == "") {
                                        return shop
                                    }

                                    else if (shop.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                        return shop
                                    }
                                }).map((shop, index) => {
                                    //   console.log(index)
                                    return <div className="col-lg-4">
                                        <Shop latitude={latitude} longitude={longitude} shop={shop} />
                                    </div>
                                })
                            }
                        </div>
                    </>
            }

        </>
    )
}
export default ShopsWithProduct