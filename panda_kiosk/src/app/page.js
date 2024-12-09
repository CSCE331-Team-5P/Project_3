"use client";

// Import dependencies
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMagnifier } from "@/context/MagnifierContext";
import { useGlobalState } from "@/components/GlobalStateProvider"; // Adjust the import path as needed

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

  // Use global states
  const { isCashierMode, setIsCashierMode } = useGlobalState();

  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

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
      if (window.html2canvas) {
        window.html2canvas(document.body, {
          useCORS: true,
          scale: window.devicePixelRatio,
        }).then((canvas) => {
          screenshotRef.current = canvas.toDataURL();
        });
      }
    };

    const timer = setTimeout(captureScreenshot, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const googleTranslateScript = document.createElement("script");
    googleTranslateScript.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    googleTranslateScript.async = true;
    document.body.appendChild(googleTranslateScript);

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );

      const observer = new MutationObserver(() => {
        setTimeout(() => {
          if (window.html2canvas) {
            window.html2canvas(document.body, {
              useCORS: true,
              scale: window.devicePixelRatio,
            }).then((canvas) => {
              screenshotRef.current = canvas.toDataURL();
            });
          }
        }, 1000);
      });

      observer.observe(document.body, { childList: true, subtree: true });
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
    if (event.target.closest("#google_translate_element")) {
      return;
    }
    // If cashier mode is on or off, after tapping we go to menuItems
    router.push("/menuItems");
  };

  const handleCashierModeClick = (e) => {
    e.stopPropagation();
    setShowPinModal(true);
  };

  const handlePinSubmit = () => {
    if (pinInput === "1234") {
      setIsCashierMode(true);
      setShowPinModal(false);
      setPinError("");
      console.log("Cashier mode activated");
      // Redirect to menuItems
      router.push("/menuItems");
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  const handlePinCancel = () => {
    setShowPinModal(false);
    setPinInput("");
    setPinError("");
  };

  return (
    <div
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="relative flex bg-red-700 items-center justify-center min-h-screen cursor-pointer"
    >
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
        className="fixed bottom-5 right-5 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg z-50"
      >
        {isMagnifierEnabled ? "Disable Magnifier" : "Enable Magnifier"}
      </button>

      {/* Cashier Mode Button */}
      <button
        onClick={handleCashierModeClick}
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg bg-green-600 text-white shadow-lg z-50"
      >
        Cashier Mode
      </button>

      {/* PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handlePinCancel}>
          <div
            className="bg-white p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4">Enter PIN</h2>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            {pinError && <p className="text-red-600 mb-4">{pinError}</p>}
            <div className="flex space-x-2">
              <button
                onClick={handlePinSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit
              </button>
              <button
                onClick={handlePinCancel}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add this script tag in your _document.js or import it
if (typeof window !== "undefined") {
  const script = document.createElement("script");
  script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
  document.head.appendChild(script);
}
