import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import Home from './pages/Home.js';
import LoginPage from './pages/login';
import SignUpPage from './pages/SignUpPage';
import Checkout from './pages/Checkout';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import ProductDetails from './features/productList/components/productDetails';
import ProductDetailsPage from './pages/productDetailPage';
import Protected from './features/Auth/Components/protected';
import { fetchItemByUseIdAsync, fetchItemByUserIdAsync } from './features/Cart/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/Auth/AuthSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/orderSuccess';
import UserOrders from './features/user/components/userOrder';
import UserOrderPage from './pages/userOrderPage';
import UserProfilePage from './pages/userProfile';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/Auth/Components/Logout';
import Forgot from './features/Auth/Components/ForgotPassword';
import ForgotPasswordPage from './pages/forgotPage';
import ProtectedAdmin from './features/Auth/Components/protectedAdmin';
import AdminPage from './pages/AdminPage';
import AdminProductDetailsPage from './pages/adminProductDetailsPage';
import AdminProductFormPage from './pages/adminProductFormPage';
import AdminOrdersPage from './pages/adminOrdersPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from './pages/stripeCheckout';


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>
  }, {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>
  },
  {
    path: "/productdetails/:id",
    element: <Protected><ProductDetailsPage></ProductDetailsPage></Protected>
  },
  {
    path: "*",
    element: <PageNotFound/>
  },
  {
    path: "/orderSucess/:id",
    element: <Protected><OrderSuccessPage></OrderSuccessPage></Protected>
  },
  {
    path: "/my-orders",
    element: <Protected><UserOrderPage></UserOrderPage></Protected>
  },
  {
    path: "/profile",
    element: <Protected><UserProfilePage></UserProfilePage></Protected>
  },
  {
    path: "/logout",
    element: <Logout></Logout>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>
  },{
    path: "/card-checkout/",
    element: <Protected><StripeCheckout></StripeCheckout></Protected>
  },  {
    path: "/admin",
    element: <ProtectedAdmin><AdminPage></AdminPage></ProtectedAdmin>
  }, {
    path: "/admin/adminproductdetails/:id",
    element: <ProtectedAdmin><AdminProductDetailsPage></AdminProductDetailsPage></ProtectedAdmin>
  }, {
    path: "admin/adminproductform",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },{
    path: "/admin/adminproductform/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>
  }


]);



function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  const userChecked= useSelector(selectUserChecked)
  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])
  
  useEffect(()=>{
    
    if(user)
   { 
    dispatch(fetchItemByUserIdAsync())
  dispatch(fetchLoggedInUserAsync())
}
  },[dispatch,user])
  
  return (<>
    <div className="App">
      { userChecked && <Provider template={AlertTemplate} {...options}>
     <RouterProvider router={router} /></Provider>}
     
    </div></>
    
  );
}

export default App;
