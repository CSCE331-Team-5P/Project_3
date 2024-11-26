"use client";
import { useState } from "react";
import DrinkCard from "@/components/DrinkCard";
import { useGlobalState } from "@/components/GlobalStateProvider";

export default function DrinkSelection() {
    const { addDrink, removeDrink } = useGlobalState();

    const drinks = [
        { id: 'drPepper', name: 'Dr Pepper', image: '/DrPepper.avif' },
        { id: 'cocaCola', name: 'Coca Cola', image: '/CocaCola.avif' },
        { id: 'dietCoke', name: 'Diet Coke', image: '/DietCoke.avif' },
        { id: 'mangoGuavaTea', name: 'Mango Guava Flavored Tea', image: '/MangaGuavaTea.avif' },
        { id: 'peachLycheeRefresher', name: 'Peach Lychee Flavored Refresher', image: '/PeachLycheeRefresher.avif' },
        { id: 'pomegranatePineappleLemonade', name: 'Pomegranate Pineapple Flavored Lemonade', image: '/PomegranatePineappleLemonade.avif' },
        { id: 'watermelonMangoRefresher', name: 'Watermelon Mango Flavored Refresher', image: '/WatermelonMangoRefresher.avif' },
        { id: 'barqsRootBeer', name: "Barq's Root Beer", image: '/BarqsRootBeer.avif' },
        { id: 'fantaOrange', name: 'Fanta Orange', image: '/FantaOrange.avif' },
        { id: 'minuteMaidLemonade', name: 'Minute Maid Lemonade', image: '/MinuteMaidLemonade.avif' },
        { id: 'poweradeMountainBerryBlast', name: 'Powerade Mountain Berry Blast', image: '/PoweradeMountainBerryBlast.avif' },
        { id: 'sprite', name: 'Sprite', image: '/Sprite.avif' },
        { id: 'cocaColaCherry', name: 'Coca Cola Cherry', image: '/CocaColaCherry.avif' },
        { id: 'fuzeRaspberryIcedTea', name: 'Fuze Raspberry Iced Tea', image: '/FuzeRaspberryIcedTea.avif' },
        { id: 'sweetTea', name: 'Sweet Tea', image: '/SweetTea.avif' },
        { id: 'poweradeFruitPunch', name: 'Powerade Fruit Punch', image: '/PoweradeFruitPunch.avif' },
        { id: 'dasani', name: 'Dasani', image: '/Dasani.avif' },
        { id: 'poweradeBerryBlast', name: 'Powerade Berry Blast', image: '/PoweradeBerryBlast.avif' },
        { id: 'minuteMaidOrange', name: 'Minute Maid Orange', image: '/MinuteMaidOrange.avif' },
        { id: 'minuteMaidAppleJuice', name: 'Minute Maid Apple Juice', image: '/MinuteMaidAppleJuice.avif' },
        { id: 'cokeMexico', name: 'Coke Mexico', image: '/CokeMexico.avif' },
        { id: 'cokeZero', name: 'Coke Zero', image: '/CokeZero.avif' },
        { id: 'smartwater', name: 'Smartwater', image: '/Smartwater.avif' },
        { id: 'baiCocoFusion', name: 'Bai Coco Fusion', image: '/BaiCocoFusion.avif' },
        { id: 'drinkSmall', name: 'Drink Small', image: '/DrinkSmall.avif' },
        { id: 'drinkMedium', name: 'Drink Medium', image: '/DrinkMedium.avif' },
        { id: 'drinkLarge', name: 'Drink Large', image: '/DrinkLarge.avif' },
    ];

    const [drinkQuantities, setDrinkQuantities] = useState(
        drinks.reduce((acc, drink) => ({ ...acc, [drink.id]: 0 }), {})
    );

    const incrementQuantity = (drinkId) => {
        addDrink(drinkId);
        setDrinkQuantities((prevState) => ({
            ...prevState,
            [drinkId]: prevState[drinkId] + 1,
        }));
    };

    const decrementQuantity = (drinkId) => {
        setDrinkQuantities((prevState) => {
            if (prevState[drinkId] > 0) {
                removeDrink(drinkId);
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
                        title={drink.name}
                        image={drink.image}
                        quantity={drinkQuantities[drink.id]}
                        onIncrement={() => incrementQuantity(drink.id)}
                        onDecrement={() => decrementQuantity(drink.id)}
                    />
                ))}
            </div>
        </div>
    );
}
