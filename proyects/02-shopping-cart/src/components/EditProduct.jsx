// EditProduct.jsx
import React, { useState } from 'react';

export function EditProduct({ product, onEditComplete }) {
  const [editedTitle, setEditedTitle] = useState(product.title);
  const [editedAuthor, setEditedAuthor] = useState(product.author);

  const handleSave = () => {
    // Lógica para guardar los cambios en Firestore
    // ...
    console.log("handleSave")
    // Llama a la función de actualización en el componente principal
    onEditComplete();
  };

  return (
    <div>
      <input
        type='text'
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <input
        type='text'
        value={editedAuthor}
        onChange={(e) => setEditedAuthor(e.target.value)}
      />
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
}
