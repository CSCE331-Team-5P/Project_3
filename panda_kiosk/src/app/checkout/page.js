"use client";
import Navbar from "@/components/Navbar";
import { useGlobalState } from "@/components/GlobalStateProvider";
import { useRouter } from "next/navigation";

export default function Checkout() {
    const { selectedItemIds, extras, drinks } = useGlobalState();
    const router = useRouter();

    const menuItems = [
        // Entrees
        { id: "blackPepperChicken", name: "Black Pepper Chicken", price: 8.49 },
        { id: "stringBeanChicken", name: "String Bean Chicken", price: 8.49 },
        { id: "sweetfireChicken", name: "Sweetfire Chicken Breast", price: 8.49 },
        { id: "mushroomChicken", name: "Mushroom Chicken", price: 8.49 },
        { id: "beijingBeef", name: "Beijing Beef", price: 8.99 },
        { id: "honeySesameChicken", name: "Honey Sesame Chicken", price: 8.99 },
        { id: "grilledTeriyakiChicken", name: "Grilled Teriyaki Chicken", price: 8.99 },
        { id: "blazingBourbonChicken", name: "Blazing Bourbon Chicken", price: 9.49 },
        { id: "orangeChicken", name: "Orange Chicken", price: 8.99 },
        { id: "pepperSirloinSteak", name: "Pepper Sirloin Steak", price: 10.49 },
        { id: "kungPaoChicken", name: "Kung Pao Chicken", price: 8.49 },
        { id: "broccoliBeef", name: "Broccoli Beef", price: 9.49 },
        { id: "teriyakiChicken", name: "Teriyaki Chicken", price: 8.49 },
        { id: "beefBroccoli", name: "Beef Broccoli", price: 9.49 },
        { id: "shrimp", name: "Shrimp", price: 10.49 },
        { id: "honeyWalnutShrimp", name: "Honey Walnut Shrimp", price: 11.49 },

        // Sides
        { id: "friedRice", name: "Fried Rice", price: 4.99 },
        { id: "chowMein", name: "Chow Mein", price: 4.99 },
        { id: "superGreens", name: "Super Greens", price: 4.99 },
        { id: "steamedRice", name: "Steamed Rice", price: 3.99 },
        { id: "brownRice", name: "Brown Rice", price: 3.99 },
        { id: "mixedVegetables", name: "Mixed Vegetables", price: 4.49 },

        // Extras
        { id: "chickenEggRoll", name: "Chicken Egg Roll", price: 1.99 },
        { id: "vegetableSpringRoll", name: "Vegetable Spring Roll", price: 2.49 },
        { id: "creamCheeseRangoon", name: "Cream Cheese Rangoon", price: 4.49 },

        // Desserts
        { id: "applePieRoll", name: "Apple Pie Roll", price: 3.99 },

        // Drinks
        { id: "drPepper", name: "Dr Pepper", price: 2.99 },
        { id: "cocaCola", name: "Coca Cola", price: 2.99 },
        { id: "dietCoke", name: "Diet Coke", price: 2.99 },
        { id: "mangoGuavaTea", name: "Mango Guava Flavored Tea", price: 3.49 },
        { id: "peachLycheeRefresher", name: "Peach Lychee Flavored Refresher", price: 3.49 },
        { id: "pomegranatePineappleLemonade", name: "Pomegranate Pineapple Flavored Lemonade", price: 3.49 },
        { id: "watermelonMangoRefresher", name: "Watermelon Mango Flavored Refresher", price: 3.49 },
        { id: "barqsRootBeer", name: "Barq's Root Beer", price: 2.99 },
        { id: "fantaOrange", name: "Fanta Orange", price: 2.99 },
        { id: "minuteMaidLemonade", name: "Minute Maid Lemonade", price: 2.99 },
        { id: "poweradeMountainBerryBlast", name: "Powerade Mountain Berry Blast", price: 3.49 },
        { id: "sprite", name: "Sprite", price: 2.99 },
        { id: "cocaColaCherry", name: "Coca Cola Cherry", price: 2.99 },
        { id: "fuzeRaspberryIcedTea", name: "Fuze Raspberry Iced Tea", price: 3.49 },
        { id: "sweetTea", name: "Sweet Tea", price: 2.99 },
        { id: "poweradeFruitPunch", name: "Powerade Fruit Punch", price: 3.49 },
        { id: "dasani", name: "Dasani Water", price: 1.99 },
        { id: "poweradeBerryBlast", name: "Powerade Berry Blast", price: 3.49 },
        { id: "minuteMaidOrange", name: "Minute Maid Orange", price: 2.99 },
        { id: "minuteMaidAppleJuice", name: "Minute Maid Apple Juice", price: 2.99 },
        { id: "cokeMexico", name: "Coke Mexico", price: 2.99 },
        { id: "cokeZero", name: "Coke Zero", price: 2.99 },
        { id: "smartwater", name: "Smartwater", price: 2.49 },
        { id: "baiCocoFusion", name: "Bai Coco Fusion", price: 3.49 },
        { id: "drinkSmall", name: "Small Drink", price: 1.99 },
        { id: "drinkMedium", name: "Medium Drink", price: 2.49 },
        { id: "drinkLarge", name: "Large Drink", price: 2.99 },
    ];

    const allItems = [...selectedItemIds, ...extras, ...drinks];

    const aggregatedItems = allItems.reduce((acc, id) => {
        if (acc[id]) {
            acc[id].quantity += 1;
        } else {
            const item = menuItems.find((menuItem) => menuItem.id === id);
            if (item) {
                acc[id] = { ...item, quantity: 1 };
            }
        }
        return acc;
    }, {});

    const orderItems = Object.values(aggregatedItems);
    const subtotal = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <div className="flex justify-center items-center flex-grow">
                <div className="flex flex-col items-center space-y-8 w-full max-w-lg px-4 bg-red-100 rounded-lg p-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                        <h1 className="text-3xl font-bold text-black mb-4 text-center">Your Order</h1>
                        <ul className="text-sm text-black space-y-2">
                            {orderItems.map((item, index) => (
                                <li key={index} className="flex justify-between">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full space-y-4">
                        <p>Subtotal: ${subtotal.toFixed(2)}</p>
                        <p>Tax: ${tax.toFixed(2)}</p>
                        <p className="font-bold text-black">Total: ${total.toFixed(2)}</p>
                    </div>
                    <button className="bg-red-600 text-white px-8 py-3 rounded-full">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}
