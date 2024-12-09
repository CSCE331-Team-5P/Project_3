"use client";

import { deepEqual } from "assert";
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

    const [extras, setExtras] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const [drinks, setDrinks] = useState([]);

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
            const newDrinks = [];
            const newDesserts = [];
            const newExtras = [];

            menuItems.forEach(item => {
                if (item.category === "Side") {
                    newSides.push({
                        id: item.id,
                        title: item.name,
                        imageUrl: item.imageUrl,
                        calories: item.calories || "220",
                    });
                } else if (item.category === "Entree") {
                    newEntrees.push({
                        id: item.id,
                        title: item.name,
                        imageUrl: item.imageUrl,
                        calories: item.calories || "220",
                    });
                } else if(item.category === "Drink") {
                    newDrinks.push({
                        id: item.id, 
                        title: item.name, 
                        imageUrl: item.imageUrl, 
                        calories: item.calories || "220",
                    });
                } else if (item.category === "Extras") {
                    if (['Apple Pie Roll'].includes(item.name)) {
                        newDesserts.push({
                            id: item.id, 
                            title: item.name, 
                            imageUrl: item.imageUrl,
                            calories: item.calories || "220",
                        });
                    } else {
                        newExtras.push({
                            id: item.id, 
                            title: item.name, 
                            imageUrl: item.imageUrl,
                            calories: item.calories || "220",
                        });
                    }
                }
            });

            setSides(newSides);
            setEntrees(newEntrees);
            setDrinks(newDrinks);
            setDesserts(newDesserts);
            setExtras(newExtras);
        };

        if (menuItems.length > 0) {
            categorizeMenuItems();
        }
    }, [menuItems]);

    // Function to get the image URL based on the item name
    const getImageForItem = (name) => {
        const imageMap = {
            // sides and entrees
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

            //drinks
            "Dr Pepper": "/DrPepper.avif",
            "Coca Cola": "/CocaCola.avif",
            "Diet Coke": "/DietCoke.avif",
            "Mango Guava Flavored Tea": "/MangaGuavaTea.avif",
            "Peach Lychee Flavored Refresher": "/PeachLycheeRefresher.avif",
            "Pomegranate Pineapple Flavored Lemonade": "/PomegranatePineappleLemonade.avif",
            "Watermelon Mango Flavored Refresher": "/WatermelonMangoRefresher.avif",
            "Barq's Root Beer": "/BarqsRootBeer.avif",
            "Fanta Orange": "/FantaOrange.avif",
            "Minute Maid Lemonade": "/MinuteMaidLemonade.avif",
            "Powerade Mountain Berry Blast": "/PoweradeMountainBerryBlast.avif",
            "Sprite": "/Sprite.avif",
            "Coca Cola Cherry": "/CocaColaCherry.avif",
            "Fuze Raspberry Iced Tea": "/FuzeRaspberryIcedTea.avif",
            "Sweet Tea": "/SweetTea.avif",
            "Powerade Fruit Punch": "/PoweradeFruitPunch.avif",
            "Dasani": "/Dasani.avif",
            "Powerade Berry Blast": "/PoweradeBerryBlast.avif",
            "Minute Maid Orange": "/MinuteMaidOrange.avif",
            "Minute Maid Apple Juice": "/MinuteMaidAppleJuice.avif",
            "Coke Mexico": "/CokeMexico.avif",
            "Coke Zero": "/CokeZero.avif",
            "Smartwater": "/Smartwater.avif",
            "Bai Coco Fusion": "/BaiCocoFusion.avif",
            "Drink Small": "/DrinkSmall.avif",
            "Drink Medium": "/DrinkMedium.avif",
            "Drink Large": "/DrinkLarge.avif",

            //desserts and extras
            "Apple Pie Roll": "/apple-pie-roll.png",
            "Chicken Egg Roll": "/chicken-egg-roll.png",
            "Veggie Spring Roll": "/veggie-spring-roll.png",
            "Cream Cheese Rangoon": "/cream-cheese-rangoon.png",
        };

        // Return the matching image or default to PandaLogo
        return imageMap[name] || "/panda.svg";
    };

    // Function to get the item ID based on the item name
    const getIdForItem = (name) => {
        const idMap = {
            "Chow Mein": "Chow Mein",
            "Fried Rice": "Fried Rice",
            "White Steamed Rice": "White Steamed Rice",
            "Super Greens": "Super Greens",
            "Hot Ones Blazing Burbon Chicken": "Hot Ones Blazing Burbon Chicken",
            "Orange Chicken": "Orange Chicken",
            "Black Pepper Sirloin Steak": "Black Pepper Sirloin Steak",
            "Honey Walnut Shrimp": "Honey Walnut Shrimp",
            "Grilled Teriyaki Chicken": "Grilled Teriyaki Chicken",
            "Broccoli Beef": "Broccoli Beef",
            "Kung Pao Chicken": "Kung Pao Chicken",
            "Honey Sesame Chicken": "Honey Sesame Chicken",
            "Beijing Beef": "Beijing Beef",
            "Mushroom Chicken": "Mushroom Chicken",
            "Sweet Fire Chicken Breast": "Sweet Fire Chicken Breast",
            "String Bean Chicken Breast": "String Bean Chicken Breast",
            "Black Pepper Chicken": "Black Pepper Chicken",

            // drinks
            "Dr Pepper": "Dr Pepper",
            "Coca Cola": "Coca Cola",
            "Diet Coke": "Diet Coke",
            "Mango Guava Flavored Tea": "Mango Guava Flavored Tea",
            "Peach Lychee Flavored Refresher": "Peach Lychee Flavored Refresher",
            "Pomegranate Pineapple Flavored Lemonade": "Pomegranate Pineapple Flavored Lemonade",
            "Watermelon Mango Flavored Refresher": "Watermelon Mango Flavored Refresher",
            "Barq's Root Beer": "Barq's Root Beer",
            "Fanta Orange": "Fanta Orange",
            "Minute Maid Lemonade": "Minute Maid Lemonade",
            "Powerade Mountain Berry Blast": "Powerade Mountain Berry Blast",
            "Sprite": "Sprite",
            "Coca Cola Cherry": "Coca Cola Cherry",
            "Fuze Raspberry Iced Tea": "Fuze Raspberry Iced Tea",
            "Sweet Tea": "Sweet Tea",
            "Powerade Fruit Punch": "Powerade Fruit Punch",
            "Dasani": "Dasani",
            "Powerade Berry Blast": "Powerade Berry Blast",
            "Minute Maid Orange": "Minute Maid Orange",
            "Minute Maid Apple Juice": "Minute Maid Apple Juice",
            "Coke Mexico": "Coke Mexico",
            "Coke Zero": "Coke Zero",
            "Smartwater": "Smartwater",
            "Bai Coco Fusion": "Bai Coco Fusion",
            "Drink Small": "Drink Small",
            "Drink Medium": "Drink Medium",
            "Drink Large": "Drink Large",       

            // Desserts and Extras
            "Apple Pie Roll": "Apple Pie Roll",
            "Chicken Egg Roll": "Chicken Egg Roll",
            "Veggie Spring Roll": "Veggie Spring Roll",
            "Cream Cheese Rangoon": "Cream Cheese Rangoon",
        };

        // Generate a new ID if the item doesn't exist in the map
        // return idMap[name] || `item_${Math.random().toString(36).substr(2, 9)}`;
        return idMap[name] || name;
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

    // // Function to manage extras
    // const addExtra = (extra) => {
    //     setExtras((prevExtras) => [...prevExtras, extra]);
    // };

    // const removeExtra = (extra) => {
    //     setExtras((prevExtras) => prevExtras.filter((id) => id !== extra));
    // };

    // // Function to manage drinks
    // const addDrink = (drink) => {
    //     setDrinks((prevDrinks) => [...prevDrinks, drink]);
    // };

    // const removeDrink = (drink) => {
    //     setDrinks((prevDrinks) => prevDrinks.filter((id) => id !== drink));
    // };

    return (
        <GlobalStateContext.Provider value={{ mealOptions, updateMealOptions, selectedItemIds, addItemToSelection, removeItemFromSelection, clearSelectedItems, menuItems, sides, entrees, drinks, desserts, extras }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);