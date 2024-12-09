"use client";
import Navbar from "@/components/Navbar";
import { useGlobalState } from "@/components/GlobalStateProvider";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMagnifier } from "@/context/MagnifierContext";

export default function Checkout() {
  const { 
    selectedItemIds, 
    clearSelectedItems, 
    menuItems,
    isCashier // <-- Accessing isCashier from global state
  } = useGlobalState();

  const { isMagnifierEnabled, setIsMagnifierEnabled, magnifierPosition, setMagnifierPosition } = useMagnifier();
  const router = useRouter();
  const pathname = usePathname();
  
  // If not cashier, default employeeId is "0" and cannot be changed.
  // If cashier, we can allow editing. We'll update this via useEffect based on isCashier.
  const [employeeId, setEmployeeId] = useState("0");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    // If isCashier is true, allow editing and reset employeeId to empty.
    // If false, set it to "0" and disable editing.
    if (isCashier) {
      setEmployeeId("");
    } else {
      setEmployeeId("0");
    }
  }, [isCashier]);

  //Screenshot for the magnifier
  const captureScreenshot = async () => {
    const html2canvas = (await import("html2canvas")).default;
    setIsCapturing(true);

    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        scale: 1,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });
      setScreenshot(canvas.toDataURL());
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  const itemQuantities = selectedItemIds.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const orderItems = Object.entries(itemQuantities).map(([id, quantity]) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);
    return item ? { ...item, quantity } : null;
  }).filter(Boolean);

  const drinksCount = selectedItemIds.filter((id) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);
    return item && item.category === "Drink";
  }).length;

  const extrasAndDessertsCount = selectedItemIds.filter((id) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);
    return item && item.category === "Extras";
  }).length;

  const numSelectedItemIdsForRequest = selectedItemIds.length - drinksCount - extrasAndDessertsCount;

  const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMagnifierEnabled && !isCapturing) {
        setMagnifierPosition({
          x: e.clientX + (window.scrollX || document.documentElement.scrollLeft),
          y: e.clientY + (window.scrollY || document.documentElement.scrollTop),
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMagnifierEnabled, isCapturing]);

  useEffect(() => {
    if (isMagnifierEnabled) {
      captureScreenshot();
    }
  }, [isMagnifierEnabled]);

  const handleCheckout = async () => {
    try {
      // If cashier is true, we check if Employee ID is entered; if false, employeeId will be "0"
      if (isCashier && !employeeId) {
        alert('Please enter a valid Employee ID.');
        return;
      }

      if (!paymentMethod) {
        alert('Please select a payment method.');
        return;
      }

      const selectedItemIdsForRequest = orderItems.map(item => item.name);
      const itemQuantitiesForRequest = orderItems.map(item => item.quantity);

      const response = await fetch('/api/connectDB', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedItemIds: selectedItemIdsForRequest,
          numSelectedItemIds: numSelectedItemIdsForRequest,
          itemQuantities: itemQuantitiesForRequest,
          total,
          employeeId,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        alert(data.message);
      } else {
        alert("Error during checkout: " + (data.message || "Unknown error occurred"));
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex justify-center items-center flex-grow">
        <div className="flex flex-col items-center space-y-8 w-full max-w-lg px-4 bg-red-100 rounded-lg p-6">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <h1 className="text-3xl font-bold text-black mb-4 text-center">Your Order</h1>
            <div className="bg-white rounded-lg p-4 h-[50vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-black mb-3">Current Order</h3>
              <ul className="text-sm text-black space-y-2">
                {orderItems.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 w-full space-y-4">
            <h3 className="text-lg font-semibold text-black">Checkout Total</h3>
            <div className="text-sm text-black">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p className="font-bold text-black">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Employee ID field, disabled if not cashier */}
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-gray-700 font-medium mb-2">
              Employee ID:
            </label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow editing if cashier is true and input is numeric
                if (isCashier && /^\d*$/.test(value)) {
                  setEmployeeId(value);
                }
              }}
              placeholder={isCashier ? "Enter Employee ID" : "0"}
              className={`border border-gray-300 rounded-md px-4 py-2 w-full ${!isCashier ? "bg-gray-200" : ""}`}
              disabled={!isCashier}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">
              Payment Method:
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            >
              <option value="" disabled>Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Dining Dollars">Dining Dollars</option>
              <option value="Meal Swipe">Meal Swipe</option>
            </select>
          </div>

          <button className="bg-red-600 text-white px-8 py-3 rounded-full" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <button className="bg-gray-600 text-white px-8 py-3 rounded-full" onClick={clearSelectedItems}>
            Clear Order
          </button>
        </div>
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
            left: magnifierPosition.x - 150,
            top: magnifierPosition.y - 150,
            width: "300px",
            height: "300px",
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
              backgroundPosition: `-${magnifierPosition.x * 2 - 150}px -${magnifierPosition.y * 2 - 150}px`,
              backgroundSize: `${window.innerWidth * 2}px ${window.innerHeight * 2}px`,
            }}
          />
        </div>
      )}
    </div>
  );
}
