"use client";

import { useState, useEffect, useRef } from "react";
import { useGlobalState } from "@/components/GlobalStateProvider";
import { useMagnifier } from "@/context/MagnifierContext";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import KioskFooter from "@/components/KioskFooter";

export default function Home() {

  const { mealOptions, addItemToSelection, removeItemFromSelection, sides, entrees } = useGlobalState();
  const { maxEntrees, maxSides, allowDrink, mealType } = mealOptions;
  const { isMagnifierEnabled, setIsMagnifierEnabled, magnifierPosition, setMagnifierPosition } = useMagnifier();
  const [screenshot, setScreenshot] = useState(null);

  // State for counting total selected entrees and sides
  const [selectedEntreesCount, setSelectedEntreesCount] = useState(0);
  const [selectedSidesCount, setSelectedSidesCount] = useState(0);
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

  const sidesContainerRef = useRef(null);
  const entreesContainerRef = useRef(null);

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
        //original remove 
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

    return () => {
      sidesRef?.removeEventListener("scroll", handleScroll);
      entreesRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col" 
      onMouseMove={handleMouseMove}
    >
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