import { useContext, useState } from "react";
import { FiltersContext } from "../context/filters.jsx";

export function useFilters() {
  const { filters, setFilters } = useContext(FiltersContext);
  const { searchQuery, setSearchQuery } = filters;
  const [selectedBrand, setSelectedBrand] = useState("all"); // Agrega el estado para la marca seleccionada

  const filterProducts = (products) => {
    return products.filter((product) => {
      const lowercaseQuery = searchQuery ? searchQuery.toLowerCase() : "";
      const lowercaseBrand = product.brand ? product.brand.toLowerCase() : "";
  
      // Si el producto es de Firestore
      if (product.id) {
        console.log("tiene id")
        return (
          product.price >= filters.minPrice &&
          (filters.category === "all" || product.category === filters.category) &&
          (filters.brand === "all" || product.brand === filters.brand) &&
          (lowercaseBrand.includes(lowercaseQuery) || product.title.toLowerCase().includes(lowercaseQuery))
        );
      } else {
        console.log("tiene viene de manera local")

        // Si el producto es del conjunto inicial
        return (
          product.price >= filters.minPrice &&
          (filters.category === "all" || product.category === filters.category) &&
          (filters.brand === "all" || product.brand === filters.brand) &&
          (lowercaseBrand.includes(lowercaseQuery) || product.title.toLowerCase().includes(lowercaseQuery))
        );
      }
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
