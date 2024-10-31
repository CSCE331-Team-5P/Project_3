//components/Gallery.jsx
import React, { useRef } from 'react';
import MenuItemCard from './MenuItemCard';


//^ Material UI Icons
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const Gallery = ({ items, sideQuantities, incrementQuantity, decrementQuantity, scrollContainer }) => {
    const sidesContainerRef = useRef(null);

    return (
        <div className='flex flex-col my-5'>
            {/* Top Div - Buttons */}
            <div className="flex w-full p-4 space-x-2">
                <button 
                    onClick={() => scrollContainer("left", sidesContainerRef)} 
                    className="p-4 text-white bg-red-700 hover:bg-red-500 rounded-lg"
                >
                    <ArrowBackIosRoundedIcon />
                </button>
                <button 
                    onClick={() => scrollContainer("right", sidesContainerRef)} 
                    className="p-4 text-white bg-red-700 hover:bg-red-500 rounded-lg"
                >
                    <ArrowForwardIosRoundedIcon />
                </button>
            </div>
            {/* Bottom Div - Cards*/}
            <div className="p-4">
                <div
                    ref={sidesContainerRef}
                    className="flex space-x-4 overflow-x-auto scrollbar-hide justify-self-center"
                    style={{ width: "70vw" }}
                    >
                    {items.map((item) => (
                        <MenuItemCard
                        key={item.id}
                        title={item.title}
                        imageUrl={item.imageUrl}
                        calories={item.calories}
                        quantity={sideQuantities[item.id]}
                        incrementQuantity={() => incrementQuantity(item.id)}
                        decrementQuantity={() => decrementQuantity(item.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;
