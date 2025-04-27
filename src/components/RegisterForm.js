
/**
 * @file Register Form Component
 * @description Provides a modal form for new users to register. 
 *              Handles input validation, password confirmation, API request to register the user, 
 *              and closes the modal upon successful registration or failure handling with appropriate feedback alerts. 
 * @author Nathan Xia
 * @version 1.0.0
 */

import React, { useState } from 'react';
import api from "../api"; 
import '../styles.css';

const RegisterForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    try {
      const response = await api.post('/users/register', {
        name,
        email,
        password
      });
  
      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        alert('Registration successful!');
        onClose();
      } else {
        console.error('Registration failed:', response.data);
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Error during registration');
    }
  };

  return (
    <div className="form-modal">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Register</button>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;