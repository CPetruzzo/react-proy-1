import "./Cart.css";
import React, { useState } from "react";
import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons.jsx";
import { useCart } from "../hooks/useCart.js";

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong> - ${price}
      </div>

      <footer>
        <small>Qty: {quantity}</small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart } = useCart();

  const [orderSent, setOrderSent] = useState(false); // Para controlar si el pedido se envió
  // Función para enviar el pedido y generar un número aleatorio
  const sendOrder = () => {
    const randomOrderNumber = Math.floor(Math.random() * 1000000); // Genera un número aleatorio de 0 a 999999
    // const orderNumber = setOrderNumber(randomOrderNumber); // Almacena el número de pedido generado
    // setOrderSent(true);
    alert(
      `El pedido fue realizado con éxito con el número de seguimiento: ${randomOrderNumber} `
    );
    clearCart();
  };

  // Calcula el costo total sumando los precios de los productos en el carrito
  const totalCost = cart.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />
      <aside className="cart">
        <div>
          <strong>Total: ${totalCost}</strong>
        </div>
        <button onClick={clearCart}>
          <ClearCartIcon />
        </button>

        {cart.length > 0 && !orderSent ? (
          <button onClick={sendOrder}>Enviar Pedido</button>
        ) : null}

        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
      </aside>
    </>
  );
}
