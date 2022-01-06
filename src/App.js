import './App.css';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './screens/Home';
import UnderOrAboveAge from './component/UnderOrAboveAge';
import ShopState from './context/shops/ShopState';
import Navbar from './component/Navbar';
import SignUp from './component/SignUp';
import Login from './component/Login';
import Products from './screens/Products';
import Footer from './component/Footer';
import Alert from './component/Alert';
import Checkout from './screens/Checkout';
import UploadProduct from './screens/UploadProduct';
import Testing from './screens/Testing';
import AddtoCart from './screens/AddtoCart';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import CreateShop from './screens/CreateShop';
import ShippingScreen from './screens/ShippingScreen';
import CheckOutSteps from './screens/CheckOutSteps';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import NavLinks from './component/NavLinks';
import TestingPayment from './component/TestingPayment';
import AdminPage from './screens/AdminPage';
import OdersShop from './component/OdersShop';
import OrderStatus from './component/OrderStatus';
import OrdersShopManisha from './component/OrdersShopManisha';


function App() {
  const [alert, setAlert] = useState(null)
  const showAlret = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }




  return (
    <>
      <ShopState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <Switch>
            <Route exact path="/">
              <UnderOrAboveAge showAlret={showAlret} />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/orderStatus/:status">
              <OrderStatus />
            </Route>
            <Route exact path="/ordersshopchunabhatti">
              <OdersShop />
            </Route>
            <Route exact path="/ordersshopmanisha">
              <OrdersShopManisha />
            </Route>
            <Route exact path="/admin">
              <AdminPage />
            </Route>
            <Route exact path="/testingpayment">
              <TestingPayment />
            </Route>
            <Route exact path="/navLinks">
              <NavLinks />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/checkout">
              <Checkout showAlret={showAlret} />
            </Route>
            <Route exact path="/shipping">
              <ShippingScreen />
            </Route>
            <Route exact path="/payment">
              <PaymentScreen />
            </Route>
            <Route exact path="/placeorder">
              <PlaceOrderScreen />
            </Route>
            <Route exact path="/checkOutStep">
              <CheckOutSteps />
            </Route>
            <Route exact path="/createShop">
              <CreateShop />
            </Route>
            <Route exact path="/uploadproduct">
              <UploadProduct />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login showAlret={showAlret} />
            </Route>
            <Route exact path="/:id/:qty/:price">
              <Cart />
            </Route>
            <Route exact path="/products/:shopName">
              <Products />
            </Route>
            <Route exact path="/:id">
              <Testing showAlret={showAlret} />
            </Route>
            <Route exact path="/checkout">
              <SignUp />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </ShopState>
    </>
  );
}

export default App;
