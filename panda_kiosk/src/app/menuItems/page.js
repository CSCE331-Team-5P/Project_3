"use client"; //^ Ensures this component is treated as a client component

//^ Import dependencies
import { useState, useEffect, useRef } from "react";
// import { useGlobalState, GlobalStateProvider } from "@/components/GlobalStateProvider";
import { useGlobalState, GlobalStateProvider } from "@/app/GlobalStateProvider";

//^ Import components
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import KioskFooter from "@/components/KioskFooter";

export default function Home() {
  // const { mealOptions } = useGlobalState();
  // const { maxEntrees, maxSides, mealType } = mealOptions;

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



  //^ State variables to manage the quantity of each side
  const [sideQuantities, setSideQuantities] = useState({
    friedRice: 0,
    chowMein: 0,
    superGreens: 0,
    steamedRice: 0,
    brownRice: 0,
    mixedVegetables: 0,
  });
  
  //^ State variables to manage the quantity of each entree
  const [entreeQuantities, setEntreeQuantities] = useState({
    orangeChicken: 0,
    kungPaoChicken: 0,
    teriyakiChicken: 0,
    beefBroccoli: 0,
    shrimp: 0,
    honeyWalnutShrimp: 0,
  });

  //^ State variables to manage the quantity of each drink
  const [drinkQuantities, setDrinkQuantities] = useState({
    small: 0,
    medium: 0,
    large: 0,
    bottled: 0,
  });
  
  //^ Increment side or entree quantity
  const incrementQuantity = (item, setQuantities) => {
    setQuantities((prevState) => ({
      ...prevState,
      [item]: prevState[item] + 1,
    }));
  };
  
  //^ Decrement side or entree quantity
  const decrementQuantity = (item, setQuantities) => {
    setQuantities((prevState) => ({
      ...prevState,
      [item]: prevState[item] > 0 ? prevState[item] - 1 : 0,
    }));
  };

  //^ References for scrolling the sides and entrees sections
  const sidesContainerRef = useRef(null); //^ Reference for scrolling the sides section
  const entreesContainerRef = useRef(null); //^ Reference for scrolling the entrees section
  //^ Scroll container horizontally
  const scrollContainer = (direction, containerRef) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

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
    <GlobalStateProvider>
      <div className="min-h-screen flex flex-col">

        {/* Navbar at top of screen */}
        <Navbar />

        <div className="flex-1 pb-20">
          <h2 className="text-2xl font-bold m-4 text-black">Sides</h2>
          {/* Sides Section Div with horizontal scroll showing 3 items */}
          <Gallery 
            items={sides}
            sideQuantities={sideQuantities}
            incrementQuantity={(id) => incrementQuantity(id)}
            decrementQuantity={(id) => decrementQuantity(id)}
            scrollContainer={(direction, ref) => scrollContainer(direction, ref)}
            containerRef={sidesContainerRef}
            />

          <h2 className="text-2xl font-bold m-4 text-black">Entrees</h2>
          {/* Entree Section Div with horizontal scroll showing 3 items */}
          <Gallery
            items={entrees}
            sideQuantities={entreeQuantities}
            incrementQuantity={(id) => incrementQuantity(id)}
            decrementQuantity={(id) => decrementQuantity(id)}
            scrollContainer={(direction, ref) => scrollContainer(direction, ref)}
            containerRef={entreesContainerRef}
          />
        </div>

        {/* Footer / Checkout Div */}
        <KioskFooter 
          sideQuantities={sideQuantities}
          entreeQuantities={entreeQuantities}
          drinkQuantities={drinkQuantities}
        />

      </div>
    </GlobalStateProvider>
  );
}
