// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowUsernameError, setShowUsernameError] = useState(false);
  const [isShowPasswordError, setShowPasswordError] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validUsername = () => username.trim() !== '';
  const validPassword = () => password.trim() !== '';

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const isValidUsername = validUsername();
    const isValidPassword = validPassword();

    if (!isValidUsername || !isValidPassword) {
      setShowUsernameError(!isValidUsername);
      setShowPasswordError(!isValidPassword);
      return;
    }

    try {
      const response = await axios.post('https://simpletodobackend-1.onrender.com/login', { username, password });
      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token); // Save token in localStorage
        navigate('/'); // Navigate to SimpleTodos if successful
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="bg-container">
      <h1 className="registration-heading">Login</h1>
      <form className="form-container" onSubmit={onSubmitForm}>
        <div className="input-container">
          <label className="label-input" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            className={isShowUsernameError ? 'name-input-field error-field' : 'name-input-field'}
            id="username"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setShowUsernameError(!validUsername())}
          />
        </div>
        {isShowUsernameError && <p className="error-message">Required</p>}
        <div className="input-container">
          <label className="label-input" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className={isShowPasswordError ? 'name-input-field error-field' : 'name-input-field'}
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setShowPasswordError(!validPassword())}
          />
        </div>
        {isShowPasswordError && <p className="error-message">Required</p>}
        {error && <p className="error-message">{error}</p>}
        <button className="submit-button" type="submit">
          Submit
        </button>
        <button
          type="button"
          className="submit-button"
          onClick={() => navigate('/register')}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
