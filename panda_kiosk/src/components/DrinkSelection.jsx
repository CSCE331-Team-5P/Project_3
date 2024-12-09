"use client";

import { useState } from "react";
import DrinkCard from "@/components/DrinkCard";
import { useGlobalState } from "@/components/GlobalStateProvider";

export default function DrinkSelection({ onButtonClick }) {
    const { drinks, addItemToSelection, removeItemFromSelection } = useGlobalState();

    // Initialize drink quantities
    const [drinkQuantities, setDrinkQuantities] = useState(
        drinks.reduce((acc, drink) => ({ ...acc, [drink.id]: 0 }), {})
    );

    // Increment drink quantity
    const incrementQuantity = (drinkId) => {
        addItemToSelection(drinkId); // Add to selectedItemIds
        setDrinkQuantities((prevState) => ({
            ...prevState,
            [drinkId]: prevState[drinkId] + 1,
        }));
        onButtonClick(); // Trigger the screenshot update
    };

    // Decrement drink quantity
    const decrementQuantity = (drinkId) => {
        removeItemFromSelection(drinkId); // Remove from selectedItemIds
        setDrinkQuantities((prevState) => {
            if (prevState[drinkId] > 0) {
                onButtonClick(); // Trigger the screenshot update
                return {
                    ...prevState,
                    [drinkId]: prevState[drinkId] - 1,
                };
            }
            return prevState;
        });
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
                {drinks.map((drink) => (
                    <DrinkCard
                        key={drink.id}
                        title={drink.title}
                        image={drink.imageUrl}
                        quantity={drinkQuantities[drink.id] || 0}
                        onIncrement={() => incrementQuantity(drink.id)}
                        onDecrement={() => decrementQuantity(drink.id)}
                    />
                ))}
            </div>
        </div>
    );
}
