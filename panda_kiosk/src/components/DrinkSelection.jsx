import { useState } from "react";
import DrinkCard from "@/components/DrinkCard";

export default function DrinkSelection() {
    const drinks = [
        { name: 'Dr Pepper', image: '/DrPepper.avif' },
        { name: 'Coca Cola', image: '/CocaCola.avif' },
        { name: 'Diet Coke', image: '/DietCoke.avif' },
        { name: 'Manga Guava Flavored Tea', image: '/MangaGuavaTea.avif' },
        { name: 'Peach Lychee Flavored Refresher', image: '/PeachLycheeRefresher.avif' },
        { name: 'Pomegranate Pineapple Flavored Lemonade', image: '/PomegranatePineappleLemonade.avif' },
        { name: 'Watermelon Mango Flavored Refresher', image: '/WatermelonMangoRefresher.avif' },
        { name: "Barq's Root Beer", image: '/BarqsRootBeer.avif' },
        { name: 'Fanta Orange', image: '/FantaOrange.avif' },
        { name: 'Minute Maid Lemonade', image: '/MinuteMaidLemonade.avif' },
        { name: 'Powerade Mountain Berry Blast', image: '/PoweradeMountainBerryBlast.avif' },
        { name: 'Sprite', image: '/Sprite.avif' },
        { name: 'Coca Cola Cherry', image: '/CocaColaCherry.avif' },
        { name: 'Fuze Raspberry Iced Tea', image: '/FuzeRaspberryIcedTea.avif' },
        { name: 'Sweet Tea', image: '/SweetTea.avif' },
        { name: 'Powerade Fruit Punch', image: '/PoweradeFruitPunch.avif' },
        { name: 'Dasani', image: '/Dasani.avif' },
        { name: 'Powerade Berry Blast', image: '/PoweradeBerryBlast.avif' },
        { name: 'Minute Maid Orange', image: '/MinuteMaidOrange.avif' },
        { name: 'Minute Maid Apple Juice', image: '/MinuteMaidAppleJuice.avif' },
        { name: 'Coke Mexico', image: '/CokeMexico.avif' },
        { name: 'Coke Zero', image: '/CokeZero.avif' },
        { name: 'Smartwater', image: '/Smartwater.avif' },
        { name: 'Bai Coco Fusion', image: '/BaiCocoFusion.avif' },
        { name: 'Drink Small', image: '/DrinkSmall.avif' },
        { name: 'Drink Medium', image: '/DrinkMedium.avif' },
        { name: 'Drink Large', image: '/DrinkLarge.avif' },
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
