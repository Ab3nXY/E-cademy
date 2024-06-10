// axiosSetup.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/', // Your base URL
  withCredentials: true, // Ensure cookies are sent with requests
});

instance.interceptors.request.use((config) => {
  const csrfToken = document.cookie.split(';').find(item => item.trim().startsWith('csrftoken='));
  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken.split('=')[1];
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
