import React, { useState, useEffect } from "react";
import { Products } from "./components/Products.jsx";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { IS_DEVELOPMENT } from "./config.js";
import { useFilters } from "./hooks/useFilters.js";
import { Cart } from "./components/Cart.jsx";
import { CartProvider } from "./context/cart.jsx";
import { firestore } from "./firebase.js";
// import { products as initialProducts } from "../src/mocks/products.json";
import { collection, getDocs } from "@firebase/firestore";
import { FileUploader } from "./components/FileUploader.jsx"; // Importa el nuevo componente
import { EditProduct } from './components/EditProduct.jsx'; // Importa el nuevo componente
import { AddProduct } from './components/AddProduct.jsx'; // Importa el nuevo componente
import { FileDownloader } from "./components/FileDownloader.jsx";

export default function App() {
  const { filterProducts } = useFilters();
  const [libros, setLibros] = useState([]); // Estado para los libros obtenidos de Firestore
  const [editingProduct, setEditingProduct] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false);
  // console.log(libros);

  // Función para cargar los libros desde Firestore
  const cargarLibrosDesdeFirestore = async () => {
    try {
      const libroCollectionRef = collection(firestore, "libro");
      const querySnapshot = await getDocs(libroCollectionRef);

      const librosData = [];

      querySnapshot.forEach((doc) => {
        const libroData = doc.data();
        // console.log(doc.data());
        
        // Formatea los datos como lo necesitas
        const formattedLibro = {
          id: libroData.identificacion,
          title: libroData.title,
          description: libroData.description,
          price: libroData.price,
          autor: libroData.autor,
          brand: libroData.brand,
          thumbnail: libroData.thumbnail,
          category: libroData.category,
          discountPercentage: libroData.discountPercentage,
          images: libroData.images,
          rating: 4.44,
          stock: 7,
          indice: libroData.indice,
          pagina: libroData.paginas,
          edicion: libroData.edicion,
        };
        librosData.push(formattedLibro);
      });

      return librosData;
    } catch (error) {
      console.error("Error al cargar datos de Firestore:", error);
      return [];
    }
  };

  useEffect(() => {
    // Llama a cargarLibrosDesdeFirestore para obtener los libros de Firestore
    const cargarLibros = async () => {
      const librosData = await cargarLibrosDesdeFirestore();
      // console.log(librosData);
      setLibros(librosData);
    };

    cargarLibros();
  }, []);

  // Combina los libros de Firestore con initialProducts
  const combinedProducts = [...libros, 
    // ...initialProducts
  ];

  // Obtén los productos filtrados
  const filteredProducts = filterProducts(combinedProducts);
  // console.log("Filtered Products:", filteredProducts);

  const handleUploadComplete = (uploadedData) => {
    // Maneja el final de la carga aquí si es necesario
    // console.log("Carga completa. Datos subidos:", uploadedData);
  };

  const handleEditComplete = async () => {
    // Recargar los libros después de la edición
    const librosData = await cargarLibrosDesdeFirestore();
    console.log('librosData', librosData)
    setLibros(librosData);
    setEditingProduct(null);
  };

  const handleAddComplete = async () => {
    // Recargar los libros después de agregar uno nuevo
    const librosData = await cargarLibrosDesdeFirestore();
    console.log('librosData', librosData)
    setLibros(librosData);
    setAddingProduct(false);
  };

  return (
    <CartProvider>
      <Header />
      <Cart />
      {/* {editingProduct && (
        <EditProduct product={editingProduct} onEditComplete={handleEditComplete} />
      )}
      {addingProduct && (
        <AddProduct onAddComplete={handleAddComplete} />
      )}
      {!editingProduct && !addingProduct && ( */}
        <>
          <FileDownloader data={libros} fileName="Libros" />
          <FileUploader onUploadComplete={handleUploadComplete} />
          <Products products={filteredProducts} onEditClick={setEditingProduct} />
        </>
      {/* )} */}
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  );
}