import React, { useContext, useLayoutEffect, useState, useEffect } from 'react'
import shopContext from '../context/shops/shopContext';
import {
  Link
} from "react-router-dom";
import logoImage from '../images/logo.PNG'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Navs from './Navs';

function Navbar(props) {
  const history = useHistory();
  const { } = useContext(shopContext);

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  const [pop, setPop] = useState("none")

  useLayoutEffect(() => {
    getUser();
  }, []);

  const [person, setPerson] = useState({})
  const getUser = async () => {
    if (localStorage.getItem('token')) {
      const response = await fetch(`https://salty-inlet-39033.herokuapp.com/api/auth/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json()
      setPerson(json.user);
      console.log(json.user)
    }
  }
  let name = null;

  if (person !== null) {
    name = person.name;
    //console.log(name)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
    window.location.reload();
    closePop();
  }

  const OpenPop = () => {
    setPop("block")
  }

  const closePop = () => {
    setPop("none")
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light nav_style" style={{ zIndex: 2 }}>
        <Link class="navbar-brand nav_logo" to="/home"><img src={logoImage} style={{ height: "50px" }}></img></Link>
        {localStorage.getItem('hasInputedTheAge') ? <>

          <Link className="user_name_navbar">Hello {name} !</Link>


          <p className="nav-item navbar-brand navs" onClick={OpenPop} ><Navs /></p>
          <Link class="nav-item nav-cart navbar-brand" to="/:id/:qty/:price"><button className="btn cartBtn"><i class="fas fa-shopping-bag bg"></i></button>  {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0) >= 1 ? <div className="cirlce_div">{cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} </div> : null}</Link>


        </> : null}


        <ul class="navbar-nav mr-auto">
          {localStorage.getItem('hasInputedTheAge') ? <>
            <li class="nav-item active">
              <Link class="nav-link homeLink" to="/home">Shops <span class="sr-only">(current)</span></Link>
            </li>
            {localStorage.getItem('token')
              ?
              <Link class="nav-pro navbar-brand" to="/profile"><i class="fas fa-user-alt"></i></Link>
              :
              <Link class="nav-pro navbar-brand" to="/login"><i class="fas fa-user-alt"></i></Link>
            }

            <Link class="logoutButton navbar-brand" onClick={handleLogOut}><i class="fas fa-sign-out-alt"></i></Link>
          </> :
            null
          }

        </ul>
      </nav>
      <div className="Pop" style={{ display: `${pop}` }}>
      <p className="navsHelloName">Hello {name} !</p>
      <p onClick={closePop} className=""><i class="fas fa-times cross"></i></p>
        <div className="allNavs">
          {localStorage.getItem('token')
            ?
            <Link onClick={closePop} to="/profile">
              <div className="navsProfile">
                <i class="far fa-user navsProfileIcon"></i>
                <p className="navsProfileText">Profile</p>
              </div></Link>
            :
            <Link onClick={closePop} to="/login">
              <div className="navsProfile">
                <i class="far fa-user navsProfileIcon"></i>
                <p className="navsProfileText">Profile</p>
              </div></Link>
          }

          <Link to="/home" onClick={closePop}>
            <div className="navsHome">
              <i class="fas fa-store navsHomeIcon"></i>
              <p className="navsHomeText">Shops</p></div>
          </Link>

          <div className="navsContact">
            <i class="far fa-comment-dots navsContactIcon"></i>
            <p className="navsContactText">Contact Us</p>
          </div>
          {
              localStorage.getItem('token')? <Link  onClick={handleLogOut}> 
           <div className="navsLogout">
            <i class="fas fa-sign-out-alt navsLogoutIcon"></i>
            <p className="navsLogoutText">Logout</p>
          </div>
          </Link> 
          :null

          }
         
        
        </div>
      </div>
    </div>
  )
}

export default Navbar
