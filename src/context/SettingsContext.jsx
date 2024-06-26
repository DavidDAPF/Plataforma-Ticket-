import React, { createContext, useState } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [logo, setLogo] = useState('');

  const updateLogo = (newLogo) => {
    setLogo(newLogo);
  };

  return (
    <SettingsContext.Provider value={{ logo, setLogo }}>
      {children}
    </SettingsContext.Provider>
  );
};
