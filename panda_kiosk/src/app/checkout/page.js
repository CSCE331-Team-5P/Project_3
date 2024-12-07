"use client";
import Navbar from "@/components/Navbar";
import { useGlobalState } from "@/components/GlobalStateProvider"; // Import the global state
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter to programmatically control routing (originally navigation) // Initialize payment method state

export default function Checkout() {
  const { selectedItemIds, clearSelectedItems, menuItems, updateMenuItems } = useGlobalState(); // Access selected item IDs from the global state
  const router = useRouter(); // Initialize the Next.js router to trigger a page refresh
  const pathname = usePathname(); // Gives the current path
  const [employeeId, setEmployeeId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  
  console.log("menuItems after fetch:", menuItems);

  const itemQuantities = selectedItemIds.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc; 
  },{});

  const orderItems = Object.entries(itemQuantities).map(([id, quantity]) => {
    const item = menuItems.find((menuItem) => menuItem.id === id);
    return item ? { ...item, quantity } : null; // Include the quantity in the item object
  }).filter(Boolean); 

        // Extras
        { id: "chickenEggRoll", name: "Chicken Egg Roll", price: 1.99 },
        { id: "vegetableSpringRoll", name: "Vegetable Spring Roll", price: 2.49 },
        { id: "creamCheeseRangoon", name: "Cream Cheese Rangoon", price: 4.49 },

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

      if (!paymentMethod) {
        alert('Please select a payment method.');
        return;
      }

      // Step 3: Prepare the API request payload (selectedItemIds and itemQuantities)
      const selectedItemIdsForRequest = orderItems.map(item => item.name); // Item names for API
      const numSelectedItemIdsForRequest = selectedItemIds.length;
      const itemQuantitiesForRequest = orderItems.map(item => item.quantity); // Quantities for API
      const totalAmount = total;
      const employeeIdForRequest = employeeId;
      const paymentMethodForRequest = paymentMethod;
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
              total: totalAmount,
              employeeId: employeeIdForRequest,
              paymentMethod: paymentMethodForRequest
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

        // Drinks
        { id: "drPepper", name: "Dr Pepper", price: 2.99 },
        { id: "cocaCola", name: "Coca Cola", price: 2.99 },
        { id: "dietCoke", name: "Diet Coke", price: 2.99 },
        { id: "mangoGuavaTea", name: "Mango Guava Flavored Tea", price: 3.49 },
        { id: "peachLycheeRefresher", name: "Peach Lychee Flavored Refresher", price: 3.49 },
        { id: "pomegranatePineappleLemonade", name: "Pomegranate Pineapple Flavored Lemonade", price: 3.49 },
        { id: "watermelonMangoRefresher", name: "Watermelon Mango Flavored Refresher", price: 3.49 },
        { id: "barqsRootBeer", name: "Barq's Root Beer", price: 2.99 },
        { id: "fantaOrange", name: "Fanta Orange", price: 2.99 },
        { id: "minuteMaidLemonade", name: "Minute Maid Lemonade", price: 2.99 },
        { id: "poweradeMountainBerryBlast", name: "Powerade Mountain Berry Blast", price: 3.49 },
        { id: "sprite", name: "Sprite", price: 2.99 },
        { id: "cocaColaCherry", name: "Coca Cola Cherry", price: 2.99 },
        { id: "fuzeRaspberryIcedTea", name: "Fuze Raspberry Iced Tea", price: 3.49 },
        { id: "sweetTea", name: "Sweet Tea", price: 2.99 },
        { id: "poweradeFruitPunch", name: "Powerade Fruit Punch", price: 3.49 },
        { id: "dasani", name: "Dasani Water", price: 1.99 },
        { id: "poweradeBerryBlast", name: "Powerade Berry Blast", price: 3.49 },
        { id: "minuteMaidOrange", name: "Minute Maid Orange", price: 2.99 },
        { id: "minuteMaidAppleJuice", name: "Minute Maid Apple Juice", price: 2.99 },
        { id: "cokeMexico", name: "Coke Mexico", price: 2.99 },
        { id: "cokeZero", name: "Coke Zero", price: 2.99 },
        { id: "smartwater", name: "Smartwater", price: 2.49 },
        { id: "baiCocoFusion", name: "Bai Coco Fusion", price: 3.49 },
        { id: "drinkSmall", name: "Small Drink", price: 1.99 },
        { id: "drinkMedium", name: "Medium Drink", price: 2.49 },
        { id: "drinkLarge", name: "Large Drink", price: 2.99 },
    ];

    const allItems = [...selectedItemIds, ...extras, ...drinks];

    const aggregatedItems = allItems.reduce((acc, id) => {
        if (acc[id]) {
            acc[id].quantity += 1;
        } else {
            const item = menuItems.find((menuItem) => menuItem.id === id);
            if (item) {
                acc[id] = { ...item, quantity: 1 };
            }
        }
        return acc;
    }, {});

    const orderItems = Object.values(aggregatedItems);
    const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <div className="flex justify-center items-center flex-grow">
                <div className="flex flex-col items-center space-y-8 w-full max-w-lg px-4 bg-red-100 rounded-lg p-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                        <h1 className="text-3xl font-bold text-black mb-4 text-center">Your Order</h1>
                        <ul className="text-sm text-black space-y-2">
                            {orderItems.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full space-y-4">
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Tax: ${tax.toFixed(2)}</p>
                        <p className="font-bold text-black">Total: ${total.toFixed(2)}</p>
                    </div>
                    <button className="bg-red-600 text-white px-8 py-3 rounded-full">Proceed to Checkout</button>
                </div>
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
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block text-gray-700 font-medium mb-2">
              Payment Method:
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => {
                console.log('Selected Payment Method:', e.target.value);
                setPaymentMethod(e.target.value);}} // Update the state when an option is selected
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="" disabled>Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Dining Dollars">Dining Dollars</option>
              <option value="Meal Swipe">Meal Swipe</option>
            </select>
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
    );
}
