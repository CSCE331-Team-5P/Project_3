"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Checkout() {
  const [activeCategory, setActiveCategory] = useState("");

  // Sample data for the current order with item names, quantities, and prices
  const orderItems = [
    { name: "Orange Chicken", quantity: 1, price: 8.99 },
    { name: "Chow Mein", quantity: 1, price: 6.99 },
    { name: "Fried Rice", quantity: 2, price: 5.99 },
    { name: "Egg Roll", quantity: 3, price: 1.99 },
    { name: "Apple Pie Roll", quantity: 1, price: 3.99 },
    { name: "Vegetable Spring Roll", quantity: 2, price: 2.49 },
    { name: "Cream Cheese Rangoon", quantity: 1, price: 4.49 },
  ];

  // Calculate subtotal
  const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const total = subtotal + tax;

  return (
    <div className="min-h-screen flex flex-col bg-white"> {/* White background for the entire page */}
      <Navbar />
      
      {/* Centered Checkout Div */}
      <div className="flex justify-center items-center flex-grow">
        <div className="flex flex-col items-center space-y-8 w-full max-w-lg px-4 bg-red-100 rounded-lg p-6"> {/* Light red outer box */}
          {/* Order Summary Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full"> {/* White background for the order summary */}
            <h1 className="text-3xl font-bold text-black mb-4 text-center">Your Order</h1>
            
            <div
  className="bg-white rounded-lg p-4 h-[50vh] overflow-y-auto"
  style={{
    boxShadow: "inset 0 3px 4px rgba(0, 0, 0, 0.05), inset 0 -2px 4px rgba(0, 0, 0, 0.05)",
  }}
>
  <h3 className="text-lg font-semibold text-black mb-3">Current Order</h3>
  
  <ul className="text-sm text-black space-y-2">
    {orderItems.map((item, index) => (
      <li key={index} className="flex justify-between">
        <span>{item.quantity}x {item.name}</span>
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </li>
    ))}
  </ul>
</div>
          </div>

          {/* Checkout Total and Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full space-y-4"> {/* White background for checkout total */}
            <h3 className="text-lg font-semibold text-black">Checkout Total</h3>
            <div className="text-sm text-black">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p className="font-bold text-black">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Checkout Button */}
          <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-200 transform hover:scale-105">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
