import { useContext, useState } from "react";
import { FiltersContext } from "../context/filters.jsx";

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);
  const { searchQuery, setSearchQuery } = filters;
  const [selectedBrand, setSelectedBrand] = useState("all"); // Agrega el estado para la marca seleccionada

  const filterProducts = (products) => {
    return products.filter((product) => {
      let lowercaseQuery = searchQuery ? searchQuery.toLowerCase() : ""; // Comprueba si searchQuery no es nulo o undefined
      console.log("lowercaseQuery", lowercaseQuery);

      const lowercaseBrand = product.brand ? product.brand.toLowerCase() : ""; // Comprueba si product.brand no es nulo o undefined
      console.log("lowercaseBrand", lowercaseBrand);

      return (
        product.price >= filters.minPrice &&
        // searchQuery !== undefined &&
        (filters.category === "all" || product.category === filters.category) &&
        (selectedBrand === "all" || product.brand === selectedBrand) && // Filtrar por marca si se selecciona una
        (lowercaseBrand.includes(lowercaseQuery) ||
          product.title.toLowerCase().includes(lowercaseQuery))
      );
    });
  };

  return {
    filters,
    filterProducts,
    setFilters,
    searchQuery,
    setSearchQuery,
    selectedBrand,
    setSelectedBrand,
  };
}
