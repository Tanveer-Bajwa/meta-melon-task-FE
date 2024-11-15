import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      axios
        .get('http://localhost:8080/api/todos/v1/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/';
          } else {
            console.error('Error fetching To-Do list:', error);
          }
        });
    } else {
      window.location.href = '/';
    }
  }, []);

  const addTodo = () => {
    const token = localStorage.getItem('authToken');
    if (newTodo && token) {
      axios
        .post(
          'http://localhost:8080/api/todos/v1/',
          { task: newTodo },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setTodos([...todos, response.data]);
          setNewTodo('');
        })
        .catch((error) => {
          console.error('Error adding To-Do:', error);
        });
    }
  };

  const deleteTodo = (id) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios
        .delete(`http://localhost:8080/api/todos/v1/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setTodos(todos.filter((todo) => todo._id !== id));
        })
        .catch((error) => {
          console.error('Error deleting To-Do:', error);
        });
    }
  };

  const toggleComplete = (id) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios
        .put(
          `http://localhost:8080/api/todos/v1/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          setTodos(
            todos.map((todo) =>
              todo._id === id ? { ...todo, completed: !todo.completed } : todo
            )
          );
        })
        .catch((error) => {
          console.error('Error updating To-Do:', error);
        });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center" style={{ height: '100vh' }}>
      <button
        className="btn btn-info"
        style={{ position: 'absolute', top: '10px', right: '10px' }}
        onClick={() => navigate('/products')}
      >
        Product List
      </button>

      <div className="card p-4" style={{ width: '50%' }}>
        <h1 className="text-center mb-4">THING TO DO:</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add new to-do"
          />
          <button onClick={addTodo} className="btn btn-primary mt-2">
            Add To-Do
          </button>
        </div>
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className={`list-group-item ${todo.completed ? 'bg-success text-white' : ''}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id)}
              />
              {todo.task}
              <button
                className="btn btn-danger btn-sm float-end"
                onClick={() => deleteTodo(todo._id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
