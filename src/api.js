/**
 * @file API Service Configuration
 * @description Sets up the base configuration for Axios to communicate with the backend server. 
 *              Provides a centralized API instance for making HTTP requests throughout the frontend application. 
 *              Falls back to localhost if environment variable is not set. 
 * @author Nathan Xia
 * @version 1.0.0
 */


import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080",
});

export default api;
