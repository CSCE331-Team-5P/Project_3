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
        <GlobalStateContext.Provider value={{ mealOptions, updateMealOptions, selectedItemIds, addItemToSelection, removeItemFromSelection, clearSelectedItems }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);
