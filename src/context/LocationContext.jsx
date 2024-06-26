import React, { createContext, useState } from 'react';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  const addLocation = (location) => {
    setLocations([...locations, { ...location, id: Date.now() }]);
  };

  const updateLocation = (updatedLocation) => {
    setLocations(locations.map(loc => loc.id === updatedLocation.id ? updatedLocation : loc));
  };

  const deleteLocation = (id) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  return (
    <LocationContext.Provider value={{ locations, addLocation, updateLocation, deleteLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
