"use client";
import Navbar from "@/components/Navbar";
import { useGlobalState } from "@/components/GlobalStateProvider"; // Import the global state
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter to programmatically control routing (originally navigation)

export default function Checkout() {
  const { selectedItemIds, clearSelectedItems } = useGlobalState(); // Access selected item IDs from the global state
  const router = useRouter(); // Initialize the Next.js router to trigger a page refresh
  const pathname = usePathname(); // Gives the current path
  const [employeeId, setEmployeeId] = useState('');

  // Sample data for item details (this would be more dynamic in a real application)
  const menuItems = [
    { id: "orangeChicken", name: "Orange Chicken", price: 8.99 },
    { id: "chowMein", name: "Chow Mein", price: 6.99 },
    { id: "friedRice", name: "Fried Rice", price: 5.99 },
    { id: "eggRoll", name: "Egg Roll", price: 1.99 },
    { id: "applePieRoll", name: "Apple Pie Roll", price: 3.99 },
    { id: "vegetableSpringRoll", name: "Vegetable Spring Roll", price: 2.49 },
    { id: "creamCheeseRangoon", name: "Cream Cheese Rangoon", price: 4.49 },
    { id: 'chowMein', name: 'Chow Mein', price: 6.77 },
    { id: 'friedRice', name: 'Fried Rice', price: 6.77 },
    { id: 'steamedRice', name: 'White Steamed Rice', price: 6.77 },
    { id: 'superGreens', name: 'Super Greens', price: 6.77 },
    { id: 'blazingBourbonChicken', name: 'Hot Ones Blazing Bourbon Chicken', price: 6.77 },
    // { id: 'orangeChicken', name: 'The Original Orange Chicken', price: 6.77 },
    { id: 'pepperSirloinSteak', name: 'Black Pepper Sirloin Steak', price: 6.77 },
    { id: 'honeyWalnutShrimp', name: 'Honey Walnut Shrimp', price: 6.77 },
    { id: 'grilledTeriyakiChicken', name: 'Grilled Teriyaki Chicken', price: 6.77 },
    { id: 'broccoliBeef', name: 'Broccoli Beef', price: 6.77 },
    { id: 'kungPaoChicken', name: 'Kung Pao Chicken', price: 6.77 },
    { id: 'honeySesameChicken', name: 'Honey Sesame Chicken Breast', price: 6.77 },
    { id: 'beijingBeef', name: 'Beijing Beef', price: 6.77 },
    { id: 'mushroomChicken', name: 'Mushroom Chicken', price: 6.77 },
    { id: 'sweetfireChicken', name: 'SweetFire Chicken Breast', price: 6.77 },
    { id: 'stringBeanChicken', name: 'String Bean Chicken Breast', price: 6.77 },
    { id: 'blackPepperChicken', name: 'Black Pepper Chicken', price: 6.77 },
  ];

  const itemQuantities = selectedItemIds.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc; 
  },{});

  const orderItems = Object.entries(itemQuantities).map(([id, quantity]) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);
    return item ? { ...item, quantity } : null; // Include the quantity in the item object
  }).filter(Boolean); 

  // Calculate subtotal
  const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const total = subtotal + tax;

  // useEffect hook to trigger a page refresh when the component unmounts (i.e., when the user leaves the Checkout page)
  useEffect(() => {
    // Log pathname for debugging purposes
    console.log(`Current array length: ${selectedItemIds.length}`);
  }, [selectedItemIds]);

  useEffect(() => {
    // Log pathname for debugging purposes
    console.log(`Array from this page: ${selectedItemIds}`);
  }, [selectedItemIds]);

  useEffect(() => {
    // Log pathname for debugging purposes
    console.log(`Array being passed in: ${orderItems.map(item => item.name)}`);
  }, [orderItems.map(item => item.name)]);
  

  const handleCheckout = async () => {
    try {

      if (!employeeId) {
        alert('Please enter a valid Employee ID.');
        return;
      }

      // Step 3: Prepare the API request payload (selectedItemIds and itemQuantities)
      const selectedItemIdsForRequest = orderItems.map(item => item.name); // Item names for API
      const numSelectedItemIdsForRequest = selectedItemIds.length;
      const itemQuantitiesForRequest = orderItems.map(item => item.quantity); // Quantities for API
      const employeeIdForRequest = employeeId;
      console.log("Order Items:", orderItems); // Log the final list of items with quantities

      // Step 4: Send the data to the backend API
      const response = await fetch('/api/connectDB', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              selectedItemIds: selectedItemIdsForRequest, // Names for query
              numSelectedItemIds: numSelectedItemIdsForRequest, 
              itemQuantities: itemQuantitiesForRequest,   // Quantities for query
              employeeId: employeeIdForRequest
          }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Server response:", data);

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

      {/* Centered Checkout Div */}
      <div className="flex justify-center items-center flex-grow">
        <div className="flex flex-col items-center space-y-8 w-full max-w-lg px-4 bg-red-100 rounded-lg p-6">
          {/* Order Summary Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <h1 className="text-3xl font-bold text-black mb-4 text-center">Your Order</h1>

            <div
              className="bg-white rounded-lg p-4 h-[50vh] overflow-y-auto"
              style={{
                boxShadow: "inset 0 3px 4px rgba(0, 0, 0, 0.05), inset 0 -2px 4px rgba(0, 0, 0, 0.05)",
              }}
            >
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

          {/* Checkout Total and Summary */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full space-y-4">
            <h3 className="text-lg font-semibold text-black">Checkout Total</h3>
            <div className="text-sm text-black">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p className="font-bold text-black">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Employee ID Input */}
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-gray-700 font-medium mb-2">
              Employee ID:
            </label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => {
                // Allow only numbers in the input field
                const value = e.target.value;
                if (/^\d*$/.test(value)) { // Regex ensures only digits
                  setEmployeeId(value);
                }
              }}
              placeholder="Enter Employee ID"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Checkout Button */}
          <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-200 transform hover:scale-105"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          {/* Clear Button */}
          <button
            className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-200 transform hover:scale-105"
            onClick={clearSelectedItems}
          >
            Clear Order
          </button>

        </div>
      </div>
    </div>
  );
}
