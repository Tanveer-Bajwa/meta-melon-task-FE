import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';
import ProductList from './components/ProjectList';
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/todo" element={isLoggedIn ? <TodoList /> : <Navigate to="/" />} />
          <Route path="/products" element={isLoggedIn ? <ProductList /> : <Navigate to="/" />} />
          <Route path="/cart" element={isLoggedIn ? <Cart /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
