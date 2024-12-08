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

  // State for magnification
  const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [screenshot, setScreenshot] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

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
  }, [mealOptions]);

  // Function to capture a screenshot
  const captureScreenshot = async () => {
    const html2canvas = (await import("html2canvas")).default;

    setIsCapturing(true); // Temporarily hide the magnifier

    setTimeout(() => {
      html2canvas(document.body, {
        useCORS: true,
        scale: 1,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      }).then((canvas) => {
        setScreenshot(canvas.toDataURL());
        setIsCapturing(false); // Show the magnifier again
      });
    }, 1000); // Wait for 1 second before capturing
  };

  // Increment item quantity with checks
  const incrementQuantity = (item, setQuantities, isDessert = false) => {
    if (isDessert) {
      setDessertQuantities((prevState) => {
        const updatedCount = prevState[item] + 1;
        setSelectedDessertsCount((prev) => prev + 1);
        captureScreenshot(); // Take a new screenshot
        return {
          ...prevState,
          [item]: updatedCount,
        };
      });
    } else {
      addExtra(item);
      setExtraQuantities((prevState) => {
        const updatedCount = prevState[item] + 1;
        setSelectedExtrasCount((prev) => prev + 1);
        captureScreenshot(); // Take a new screenshot
        return {
          ...prevState,
          [item]: updatedCount,
        };
      });
    }
  };

  const decrementQuantity = (item, setQuantities, isDessert = false) => {
    if (isDessert) {
      setDessertQuantities((prevState) => {
        if (prevState[item] > 0) {
          const updatedCount = prevState[item] - 1;
          setSelectedDessertsCount((prev) => prev - 1);
          captureScreenshot(); // Take a new screenshot
          return {
            ...prevState,
            [item]: updatedCount,
          };
        }
        return prevState;
      });
    } else {
      removeExtra(item);
      setExtraQuantities((prevState) => {
        if (prevState[item] > 0) {
          const updatedCount = prevState[item] - 1;
          setSelectedExtrasCount((prev) => prev - 1);
          captureScreenshot(); // Take a new screenshot
          return {
            ...prevState,
            [item]: updatedCount,
          };
        }
        return prevState;
      });
    }
  };

  // Handle mouse movement for magnifier
  const handleMouseMove = (e) => {
    if (isMagnifierEnabled && !isCapturing) {
      const scrollX = window.scrollX || document.documentElement.scrollLeft;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setMagnifierPosition({
        x: e.clientX + scrollX,
        y: e.clientY + scrollY,
      });
    }
  };

  // Capture an initial screenshot when the magnifier is toggled on
  useEffect(() => {
    if (isMagnifierEnabled) {
      captureScreenshot();
    }
  }, [isMagnifierEnabled]);

  const desserts = [
    { id: "applePieRoll", title: "Apple Pie Roll", imageUrl: "/apple-pie-roll.png", calories: "300 calories" },
  ];

  const extras = [
    { id: "chickenEggRoll", title: "Chicken Egg Roll", imageUrl: "/chicken-egg-roll.png", calories: "150 calories" },
    { id: "vegetableSpringRoll", title: "Vegetable Spring Roll", imageUrl: "/veggie-spring-roll.png", calories: "100 calories" },
    { id: "creamCheeseRangoon", title: "Cream Cheese Rangoon", imageUrl: "/cream-cheese-rangoon.png", calories: "190 calories" },
  ];

  return (
    <div
      className="min-h-screen flex flex-col relative"
      onMouseMove={handleMouseMove}
    >
      {/* Navbar */}
      <Navbar />

      {/* Extras and Desserts Section */}
      <div className="flex-2 pb-16">
        <h2 className="text-2xl font-bold m-4 text-black">Extras</h2>
        <Gallery
          items={extras}
          sideQuantities={extraQuantities}
          incrementQuantity={(id) => incrementQuantity(id, setExtraQuantities)}
          decrementQuantity={(id) => decrementQuantity(id, setExtraQuantities)}
          containerRef={extrasContainerRef}
        />

        <h2 className="text-2xl font-bold m-4 text-black">Desserts</h2>
        <Gallery
          items={desserts}
          sideQuantities={dessertQuantities}
          incrementQuantity={(id) => incrementQuantity(id, setDessertQuantities, true)}
          decrementQuantity={(id) => decrementQuantity(id, setDessertQuantities, true)}
          containerRef={dessertsContainerRef}
        />
      </div>

      {/* Magnifier Toggle Button */}
      <button
        onClick={() => setIsMagnifierEnabled((prev) => !prev)}
        className="fixed bottom-5 right-5 px-4 py-2 bg-blue-600 text-white rounded-lg z-50"
      >
        {isMagnifierEnabled ? "Disable Magnifier" : "Enable Magnifier"}
      </button>

      {/* Magnifier */}
      {isMagnifierEnabled && screenshot && !isCapturing && (
        <div
          style={{
            position: "fixed",
            left: magnifierPosition.x - 150 - window.scrollX,
            top: magnifierPosition.y - 150 - window.scrollY,
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            overflow: "hidden",
            zIndex: 1000,
            pointerEvents: "none",
            border: "2px solid #ccc",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `${document.documentElement.scrollWidth * 2}px`,
              height: `${document.documentElement.scrollHeight * 2}px`,
              backgroundImage: `url(${screenshot})`,
              backgroundPosition: `-${magnifierPosition.x * 2 - 150}px -${
                magnifierPosition.y * 2 - 150
              }px`,
              backgroundSize: `${document.documentElement.scrollWidth * 2}px ${
                document.documentElement.scrollHeight * 2
              }px`,
            }}
          />
        </div>
      )}
    </div>
  );
}
