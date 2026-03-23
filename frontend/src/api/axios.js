import axios from 'axios';

// Get the backend URL. Assuming standard localhost:5000 in dev
const API_URL = 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to insert the JWT token from localStorage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
