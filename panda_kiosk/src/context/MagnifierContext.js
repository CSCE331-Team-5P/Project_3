"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const MagnifierContext = createContext();

export const useMagnifier = () => useContext(MagnifierContext);

export const MagnifierProvider = ({ children }) => {
  const [isMagnifierEnabled, setIsMagnifierEnabled] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });

  // Persist the magnifier state using localStorage
  useEffect(() => {
    const savedSetting = localStorage.getItem("isMagnifierEnabled");
    if (savedSetting !== null) {
      setIsMagnifierEnabled(JSON.parse(savedSetting));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isMagnifierEnabled", JSON.stringify(isMagnifierEnabled));
  }, [isMagnifierEnabled]);

  return (
    <MagnifierContext.Provider
      value={{
        isMagnifierEnabled,
        setIsMagnifierEnabled,
        magnifierPosition,
        setMagnifierPosition,
      }}
    >
      {children}
    </MagnifierContext.Provider>
  );
};