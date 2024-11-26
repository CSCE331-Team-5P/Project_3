"use client";
import Navbar from "@/components/Navbar";
import DrinkSelection from "@/components/DrinkSelection";
import { useGlobalState } from "@/components/GlobalStateProvider";

export default function DrinkPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="p-4 bg-white">
                <h2 className="text-3xl font-semibold mb-6 text-black text-center">Available Drinks</h2>
                <DrinkSelection />
            </div>
        </div>
    );
}
