

import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom"; 

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "../features/navbar/NavBar";
import { deleteItemFromCartAsync, selectCartLoaded, selectCartStatus, selectItems, updateCartAsync } from "../features/Cart/CartSlice";
import { useForm } from "react-hook-form";
import {  selectUserInfoLoaded, updateUserAsync } from "../features/user/userSlice";
import { createOrderAsync, selectCurrentOrder, selectCurrentOrderLoaded } from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { disscountPrice } from "../app/constants";
import Footer from "../features/Footer'/footer";
import { selectProductListStatus } from "../features/productList/productSlice";
import UserProfile from "../features/user/components/UserProfile";
import { BallTriangle } from 'react-loader-spinner';





function Checkout() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const { register, handleSubmit, formState: { errors },reset } = useForm()
  const items= useSelector(selectItems);
  const totalAmount = items.reduce((ammount,item)=>disscountPrice(item.product)*item.quantity+ ammount,0);
  const totalItemCount = items.reduce((total,item)=>item.quantity+total,0);
  const currentOrder = useSelector(selectCurrentOrder)
  const handleQuantity=(e,item)=>{
   dispatch(updateCartAsync({id:item.id, quantity:+e.target.value}))
  }
  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }

  const user = useSelector(selectUserInfo);
  console.log({user})
  const userInfoLoaded = useSelector(selectUserInfoLoaded);


  const [selectedAddress,setSelectedAddress] = useState(null)
  const [paymentMethod,setPaymentMethod] = useState('cash')

  const handleAddress=(e)=>{
    console.log(e.target.value)
    setSelectedAddress(user.addresses[e.target.value])
  }  
  
  const handlePayment =(e)=>{
    console.log(e.target.value)
    setPaymentMethod(e.target.value)

  }
  const cartLoaded = useSelector(selectCartLoaded)
  const currentOrderLoaded = useSelector(selectCurrentOrderLoaded)

  const handleOrder=()=>{
    const order = {items,totalAmount,totalItemCount,user:user.id,paymentMethod,selectedAddress, status:'pending'}
    dispatch(createOrderAsync(order))
  }
  const status = useSelector(selectCartStatus)

    return(
      <>
      {userInfoLoaded  && cartLoaded && <div>
      {!items.length && <Navigate to='/' replace={true}></Navigate>}
      {currentOrder && <Navigate to={`/orderSucess/${currentOrder.id}`} replace={true}></Navigate>}
      {currentOrder && currentOrder.paymentMethod==='card' && <Navigate to={`/card-checkout/`} replace={true}></Navigate>}

    <Navbar>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
    <form className="bg-white px-5 mt-12" noValidate onSubmit={handleSubmit((data)=>{
           dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}));
           reset();
           
          

           
          })}>
      
        <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                 {...register('name',{required:"name is required"})}
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email',{required:"email is required"})}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  {...register('phone',{required:"Phone Number is required"})}
                  type="tel"
                  autoComplete="phone"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  {...register('country',{required:"country name is required"})}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>India</option>
                <option>United-states</option>
                <option>nepal</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('street',{required:"street-address is required"})}
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('city',{required:"city name is required"})}
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="State" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('State',{required:"State name is required"})}
                  id="State"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register('pinCode',{required:"pinCode is required"})}
                  id="pinCode"
                  autoComplete="pinCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Address
        </button>
      </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose From Existing Address
          </p>
          <ul role="list">
      {user.addresses.map((address,index) => 
      (
        <li key={index} className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
          <div className="flex min-w-0 gap-x-4">
          <input

                    onChange={handleAddress}
                    name="address"
                    type="radio"
                    value={index}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
            <p className="text-sm leading-6 text-gray-900">{address.pinCode}</p>
            <p className="text-sm leading-6 text-gray-900">{address.city},{address.state}</p>
            </div>

        </li>
      ))}
    </ul>


          <div className="mt-10 space-y-10">
            
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="Cash"
                    name="Payments"
                    value='cash'
                    onChange={handlePayment}
                    type="radio"
                    checked={paymentMethod==='cash'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                   Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card-payment"
                    name="Payments"
                    value='card'
                    onChange={handlePayment}
                    type="radio"
                    checked={paymentMethod==='card'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                   Card Payment
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="Upi"
                    name="Payments"
                    value='upi'
                    onChange={handlePayment}
                    type="radio"
                    checked={paymentMethod==='upi'}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    Upi
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

     
    </form>
    </div><div className="lg:col-span-2">
    <div className="mx-auto bg-white max-w-7xl mt-12 px-2 sm:px-2 lg:px-2">
        <div className="border-t border-gray-200 px-0 py-6 sm:px-10">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
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
                          Qty
                        </label>
                        <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                          
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                        onClick={(e)=>handleRemove(e,item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
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
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p>Total Products In Cart</p>
            <p>{totalItemCount} items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">

            <button
            onClick={handleOrder}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              order now
           </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
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
      </div></div>
    </div></div></Navbar>
    <Footer></Footer>
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
</div>}
    </>

    )

}
export default Checkout;