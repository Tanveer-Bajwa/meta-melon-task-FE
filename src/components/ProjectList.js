import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
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
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="rounded-circle"
          />
          <span className="ms-2">User Name</span>
          <div className="cart-icon ms-3">
            <button className="btn btn-secondary position-relative">
              🛒
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                0
              </span>
            </button>
          </div>
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
                <button className="btn btn-sm btn-secondary">Add to Cart</button>
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
