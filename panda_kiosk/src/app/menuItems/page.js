"use client"; // Ensures this component is treated as a client component

// Import dependencies
import { useState, useEffect, useRef } from "react";
import { useGlobalState } from "@/components/GlobalStateProvider";

// Import components
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import KioskFooter from "@/components/KioskFooter";

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

  // Reset counters and quantities when the meal type changes
  // useEffect(() => {
  //   setSelectedEntreesCount(0);
  //   setSelectedSidesCount(0);
  //   setSideQuantities({
  //     friedRice: 0,
  //     chowMein: 0,
  //     superGreens: 0,
  //     steamedRice: 0,
  //     brownRice: 0,
  //     mixedVegetables: 0,
  //   });
  //   setEntreeQuantities({
  //     grilledTeriyakiChicken: 0,
  //     pepperSirloinSteak: 0,
  //     blazingBourbonChicken: 0,
  //     orangeChicken: 0,
  //     kungPaoChicken: 0,
  //     broccoliBeef: 0,
  //     teriyakiChicken: 0,
  //     beefBroccoli: 0,
  //     shrimp: 0,
  //     honeyWalnutShrimp: 0,
  //     honeySesameChicken: 0, 
  //     beijingBeef: 0, 
  //     mushroomChicken: 0, 
  //     sweetfireChicken: 0, 
  //     stringBeanChicken: 0, 
  //     blackPepperChicken: 0
  //   });
  //   setDrinkQuantities({
  //     coke: 0,
  //     sprite: 0,
  //     water: 0,
  //   });
  //   setSelectedItemIds([]); // Clear selected items on meal type change
  // }, [mealOptions]);

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

  // const sides = [
  //   { id: 'chowMein', title: 'Chow Mein', imageUrl: '/ChowMein.png', calories: '600 calories' },
  //   { id: 'friedRice', title: 'Fried Rice', imageUrl: '/FriedRice.png', calories: '620 calories' },
  //   { id: 'steamedRice', title: 'White Steamed Rice', imageUrl: '/WhiteSteamedRice.png', calories: '520 calories' },
  //   { id: 'superGreens', title: 'Super Greens', imageUrl: '/SuperGreens.png', calories: '130 calories' },
  // ];

  // const entrees = [
  //   { id: 'blazingBourbonChicken', title: 'Hot Ones Blazing Bourbon Chicken', imageUrl: '/BlazinBurbon.png', calories: '400 calories' },
  //   { id: 'orangeChicken', title: 'The Original Orange Chicken', imageUrl: '/OrangeChicken.png', calories: '510 calories' },
  //   { id: 'pepperSirloinSteak', title: 'Black Pepper Sirloin Steak', imageUrl: '/BlackPepperSteak.png', calories: '+$1.50 | 180 calories' },
  //   { id: 'honeyWalnutShrimp', title: 'Honey Walnut Shrimp', imageUrl: '/HoneyWalnutShrimp.png', calories: '+$1.50 | 430 calories' },
  //   { id: 'grilledTeriyakiChicken', title: 'Grilled Teriyaki Chicken', imageUrl: '/GrilledTeriyakiChicken.png', calories: '275 calories' },
  //   { id: 'broccoliBeef', title: 'Broccoli Beef', imageUrl: '/BroccoliBeef.png', calories: '150 calories' },
  //   { id: 'kungPaoChicken', title: 'Kung Pao Chicken', imageUrl: '/KungPaoChicken.png', calories: '320 calories' },
  //   { id: 'honeySesameChicken', title: 'Honey Sesame Chicken Breast', imageUrl: '/HoneySesameChicken.png', calories: '340 calories' },
  //   { id: 'beijingBeef', title: 'Beijing Beef', imageUrl: '/BeijingBeef.png', calories: '480 calories' },
  //   { id: 'mushroomChicken', title: 'Mushroom Chicken', imageUrl: '/MushroomChicken.png', calories: '220 calories' },
  //   { id: 'sweetfireChicken', title: 'SweetFire Chicken Breast', imageUrl: '/SweetfireChicken.png', calories: '380 calories' },
  //   { id: 'stringBeanChicken', title: 'String Bean Chicken Breast', imageUrl: '/StringBeanChicken.png', calories: '210 calories' },
  //   { id: 'blackPepperChicken', title: 'Black Pepper Chicken', imageUrl: '/BlackPepperChicken.png', calories: '280 calories' },
  // ];

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