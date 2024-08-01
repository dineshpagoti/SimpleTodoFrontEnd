import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from '../TodoItem'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './index.css';

const API_BASE_URL = 'https://simpletodobackend-1.onrender.com'; // Replace with your deployed backend URL

const SimpleTodos = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputTodo, setInputTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodoList(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const onClickAddBtn = async () => {
    if (inputTodo.trim() === '') {
      return; // Do nothing if input is empty
    }

    try {
      await axios.post(
        `${API_BASE_URL}/todos`,
        { description: inputTodo, status: 'pending' }, // Assuming the API expects a 'description' field
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInputTodo('');
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todoList.find(todo => todo.id === id);
    if (todoToEdit) {
      setEditingTodoId(id);
      setEditedTodoTitle(todoToEdit.description);
    }
  };

  const saveTodo = async () => {
    if (editedTodoTitle.trim() === '') return;

    try {
      await axios.put(
        `${API_BASE_URL}/todos/${editingTodoId}`,
        { description: editedTodoTitle, status: 'pending' }, // Adjust status as needed
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTodoId(null);
      setEditedTodoTitle('');
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="app-container">
      <div className="bg-container">
        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
        <h1 className="heading">Simple Todos</h1>
        <div className="input-todo-container">
          <input
            placeholder="Add Todo"
            className="input-element"
            onChange={(e) => setInputTodo(e.target.value)}
            value={inputTodo}
          />
          <button type="button" className="add-btn" onClick={onClickAddBtn}>
            Add
          </button>
        </div>
        <ul>
          {todoList.map((eachTodo) => (
            <TodoItem
              todoItem={eachTodo}
              key={eachTodo.id}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              saveTodo={saveTodo}
              editingTodoId={editingTodoId}
              editedTodoTitle={editedTodoTitle}
              onChangeEditedTodoTitle={(e) => setEditedTodoTitle(e.target.value)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SimpleTodos;
