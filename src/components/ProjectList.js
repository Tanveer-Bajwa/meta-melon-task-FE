import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToCartHandler = (product) => {
    if (!cart.some((cartItem) => cartItem.id === product.id)) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-list-page">
      <header className="header d-flex justify-content-between align-items-center p-3 bg-light">
        <div className="header-left">
          <h1>BajwaMART</h1>
        </div>
        <div className="header-center" style={{ width: "50%" }}>
          <div className="input-group search-bar">
            <span className="input-group-text" id="search-icon">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="header-right d-flex align-items-center">
          <Link to="/cart" className="btn btn-secondary">
            🛒 Cart <span>({cart.length})</span>
          </Link>
        </div>
      </header>

      <div className="product-grid container mt-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description.slice(0, 50)}...</p>
              <p className="rating">⭐ {product.rating}</p>
              <div className="price-and-button d-flex justify-content-between align-items-center">
                <p className="price">${product.price}</p>
                <button
                  onClick={() => addToCartHandler(product)}
                  className="btn btn-sm btn-secondary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index + 1}
            className={`pagination-number ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <footer className="footer bg-dark text-white p-3 text-center mt-4">
        <p>© 2024 BajwaMART. All rights reserved.</p>
        <p>Contact: support@bajwamart.com | Phone: +92 300 1234567</p>
      </footer>
    </div>
  );
};

export default ProductList;
