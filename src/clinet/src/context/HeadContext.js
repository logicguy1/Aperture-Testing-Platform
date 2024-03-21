import React, { createContext } from "react";

export const HeadContext = createContext();

export const HeadProvider = ({ children, value }) => {
  return (
    <HeadContext.Provider value={value}>
      {children}
    </HeadContext.Provider>
  );
}
