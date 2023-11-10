import { useId } from "react";
import { useFilters } from "../hooks/useFilters.js";
import "./Filters.css";
import React, { useState, useEffect } from "react";
import { products as initialProducts } from "../mocks/products.json";
import { collection, getDocs } from "@firebase/firestore";
import { firestore } from "../firebase.js";

export function Filters() {
  const {
    filters,
    setFilters,
    selectedBrand,
    setSelectedBrand,
    filterProducts,
  } = useFilters();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [libros, setLibros] = useState([]); // Estado para los libros obtenidos de Firestore
  const [loaded, setLoaded] = useState(false); // Estado para indicar si los libros ya se han cargado

  const minPriceFilterId = useId();
  const categoryFilterId = useId();
  const brandFilterId = useId();
  const advancedFilterId = useId();

  const cargarLibrosDesdeFirestore = async () => {
    try {
      const libroCollectionRef = collection(firestore, "libro");
      const querySnapshot = await getDocs(libroCollectionRef);

      const librosData = [];

      querySnapshot.forEach((doc) => {
        const libroData = doc.data();

        // Formatea los datos como lo necesitas
        const formattedLibro = {
          id: libroData.identificacion,
          title: libroData.title,
          description: libroData.description,
          price: libroData.price,
          brand: libroData.brand,
          thumbnail: libroData.thumbnail,
          category: libroData.category,
          discountPercentage: libroData.discountPercentage,
          images: libroData.images,
          rating: 4.44,
          stock: 7

          // Agrega otras propiedades aquí
        };
        librosData.push(formattedLibro);
        // console.log(formattedLibro)
      });

      setLibros(librosData);
      console.log(librosData)
      setLoaded(true); // Marcar que los libros se han cargado
    } catch (error) {
      console.error("Error al cargar datos de Firestore:", error);
    }
  };

  // Función para cargar los libros desde Firestore al montar el componente
  useEffect(() => {
    // Llama a la función para cargar libros solo si aún no se han cargado
    if (!loaded) {
      cargarLibrosDesdeFirestore();
    }
  }, [loaded]);

 // Maneja el cambio de filtros y marca seleccionada
const handleFilterChange = () => {
  // Combina los libros cargados desde Firestore con initialProducts
  const combinedProducts = [...libros, ...initialProducts];
  console.log("Combined Products:", combinedProducts);

  // Filtra los productos combinados con los filtros
  const filtered = filterProducts(combinedProducts);
  console.log("Filtered Products:", filtered);

  setFilteredProducts(filtered);
};


  // Este useEffect se ejecutará cuando cambien los filtros, la marca seleccionada o la búsqueda
  useEffect(() => {
    handleFilterChange();
  }, [filters, selectedBrand, searchQuery, libros]);


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
    console.log('brandValue', brandValue)

    // Aquí establece el valor de búsqueda en el contexto de filtros
    setFilters((prevState) => ({
      ...prevState,
      brand: brandValue,
    }));
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    console.log("Search Query:", query);

    // Actualiza la consulta de búsqueda en el contexto de filtros
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
          max="10000"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <label htmlFor={advancedFilterId}>Búsqueda avanzada </label>
      <input
        type="text"
        id={advancedFilterId}
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
          value={filters.brand}
        >
          <option value="all">Todas</option>
          <option value="Rubinzal">Rubinzal</option>
          <option value="Astrea">Astrea</option>
          <option value="Editorial Libreria Civica">Editorial Libreria Civica</option>
          {/* Agrega opciones de marca según tu necesidad */}
        </select>
      </div>
    </section>
  );
}
