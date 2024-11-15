import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TodoList from './components/TodoList';
import ProductList from './components/ProjectList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <TodoList /> : (showLogin ? <LoginForm /> : <RegisterForm />)}
          />

          <Route path="/todo" element={<TodoList />} />

          <Route path="/products" element={<ProductList />} />
        </Routes>

        {!isLoggedIn && (
          <div className="text-center mt-3">
            {showLogin ? (
              <p>
                Don't have an account?{' '}
                <a href="javascript:void(0);" onClick={toggleForm}>
                  Register here
                </a>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <a href="javascript:void(0);" onClick={toggleForm}>
                  Login here
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
