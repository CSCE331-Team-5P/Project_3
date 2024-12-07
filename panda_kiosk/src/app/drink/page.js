"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Correctly import useRouter
import Navbar from "@/components/Navbar";
import KioskFooter from "@/components/KioskFooter";
import DrinkSelection from "@/components/DrinkSelection";
import { useGlobalState } from "@/components/GlobalStateProvider";

export default function Drink() {

  const drinks = [
    {id: 'cocaCola', title: 'Coca Cola', imageURL: '/images/coca-cola.jpg'},
  ];

  const [activeCategory, setActiveCategory] = useState("Drink"); // Default to Drinks tab
  const [drinkQuantities, setDrinkQuantities] = useState({
    small: 0,
    medium: 0,
    large: 0,
    bottled: 0,
  });

  const [sideQuantities, setSideQuantities] = useState({
    friedRice: 0,
    chowMein: 0,
  });
  
  const [entreeQuantities, setEntreeQuantities] = useState({
    orangeChicken: 0,
    // Add more entrees as needed
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
      <Navbar />

      {/* Drinks Section Div */}
      <div className="p-4 bg-white ">
        <h2 className="text-3xl font-semibold mb-6 text-black text-center"> Available Drinks </h2>
        {/* Drinks content in rectangular cards */}
        <DrinkSelection />
      </div>



    </div>
  );
}
