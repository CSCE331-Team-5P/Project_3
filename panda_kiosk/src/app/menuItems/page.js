"use client"; // Ensures this component is treated as a client component

// Import dependencies
import { useState, useEffect, useRef } from "react";
import { useGlobalState } from "@/components/GlobalStateProvider";

// Import components
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import KioskFooter from "@/components/KioskFooter";

export default function Home() {
  const { mealOptions } = useGlobalState();
  const { maxEntrees, maxSides, mealType } = mealOptions;

  // State for counting total selected entrees and sides
  const [selectedEntreesCount, setSelectedEntreesCount] = useState(0);
  const [selectedSidesCount, setSelectedSidesCount] = useState(0);

  // State variables to manage the quantity of each item
  const [sideQuantities, setSideQuantities] = useState({
    friedRice: 0,
    chowMein: 0,
    superGreens: 0,
    steamedRice: 0,
    brownRice: 0,
    mixedVegetables: 0,
  });

  const [entreeQuantities, setEntreeQuantities] = useState({
    orangeChicken: 0,
    kungPaoChicken: 0,
    teriyakiChicken: 0,
    beefBroccoli: 0,
    shrimp: 0,
    honeyWalnutShrimp: 0,
  });

  // References for scrolling the sides and entrees sections
  const sidesContainerRef = useRef(null);
  const entreesContainerRef = useRef(null);

  // Reset counters and quantities when the meal type changes
  useEffect(() => {
    setSelectedEntreesCount(0);
    setSelectedSidesCount(0);
    setSideQuantities({
      friedRice: 0,
      chowMein: 0,
      superGreens: 0,
      steamedRice: 0,
      brownRice: 0,
      mixedVegetables: 0,
    });
    setEntreeQuantities({
      orangeChicken: 0,
      kungPaoChicken: 0,
      teriyakiChicken: 0,
      beefBroccoli: 0,
      shrimp: 0,
      honeyWalnutShrimp: 0,
    });
  }, [mealOptions]); // Listen for any change in mealOptions to reset states

  // Calculate the total number of items in an object
  const calculateTotalCount = (quantities) => {
    return Object.values(quantities).reduce((total, count) => total + count, 0);
  };

// Increment item quantity with checks
const incrementQuantity = (item, setQuantities, isEntree = false) => {
  // Handle special case for "A la carte"
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
};

  // Decrement item quantity
  const decrementQuantity = (item, setQuantities, isEntree = false) => {
    setQuantities((prevState) => {
      if (prevState[item] > 0) {
        const updatedCount = prevState[item] - 1;
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

  const sides = [
    { id: 'chowMein', title: 'Chow Mein', imageUrl: '/chow-mein.jpg', calories: '600 calories' },
    { id: 'friedRice', title: 'Fried Rice', imageUrl: '/fried-rice.jpg', calories: '620 calories' },
    { id: 'steamedRice', title: 'White Steamed Rice', imageUrl: '/white-steamed-rice.jpg', calories: '520 calories' },
    { id: 'superGreens', title: 'Super Greens', imageUrl: '/super-greens.jpg', calories: '130 calories' },
  ];

  const entrees = [
    { id: 'blazingBourbonChicken', title: 'Hot Ones Blazing Bourbon Chicken', imageUrl: '/blazing-bourbon-chicken.jpg', calories: '400 calories' },
    { id: 'orangeChicken', title: 'The Original Orange Chicken', imageUrl: '/orange-chicken.jpg', calories: '510 calories' },
    { id: 'pepperSirloinSteak', title: 'Black Pepper Sirloin Steak', imageUrl: '/pepper-sirloin-steak.jpg', calories: '+$1.50 | 180 calories' },
    { id: 'honeyWalnutShrimp', title: 'Honey Walnut Shrimp', imageUrl: '/honey-walnut-shrimp.jpg', calories: '+$1.50 | 430 calories' },
    { id: 'grilledTeriyakiChicken', title: 'Grilled Teriyaki Chicken', imageUrl: '/grilled-teriyaki-chicken.jpg', calories: '275 calories' },
    { id: 'kungPaoChicken', title: 'Kung Pao Chicken', imageUrl: '/kung-pao-chicken.jpg', calories: '320 calories' },
    { id: 'honeySesameChicken', title: 'Honey Sesame Chicken Breast', imageUrl: '/honey-sesame-chicken.jpg', calories: '340 calories' },
    { id: 'beijingBeef', title: 'Beijing Beef', imageUrl: '/beijing-beef.jpg', calories: '480 calories' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar at top of screen */}
      <Navbar />

      <div className="flex-1 pb-20">
        <h2 className="text-2xl font-bold m-4 text-black">Sides</h2>
        {/* Sides Section */}
        <Gallery 
          items={sides}
          sideQuantities={sideQuantities}
          incrementQuantity={(id) => incrementQuantity(id, setSideQuantities)}
          decrementQuantity={(id) => decrementQuantity(id, setSideQuantities)}
          scrollContainer={(direction, ref) => scrollContainer(direction, ref)}
          containerRef={sidesContainerRef}
        />

        <h2 className="text-2xl font-bold m-4 text-black">Entrees</h2>
        {/* Entrees Section */}
        <Gallery
          items={entrees}
          sideQuantities={entreeQuantities}
          incrementQuantity={(id) => incrementQuantity(id, setEntreeQuantities, true)}
          decrementQuantity={(id) => decrementQuantity(id, setEntreeQuantities, true)}
          scrollContainer={(direction, ref) => scrollContainer(direction, ref)}
          containerRef={entreesContainerRef}
        />
      </div>

      {/* Footer / Checkout */}
      <KioskFooter 
        sideQuantities={sideQuantities}
        entreeQuantities={entreeQuantities}
        drinkQuantities={{ small: 0, medium: 0, large: 0, bottled: 0 }}
      />

    </div>
  );
}
