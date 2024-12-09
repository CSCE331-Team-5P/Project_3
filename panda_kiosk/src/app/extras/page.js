"use client"; // Ensures this component is treated as a client component

import { useState, useEffect, useRef } from "react";
import { useGlobalState } from "@/components/GlobalStateProvider";

// Import components
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";

export default function ExtrasPage() {
  const { desserts, extras, addItemToSelection, removeItemFromSelection } = useGlobalState();

  const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [screenshot, setScreenshot] = useState(null);
  const [dessertQuantities, setDessertQuantities] = useState({});
  const [extraQuantities, setExtraQuantities] = useState({});

  const dessertsContainerRef = useRef(null);
  const extrasContainerRef = useRef(null);

  // Initialize quantities based on desserts and extras
  useEffect(() => {
    const initQuantities = (items) =>
      items.reduce((acc, item) => {
        acc[item.id] = 0;
        return acc;
      }, {});

    setDessertQuantities(initQuantities(desserts));
    setExtraQuantities(initQuantities(extras));
  }, [desserts, extras]);

  // Function to capture a screenshot
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

  // Update the screenshot when the magnifier is enabled
  useEffect(() => {
    if (isMagnifierEnabled) {
      captureScreenshot().then((newScreenshot) => {
        if (newScreenshot) setScreenshot(newScreenshot);
      });
    }
  }, [isMagnifierEnabled]);

  const captureOnInteraction = async () => {
    if (isMagnifierEnabled) {
      setIsMagnifierEnabled(false);
      await new Promise((resolve) => setTimeout(resolve, 50));
      const newScreenshot = await captureScreenshot();
      if (newScreenshot) {
        setScreenshot(newScreenshot);
        setTimeout(() => {
          setIsMagnifierEnabled(true);
        }, 50);
      }
    }
  };

  const incrementQuantity = (item, setQuantities) => {
    addItemToSelection(item);

    setQuantities((prevState) => ({
      ...prevState,
      [item]: prevState[item] + 1,
    }));

    captureOnInteraction(); // Update magnifier on interaction
  };

  const decrementQuantity = (item, setQuantities) => {
    removeItemFromSelection(item);
    setQuantities((prevState) => {
      if (prevState[item] > 0) {
        return {
          ...prevState,
          [item]: prevState[item] - 1,
        };
      }
      return prevState; // No change if already at 0
    });

    captureOnInteraction(); // Update magnifier on interaction
  };

  const handleMouseMove = (e) => {
    if (isMagnifierEnabled) {
      setMagnifierPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleScroll = () => {
    captureOnInteraction();
  };

  useEffect(() => {
    const dessertsRef = dessertsContainerRef.current;
    const extrasRef = extrasContainerRef.current;

    dessertsRef?.addEventListener("scroll", handleScroll);
    extrasRef?.addEventListener("scroll", handleScroll);

    return () => {
      dessertsRef?.removeEventListener("scroll", handleScroll);
      extrasRef?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Navbar */}
      <Navbar />

      {/* Desserts and Extras Section */}
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
          incrementQuantity={(id) => incrementQuantity(id, setDessertQuantities)}
          decrementQuantity={(id) => decrementQuantity(id, setDessertQuantities)}
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
