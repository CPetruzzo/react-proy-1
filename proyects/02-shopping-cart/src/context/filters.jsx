import React, { createContext, useState } from 'react';

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 250,
    brand: 'all',
  });

  // Agrega un estado para la marca
  const [selectedBrand, setSelectedBrand] = useState('Astrea');

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        // Proporciona el estado y la función para seleccionar la marca
        selectedBrand,
        setSelectedBrand,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
