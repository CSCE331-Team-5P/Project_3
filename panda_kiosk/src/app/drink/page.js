"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import KioskFooter from "@/components/KioskFooter";
import DrinkSelection from "@/components/DrinkSelection";
import { useGlobalState } from "@/components/GlobalStateProvider";

export default function Drink() {
    const router = useRouter();
    const { drinks } = useGlobalState(); // Dynamically fetched drinks from GSP

    const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false);
    const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
    const [screenshot, setScreenshot] = useState(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Capture a screenshot of the current view
    const captureScreenshot = async () => {
        const html2canvas = (await import("html2canvas")).default;

        setIsCapturing(true);

        setTimeout(() => {
            html2canvas(document.body, {
                useCORS: true,
                scale: 1,
                windowWidth: document.documentElement.scrollWidth,
                windowHeight: document.documentElement.scrollHeight,
            }).then((canvas) => {
                setScreenshot(canvas.toDataURL());
                setIsCapturing(false);
            });
        }, 500); // Delay for visual updates
    };

    // Trigger screenshot capture on button click
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

    // Capture an initial screenshot when magnifier is toggled on
    useEffect(() => {
        if (isMagnifierEnabled) {
            captureScreenshot();
        }
    }, [isMagnifierEnabled]);

    // Function to handle category click
    const handleCategoryClick = (category) => {
        if (["Bowl", "A la carte", "Plate", "Bigger Plate"].includes(category)) {
            router.push("/menuItems");
        } else {
            router.push("/checkout2");
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col relative"
            onMouseMove={handleMouseMove}
        >
            <Navbar />

            {/* Drinks Section */}
            <div className="p-4 bg-white">
                <h2 className="text-3xl font-semibold mb-6 text-black text-center">
                    Available Drinks
                </h2>
                <DrinkSelection
                    onButtonClick={handleButtonClick} // Trigger magnifier update
                />
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
                        width: "300px",
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
                            width: `${document.documentElement.scrollWidth * 2}px`,
                            height: `${document.documentElement.scrollHeight * 2}px`,
                            backgroundImage: `url(${screenshot})`,
                            backgroundPosition: `-${
                                magnifierPosition.x * 2 - 150
                            }px -${magnifierPosition.y * 2 - 150}px`,
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
