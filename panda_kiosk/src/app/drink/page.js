"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import DrinkSelection from "@/components/DrinkSelection";

export default function DrinkPage() {
    const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const [screenshot, setScreenshot] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Function to capture a screenshot
    const captureScreenshot = async () => {
        const html2canvas = (await import("html2canvas")).default;

        // Temporarily hide the magnifier
        setIsCapturing(true);

        setTimeout(() => {
            html2canvas(document.body, {
                useCORS: true,
                scale: 1, // Match screen scale for accuracy
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: document.documentElement.scrollHeight,
            }).then((canvas) => {
                setScreenshot(canvas.toDataURL());
                setIsCapturing(false); // Show the magnifier again
            });
        }, 500); // Wait for 0.5 second before capturing the screenshot
    };

    // Trigger screenshot capture on any button click
    const handleButtonClick = () => {
        if (isMagnifierEnabled) {
            captureScreenshot();
        }
    };

    // Handle mouse movement for magnifier
    const handleMouseMove = (e) => {
        if (isMagnifierEnabled && !isCapturing) {
            const scrollX = window.scrollX || document.documentElement.scrollLeft;
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            setMagnifierPosition({
                x: e.clientX + scrollX,
                y: e.clientY + scrollY,
            });
        }
    };

    // Update screenshot on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isMagnifierEnabled && !isCapturing) {
                captureScreenshot();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMagnifierEnabled]);

    // Capture an initial screenshot when the magnifier is toggled on
    useEffect(() => {
        if (isMagnifierEnabled) {
            captureScreenshot();
        }
    }, [isMagnifierEnabled]);

    return (
        <div
            className="min-h-screen flex flex-col relative"
            onMouseMove={handleMouseMove}
        >
            <Navbar />
            <div className="p-4 bg-white">
                <h2 className="text-3xl font-semibold mb-6 text-black text-center">
                    Available Drinks
                </h2>
                <DrinkSelection onButtonClick={handleButtonClick} />
            </div>

            {/* Magnifier Toggle Button */}
            <button
                onClick={() => {
                    setIsMagnifierEnabled((prev) => !prev);
                }}
                className="fixed bottom-5 right-5 px-4 py-2 bg-blue-600 text-white rounded-lg z-50"
            >
                {isMagnifierEnabled ? "Disable Magnifier" : "Enable Magnifier"}
            </button>

            {/* Magnifier */}
            {isMagnifierEnabled && screenshot && !isCapturing && (
                <div
                    style={{
                        position: "fixed",
                        left: magnifierPosition.x - 150 - window.scrollX,
                        top: magnifierPosition.y - 150 - window.scrollY,
                        width: "300px", // Increased to fit more content
                        height: "300px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        zIndex: 1000,
                        pointerEvents: "none",
                        border: "2px solid #ccc",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            width: `${document.documentElement.scrollWidth * 2}px`, // Double the size for magnification
                            height: `${document.documentElement.scrollHeight * 2}px`,
                            backgroundImage: `url(${screenshot})`,
                            backgroundPosition: `-${magnifierPosition.x * 2 - 150}px -${
                                magnifierPosition.y * 2 - 150
                            }px`,
                            backgroundSize: `${document.documentElement.scrollWidth * 2}px ${
                                document.documentElement.scrollHeight * 2
                            }px`,
                        }}
                    />
                </div>
            )}
        </div>
    );
}
