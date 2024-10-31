//components/DrinkSelection.jsx
import { useState } from "react";
import DrinkCard from "@/components/DrinkCard";

export default function DrinkSelection() {
    //^ State to store drink quantities
    const [drinkQuantities, setDrinkQuantities] = useState({
        small: 0,
        medium: 0,
        large: 0,
        bottled: 0,
    });

    //^ Increment drink quantity
    const incrementQuantity = (size) => {
        setDrinkQuantities((prevState) => ({
            ...prevState,
            [size]: prevState[size] + 1,
        }));
    };

    //^ Decrement drink quantity
    const decrementQuantity = (size) => {
        setDrinkQuantities((prevState) => ({
            ...prevState,
            [size]: prevState[size] > 0 ? prevState[size] - 1 : 0,
        }));
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Available Drinks</h2>
            <div className="flex flex-col items-center space-y-5">
                <DrinkCard
                    title="Small Drink"
                    description="A refreshing small-size beverage."
                    quantity={drinkQuantities.small}
                    onIncrement={() => incrementQuantity("small")}
                    onDecrement={() => decrementQuantity("small")}
                />
                <DrinkCard
                    title="Medium Drink"
                    description="A refreshing medium-size beverage."
                    quantity={drinkQuantities.medium}
                    onIncrement={() => incrementQuantity("medium")}
                    onDecrement={() => decrementQuantity("medium")}
                />
                <DrinkCard
                    title="Large Drink"
                    description="A refreshing large-size beverage."
                    quantity={drinkQuantities.large}
                    onIncrement={() => incrementQuantity("large")}
                    onDecrement={() => decrementQuantity("large")}
                />
                <DrinkCard
                    title="Bottled Drink"
                    description="A refreshing bottled beverage."
                    quantity={drinkQuantities.bottled}
                    onIncrement={() => incrementQuantity("bottled")}
                    onDecrement={() => decrementQuantity("bottled")}
                />
            </div>
        </div>
    );
}
