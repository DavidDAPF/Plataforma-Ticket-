// src/context/LogoContext.jsx
import React, { createContext, useState } from 'react';

export const LogoContext = createContext();

export const LogoProvider = ({ children }) => {
  const [logo, setLogo] = useState(null); // Inicializa con null o con la URL del logo por defecto

  return (
    <LogoContext.Provider value={{ logo, setLogo }}>
      {children}
    </LogoContext.Provider>
  );
};
