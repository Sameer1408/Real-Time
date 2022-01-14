import React, { useContext, useState, useEffect } from 'react'
import shopContext from '../context/shops/shopContext';
import Shop from './Shop';
import Product from '../component/Product';
import { ListProducts, FilterProductList } from '../actions/productActions'
import { useSelector, useDispatch } from 'react-redux'
function Shops() {
    // const { getShop, shops } = useContext(shopContext);
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('')
    const [searchTerm, setSearchTerm] = useState('');

    const shopinitial = [];
    const AllShopinitial = [];
    const [shop, setShop] = useState('')
    const [shops, setShops] = useState(shopinitial);
    const [loading1, setLoading1] = useState(true)
    const [allShops, setAllShops] = useState(AllShopinitial);
    const [allLoading, setAllLoading] = useState(true)

    let { loading, error, products } = productList;

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    //Finding Most Nearest Shop
    let AllDistances = [];
    const FindMostNearestShop = (shops, latitude, longitude) => {

        shops.forEach(element => {
            let lat1 = latitude;
            let lon1 = longitude;
            let lat2 = element.location.coordinates[0];
            let lon2 = element.location.coordinates[1];
            // console.log(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2))
            AllDistances.push(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2))
        });
        console.log(shops[show()]);
        setShop(shops[show()])
        dispatch(ListProducts(shops[show()]));
    }
    const show = () => {
        // min = AllDistances[0]
        // AllDistances.forEach(e=>{
        //     console.log(e)
        // })
        const min = AllDistances.indexOf(Math.min(...AllDistances))
        return min
    }

    //Fetching shops according to current location
    const fetching = async (longitude, latitude) => {
        const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/shops/near`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longitude, latitude })
        });
        const json = await response.json();
        setShops(json);

        setLoading1(false);
    }

    const getShop = async () => {
        console.log(loading)
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const longitude = position.coords.longitude;
                const latitude = position.coords.latitude;
                console.log(latitude, longitude)
                fetching(longitude, latitude);
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
        FindMostNearestShop(json, longitude, latitude)
        setAllLoading(false);
    }


    useEffect(() => {
        getShop();
        // fetchingAll();
        getLetLong();
        window.scrollTo(0, 0)
    }, [])

    const getLetLong = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const long = position.coords.longitude;
                const lat = position.coords.latitude;
                setLatitude(lat);
                setLongitude(long);
            })
        }
    }

    return (
        <>
            <div className="shopsPageAdvertise">
                <h1 className=" shopsPageAdvertise_Heading"> Beer, Whiskey, Wine and Spirits delivered in under 25 minute</h1>
                <div className="seachShopDiv"> <input class="form-control mr-sm-2 search" type="search" placeholder="Search Near By Shop under 3kms" aria-label="Search" onChange={e => { setSearchTerm(e.target.value) }} />
                    <button class="btn  my-2 my-sm-0 searchBtn"><i class="fas fa-search"></i></button></div>
            </div>
            {
                loading ? <h1>Product Loading</h1> :
                    <>
                        {products.length == 0 ? shop.title
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
            {loading1 ? <h1>Loading .. .</h1> :
                <>
                    <p className="nearByHeading">Near By Shops</p>
                    <div className="my-5 parentShop row">
                        {
                            shops.filter((shop) => {
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
export default Shops