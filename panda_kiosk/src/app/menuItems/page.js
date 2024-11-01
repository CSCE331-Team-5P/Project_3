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
    { id: 'chowMein', title: 'Chow Mein', imageUrl: '/ChowMein.png', calories: '600 calories' },
    { id: 'friedRice', title: 'Fried Rice', imageUrl: '/FriedRice.png', calories: '620 calories' },
    { id: 'steamedRice', title: 'White Steamed Rice', imageUrl: '/WhiteSteamedRice.png', calories: '520 calories' },
    { id: 'superGreens', title: 'Super Greens', imageUrl: '/SuperGreens.png', calories: '130 calories' },
  ];

  const entrees = [
    { id: 'blazingBourbonChicken', title: 'Hot Ones Blazing Bourbon Chicken', imageUrl: '/BlazinBurbon.png', calories: '400 calories' },
    { id: 'orangeChicken', title: 'The Original Orange Chicken', imageUrl: '/OrangeChicken.png', calories: '510 calories' },
    { id: 'pepperSirloinSteak', title: 'Black Pepper Sirloin Steak', imageUrl: '/BlackPepperSteak.png', calories: '+$1.50 | 180 calories' },
    { id: 'honeyWalnutShrimp', title: 'Honey Walnut Shrimp', imageUrl: '/HoneyWalnutShrimp.png', calories: '+$1.50 | 430 calories' },
    { id: 'grilledTeriyakiChicken', title: 'Grilled Teriyaki Chicken', imageUrl: '/GrilledTeriyakiChicken.png', calories: '275 calories' },
    { id: 'broccoliBeef', title: 'Broccoli Beef', imageUrl: '/BroccoliBeef.png', calories: '150 calories' },
    { id: 'kungPaoChicken', title: 'Kung Pao Chicken', imageUrl: '/KungPaoChicken.png', calories: '320 calories' },
    { id: 'honeySesameChicken', title: 'Honey Sesame Chicken Breast', imageUrl: '/HoneySesameChicken.png', calories: '340 calories' },
    { id: 'beijingBeef', title: 'Beijing Beef', imageUrl: '/BeijingBeef.png', calories: '480 calories' },
    { id: 'mushroomChicken', title: 'Mushroom Chicken', imageUrl: '/MushroomChicken.png', calories: '220 calories' },
    { id: 'sweetfireChicken', title: 'SweetFire Chicken Breast', imageUrl: '/SweetfireChicken.png', calories: '380 calories' },
    { id: 'stringBeanChicken', title: 'String Bean Chicken Breast', imageUrl: '/StringBeanChicken.png', calories: '210 calories' },
    { id: 'blackPepperChicken', title: 'Black Pepper Chicken', imageUrl: '/BlackPepperChicken.png', calories: '280 calories' },
  ];
  

  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar at top of screen */}
      <Navbar />

      <div className="flex-2 pb-16">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <KioskFooter 
          sideQuantities={sideQuantities}
          entreeQuantities={entreeQuantities}
          drinkQuantities={drinkQuantities}
        />
      </div>

    </div>
  );
}
