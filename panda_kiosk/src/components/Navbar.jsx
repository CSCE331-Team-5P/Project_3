'use client';


import React, { useState } from 'react';
import { useRouter, usePathname } from "next/navigation"; 
import { useGlobalState } from "@/app/GlobalStateProvider";
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import TakeoutDiningRoundedIcon from '@mui/icons-material/TakeoutDiningRounded';
import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';
import DinnerDiningRoundedIcon from '@mui/icons-material/DinnerDiningRounded';
import LocalDrinkRoundedIcon from '@mui/icons-material/LocalDrinkRounded';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { SettingsAccessibility } from '@mui/icons-material';

const Navbar = () => {
    const router = useRouter(); //^ Initialize the router for navigation
    // const pathname = usePathname(); 


    const {updateMealOptions} = useGlobalState();

    //^ State variables to manage what meal item are selected
    const [activeCategory, setActiveCategory] = useState("");

    //^ Function to handle category click and set active category
    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        updateMealOptions(category);
        
        if (category === "Drink") {
            router.push("/drink"); //^ Navigate to the drink page
        } else if (category === "Dessert") {
            router.push("/dessert"); //^ Navigate to the dessert page
        } else if (category === "A la carte" || category === "Bowl" || category === "Plate" || category === "Bigger Plate") {
            router.push("/menuItems"); //^ Navigate to the menu page
        }
    };

    //^ Array of menu items with icons and text
    const menuItems = [
        { icon: <RestaurantMenuRoundedIcon fontSize="large" />, text: 'A la carte' },
        { icon: <TakeoutDiningRoundedIcon fontSize="large" />, text: 'Bowl' },
        { icon: <RamenDiningRoundedIcon fontSize="large" />, text: 'Plate' },
        { icon: <DinnerDiningRoundedIcon fontSize="large" />, text: 'Bigger Plate' },
        { icon: <LocalDrinkRoundedIcon fontSize="large" />, text: 'Drink' },
        { icon: <IcecreamRoundedIcon fontSize="large" />, text: 'Dessert' }
    ];

    return (
        <nav className="bg-red-700 text-white p-4">
            <ul className="flex justify-between items-center max-w-4xl mx-auto">
                {menuItems.map((item, index) => (
                <li onClick={() => handleCategoryClick(item.text)}
                    key={index} 
                    className={`flex flex-col items-center cursor-pointer hover:bg-red-600 rounded-lg p-2 transition-colors 
                                ${activeCategory === item.text ? "font-bold underline text-yellow-300" : ""} hover:text-yellow-300`}
                >
                    <span className={`mb-1`}>{item.icon}</span>
                    <span className={`text-sm`}>{item.text}</span>
                </li>
                ))}
                
                {/* Menu icon with notification badge */}
                <li className={`flex flex-col items-center cursor-pointer hover:bg-red-600 rounded-lg p-2 transition-colors relative
                            ${activeCategory === 'Menu' ? 'font-bold underline' : ''} hover:text-yellow-300`}
                >
                    <div className="relative">
                        <MenuRoundedIcon fontSize="large" />
                    </div>
                    <span className="text-sm invisible">Menu</span>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;