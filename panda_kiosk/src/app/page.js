"use client";
import { useState } from "react";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("");

  // Function to handle click and set active category
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (<div></div>);
}
