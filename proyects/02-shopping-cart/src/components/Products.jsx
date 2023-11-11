import "./Products.css";
import { AddIcon, AddToCartIcon, EditIcon, RemoveFromCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart.js";
import { useState } from "react";

export function Products({ products }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const [editingProduct, setEditingProduct] = useState(null);

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };

  return (
    <main className="products">
      <ul>
        {products.slice(0, 10).map((product) => {
          const isProductInCart = checkProductInCart(product);

          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button
                  style={{ backgroundColor: isProductInCart ? "red" : "#09f" }}
                  onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product);
                  }}
                >
                  {isProductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />}
                </button>
              </div>
              {/* <div>
                <button onClick={() => handleEditClick(product)}>
                  <EditIcon />
                </button>
              </div>
              <div>
                <button onClick={() => handleEditClick(product)}>
                  <AddIcon />
                </button>
              </div> */}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
