"use client"; // Ensures this component is treated as a client component

// Import dependencies
import { useState, useEffect, useRef } from "react";
import { useGlobalState } from "@/components/GlobalStateProvider";

// Import components
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";

export default function Home() {
  const { mealOptions, addItemToSelection, removeItemFromSelection, sides, entrees } = useGlobalState();
  const { maxEntrees, maxSides, allowDrink, mealType } = mealOptions;
  console.log(mealOptions);

  console.log("check");
//test comment commit
  // State for counting total selected entrees and sides
  const [selectedEntreesCount, setSelectedEntreesCount] = useState(0);
  const [selectedSidesCount, setSelectedSidesCount] = useState(0);

  // Dynamic list to track selected items
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const [sideQuantities, setSideQuantities] = useState({});
  const [entreeQuantities, setEntreeQuantities] = useState({});

  // Initialize quantities based on GSP data
  useEffect(() => {
    const initQuantities = (items) => {
        return items.reduce((acc, item) => {
            acc[item.id] = 0;
            return acc;
        }, {});
    };

    setSideQuantities(initQuantities(sides));
    setEntreeQuantities(initQuantities(entrees));
  }, [sides, entrees]);

  // References for scrolling the sides and entrees sections
  const sidesContainerRef = useRef(null);
  const entreesContainerRef = useRef(null);

  useEffect(() => {
    console.log("Selected Item IDs:", selectedItemIds);
  }, [selectedItemIds]);

  const calculateTotalCount = (quantities) => {
    return Object.values(quantities).reduce((total, count) => total + count, 0);
  };

  const incrementQuantity = (item, setQuantities, isEntree = false) => {

    if (mealOptions.allowOnlyOne) {
      const totalSelected = selectedEntreesCount + selectedSidesCount;
      if (totalSelected >= 1) {
        alert("You can only choose one item for 'A la carte'.");
        console.log("Only one item allowed for 'A la carte'.");
        return;
      }
    } else {
      const newTotal = isEntree
        ? selectedEntreesCount + 1
        : selectedSidesCount + 1;

      if (isEntree && newTotal > maxEntrees) {
        alert("Maximum number of entrees chosen.");
        console.log("Max entrees chosen.");
        return;
      }
      if (!isEntree && newTotal > maxSides) {
        alert("Maximum number of sides chosen.");
        console.log("Max sides chosen.");
        return;
      }
    }

    addItemToSelection(item);

    setQuantities((prevState) => {
      const updatedCount = prevState[item] + 1;
      isEntree
        ? setSelectedEntreesCount(calculateTotalCount({ ...prevState, [item]: updatedCount }))
        : setSelectedSidesCount(calculateTotalCount({ ...prevState, [item]: updatedCount }));
      return {
        ...prevState,
        [item]: updatedCount,
      };
    });

    setSelectedItemIds((prevIds) => {
      if (!prevIds.includes(item)) {
        const newIds = [...prevIds, item];
        console.log("Updated Selected Item IDs:", newIds);
        return newIds;
      }
      return prevIds;
    });
  };

  const decrementQuantity = (item, setQuantities, isEntree = false) => {
    // const { selectedEntreesCount, selectedSidesCount, removeItem, setSelectedEntreesCount, setSelectedSidesCount } = useGlobalState();
    removeItemFromSelection(item);
    
    setQuantities((prevState) => {
      if (prevState[item] > 0) {
        const updatedCount = prevState[item] - 1;
        //original remove 
        isEntree
          ? setSelectedEntreesCount(calculateTotalCount({ ...prevState, [item]: updatedCount }))
          : setSelectedSidesCount(calculateTotalCount({ ...prevState, [item]: updatedCount }));
        return {
          ...prevState,
          [item]: updatedCount,
        };
      }
      return prevState;
    });

    setSelectedItemIds((prevIds) => {
      const newIds = prevIds.filter((id) => id !== item || entreeQuantities[item] > 1);
      console.log("Updated Selected Item IDs after Decrement:", newIds);
      return newIds;
    });
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/connectDB");

        if(!response.ok) {
          // throw new Error(`HTTP error! status: ${response.status}`);
          return;
        }
        const data = await response.json();
        console.log("Inventory Data:", data);
      } catch (error) {
        console.error("Failed to fetch inventory data:", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col my-auto">
        <h2 className="text-4xl font-bold mx-4 text-black"> Step 1 </h2>
        <h3 className="text-xl font-medium text- mx-4 my-2 text-black"> Select your sides </h3>
        <Gallery 
          items={sides}
          sideQuantities={sideQuantities}
          incrementQuantity={(id) => incrementQuantity(id, setSideQuantities)}
          decrementQuantity={(id) => decrementQuantity(id, setSideQuantities)}
          scrollContainer={(direction, ref) => scrollContainer(direction, ref)}
          containerRef={sidesContainerRef}
        />

        <h2 className="text-4xl font-bold mx-4 text-black"> Step 2 </h2>
        <h3 className="text-xl font-medium text- mx-4 my-2 text-black"> Select your entrees ({maxEntrees}) </h3>
        <Gallery
          items={entrees}
          sideQuantities={entreeQuantities}
          incrementQuantity={(id) => incrementQuantity(id, setEntreeQuantities, true)}
          decrementQuantity={(id) => decrementQuantity(id, setEntreeQuantities, true)}
          scrollContainer={(direction, ref) => scrollContainer(direction, ref)}
          containerRef={entreesContainerRef}
        />
      </div>
    </div>
  );
}