// src/app/components/GlobalStateProvider.js

"use client";

import React, { createContext, useContext, useState } from "react";

// Create the global state context
const GlobalStateContext = createContext();

// Define the provider component
export const GlobalStateProvider = ({ children }) => {
    const [mealOptions, setMealOptions] = useState({
        maxEntrees: 0,
        maxSides: 0,
        mealType: "",
    });

    // Function to update meal options based on the selected category
    const updateMealOptions = (mealType) => {
        switch (mealType) {
            case "A la carte":
                return setMealOptions({ maxEntrees: 1, maxSides: 0, mealType });
            case "Bowl":
                return setMealOptions({ maxEntrees: 1, maxSides: 1, mealType });
            case "Plate":
                return setMealOptions({ maxEntrees: 2, maxSides: 1, mealType });
            case "Bigger Plate":
                return setMealOptions({ maxEntrees: 3, maxSides: 1, mealType });
            default:
                return setMealOptions({ maxEntrees: 0, maxSides: 0, mealType: "" });
        }
        // console.log(`Updated meal options: ${JSON.stringify(mealOptions)}`);
    };

    return (
        <GlobalStateContext.Provider value={{ mealOptions, updateMealOptions }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);
