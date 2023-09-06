import { useContext, useState } from 'react'
import { FiltersContext } from '../context/filters.jsx'

export function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)
  const { searchQuery, setSearchQuery } = filters;
  const [selectedBrand, setSelectedBrand] = useState("all"); // Agrega el estado para la marca seleccionada

  const filterProducts = (products) => {
    return products.filter((product) => {
      const lowercaseQuery = searchQuery.toLowerCase();
      console.log('lowercaseQuery', lowercaseQuery)
      const lowercaseBrand = product.brand.toLowerCase();
      console.log('lowercaseBrand', lowercaseBrand)

      return (
        product.price >= filters.minPrice &&
        (filters.category === "all" || product.category === filters.category) &&
        (selectedBrand === "all" || product.brand === selectedBrand) && // Filtrar por marca si se selecciona una
        (lowercaseBrand.includes(lowercaseQuery) || product.title.toLowerCase().includes(lowercaseQuery))
      );
    });  
  };

  return { filters, filterProducts, setFilters, searchQuery, setSearchQuery, selectedBrand, setSelectedBrand }
}
