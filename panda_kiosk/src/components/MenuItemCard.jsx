//components/MenuItemCard.jsx
import React from 'react';

const MenuItemCard = ({
    title = "Chow Mein",
    imageUrl = "/chow-mein.jpg",
    calories = "600 calories",
    quantity,
    incrementQuantity,
    decrementQuantity
    }) => {
    return (
        <div
            className="bg-red-700 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
        >
            <img src={imageUrl} alt={title} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-base mb-4">{calories}</p>
            <div className="flex items-center justify-between w-full">
                <button
                    className="bg-white text-red-700 hover:bg-yellow-300 px-3 py-2 rounded"
                    onClick={() => decrementQuantity()}
                >
                    -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                    className="bg-white text-red-700 hover:bg-yellow-300 px-3 py-2 rounded"
                    onClick={() => incrementQuantity()}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default MenuItemCard;
