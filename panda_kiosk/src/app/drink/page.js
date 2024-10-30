"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Correctly import useRouter

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Drink"); // Default to Drinks tab
  const [drinkQuantities, setDrinkQuantities] = useState({
    small: 0,
    medium: 0,
    large: 0,
    bottled: 0,
  });

  const router = useRouter(); // Initialize the router for navigation

  // Function to handle click and set active category
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // Navigate to the /menuItems page for specific categories
    if (["Bowl", "A la carte", "Plate", "Bigger Plate"].includes(category)) {
      router.push("/menuItems");
    } else {
      router.push("/checkout2");
    }
  };

  // Increment drink quantity
  const incrementQuantity = (size) => {
    setDrinkQuantities((prevState) => ({
      ...prevState,
      [size]: prevState[size] + 1,
    }));
  };

  // Decrement drink quantity
  const decrementQuantity = (size) => {
    setDrinkQuantities((prevState) => ({
      ...prevState,
      [size]: prevState[size] > 0 ? prevState[size] - 1 : 0,
    }));
  };

  // Dynamically remove drinks from the order when quantity is 0
  const getCurrentOrder = () => {
    return Object.entries(drinkQuantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([size, quantity]) => ({
        size,
        quantity,
      }));
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
            onClick={() => handleCategoryClick("Drink")}
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

      {/* Drinks Section Div */}
      <div className="p-4 bg-white h-[80vh] overflow-auto">
        {/* Drinks content in rectangular cards */}
        <h2 className="text-2xl font-bold mb-4 text-black">Available Drinks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Small Drink Card */}
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <h3 className="text-xl font-bold">Small Drink</h3>
            <p className="text-sm mb-4">A refreshing small-size beverage.</p>
            <div className="flex items-center justify-between">
              <button
                className="bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => decrementQuantity("small")}
              >
                -
              </button>
              <span>{drinkQuantities.small}</span>
              <button
                className="bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => incrementQuantity("small")}
              >
                +
              </button>
            </div>
          </div>

          {/* Medium Drink Card */}
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <h3 className="text-xl font-bold">Medium Drink</h3>
            <p className="text-sm mb-4">A refreshing medium-size beverage.</p>
            <div className="flex items-center justify-between">
              <button
                className="bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => decrementQuantity("medium")}
              >
                -
              </button>
              <span>{drinkQuantities.medium}</span>
              <button
                className="bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => incrementQuantity("medium")}
              >
                +
              </button>
            </div>
          </div>

          {/* Large Drink Card */}
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <h3 className="text-xl font-bold">Large Drink</h3>
            <p className="text-sm mb-4">A refreshing large-size beverage.</p>
            <div className="flex items-center justify-between">
              <button
                className="bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => decrementQuantity("large")}
              >
                -
              </button>
              <span>{drinkQuantities.large}</span>
              <button
                className="bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => incrementQuantity("large")}
              >
                +
              </button>
            </div>
          </div>

          {/* Bottled Drink Card */}
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg flex flex-col justify-between">
            <h3 className="text-xl font-bold">Bottled Drink</h3>
            <p className="text-sm mb-4">A refreshing bottled beverage.</p>
            <div className="flex items-center justify-between">
              <button
                className="bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => decrementQuantity("bottled")}
              >
                -
              </button>
              <span>{drinkQuantities.bottled}</span>
              <button
                className="bg-white text-red-500 px-2 py-1 rounded"
                onClick={() => incrementQuantity("bottled")}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Checkout Div */}
      <div className="bg-white shadow p-4 h-[10vh] flex justify-between items-center">
        {/* Left side: Scrollable order pane */}
        <div className="w-[12vw] h-full pr-4">
          <h3 className="text-lg font-bold text-black">Current Order</h3>
          <div className="overflow-y-auto h-full">
            <ul className="text-sm text-black">
              {getCurrentOrder().map((item, index) => (
                <li key={index}>
                  {item.quantity}x {item.size.charAt(0).toUpperCase() +
                    item.size.slice(1)}{" "}
                  Drink
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side: Checkout button */}
        <div>
          <button 
            className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300"
            onClick={() => handleCategoryClick("Checkout")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
