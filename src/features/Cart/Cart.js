import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemFromCartAsync, increment, incrementAsync, selectCartLoaded, selectItems, updateCartAsync } from "./CartSlice";
import { Link, Navigate } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { disscountPrice } from "../../app/constants";
import Modal from "../common/Modal";



export default function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items= useSelector(selectItems);
  console.log({items})
  const totalAmount = items.reduce((ammount,item)=>disscountPrice(item.product)*item.quantity+ ammount,0);
  const totalItemCount = items.reduce((total,item)=>item.quantity+total,0);
  const cartLoaded = useSelector(selectCartLoaded)
  const handleQuantity=(e,item)=>{
   dispatch(updateCartAsync({id:item.id, quantity:+e.target.value}))
  }
  const handleRemove=(e,id)=>{
    dispatch(deleteItemFromCartAsync(id))
  }

  const [openModal,setOpenModal] = useState(null)

  return (
    <div>
          {!items.length && cartLoaded && <Navigate to='/'></Navigate>}
         

      <div className="mx-auto bg-white max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-lime-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-lime-900">
            Cart
          </h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-lime-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-lime-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-lime-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${disscountPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-lime-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-lime-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-lime-900"
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
                      <Modal cancelAction ={()=>setOpenModal(null)} title={`Delete${item.product.title}`} message="are you sure you want to delete this item" dangerOption="Delete" cancelOption="Cancel" dangerAction={(e)=>handleRemove(e,item.id) } showModal={openModal===item.id}></Modal>
                      <div className="flex">
                        <button
                        onClick={e=>{setOpenModal(item.id)}}
                          type="button"
                          className="font-medium text-lime-600 hover:text-lime-500"
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

        <div className="border-t border-lime-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between my-2 text-base font-medium text-lime-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-lime-900">
            <p>Total Products In Cart</p>
            <p>{totalItemCount} items</p>
          </div>
          <p className="mt-0.5 text-sm text-lime-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">

            <Link to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-lime-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-lime-700"
            >
              Checkout
           </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-lime-500">
            <p>
              or
              <Link to="/">
              <button
                type="button"
                className="font-medium text-lime-600 hover:text-lime-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
