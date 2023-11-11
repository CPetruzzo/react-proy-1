// AddProduct.jsx
import React, { useState } from 'react';

export function AddProduct({ onAddComplete }) {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  const handleAdd = () => {
    // Lógica para agregar el nuevo libro en Firestore
    // ...
    console.log("handleAdd")
    // Llama a la función de actualización en el componente principal
    onAddComplete();
  };

  return (
    <div>
      <input type='text' placeholder='Título' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <input type='text' placeholder='Autor' value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)} />
      <button onClick={handleAdd}>Agregar</button>
    </div>
  );
}
