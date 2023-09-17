 import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCart } from "../features/Cart/CartAPI";
import { useDispatch, useSelector } from "react-redux";
import { resetCartAsync } from "../features/Cart/CartSlice";
import { selectLoggedInUser } from "../features/Auth/AuthSlice";
import { resetOrder } from "../features/order/orderSlice";
import Footer from "../features/Footer'/footer";
import { selectProductListStatus } from "../features/productList/productSlice";
import UserProfile from "../features/user/components/UserProfile";
import { BallTriangle } from 'react-loader-spinner';
 
 function OrderSuccessPage() {
  const params = useParams();
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  useEffect(()=>{
   dispatch(resetCartAsync(user.id))
   dispatch(resetOrder())
  },[dispatch,user])

    return (

      <>
       
        
       {!params.id && <Navigate to='/'></Navigate>}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order Number #{params?.id}</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">You can check your order in My Account>My Orders</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
               to='/'
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                continue shopping
              </Link>

             
            </div>
          </div>
        </main>
        <Footer></Footer>
      </>
    )
  }
  
  export default OrderSuccessPage;