"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

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

    const [menuItems, setMenuItems] = useState([]);
    const [sides, setSides] = useState([]);
    const [entrees, setEntrees] = useState([]);

    // Fetch menu items from the database and format them
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("/api/connectDB");
                const data = await response.json();

                if (data.success && data.menuItems) {
                    const formattedMenuItems = data.menuItems.map(item => {
                        const id = getIdForItem(item.name);
                        const imageUrl = getImageForItem(item.name);

                        return {
                            id: id,
                            name: item.name,
                            price: item.price,
                            category: item.category || "Unknown",
                            imageUrl: imageUrl,
                        };
                    });

                    setMenuItems(formattedMenuItems);
                }
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    // Logic to categorize sides and entrees from the menuItems
    useEffect(() => {
        const categorizeMenuItems = () => {
            const newSides = [];
            const newEntrees = [];

            menuItems.forEach(item => {
                if (item.category === "Side") {
                    newSides.push({
                        id: item.id,
                        title: item.name,
                        imageUrl: item.imageUrl,
                        calories: item.calories || "N/A",
                    });
                } else if (item.category === "Entree") {
                    newEntrees.push({
                        id: item.id,
                        title: item.name,
                        imageUrl: item.imageUrl,
                        calories: item.calories || "N/A",
                    });
                }
            });

            setSides(newSides);
            setEntrees(newEntrees);
        };

        if (menuItems.length > 0) {
            categorizeMenuItems();
        }
    }, [menuItems]);

    // Function to get the image URL based on the item name
    const getImageForItem = (name) => {
        const imageMap = {
            "Chow Mein": "/ChowMein.png",
            "Fried Rice": "/FriedRice.png",
            "White Steamed Rice": "/WhiteSteamedRice.png",
            "Super Greens": "/SuperGreens.png",
            "Hot Ones Blazing Burbon Chicken": "/BlazinBurbon.png",
            "Orange Chicken": "/OrangeChicken.png",
            "Black Pepper Sirloin Steak": "/BlackPepperSteak.png",
            "Honey Walnut Shrimp": "/HoneyWalnutShrimp.png",
            "Grilled Teriyaki Chicken": "/GrilledTeriyakiChicken.png",
            "Broccoli Beef": "/BroccoliBeef.png",
            "Kung Pao Chicken": "/KungPaoChicken.png",
            "Honey Sesame Chicken": "/HoneySesameChicken.png",
            "Beijing Beef": "/BeijingBeef.png",
            "Mushroom Chicken": "/MushroomChicken.png",
            "Sweet Fire Chicken Breast": "/SweetfireChicken.png",
            "String Bean Chicken Breast": "/StringBeanChicken.png",
            "Black Pepper Chicken": "/BlackPepperChicken.png",
        };

        // Return the matching image or default to PandaLogo
        return imageMap[name] || "/PandaLogo.svg";
    };

    // Function to get the item ID based on the item name
    const getIdForItem = (name) => {
        const idMap = {
            "Chow Mein": "chowMein",
            "Fried Rice": "friedRice",
            "White Steamed Rice": "steamedRice",
            "Super Greens": "superGreens",
            "Hot Ones Blazing Burbon Chicken": "blazingBourbonChicken",
            "Orange Chicken": "orangeChicken",
            "Black Pepper Sirloin Steak": "pepperSirloinSteak",
            "Honey Walnut Shrimp": "honeyWalnutShrimp",
            "Grilled Teriyaki Chicken": "grilledTeriyakiChicken",
            "Broccoli Beef": "broccoliBeef",
            "Kung Pao Chicken": "kungPaoChicken",
            "Honey Sesame Chicken": "honeySesameChicken",
            "Beijing Beef": "beijingBeef",
            "Mushroom Chicken": "mushroomChicken",
            "Sweet Fire Chicken Breast": "sweetfireChicken",
            "String Bean Chicken Breast": "stringBeanChicken",
            "Black Pepper Chicken": "blackPepperChicken",
        };

        // Generate a new ID if the item doesn't exist in the map
        return idMap[name] || `item_${Math.random().toString(36).substr(2, 9)}`;
    };

    // Function to update meal options based on the selected category
    const updateMealOptions = (mealType) => {
        switch (mealType) {
            case "A la carte":
                setMealOptions({ maxEntrees: 1, maxSides: 1, mealType, allowOnlyOne: true, allowDrink: true });
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

    const addItemToSelection = (item) => {
        setSelectedItemIds((prevIds) => [...prevIds, item]);
    };

    const removeItemFromSelection = (item) => {
        setSelectedItemIds((prevIds) => prevIds.filter((id) => id !== item));
    };

    const clearSelectedItems = useCallback(() => {
        setSelectedItemIds([]);
    }, []);

    return (
        <GlobalStateContext.Provider value={{ mealOptions, updateMealOptions, selectedItemIds, addItemToSelection, removeItemFromSelection, clearSelectedItems, menuItems, sides, entrees }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);