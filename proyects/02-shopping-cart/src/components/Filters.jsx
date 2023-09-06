import { useId } from "react";
import { useFilters } from "../hooks/useFilters.js";
import "./Filters.css";
import React, { useState, useEffect } from "react";
import { products as initialProducts } from "../mocks/products.json";

export function Filters() {
  const {
    filters,
    setFilters,
    selectedBrand,
    setSelectedBrand,
    filterProducts,
  } = useFilters();
  const [searchQuery, setSearchQuery] = useState(""); // Establece inicialmente en vacío
  const [filteredProducts, setFilteredProducts] = useState(initialProducts); // Estado para la lista filtrada de productos

  const minPriceFilterId = useId();
  const categoryFilterId = useId();
  const brandFilterId = useId(); // Definir brandFilterId

  // Maneja el cambio de filtros y marca seleccionada
  const handleFilterChange = () => {
    // Llama a filterProducts con la lista completa de productos
    const filtered = filterProducts(initialProducts); // Reemplaza "allProducts" con tu lista de productos real
    setFilteredProducts(filtered); // Actualiza la lista de productos filtrados
  };

  useEffect(() => {
    console.log("useEffect is running");

    // Escucha cambios en los filtros, la marca seleccionada o la búsqueda
    handleFilterChange();
  }, [filters, selectedBrand, searchQuery]);

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  const handleChangeBrand = (event) => {
    const brandValue = event.target.value;
    setSelectedBrand(brandValue); // Actualiza la marca seleccionada

    // Llama a filterProducts con los productos actuales para obtener la lista filtrada
    const filtered = filterProducts(initialProducts); // Reemplaza "allProducts" con tu lista de productos real
    setFilteredProducts(filtered); // Actualiza la lista de productos filtrados
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log("Search Query:", query);

    // Aquí establece el valor de búsqueda en el contexto de filtros
    setFilters((prevState) => ({
      ...prevState,
      searchQuery: query,
    }));
  };
  return (
    <section className="filters">
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="0"
          max="1000"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <input
        type="text"
        placeholder="Buscar por marca..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="filters-brand-cat">
        <label htmlFor={categoryFilterId}>Categoría</label>{" "}
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="laptops">Portátiles</option>
          <option value="smartphones">Celulares</option>
          <option value="home-decoration">HomeDeco</option>
          <option value="books">Books</option>
        </select>
        <label htmlFor={brandFilterId}>Marca</label>
        <select
          id={brandFilterId}
          onChange={handleChangeBrand}
          value={selectedBrand}
        >
          <option value="all">Todas</option>
          <option value="Rubinzal">Rubinzal</option>
          <option value="Astrea">Astrea</option>
          {/* Agrega opciones de marca según tu necesidad */}
        </select>
      </div>

      {/* <div className="filtered-products">
        {filteredProducts.map((product) => (
          <div key={product.id}>{product.title + " " + product.brand}</div>
        ))}
      </div> */}
    </section>
  );
}
