import React, { useState,useContext } from 'react'
import { useHistory } from "react-router-dom";
import shopContext from '../context/shops/shopContext';

function UnderOrAboveAge(props) {

    const {hasInputAge,getShop,getUser} = useContext(shopContext);
    const [year, setYear] = useState("")

    let history = useHistory();

    let HandleChange = (event) => {
        let input = event.target.value
        setYear(input)
    }
    let HandleClick = (event) => {
        event.preventDefault();
        //getShop();
        setYear("");
        const age = Number(year);
        if (age >= 1950 && age <= 2000) {
          hasInputAge();
          getUser();
          history.push("/home");
        }
        else{
            props.showAlret("sorry you are not eligible to access this website",'warning')
        }
    }
    return (
         <div className="text-center container ageChecker_div">
           <div className="age_div">
            <form class="form-signin">
                {/* <img class="mb-4" src={logoImage} alt="" width="72" height="72" /> */}
                <h1 class="h3 mb-3 font-weight-normal dateOfBirthHeading">Please Enter Your Year Of Birth</h1>
                <input type="number" id="year" class="form-control text-center" value={year} onChange={HandleChange} placeholder="YYYY" required autofocus />
                <button class="btn btn-lg btn-primary btn-block year_btn" onClick={HandleClick}>YEAR</button>
              </form>
              </div>
        </div>
    )
}

export default UnderOrAboveAge
