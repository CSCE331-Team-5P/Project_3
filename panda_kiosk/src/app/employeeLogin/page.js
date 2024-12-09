"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/components/GlobalStateProvider"; // Update this path based on your actual file structure

export default function EmployeeLoginPage() {
  const router = useRouter();
  const { setIsCashier } = useGlobalState();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // For simplicity, let's say the correct PIN is "1234"
    if (pin === "1234") {
      setIsCashier(true);
      router.push("/menuItems");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Employee Login</h1>
        <input
          type="password"
          placeholder="Enter PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
