import { useState } from "react";
import DrinkCard from "@/components/DrinkCard";

export default function DrinkSelection() {
    const drinks = [
        { name: 'Dr Pepper', image: '/DrPepper.png' },
        { name: 'Coca Cola', image: '/CocaCola.png' },
        { name: 'Diet Coke', image: '/DietCoke.png' },
        { name: 'Manga Guava Flavored Tea', image: '/MangaGuavaTea.png' },
        { name: 'Peach Lychee Flavored Refresher', image: '/PeachLycheeRefresher.png' },
        { name: 'Pomegranate Pineapple Flavored Lemonade', image: '/PomegranatePineappleLemonade.png' },
        { name: 'Watermelon Mango Flavored Refresher', image: '/WatermelonMangoRefresher.png' },
        { name: "Barq's Root Beer", image: '/BarqsRootBeer.png' },
        { name: 'Fanta Orange', image: '/FantaOrange.png' },
        { name: 'Minute Maid Lemonade', image: '/MinuteMaidLemonade.png' },
        { name: 'Powerade Mountain Berry Blast', image: '/PoweradeMountainBerryBlast.png' },
        { name: 'Sprite', image: '/Sprite.png' },
        { name: 'Coca Cola Cherry', image: '/CocaColaCherry.png' },
        { name: 'Fuze Raspberry Iced Tea', image: '/FuzeRaspberryIcedTea.png' },
        { name: 'Sweet Tea', image: '/SweetTea.png' },
        { name: 'Powerade Fruit Punch', image: '/PoweradeFruitPunch.png' },
        { name: 'Dasani', image: '/Dasani.png' },
        { name: 'Powerade Berry Blast', image: '/PoweradeBerryBlast.png' },
        { name: 'Minute Maid Orange', image: '/MinuteMaidOrange.png' },
        { name: 'Minute Maid Apple Juice', image: '/MinuteMaidAppleJuice.png' },
        { name: 'Coke Mexico', image: '/CokeMexico.png' },
        { name: 'Coke Zero', image: '/CokeZero.png' },
        { name: 'Smartwater', image: '/Smartwater.png' },
        { name: 'Bai Coco Fusion', image: '/BaiCocoFusion.png' },
        { name: 'Drink Small', image: '/DrinkSmall.png' },
        { name: 'Drink Medium', image: '/DrinkMedium.png' },
        { name: 'Drink Large', image: '/DrinkLarge.png' },
    ];
    
    
    const [drinkQuantities, setDrinkQuantities] = useState(
        drinks.reduce((acc, drink) => ({ ...acc, [drink.name]: 0 }), {})
    );

    const incrementQuantity = (drinkName) => {
        setDrinkQuantities((prevState) => ({
            ...prevState,
            [drinkName]: prevState[drinkName] + 1,
        }));
    };

    const decrementQuantity = (drinkName) => {
        setDrinkQuantities((prevState) => ({
            ...prevState,
            [drinkName]: prevState[drinkName] > 0 ? prevState[drinkName] - 1 : 0,
        }));
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Available Drinks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
                {drinks.map((drink) => (
                    <DrinkCard
                        key={drink.name}
                        title={drink.name}
                        image={drink.image}
                        quantity={drinkQuantities[drink.name]}
                        onIncrement={() => incrementQuantity(drink.name)}
                        onDecrement={() => decrementQuantity(drink.name)}
                    />
                ))}
            </div>
        </div>
    );
}
