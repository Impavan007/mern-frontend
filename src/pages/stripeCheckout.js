import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./stripe.css";
import { selectCurrentOrder, selectCurrentOrderLoaded } from "../features/order/orderSlice";
import { useSelector } from "react-redux";
import StripeCheckoutForm from "./stripecheckoutForm";
import { current } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NoNmYSAvrvYB3FhJLKkUmrqY053uF2hhToChMhtfxbEHVokRgu8y9O4SUSUWOviR1blB5R83tetFJvgTBmcKLRk00o48ZP7be");

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);
  const currentOrderLoaded = useSelector(selectCurrentOrderLoaded)

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount,orderId:currentOrder.id }),
      
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
     {!currentOrderLoaded && <Navigate to={'/'}></Navigate>}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} >
          <StripeCheckoutForm />
        </Elements>
      )}    </div>
  );
}