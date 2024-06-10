import React, { useState, useEffect } from 'react';
import axios from './components/axiosSetup';
import './styles/tailwind.css';  // Assuming Tailwind CSS for styling
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import MenuBar from './components/Menubar';

const App = () => {
  const [csrfToken, setCsrfToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar csrfToken={csrfToken} isLoggedIn={isLoggedIn} />
        <div className="flex-1 flex flex-col">
          <MenuBar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login csrfToken={csrfToken} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={<Register csrfToken={csrfToken} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
