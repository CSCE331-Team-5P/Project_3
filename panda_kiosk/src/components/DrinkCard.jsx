import React from 'react';

const DrinkCard = ({
    title,
    image,
    quantity,
    onIncrement,
    onDecrement
}) => {
    return (
        <div
            className="bg-red-700 text-white p-6 rounded-xl shadow-md flex flex-col justify-between items-center transition-transform transform hover:scale-105"
            style={{ width: "220px", height: "240px", minWidth: "220px" }}
        >
            {/* Image */}
            <img src={image} alt={title} className="w-full h-28 object-cover mb-3 rounded-lg" />
            
            {/* Title with adjusted styling for wrapping text */}
            <h3
                className="font-semibold text-center text-white mb-2"
                style={{
                    fontSize: '1rem', // Slightly larger font size for title
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    lineHeight: '1.2rem', // Adjust line height for better readability
                }}
            >
                {title}
            </h3>

            {/* Quantity controls */}
            <div className="flex items-center justify-between w-full mt-3">
                <button
                    className="bg-white text-red-700 hover:bg-yellow-400 px-3 py-1 rounded-lg"
                    onClick={onDecrement}
                >
                    -
                </button>
                <span className="text-lg font-medium text-white">{quantity}</span>
                <button
                    className="bg-white text-red-700 hover:bg-yellow-400 px-3 py-1 rounded-lg"
                    onClick={onIncrement}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default DrinkCard;
