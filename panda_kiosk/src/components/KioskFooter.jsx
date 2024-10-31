import React from 'react';
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const KioskFooter = ({ sideQuantities, entreeQuantities, drinkQuantities }) => {
    const router = useRouter(); // Initialize the router for navigation

    // Function to handle click and route to Checkout page
    const handleClick = () => {
        router.push('/checkout');
    };

    return (
        <div className="bg-white shadow p-4 h-[10vh] flex justify-between items-center">
            {/* Left Side: Order Pane */}
            <div className="w-[12vw] h-full pr-4">
                <h3 className="text-lg font-bold text-black">Current Order</h3>
                <div className="overflow-y-auto h-full">
                    <ul className="text-sm text-black">
                        {/* Side Quantities */}
                        {sideQuantities.friedRice > 0 && <li>{sideQuantities.friedRice}x Fried Rice</li>}
                        {sideQuantities.chowMein > 0 && <li>{sideQuantities.chowMein}x Chow Mein</li>}
                        {/* Entree Quantities */}
                        {entreeQuantities.orangeChicken > 0 && <li>{entreeQuantities.orangeChicken}x Orange Chicken</li>}
                        {/* Drink Quantities */}
                        {drinkQuantities.small > 0 && <li>{drinkQuantities.small}x Small Drink</li>}
                        {drinkQuantities.medium > 0 && <li>{drinkQuantities.medium}x Medium Drink</li>}
                        {drinkQuantities.large > 0 && <li>{drinkQuantities.large}x Large Drink</li>}
                        {drinkQuantities.bottled > 0 && <li>{drinkQuantities.bottled}x Bottled Drink</li>}
                    </ul>
                </div>
            </div>

            {/* Right Side: Checkout Button */}
            <div>
                <button 
                    onClick={handleClick} 
                    className="bg-red-700 text-white px-6 py-2 rounded-full hover:bg-red-500 transition-colors duration-300"
                >
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default KioskFooter;
