import { useId } from "react";
import { useFilters } from "../hooks/useFilters.js";
import "./Filters.css";

export function Filters() {
  const { filters, setFilters } = useFilters();

  const minPriceFilterId = useId();
  const categoryFilterId = useId();
  const brandFilterId = useId(); // Definir brandFilterId

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
    const brandValue = event.target.value; // Obtén el valor de la marca del evento
    setFilters((prevState) => ({
      ...prevState,
      brand: brandValue, // Actualiza el estado de la marca en FiltersProvider
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

      <div className="filters-brand-cat">
        <label htmlFor={categoryFilterId}>Categoría</label>{" "}
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todas</option>
          <option value="laptops">Portátiles</option>
          <option value="smartphones">Celulares</option>
          <option value="home-decoration">HomeDeco</option>
          <option value="books">Books</option>{" "}
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
          {/* Agrega opciones de marca según tu necesidad */}
        </select>
      </div>
    </section>
  );
}

// import { useId } from 'react'
// import { useFilters } from '../hooks/useFilters.js'
// import './Filters.css'

// export function Filters () {
//   const { filters, setFilters } = useFilters()

//   const minPriceFilterId = useId()
//   const categoryFilterId = useId()

//   const handleChangeMinPrice = (event) => {
//     setFilters(prevState => ({
//       ...prevState,
//       minPrice: event.target.value
//     }))
//   }

//   const handleChangeCategory = (event) => {
//     // ⬇️ ESTO HUELE MAL
//     // estamos pasando la función de actualizar estado
//     // nativa de React a un componente hijo
//     setFilters(prevState => ({
//       ...prevState,
//       category: event.target.value
//     }))
//   }

//   const handleChangeBrand = (event) => {
//     setBrand(event.target.value); // Actualiza el estado local para la marca
//   };

//   return (
//     <section className='filters'>

//       <div>
//         <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
//         <input
//           type='range'
//           id={minPriceFilterId}
//           min='0'
//           max='1000'
//           onChange={handleChangeMinPrice}
//           value={filters.minPrice}
//         />
//         <span>${filters.minPrice}</span>
//       </div>

//       <div>
//         <label htmlFor={categoryFilterId}>Categoría</label>
//         <select id={categoryFilterId} onChange={handleChangeCategory}>
//           <option value='all'>Todas</option>
//           <option value='laptops'>Portátiles</option>
//           <option value='smartphones'>Celulares</option>
//           <option value='home-decoration'>HomeDeco</option>
//           <option value='books'>Books</option>
//         </select>
//       </div>
//     </section>
//   )
// }
