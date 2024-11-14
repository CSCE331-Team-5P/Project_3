import { useState } from "react";
import DrinkCard from "@/components/DrinkCard";

export default function DrinkSelection() {
    const drinks = [
        { name: 'Dr Pepper', image: '/images/dr_pepper.png' },
        { name: 'Coca Cola', image: '/images/coca_cola.png' },
        { name: 'Diet Coke', image: '/images/diet_coke.png' },
        { name: 'Manga Guava Flavored Tea', image: '/images/manga_guava_tea.png' },
        { name: 'Peach Lychee Flavored Refresher', image: '/images/peach_lychee_refresher.png' },
        { name: 'Pomegranate Pineapple Flavored Lemonade', image: '/images/pomegranate_pineapple_lemonade.png' },
        { name: 'Watermelon Mango Flavored Refresher', image: '/images/watermelon_mango_refresher.png' },
        { name: "Barq's Root Beer", image: '/images/barqs_root_beer.png' },
        { name: 'Fanta Orange', image: '/images/fanta_orange.png' },
        { name: 'Minute Maid Lemonade', image: '/images/minute_maid_lemonade.png' },
        { name: 'Powerade Mountain Berry Blast', image: '/images/powerade_mountain_berry_blast.png' },
        { name: 'Sprite', image: '/images/sprite.png' },
        { name: 'Coca Cola Cherry', image: '/images/coca_cola_cherry.png' },
        { name: 'Fuze Raspberry Iced Tea', image: '/images/fuze_raspberry_iced_tea.png' },
        { name: 'Sweet Tea', image: '/images/sweet_tea.png' },
        { name: 'Powerade Fruit Punch', image: '/images/powerade_fruit_punch.png' },
        { name: 'Dasani', image: '/images/dasani.png' },
        { name: 'Powerade Berry Blast', image: '/images/powerade_berry_blast.png' },
        { name: 'Minute Maid Orange', image: '/images/minute_maid_orange.png' },
        { name: 'Minute Maid Apple Juice', image: '/images/minute_maid_apple_juice.png' },
        { name: 'Coke Mexico', image: '/images/coke_mexico.png' },
        { name: 'Coke Zero', image: '/images/coke_zero.png' },
        { name: 'Smartwater', image: '/images/smartwater.png' },
        { name: 'Bai Coco Fusion', image: '/images/bai_coco_fusion.png' },
        { name: 'Drink Small', image: '/images/drink_small.png' },
        { name: 'Drink Medium', image: '/images/drink_medium.png' },
        { name: 'Drink Large', image: '/images/drink_large.png' },
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
