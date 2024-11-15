"use client";

//^ Import dependencies
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const [weather, setWeather] = useState(null);

  // Fetch weather data on component mount
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const weatherData = await response.json();
        setWeather(weatherData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };
    fetchWeather();
  }, []);

  //^ Function to handle click and route to Checkout page
  const handleClick = () => {
    router.push('/menuItems');
  };

  return (
    <div 
      onClick={handleClick}
      className="relative flex bg-red-700 items-center justify-center min-h-screen cursor-pointer"
    >
      <div className="w-full md:max-w-prose p-4">
        <h1 className="text-9xl text-white font-extrabold my-8">Order & Pay Here</h1>
        <h2 className="text-5xl text-white font-extrabold my-8">Tap Anywhere To Start!</h2>
        <img src="Panda.jpg" alt="Panda" className="rounded-lg" />
      </div>

      {weather && (
        <div className="absolute top-5 left-5 flex items-center bg-red-700 bg-opacity-80 p-4 rounded-lg text-white">
          {/* Weather Icon */}
          <img 
            src={weather.current.condition.icon} 
            alt={weather.current.condition.text} 
            className="w-12 h-12 mr-4"
          />
          <div>
            <h3 className="text-2xl font-semibold">Weather in College Station</h3>
            <p className="text-lg">Temperature: {weather.current.temp_f}°F</p>
            <p className="text-lg">Conditions: {weather.current.condition.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
