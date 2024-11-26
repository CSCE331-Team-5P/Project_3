"use client"; // Ensures this component is treated as a client component

// Import dependencies
import { useState, useEffect, useRef } from "react";
import { useGlobalState } from "@/components/GlobalStateProvider";

// Import components
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";

export default function Home() {
  const { mealOptions, addExtra, removeExtra } = useGlobalState();
  const { maxEntrees, maxSides, mealType } = mealOptions;
  console.log(mealOptions);

  // State for counting total selected desserts and extras
  const [selectedDessertsCount, setSelectedDessertsCount] = useState(0);
  const [selectedExtrasCount, setSelectedExtrasCount] = useState(0);

  // State variables to manage the quantity of each item
  const [dessertQuantities, setDessertQuantities] = useState({
    applePieRoll: 0,
  });

  const [extraQuantities, setExtraQuantities] = useState({
    chickenEggRoll: 0,
    vegetableSpringRoll: 0,
    creamCheeseRangoon: 0,
  });

  // References for scrolling the desserts and extras sections
  const dessertsContainerRef = useRef(null);
  const extrasContainerRef = useRef(null);

  // Reset counters and quantities when the meal type changes
  useEffect(() => {
    setSelectedDessertsCount(0);
    setSelectedExtrasCount(0);
    setDessertQuantities({
      applePieRoll: 0,
    });
    setExtraQuantities({
      chickenEggRoll: 0,
      vegetableSpringRoll: 0,
      creamCheeseRangoon: 0,
    });
  }, [mealOptions]); // Listen for any change in mealOptions to reset states

  // Calculate the total number of items in an object
  const calculateTotalCount = (quantities) => {
    return Object.values(quantities).reduce((total, count) => total + count, 0);
  };

  // Increment item quantity with checks
  const incrementExtraQuantity = (item) => {
    addExtra(item);
    setExtraQuantities((prevState) => {
      const updatedCount = prevState[item] + 1;
      setSelectedExtrasCount(calculateTotalCount({ ...prevState, [item]: updatedCount }));
      return {
        ...prevState,
        [item]: updatedCount,
      };
    });
  };

  const incrementDessertQuantity = (item) => {
    setDessertQuantities((prevState) => {
      const updatedCount = prevState[item] + 1;
      setSelectedDessertsCount(calculateTotalCount({ ...prevState, [item]: updatedCount }));
      return {
        ...prevState,
        [item]: updatedCount,
      };
    });
  };

  // Decrement item quantity
  const decrementExtraQuantity = (item) => {
    removeExtra(item);
    setExtraQuantities((prevState) => {
      if (prevState[item] > 0) {
        const updatedCount = prevState[item] - 1;
        setSelectedExtrasCount(calculateTotalCount({ ...prevState, [item]: updatedCount }));
        return {
          ...prevState,
          [item]: updatedCount,
        };
      }
      return prevState;
    });
  };

  const decrementDessertQuantity = (item) => {
    setDessertQuantities((prevState) => {
      if (prevState[item] > 0) {
        const updatedCount = prevState[item] - 1;
        setSelectedDessertsCount(calculateTotalCount({ ...prevState, [item]: updatedCount }));
        return {
          ...prevState,
          [item]: updatedCount,
        };
      }
      return prevState;
    });
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/connectDB");
        const data = await response.json();
        console.log("Inventory Data:", data); // Logs the fetched inventory data
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      }
    };

    fetchInventory();
  }, []);

  const extraItems = [
  { id: 'chickenEggRoll', title: 'Chicken Egg Roll', imageUrl: '/chicken-egg-roll.png', calories: '150 calories' },
  { id: 'vegetableSpringRoll', title: 'Vegetable Spring Roll', imageUrl: '/veggie-spring-roll.png', calories: '100 calories' },
  { id: 'creamCheeseRangoon', title: 'Cream Cheese Rangoon', imageUrl: '/cream-cheese-rangoon.png', calories: '190 calories' },
  ];

  const dessertItems = [
    { id: 'applePieRoll', title: 'Apple Pie Roll', imageUrl: '/apple-pie-roll.png', calories: '300 calories' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at top of screen */}
      <Navbar />

      <div className="flex-2 pb-16">
        <h2 className="text-2xl font-bold m-4 text-black">Extras</h2>
        {/* Extras Section */}
        <Gallery
          items={extraItems}
          sideQuantities={extraQuantities}
          incrementQuantity={(id) => incrementExtraQuantity(id)}
          decrementQuantity={(id) => decrementExtraQuantity(id)}
          scrollContainer={(direction, ref) => scrollContainer(direction, ref)}
          containerRef={extrasContainerRef}
        />

        <h2 className="text-2xl font-bold m-4 text-black">Desserts</h2>
        {/* Desserts Section */}
        <Gallery
          items={dessertItems}
          sideQuantities={dessertQuantities}
          incrementQuantity={(id) => incrementDessertQuantity(id)}
          decrementQuantity={(id) => decrementDessertQuantity(id)}
          scrollContainer={(direction, ref) => scrollContainer(direction, ref)}
          containerRef={dessertsContainerRef}
        />
      </div>
    </div>
  );
}
