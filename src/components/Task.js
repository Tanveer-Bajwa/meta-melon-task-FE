import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table, Alert, Row, Col, Card } from 'react-bootstrap';
import '../app.css'; 

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'Low',
    status: 'Pending',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/tasks/all');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/tasks/create', form);
      setTasks([...tasks, response.data]);
      setForm({ title: '', description: '', priority: 'Low', status: 'Pending' });
      setMessage('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      setMessage('Failed to create task.');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/tasks/update/${id}`, { status: newStatus });
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setMessage('Task status updated.');
    } catch (error) {
      console.error('Error updating task:', error);
      setMessage('Failed to update task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/delete/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
      setMessage('Task deleted successfully!');
    } catch (error) {
      console.error('Error deleting task:', error);
      setMessage('Failed to delete task.');
    }
  };

  return (
    <Container>
      {message && <Alert variant="info">{message}</Alert>}
      <Card className="my-4 p-4 shadow-sm">
        <Card.Body>
          <h2 className="mb-4">Create New Task</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Task Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPriority" className="mb-3">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select name="priority" value={form.priority} onChange={handleChange}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter task description"
              />
            </Form.Group>
            <Form.Group controlId="formStatus" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={handleChange}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3 w-100">
              Create Task
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <h3 className="my-4">Task List</h3>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleStatusUpdate(task.id, 'In Progress')}
                    className="me-2"
                  >
                    Mark In Progress
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Task;
