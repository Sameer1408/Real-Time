import React, { useContext, useEffect,useState } from 'react'
import shopContext from '../context/shops/shopContext';
import {
    Link
} from "react-router-dom";
import { useHistory } from 'react-router';

function Shop(props) {


   
    let history = useHistory();
    const handleClick = () => {
        if(localStorage.getItem('token')){
        history.push(`/products/${props.shop.title}`)
        localStorage.setItem('currentShop',props.shop.title)
    }
        else{
            history.push(`/login`)
        }
    }

    // console.log(props.shop.location.coordinates)
    let lat1 = props.latitude;
    let lon1 = props.longitude;
    let lat2 = props.shop.location.coordinates[0];
    let lon2 = props.shop.location.coordinates[1];

    useEffect(() => {
        getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2)
    }, [])

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    const [distance, setdistance] = useState(0)

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
       setdistance(d)
    }


    
    return (
        <div className="child shop">

            <div className={`card`}>
                <img className="card-img-top" src={props.shop.image.url} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{props.shop.title}</h5>
                    <button type="button" onClick={handleClick} class="btn btn-outline-dark">Shop now</button>
                    {distance<100?<p className="distanceAway"><i class="fas fa-street-view"></i> {String(distance).slice(0,3)} Kms away</p>:null}
                </div>
            </div>
            {/* <img src={props.shop.image.url} className="shopImage"/> */}
            {/* <h3>{props.shop.title}</h3>
           <button type="button" onClick={handleClick} class="btn btn-outline-danger">Shop now</button>  */}
        </div>
    )
}
// {`mx-3 shop ${props.index%2===0?`left`:`right`}`}
export default Shop