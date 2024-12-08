"use client";

// Import dependencies
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMagnifier } from "@/context/MagnifierContext";

export default function Home() {
  const router = useRouter();
  const {
    isMagnifierEnabled,
    setIsMagnifierEnabled,
    magnifierPosition,
    setMagnifierPosition,
  } = useMagnifier();
  const screenshotRef = useRef(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather");
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const weatherData = await response.json();
        setWeather(weatherData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };
    fetchWeather();

    const captureScreenshot = () => {
      html2canvas(document.body, {
        useCORS: true,
        scale: window.devicePixelRatio,
      }).then((canvas) => {
        screenshotRef.current = canvas.toDataURL();
      });
    };

    const timer = setTimeout(captureScreenshot, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Add Google Translate script
    const googleTranslateScript = document.createElement("script");
    googleTranslateScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleTranslateScript.async = true;
    document.body.appendChild(googleTranslateScript);

    // Add Google Translate initialization function
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);

  const handleMouseMove = (e) => {
    if (isMagnifierEnabled) {
      setMagnifierPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleClick = (event) => {
    // Prevent navigation if the click is on the Google Translate widget
    if (event.target.closest("#google_translate_element")) {
      return;
    }
    router.push("/menuItems");
  };

  return (
    <div
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="relative flex bg-red-700 items-center justify-center min-h-screen cursor-pointer"
    >
      {/* Google Translate Widget */}
      <div
        id="google_translate_element"
        className="absolute top-5 right-5 bg-white p-2 rounded-lg shadow-lg z-50"
      ></div>

      <div className="w-full md:max-w-prose p-4">
        <h1 className="text-9xl text-white font-extrabold my-8">
          Order & Pay Here
        </h1>
        <h2 className="text-5xl text-white font-extrabold my-8">
          Tap Anywhere To Start!
        </h2>

        <img src="Panda.jpg" alt="Panda" className="rounded-lg" />
      </div>

      {weather && (
        <div className="absolute top-5 left-5 flex items-center bg-red-700 bg-opacity-80 p-4 rounded-lg text-white">
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="w-12 h-12 mr-4"
          />
          <div>
            <h3 className="text-2xl font-semibold">
              Weather in College Station
            </h3>
            <p className="text-lg">Temperature: {weather.current.temp_f}°F</p>
            <p className="text-lg">Conditions: {weather.current.condition.text}</p>
          </div>
        </div>
      )}

      {isMagnifierEnabled && screenshotRef.current && (
        <div
          style={{
            position: "fixed",
            left: magnifierPosition.x - 150,
            top: magnifierPosition.y - 150,
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            border: "4px solid rgba(255,255,255,0.7)",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `url(${screenshotRef.current})`,
              backgroundSize: `${window.innerWidth * 2}px ${
                window.innerHeight * 2
              }px`,
              backgroundPosition: `-${
                magnifierPosition.x * 2 - 150
              }px -${magnifierPosition.y * 2 - 150}px`,
              filter: "contrast(120%)",
            }}
          />
        </div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMagnifierEnabled(!isMagnifierEnabled);
        }}
        className="fixed bottom-5 right-5 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg"
      >
        {isMagnifierEnabled ? "Disable Magnifier" : "Enable Magnifier"}
      </button>
    </div>
  );
}

// Add this script tag in your _document.js or import it
const script = document.createElement("script");
script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
document.head.appendChild(script);
