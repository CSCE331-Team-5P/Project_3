"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function checkout() {
  const [activeCategory, setActiveCategory] = useState("");

  // Function to handle click and set active category
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white"> {/* Add bg-white here */}
      <Navbar />

      {/* Centered Footer / Checkout Div */}
      <div className="flex justify-center items-center flex-grow bg-white">
        <div className="flex flex-col items-center space-y-6 w-1/2">
          {/* Current Order Card */}
          <div className="bg-white shadow-lg rounded-lg p-4 w-3/4">
            <h3 className="text-lg font-bold text-black mb-2">Current Order</h3>
            <div className="overflow-y-auto h-40 hover:h-48 transition-all duration-200">
              <ul className="text-sm text-black">
                <li>1x Orange Chicken</li>
                <li>1x Chow Mein</li>
                <li>2x Fried Rice</li>
                <li>2x Fried Rice</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
                <li>3x egg roll</li>
              </ul>
            </div>
          </div>

          {/* Checkout Total Card */}
          <div className="bg-white shadow-lg rounded-lg p-4 w-3/4">
            <h3 className="text-lg font-bold text-black mb-2">Checkout Total</h3>
          </div>

          {/* Checkout Button */}
          <button className="bg-red-600 text-white px-6 py-2 rounded-full mt-4">Checkout</button>
        </div>
      </div>
    </div>
  );
}
