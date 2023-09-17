import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  
  
    fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectCount,
  selectUserOrders,
  selectUserStatus
} from '../userSlice';
import { selectLoggedInUser } from '../../Auth/AuthSlice';
import { Link } from 'react-router-dom';
import { disscountPrice } from '../../../app/constants';
import { BallTriangle } from 'react-loader-spinner';

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders)
  const status = useSelector(selectUserStatus);
   useEffect(()=>{
    dispatch(fetchLoggedInUserOrderAsync())
   },[dispatch])
   const [open, setOpen] = useState(true);
  return (
    <div>
      { orders && orders.map(order=><div>
        <div className="mx-auto bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
             OrderId:{order.id}
          </h1>
          <h3 className="text-1xl my-5 font-bold tracking-tight text-red-900">
            Order status  :{order.status}
          </h3>
          <h4 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
             Email:{order.selectedAddress.email}
          </h4>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {order.items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${disscountPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty:{item.quantity}
                        </label>
                      </div>

                      <div className="flex">
                        
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${order.totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Products In Cart</p>
            <p>{order.totalItemCount} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
           Shipping Address:
          </p>

          <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{order.selectedAddress.phone}</p>
            <p className="text-sm leading-6 text-gray-900">{order.selectedAddress.pinCode}</p>
            <p className="text-sm leading-6 text-gray-900">{order.selectedAddress.city},{order.selectedAddress.state}</p>
            </div>

        </div>
          

        </div>
      </div>
       </div>
       
       )}

{status==='loading'&& <BallTriangle className="flex justify-center"
  height={100}
  width={100}
  radius={5}
  color="rgb(79,70,229)"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>}
       <div className=" flex justify-center  text-center text-sm text-gray-500 mx-auto bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
            <p> 
              <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button></Link>
            </p>
          </div>

       
    </div>
  );
}
