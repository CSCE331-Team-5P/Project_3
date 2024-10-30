"use client"; // Ensures this component is treated as a client component
import { useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Correctly import useRouter

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("");
  const [sideQuantities, setSideQuantities] = useState({
    friedRice: 0,
    chowMein: 0,
    superGreens: 0,
    steamedRice: 0,
    brownRice: 0,
    mixedVegetables: 0,
  });

  const [entreeQuantities, setEntreeQuantities] = useState({
    orangeChicken: 0,
    kungPaoChicken: 0,
    teriyakiChicken: 0,
    beefBroccoli: 0,
    shrimp: 0,
    honeyWalnutShrimp: 0,
  });

  const router = useRouter(); // Initialize the router for navigation
  const sidesContainerRef = useRef(null); // Reference for scrolling the sides section
  const entreesContainerRef = useRef(null); // Reference for scrolling the entrees section

  // Function to handle category click and set active category
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "Drink") {
      router.push("/drink"); // Navigate to the drink page
    }
  };

  // Increment side or entree quantity
  const incrementQuantity = (item, setQuantities) => {
    setQuantities((prevState) => ({
      ...prevState,
      [item]: prevState[item] + 1,
    }));
  };

  // Decrement side or entree quantity
  const decrementQuantity = (item, setQuantities) => {
    setQuantities((prevState) => ({
      ...prevState,
      [item]: prevState[item] > 0 ? prevState[item] - 1 : 0,
    }));
  };

  // Scroll container horizontally
  const scrollContainer = (direction, containerRef) => {
    if (containerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Div */}
      <div className="bg-red-600 p-4 flex justify-between items-center h-[10vh]">
        {/* Menu Categories on the Left */}
        <div className="flex justify-start space-x-8 text-white">
          {/* A la carte */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("A la carte")}
          >
            <span className="text-3xl">🍽️</span>
            <p
              className={`text-base ${
                activeCategory === "A la carte" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              A la carte
            </p>
          </button>

          {/* Bowl */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("Bowl")}
          >
            <span className="text-3xl">🍲</span>
            <p
              className={`text-base ${
                activeCategory === "Bowl" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Bowl
            </p>
          </button>

          {/* Plate */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("Plate")}
          >
            <span className="text-3xl">🍛</span>
            <p
              className={`text-base ${
                activeCategory === "Plate" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Plate
            </p>
          </button>

          {/* Bigger Plate */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("Bigger Plate")}
          >
            <span className="text-3xl">🍱</span>
            <p
              className={`text-base ${
                activeCategory === "Bigger Plate" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Bigger Plate
            </p>
          </button>

          {/* Drink */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => router.push("/drink")}
          >
            <span className="text-3xl">🥤</span>
            <p
              className={`text-base ${
                activeCategory === "Drink" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Drink
            </p>
          </button>

          {/* Dessert */}
          <button
            className="flex flex-col items-center focus:outline-none hover:scale-110 transition-transform duration-300"
            onClick={() => handleCategoryClick("Dessert")}
          >
            <span className="text-3xl">🍨</span>
            <p
              className={`text-base ${
                activeCategory === "Dessert" ? "font-bold underline" : ""
              } hover:text-yellow-300`}
            >
              Dessert
            </p>
          </button>
        </div>

        {/* Expandable Cart Button on the Right */}
        <div className="flex justify-end relative">
          <button className="flex items-center text-white space-x-2 hover:text-yellow-300 transition-colors duration-300">
            <span className="text-base">Cart</span>
          </button>
        </div>
      </div>

      {/* Sides Section Div with horizontal scroll showing 3 items */}
<div className="p-4 bg-white h-[40vh] flex items-center justify-between w-full">
  <button onClick={() => scrollContainer("left", sidesContainerRef)} className="px-4">
    ⬅️
  </button>
  <div
    ref={sidesContainerRef}
    className="flex space-x-4 overflow-x-auto scrollbar-hide"
    style={{ width: "70vw" }}
  >
    {/* Chow Mein */}
    <div
      className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
      style={{ minWidth: "300px" }} // Ensure the same min-width for all cards
    >
      <img src="/chow-mein.jpg" alt="Chow Mein" className="w-full h-32 object-cover mb-4" />
      <h3 className="text-xl font-bold">Chow Mein</h3>
      <p className="text-base mb-4">600 calories</p>
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-white text-red-500 px-3 py-2 rounded"
          onClick={() => decrementQuantity("chowMein", setSideQuantities)}
        >
          -
        </button>
        <span className="text-lg">{sideQuantities.chowMein}</span>
        <button
          className="bg-white text-red-500 px-3 py-2 rounded"
          onClick={() => incrementQuantity("chowMein", setSideQuantities)}
        >
          +
        </button>
      </div>
    </div>

    {/* Fried Rice */}
    <div
      className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
      style={{ minWidth: "300px" }} // Ensure the same min-width for all cards
    >
      <img src="/fried-rice.jpg" alt="Fried Rice" className="w-full h-32 object-cover mb-4" />
      <h3 className="text-xl font-bold">Fried Rice</h3>
      <p className="text-base mb-4">620 calories</p>
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-white text-red-500 px-3 py-2 rounded"
          onClick={() => decrementQuantity("friedRice", setSideQuantities)}
        >
          -
        </button>
        <span className="text-lg">{sideQuantities.friedRice}</span>
        <button
          className="bg-white text-red-500 px-3 py-2 rounded"
          onClick={() => incrementQuantity("friedRice", setSideQuantities)}
        >
          +
        </button>
      </div>
    </div>

    {/* White Steamed Rice */}
    <div
      className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
      style={{ minWidth: "300px" }} // Ensure the same min-width for all cards
    >
      <img src="/white-steamed-rice.jpg" alt="White Steamed Rice" className="w-full h-32 object-cover mb-4" />
      <h3 className="text-xl font-bold">White Steamed Rice</h3>
      <p className="text-base mb-4">520 calories</p>
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-white text-red-500 px-3 py-2 rounded"
          onClick={() => decrementQuantity("steamedRice", setSideQuantities)}
        >
          -
        </button>
        <span className="text-lg">{sideQuantities.steamedRice}</span>
        <button
          className="bg-white text-red-500 px-3 py-2 rounded"
          onClick={() => incrementQuantity("steamedRice", setSideQuantities)}
        >
          +
        </button>
      </div>
    </div>

    {/* Super Greens */}
    <div
      className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
      style={{ minWidth: "300px" }} // Ensure the same min-width for all cards
    >
      <img src="/super-greens.jpg" alt="Super Greens" className="w-full h-32 object-cover mb-4" />
      <h3 className="text-xl font-bold">Super Greens</h3>
      <p className="text-base mb-4">130 calories</p>
      <div className="flex items-center justify-between w-full">
        <button
          className="bg-white text-red-500 px-3 py-2 rounded"
          onClick={() => decrementQuantity("superGreens", setSideQuantities)}
        >
          -
        </button>
        <span className="text-lg">{sideQuantities.superGreens}</span>
        <button
          className="bg-white text-red-500 px-3 py-2 rounded"
          onClick={() => incrementQuantity("superGreens", setSideQuantities)}
        >
          +
        </button>
      </div>
    </div>
  </div>
  <button onClick={() => scrollContainer("right", sidesContainerRef)} className="px-4">
    ➡️
  </button>
</div>


      {/* Entrees Section Div with horizontal scroll showing 3 items */}
      <div className="p-4 bg-white h-[40vh] flex items-center justify-between w-full">
        <button onClick={() => scrollContainer("left", entreesContainerRef)} className="px-4">
          ⬅️
        </button>
        <div
          ref={entreesContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide"
          style={{ width: '70vw' }}
        >
          {/* Hot Ones Blazing Bourbon Chicken */}
          <div
            className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
          >
            <img src="/blazing-bourbon-chicken.jpg" alt="Blazing Bourbon Chicken" className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">Hot Ones Blazing Bourbon Chicken</h3>
            <p className="text-base mb-4">400 calories</p>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => decrementQuantity("blazingBourbonChicken")}
              >
                -
              </button>
              <span className="text-lg">{entreeQuantities.blazingBourbonChicken}</span>
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => incrementQuantity("blazingBourbonChicken")}
              >
                +
              </button>
            </div>
          </div>

          {/* Original Orange Chicken */}
          <div
            className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
          >
            <img src="/orange-chicken.jpg" alt="Orange Chicken" className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">The Original Orange Chicken</h3>
            <p className="text-base mb-4">510 calories</p>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => decrementQuantity("orangeChicken")}
              >
                -
              </button>
              <span className="text-lg">{entreeQuantities.orangeChicken}</span>
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => incrementQuantity("orangeChicken")}
              >
                +
              </button>
            </div>
          </div>

          {/* Black Pepper Sirloin Steak */}
          <div
            className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
          >
            <img src="/pepper-sirloin-steak.jpg" alt="Pepper Sirloin Steak" className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">Black Pepper Sirloin Steak</h3>
            <p className="text-base mb-4">+$1.50 | 180 calories</p>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => decrementQuantity("pepperSirloinSteak")}
              >
                -
              </button>
              <span className="text-lg">{entreeQuantities.pepperSirloinSteak}</span>
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => incrementQuantity("pepperSirloinSteak")}
              >
                +
              </button>
            </div>
          </div>

          {/* Honey Walnut Shrimp */}
          <div
            className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
          >
            <img src="/honey-walnut-shrimp.jpg" alt="Honey Walnut Shrimp" className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">Honey Walnut Shrimp</h3>
            <p className="text-base mb-4">+$1.50 | 430 calories</p>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => decrementQuantity("honeyWalnutShrimp")}
              >
                -
              </button>
              <span className="text-lg">{entreeQuantities.honeyWalnutShrimp}</span>
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => incrementQuantity("honeyWalnutShrimp")}
              >
                +
              </button>
            </div>
          </div>

          {/* Grilled Teriyaki Chicken */}
          <div
            className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
          >
            <img src="/grilled-teriyaki-chicken.jpg" alt="Grilled Teriyaki Chicken" className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">Grilled Teriyaki Chicken</h3>
            <p className="text-base mb-4">275 calories</p>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => decrementQuantity("grilledTeriyakiChicken")}
              >
                -
              </button>
              <span className="text-lg">{entreeQuantities.grilledTeriyakiChicken}</span>
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => incrementQuantity("grilledTeriyakiChicken")}
              >
                +
              </button>
            </div>
          </div>

          {/* Kung Pao Chicken */}
          <div
            className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
          >
            <img src="/kung-pao-chicken.jpg" alt="Kung Pao Chicken" className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">Kung Pao Chicken</h3>
            <p className="text-base mb-4">320 calories</p>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => decrementQuantity("kungPaoChicken")}
              >
                -
              </button>
              <span className="text-lg">{entreeQuantities.kungPaoChicken}</span>
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => incrementQuantity("kungPaoChicken")}
              >
                +
              </button>
            </div>
          </div>

          {/* Honey Sesame Chicken */}
          <div
            className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
          >
            <img src="/honey-sesame-chicken.jpg" alt="Honey Sesame Chicken" className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">Honey Sesame Chicken Breast</h3>
            <p className="text-base mb-4">340 calories</p>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => decrementQuantity("honeySesameChicken")}
              >
                -
              </button>
              <span className="text-lg">{entreeQuantities.honeySesameChicken}</span>
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => incrementQuantity("honeySesameChicken")}
              >
                +
              </button>
            </div>
          </div>

          {/* Beijing Beef */}
          <div
            className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex flex-col justify-between items-center w-[300px] h-[300px]"
            style={{ minWidth: "300px" }}
          >
            <img src="/beijing-beef.jpg" alt="Beijing Beef" className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold">Beijing Beef</h3>
            <p className="text-base mb-4">480 calories</p>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => decrementQuantity("beijingBeef")}
              >
                -
              </button>
              <span className="text-lg">{entreeQuantities.beijingBeef}</span>
              <button
                className="bg-white text-red-500 px-3 py-2 rounded"
                onClick={() => incrementQuantity("beijingBeef")}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button onClick={() => scrollContainer("right", entreesContainerRef)} className="px-4">
          ➡️
        </button>
      </div>
      {/* Footer / Checkout Div */}
      <div className="bg-white shadow p-4 h-[10vh] flex justify-between items-center">
        {/* Left side: Scrollable order pane */}
        <div className="w-[12vw] h-full pr-4">
          <h3 className="text-lg font-bold text-black">Current Order</h3>
          <div className="overflow-y-auto h-full">
            <ul className="text-sm text-black">
              {sideQuantities.friedRice > 0 && <li>{sideQuantities.friedRice}x Fried Rice</li>}
              {sideQuantities.chowMein > 0 && <li>{sideQuantities.chowMein}x Chow Mein</li>}
              {entreeQuantities.orangeChicken > 0 && <li>{entreeQuantities.orangeChicken}x Orange Chicken</li>}
              {/* Add more items to display in the current order */}
            </ul>
          </div>
        </div>

        {/* Right side: Checkout button */}
        <div>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors duration-300">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
