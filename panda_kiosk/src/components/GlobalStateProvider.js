"use client";

import React, { createContext, useContext, useState } from "react";

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

    // Function to update meal options based on the selected category
    const updateMealOptions = (mealType) => {
        switch (mealType) {
            case "A la carte":
                setMealOptions({ maxEntrees: 1, maxSides: 1, mealType, allowOnlyOne: true });
                break;
            case "Bowl":
                setMealOptions({ maxEntrees: 1, maxSides: 1, mealType, allowOnlyOne: false });
                break;
            case "Plate":
                setMealOptions({ maxEntrees: 2, maxSides: 1, mealType, allowOnlyOne: false });
                break;
            case "Bigger Plate":
                setMealOptions({ maxEntrees: 3, maxSides: 1, mealType, allowOnlyOne: false });
                break;
            default:
                setMealOptions({ maxEntrees: 1, maxSides: 1, mealType: "A la carte", allowOnlyOne: true });
        }
    };

    // Function to update selected item IDs
    const addItemToSelection = (item) => {
        setSelectedItemIds((prevIds) => {
            if (!prevIds.includes(item)) {
                return [...prevIds, item];
            }
            return prevIds;
        });
    };

    const removeItemFromSelection = (item) => {
        setSelectedItemIds((prevIds) => prevIds.filter((id) => id !== item));
    };

    // const clearSelectedItems = () => {
    //     setSelectedItemIds([]); 
    // };

    return (
        <GlobalStateContext.Provider value={{ mealOptions, updateMealOptions, selectedItemIds, addItemToSelection, removeItemFromSelection }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);
