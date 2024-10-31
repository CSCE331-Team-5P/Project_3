"use client"; //^ Ensures this component is treated as a client component

//^ Import dependencies
import { useState, useRef } from "react";

//^ Import components
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import KioskFooter from "@/components/KioskFooter";

export default function Home() {
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
    { id: 'chowMein', title: 'Chow Mein', imageUrl: '/ChowMein.jpg', calories: '600 calories' },
    { id: 'friedRice', title: 'Fried Rice', imageUrl: '/FriedRice.jpg', calories: '620 calories' },
    { id: 'steamedRice', title: 'White Steamed Rice', imageUrl: '/SteamedWhiteRice.jpg', calories: '520 calories' },
    { id: 'superGreens', title: 'Super Greens', imageUrl: '/SuperGreens.jpg', calories: '130 calories' },
  ];

  const entrees = [
    { id: 'blazingBourbonChicken', title: 'Hot Ones Blazing Bourbon Chicken', imageUrl: '/BlazinBurbon.jpg', calories: '400 calories' },
    { id: 'orangeChicken', title: 'The Original Orange Chicken', imageUrl: '/OrangeChicken.jpg', calories: '510 calories' },
    { id: 'pepperSirloinSteak', title: 'Black Pepper Sirloin Steak', imageUrl: '/BlackPepperSteak.jpg', calories: '+$1.50 | 180 calories' },
    { id: 'honeyWalnutShrimp', title: 'Honey Walnut Shrimp', imageUrl: '/HoneyWalnutShrimp.jpg', calories: '+$1.50 | 430 calories' },
    { id: 'grilledTeriyakiChicken', title: 'Grilled Teriyaki Chicken', imageUrl: '/GrilledTeriyakiChicken.jpg', calories: '275 calories' },
    { id: 'kungPaoChicken', title: 'Kung Pao Chicken', imageUrl: '/KungPaoChicken.jpg', calories: '320 calories' },
    { id: 'honeySesameChicken', title: 'Honey Sesame Chicken Breast', imageUrl: '/HoneySesameChicken.jpg', calories: '340 calories' },
    { id: 'beijingBeef', title: 'Beijing Beef', imageUrl: '/BeijingBeef.jpg', calories: '480 calories' }
  ];
  

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar at top of screen */}
      <Navbar />

      <div className="h-[80vh]">
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
  );
}
