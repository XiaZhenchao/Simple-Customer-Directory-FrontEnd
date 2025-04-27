/**
 * @file Login Form Component
 * @description Provides a modal form for users to input email and password to log in.
 *              Handles form submission, login validation, API request, user authentication update, 
 *              and navigation to customer management page upon success.
 * @author Nathan Xia
 * @version 1.0.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';
import api from "../api"; 

const LoginForm = ({ onClose, onForgotPassword, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await api.post('/users/login', { email, password });

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        onLoginSuccess(response.data.user); 
        onClose(); 
        navigate('/customers');  
      }
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.status === 401) {
        alert('Invalid email or password');
      } else {
        alert('Error during login');
      }
    }
  };

  return (
    <div className="form-modal">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Login</button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
          <div className="form-footer">
            <a href="#forgot-password" onClick={onForgotPassword}>
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;