/**
 * @file Main Application Roudter
 * @description Handles overall application structure, suer authtication status, and page routing
 * @author Nathan Xia
 * @version 1.0.0
 */




import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import AppBanner from './components/AppBanner';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import CustomerManagementPage from './components/ CustomerManagementPage';
import './App.css';
import './styles.css';

function App() {
  //currentUser keep the information of current login User, null by default
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <BrowserRouter>
      <div id="app-container">
        <AppBanner 
          currentUser={currentUser} 
          onLoginSuccess={handleLoginSuccess} 
          onLogout={handleLogout} 
        />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm onClose={() => {}} onForgotPassword={() => {}} />} />
            <Route path="/register" element={<RegisterForm onClose={() => {}} />} />
            <Route 
              path="/customers" 
              element={
                currentUser ? (
                  <CustomerManagementPage />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
