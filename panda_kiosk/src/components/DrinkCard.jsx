// components/DrinkCard.jsx
import React from "react";

function DrinkCard({ title, description, quantity, onIncrement, onDecrement }) {
    
    return (
        <div className="bg-red-700 text-white p-4 rounded-lg shadow-lg flex flex-col w-1/2">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm mb-4">{description}</p>
            <div className="flex items-center justify-between">
                <button
                    className="bg-white text-red-700 hover:bg-yellow-300 px-2 py-1 rounded"
                    onClick={onDecrement}
                >
                    -
                </button>
                <span>{quantity}</span>
                <button
                    className="bg-white text-red-700 hover:bg-yellow-300 px-2 py-1 rounded"
                    onClick={onIncrement}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default DrinkCard;
