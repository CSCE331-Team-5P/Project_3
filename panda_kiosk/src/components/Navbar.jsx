import React from 'react';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import TakeoutDiningRoundedIcon from '@mui/icons-material/TakeoutDiningRounded';
import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';
import DinnerDiningRoundedIcon from '@mui/icons-material/DinnerDiningRounded';
import LocalDrinkRoundedIcon from '@mui/icons-material/LocalDrinkRounded';
import IcecreamRoundedIcon from '@mui/icons-material/IcecreamRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const Navbar = () => {
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
                <li key={index} className="flex flex-col items-center cursor-pointer hover:bg-red-600 rounded-lg p-2 transition-colors">
                    <span className="mb-1">{item.icon}</span>
                    <span className="text-sm">{item.text}</span>
                </li>
                ))}
                
                {/* Menu icon with notification badge */}
                <li className="flex flex-col items-center cursor-pointer hover:bg-red-600 rounded-lg p-2 transition-colors relative">
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