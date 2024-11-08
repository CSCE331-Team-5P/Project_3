// src/app/components/GlobalStateProvider.js

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
                setMealOptions({ maxEntrees: 1, maxSides: 0, mealType });
                break;
            case "Bowl":
                setMealOptions({ maxEntrees: 1, maxSides: 1, mealType });
                break;
            case "Plate":
                setMealOptions({ maxEntrees: 2, maxSides: 1, mealType });
                break;
            case "Bigger Plate":
                setMealOptions({ maxEntrees: 3, maxSides: 1, mealType });
                break;
            default:
                setMealOptions({ maxEntrees: 0, maxSides: 0, mealType: "" });
        }
        console.log(`Updated meal options: ${JSON.stringify(mealOptions)}`);
    };

    return (
        <GlobalStateContext.Provider value={{ mealOptions, updateMealOptions }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);
