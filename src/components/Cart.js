import React, { useState, useEffect } from "react";
import "../App.css";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const removeFromCartHandler = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCartHandler = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="cart-page container mt-4">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="product-grid">
            {cart.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    {product.description.slice(0, 50)}...
                  </p>
                  <p className="price">${product.price}</p>
                  <button
                    onClick={() => removeFromCartHandler(product.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={clearCartHandler} className="btn btn-warning mt-3">
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
