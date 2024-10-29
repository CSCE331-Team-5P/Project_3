"use client"; // Ensures this component is treated as a client component
import { useState } from "react";
import { useRouter } from "next/navigation"; // Correctly import useRouter

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("");
  const router = useRouter(); // Initialize the router for navigation

  // Function to handle category click and set active category
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "Drink") {
      router.push("/drink.js"); // Navigate to the drink page
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Div */}
      <div className="bg-red-600 p-4 flex justify-between items-center h-[10vh]">
        {/* Menu Categories on the Left */}
        <div className="flex justify-start space-x-8 text-white">
          {/* A la carte */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("A la carte")}
          >
            <span className="text-3xl">🍽️</span>
            <p
              className={`text-base ${
                activeCategory === "A la carte" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              A la carte
            </p>
          </button>

          {/* Bowl */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("Bowl")}
          >
            <span className="text-3xl">🍲</span>
            <p
              className={`text-base ${
                activeCategory === "Bowl" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Bowl
            </p>
          </button>

          {/* Plate */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("Plate")}
          >
            <span className="text-3xl">🍛</span>
            <p
              className={`text-base ${
                activeCategory === "Plate" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Plate
            </p>
          </button>

          {/* Bigger Plate */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("Bigger Plate")}
          >
            <span className="text-3xl">🍱</span>
            <p
              className={`text-base ${
                activeCategory === "Bigger Plate" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Bigger Plate
            </p>
          </button>

          {/* Drink */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => router.push("/drink")}
          >
            <span className="text-3xl">🥤</span>
            <p
              className={`text-base ${
                activeCategory === "Drink" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Drink
            </p>
          </button>

          {/* Dessert */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("Dessert")}
          >
            <span className="text-3xl">🍨</span>
            <p
              className={`text-base ${
                activeCategory === "Dessert" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Dessert
            </p>
          </button>
        </div>

        {/* Expandable Cart Button on the Right */}
        <div className="flex justify-end relative">
          <button className="flex items-center text-white space-x-2 hover:text-yellow-300 transition-colors duration-300">
            <span className="text-base">Cart</span>
          </button>
        </div>
      </div>

      {/* Sides Section Div */}
      <div className="p-4 bg-white h-[40vh] overflow-auto">
        {/* Sides content goes here */}
      </div>

      {/* Entrees Section Div */}
      <div className="p-4 bg-white h-[40vh] overflow-auto">
        {/* Entrees content goes here */}
      </div>

      {/* Footer / Checkout Div */}
      <div className="bg-white shadow p-4 h-[10vh] flex justify-between items-center">
        {/* Left side: Scrollable order pane */}
        <div className="w-[12vw] h-full pr-4">
          <h3 className="text-lg font-bold text-black">Current Order</h3>
          <div className="overflow-y-auto h-full">
            <ul className="text-sm text-black">
              {/* Example order items (dynamically populated later) */}
              <li>1x Orange Chicken</li>
              <li>1x Chow Mein</li>
              <li>2x Fried Rice</li>
              <li>2x Fried Rice</li>
            </ul>
          </div>
        </div>

        {/* Right side: Checkout button */}
        <div>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
