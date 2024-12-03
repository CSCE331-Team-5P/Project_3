"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// Create the global state context
const GlobalStateContext = createContext();

// Define the provider component
export const GlobalStateProvider = ({ children }) => {
    const [mealOptions, setMealOptions] = useState({
        maxEntrees: 1,
        maxSides: 1,
        mealType: "A la carte",
        allowOnlyOne: true, // Set to true to enforce the "A la carte" restriction
    });

    const [selectedItemIds, setSelectedItemIds] = useState([]);

    // Add menuItems state to global provider
    // Static menuItems array (global)
    const [menuItems, setMenuItems] = useState([
        { id: "orangeChicken", name: "Orange Chicken", price: 2222222 },
        { id: "chowMein", name: "Chow Mein", price: 0 },
        { id: "friedRice", name: "Fried Rice", price: 0 },
        { id: "eggRoll", name: "Egg Roll", price: 0 },
        { id: "applePieRoll", name: "Apple Pie Roll", price: 0 },
        { id: "vegetableSpringRoll", name: "Vegetable Spring Roll", price: 0 },
        { id: "creamCheeseRangoon", name: "Cream Cheese Rangoon", price: 0 },
        { id: 'chowMein', name: 'Chow Mein', price: 0 },
        { id: 'friedRice', name: 'Fried Rice', price: 0 },
        { id: 'steamedRice', name: 'White Steamed Rice', price: 0 },
        { id: 'superGreens', name: 'Super Greens', price: 0 },
        { id: 'blazingBourbonChicken', name: 'Hot Ones Blazing Bourbon Chicken', price: 0 },
        // { id: 'orangeChicken', name: 'The Original Orange Chicken', price: 6.77 },
        { id: 'pepperSirloinSteak', name: 'Black Pepper Sirloin Steak', price: 0 },
        { id: 'honeyWalnutShrimp', name: 'Honey Walnut Shrimp', price: 0 },
        { id: 'grilledTeriyakiChicken', name: 'Grilled Teriyaki Chicken', price: 0 },
        { id: 'broccoliBeef', name: 'Broccoli Beef', price: 0 },
        { id: 'kungPaoChicken', name: 'Kung Pao Chicken', price: 0 },
        { id: 'honeySesameChicken', name: 'Honey Sesame Chicken Breast', price: 0 },
        { id: 'beijingBeef', name: 'Beijing Beef', price: 0},
        { id: 'mushroomChicken', name: 'Mushroom Chicken', price: 0 },
        { id: 'sweetfireChicken', name: 'SweetFire Chicken Breast', price: 0 },
        { id: 'stringBeanChicken', name: 'String Bean Chicken Breast', price: 0 },
        { id: 'blackPepperChicken', name: 'Black Pepper Chicken', price: 0 },
    ]);

    const updateMenuItems = (updatedMenuItems) => {
        updatedMenuItems.forEach((updatedItem) => {
            const item = menuItems.find((menuItem) => menuItem.name === updatedItem.name);
            if (item) {
                item.price = parseFloat(updatedItem.price); // Update price directly
            }
        });
    };

    // Function to update meal options based on the selected category
    const updateMealOptions = (mealType) => {
        switch (mealType) {
            case "A la carte":
                setMealOptions({ maxEntrees: 1, maxSides: 1, mealType, allowOnlyOne: true , allowDrink: true});
                break;
            case "Bowl":
                setMealOptions({ maxEntrees: 1, maxSides: 1, mealType, allowOnlyOne: false, allowDrink: true });
                break;
            case "Plate":
                setMealOptions({ maxEntrees: 2, maxSides: 1, mealType, allowOnlyOne: false, allowDrink: true });
                break;
            case "Bigger Plate":
                setMealOptions({ maxEntrees: 3, maxSides: 1, mealType, allowOnlyOne: false, allowDrink: true });
                break;
            default:
                setMealOptions({ maxEntrees: 1, maxSides: 1, mealType: "A la carte", allowOnlyOne: true, allowDrink: true });
        }
    };

    // Function to update selected item IDs
    const addItemToSelection = (item) => {
        setSelectedItemIds((prevIds) => {
            // if (!prevIds.includes(item)) {
            //     return [...prevIds, item];
            // }
            // return prevIds;
            return [...prevIds, item];
        });
    };

    const removeItemFromSelection = (item) => {
        setSelectedItemIds((prevIds) => prevIds.filter((id) => id !== item));
    };

    const clearSelectedItems = useCallback(() => {
        setSelectedItemIds([]);
    }, []); // No dependencies mean this function won't change

    return (
        <GlobalStateContext.Provider value={{ mealOptions, updateMealOptions, selectedItemIds, addItemToSelection, removeItemFromSelection, clearSelectedItems, menuItems, updateMenuItems }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);
