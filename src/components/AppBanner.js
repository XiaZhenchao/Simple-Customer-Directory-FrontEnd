/**
 * @file App Banner Component
 * @description Displays the top navigation banner with login, register, welcome message, 
 *              and logout functionality based on user authentication status. 
 *              Handles modal controls for login and register forms as well as routing after logout actions.
 * @author Nathan Xia
 * @version 1.0.0
 */
import React, { useState } from 'react';
import '../styles.css';
import LoginForm from './LoginForm'; 
import RegisterForm from './RegisterForm';
import { useNavigate } from 'react-router-dom';

const AppBanner = ({ currentUser, onLoginSuccess, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("login button clicked");
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    console.log("register button clicked");
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogout = () => {
    onLogout();      
    navigate('/');   
  };

  return (
    <>
      <div id="app-banner">
        <div className="banner-content">
          <div className="banner-logo"></div>
          <div className="auth-buttons">
            {currentUser ? (
              <>
                <span className="welcome-text"><strong>Welcome, {currentUser.name}!</strong></span>
                <button 
                  className="auth-btn login-btn"
                  onClick={handleLogout} 
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button 
                  className="auth-btn login-btn" 
                  onClick={handleLoginClick}
                >
                  Login
                </button>
                <button 
                  className="auth-btn register-btn" 
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {showLogin && (
        <LoginForm 
          onClose={handleCloseModals}
          onForgotPassword={handleCloseModals}
          onLoginSuccess={(user) => {
            onLoginSuccess(user);   // update currentUser in App.js
            handleCloseModals();
          }}
        />
      )}
      
      {showRegister && (
        <RegisterForm onClose={handleCloseModals} />
      )}
    </>
  );
};

export default AppBanner;
