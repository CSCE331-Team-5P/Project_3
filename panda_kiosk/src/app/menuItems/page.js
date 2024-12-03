"use client";

import { useState, useEffect, useRef } from "react";
import { useGlobalState } from "@/components/GlobalStateProvider";
import { useMagnifier } from "@/context/MagnifierContext";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import KioskFooter from "@/components/KioskFooter";

export default function Home() {
  const { mealOptions, addItemToSelection, removeItemFromSelection } = useGlobalState();
  const { maxEntrees, maxSides, allowDrink, mealType } = mealOptions;
  const { isMagnifierEnabled, setIsMagnifierEnabled, magnifierPosition, setMagnifierPosition } = useMagnifier();
  const [screenshot, setScreenshot] = useState(null);
  const [selectedEntreesCount, setSelectedEntreesCount] = useState(0);
  const [selectedSidesCount, setSelectedSidesCount] = useState(0);
  const [selectedItemIds, setSelectedItemIds] = useState([]);

  const [sideQuantities, setSideQuantities] = useState({
    friedRice: 0,
    chowMein: 0,
    superGreens: 0,
    steamedRice: 0,
    brownRice: 0,
    mixedVegetables: 0,
  });

  const [entreeQuantities, setEntreeQuantities] = useState({
    blackPepperChicken: 0,
    stringBeanChicken: 0,
    sweetfireChicken: 0,
    mushroomChicken: 0,
    beijingBeef: 0,
    honeySesameChicken: 0,
    grilledTeriyakiChicken: 0,
    blazingBourbonChicken: 0,
    orangeChicken: 0,
    pepperSirloinSteak: 0,
    kungPaoChicken: 0,
    broccoliBeef: 0,
    teriyakiChicken: 0,
    beefBroccoli: 0,
    shrimp: 0,
    honeyWalnutShrimp: 0,
  });

  const [drinkQuantities, setDrinkQuantities] = useState({
    coke: 0,
    sprite: 0,
    water: 0,
  });

  const sidesContainerRef = useRef(null);
  const entreesContainerRef = useRef(null);

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
      blackPepperChicken: 0,
      stringBeanChicken: 0,
      sweetfireChicken: 0,
      mushroomChicken: 0,
      beijingBeef: 0,
      honeySesameChicken: 0,
      grilledTeriyakiChicken: 0,
      blazingBourbonChicken: 0,
      orangeChicken: 0,
      pepperSirloinSteak: 0,
      kungPaoChicken: 0,
      broccoliBeef: 0,
      teriyakiChicken: 0,
      beefBroccoli: 0,
      shrimp: 0,
      honeyWalnutShrimp: 0,
    });
    setDrinkQuantities({
      coke: 0,
      sprite: 0,
      water: 0,
    });
    setSelectedItemIds([]);
  }, [mealOptions]);

  const captureScreenshot = async () => {
    const html2canvas = (await import("html2canvas")).default;
    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        scale: 1,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });
      return canvas.toDataURL();
    } catch (error) {
      console.error("Error capturing screenshot:", error);
      return null;
    }
  };

  useEffect(() => {
    if (isMagnifierEnabled) {
      captureScreenshot().then(newScreenshot => {
        if (newScreenshot) setScreenshot(newScreenshot);
      });
    }
  }, [isMagnifierEnabled]);

  const captureOnInteraction = async () => {
    if (isMagnifierEnabled) {
      setIsMagnifierEnabled(false);
      await new Promise(resolve => setTimeout(resolve, 50));
      const newScreenshot = await captureScreenshot();
      if (newScreenshot) {
        setScreenshot(newScreenshot);
        setTimeout(() => {
          setIsMagnifierEnabled(true);
        }, 50);
      }
    }
  };

  const incrementQuantity = (item, setQuantities, isEntree = false) => {
    if (mealOptions.allowOnlyOne) {
      const totalSelected = selectedEntreesCount + selectedSidesCount;
      if (totalSelected >= 1) {
        alert("You can only choose one item for 'A la carte'.");
        return;
      }
    } else {
      const newTotal = isEntree
        ? selectedEntreesCount + 1
        : selectedSidesCount + 1;

      if (isEntree && newTotal > maxEntrees) {
        alert("Maximum number of entrees chosen.");
        return;
      }
      if (!isEntree && newTotal > maxSides) {
        alert("Maximum number of sides chosen.");
        return;
      }
    }

    addItemToSelection(item);

    setQuantities((prevState) => {
      const updatedCount = prevState[item] + 1;
      isEntree
        ? setSelectedEntreesCount(calculateTotalCount({ ...prevState, [item]: updatedCount }))
        : setSelectedSidesCount(calculateTotalCount({ ...prevState, [item]: updatedCount }));
      return { ...prevState, [item]: updatedCount };
    });

    setSelectedItemIds((prevIds) => {
      if (!prevIds.includes(item)) {
        return [...prevIds, item];
      }
      return prevIds;
    });

    captureOnInteraction();
  };

  const decrementQuantity = (item, setQuantities, isEntree = false) => {
    removeItemFromSelection(item);

    setQuantities((prevState) => {
      if (prevState[item] > 0) {
        const updatedCount = prevState[item] - 1;
        isEntree
          ? setSelectedEntreesCount(calculateTotalCount({ ...prevState, [item]: updatedCount }))
          : setSelectedSidesCount(calculateTotalCount({ ...prevState, [item]: updatedCount }));
        return { ...prevState, [item]: updatedCount };
      }
      return prevState;
    });

    setSelectedItemIds((prevIds) => prevIds.filter((id) => id !== item || entreeQuantities[item] > 1));

    captureOnInteraction();
  };

  const calculateTotalCount = (quantities) => {
    return Object.values(quantities).reduce((total, count) => total + count, 0);
  };

  const handleMouseMove = (e) => {
    if (isMagnifierEnabled) {
      setMagnifierPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleScroll = () => {
    captureOnInteraction();
  };

  useEffect(() => {
    const sidesRef = sidesContainerRef.current;
    const entreesRef = entreesContainerRef.current;

    sidesRef?.addEventListener("scroll", handleScroll);
    entreesRef?.addEventListener("scroll", handleScroll);

    return () => {
      sidesRef?.removeEventListener("scroll", handleScroll);
      entreesRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    <div 
      className="min-h-screen flex flex-col" 
      onMouseMove={handleMouseMove}
    >
      <Navbar />
      <div className="flex flex-col my-auto">
        <h2 className="text-4xl font-bold mx-4 text-black">Step 1</h2>
        <h3 className="text-xl font-medium mx-4 my-2 text-black">Select your sides</h3>
        <Gallery
        items={sides}
        sideQuantities={sideQuantities}
        incrementQuantity={(id) => incrementQuantity(id, setSideQuantities)}
        decrementQuantity={(id) => decrementQuantity(id, setSideQuantities)}
        onButtonClick={captureOnInteraction}  // Add this line
      />

      <h2 className="text-4xl font-bold mx-4 text-black">Step 2</h2>
      <h3 className="text-xl font-medium mx-4 my-2 text-black">Select your entrees</h3>
      <Gallery
        items={entrees}
        sideQuantities={entreeQuantities}
        incrementQuantity={(id) => incrementQuantity(id, setEntreeQuantities, true)}
        decrementQuantity={(id) => decrementQuantity(id, setEntreeQuantities, true)}
        onButtonClick={captureOnInteraction}  // Add this line
      />
      </div>
      
      <button
        onClick={() => setIsMagnifierEnabled((prev) => !prev)}
        className="fixed bottom-5 right-5 px-4 py-2 bg-blue-600 text-white rounded-lg z-50"
      >
        {isMagnifierEnabled ? "Disable Magnifier" : "Enable Magnifier"}
      </button>

      {isMagnifierEnabled && screenshot && (
        <div
          style={{
            position: "fixed",
            left: magnifierPosition.x - 100,
            top: magnifierPosition.y - 100,
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `${window.innerWidth * 2}px`,
              height: `${window.innerHeight * 2}px`,
              backgroundImage: `url(${screenshot})`,
              backgroundPosition: `-${magnifierPosition.x * 2 - 100}px -${magnifierPosition.y * 2 - 100}px`,
              backgroundSize: `${window.innerWidth * 2}px ${window.innerHeight * 2}px`,
              pointerEvents: "none",
            }}
          />
        </div>
      )}
    </div>
  );
}