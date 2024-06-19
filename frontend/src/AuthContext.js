import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from './components/axiosSetup';
import { useDispatch } from 'react-redux';
import { fetchUser } from './redux/userSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [csrfToken, setCsrfToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('get_csrf_token/', { withCredentials: true });
        setCsrfToken(response.data.csrftoken);
        document.cookie = `csrftoken=${response.data.csrftoken}; path=/; secure`; // Set CSRF token as a cookie
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('status/', { withCredentials: true });
        setIsLoggedIn(response.data.isAuthenticated);
        if (response.data.isAuthenticated) {
          dispatch(fetchUser()); // Fetch user data if authenticated
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  const login = async (credentials) => {
    try {
      const response = await axios.post('rest-auth/login/', credentials, { withCredentials: true });
      setIsLoggedIn(true);
      dispatch(fetchUser()); // Fetch user data after login
      console.log('Login successful', response.data)
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/rest-auth/logout/', {}, { withCredentials: true });
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, csrfToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);