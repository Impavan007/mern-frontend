import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectLoggedInUser } from '../../Auth/AuthSlice';
import { selectUserInfo, selectUserInfoLoaded, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)
  const { register, handleSubmit, formState: { errors },reset,setValue } = useForm()
  const [selectedEditIndex,setSelectedEditIndex] = useState(-1)
  const [showAddAddressForm,setShowAddAddressForm] = useState(false)


  const handleEdit = (addressUpdate,index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1,addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
  }
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync(newUser))
  }
  const handleEditForm=(index)=>{
    setSelectedEditIndex(index)
    const address = userInfo.addresses[index]
    setValue('name',address.name)
    setValue('email',address.email)
    setValue('city',address.city)
    setValue('state',address.state)
    setValue('phone',address.phone)
    setValue('country',address.country)
    setValue('pinCode',address.pinCode)
    setValue('street',address.street)
    
  }
  const userInfoLoaded = useSelector(selectUserInfoLoaded);

  const handleAdd=(address)=>{
    const newUser = { ...userInfo, addresses: [...userInfo.addresses,address] }
    dispatch(updateUserAsync(newUser))
    setShowAddAddressForm(false);
  }

  return (
    <div>

     { userInfoLoaded && <div>
        <div className="mx-auto bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Name : {userInfo.name ? userInfo.name : 'New User'}
            </h1>
            <h3 className="text-1xl my-5 font-bold tracking-tight text-red-900">
              E-mail Address:{userInfo.email}
            </h3>
            {userInfo.role==='admin' &&<h3 className="text-1xl my-5 font-bold tracking-tight text-red-900">
              Role:{userInfo.role}
            </h3>
}
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

          <button type="submit" onClick={e=>{setShowAddAddressForm(true);setSelectedEditIndex(-1)}} className="rounded-md my-5 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> 
                        Add New Address
                      </button>
                      {showAddAddressForm=== true?<form className="bg-white px-5 mt-12" noValidate onSubmit={handleSubmit(data=>{
                  handleAdd(data)
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
                              {...register('name', { required: "name is required" })}
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
                              {...register('email', { required: "email is required" })}
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
                              {...register('phone', { required: "Phone Number is required" })}
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
                              {...register('country', { required: "country name is required" })}
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
                              {...register('street', { required: "street-address is required" })}
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
                              {...register('city', { required: "city name is required" })}
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
                              {...register('State', { required: "State name is required" })}
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
                              {...register('pinCode', { required: "pinCode is required" })}
                              id="pinCode"
                              
                              autoComplete="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md mb-10 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    <button
                    onClick={e=>setShowAddAddressForm(false)}
                        type="submit"
                        className="rounded-md mb-10 px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        cancel
                      </button>
                      
                    </div>

                    
                  </div>


                </form>:null} 

            <p className="mt-0.5 text-sm text-gray-500">
              Your Addresses:
            </p>
            {userInfo.addresses.map((address, index) =>
              <div>
               {selectedEditIndex=== index?
               <form className="bg-white px-5 mt-12" noValidate onSubmit={handleSubmit(data=>{
                  handleEdit(data,index)
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
                              {...register('name', { required: "name is required" })}
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
                              {...register('email', { required: "email is required" })}
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
                              {...register('phone', { required: "Phone Number is required" })}
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
                              {...register('country', { required: "country name is required" })}
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
                              {...register('street', { required: "street-address is required" })}
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
                              {...register('city', { required: "city name is required" })}
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
                              {...register('State', { required: "State name is required" })}
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
                              {...register('pinCode', { required: "pinCode is required" })}
                              id="pinCode"
                              
                              autoComplete="pinCode"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                    onClick={e=>setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md mb-10 px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-indigo-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md mb-10 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        edit Address
                      </button>
                    </div>

                    
                  </div>


                </form>:null} 
               
                <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">{address.phone}</p>
                    <p className="text-sm leading-6 text-gray-900">{address.pinCode}</p>
                    <p className="text-sm leading-6 text-gray-900">{address.city},{address.state}</p>
                    <div className="flex">
                      <button
                        onClick={(e) => handleEditForm(index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex">
                      <button
                        onClick={(e) => handleRemove(e, index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>            </div>

                </div></div>
            )}


          </div>
        </div>
      </div>}

    </div>
  );
}
