import React, { useState, useEffect } from 'react';
import axios from './components/axiosSetup';
import './styles/tailwind.css'; // Assuming Tailwind CSS for styling
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/userSlice';
import { fetchProfile } from './redux/profileSlice';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import MenuBar from './components/Menubar';
import ProfileUpdate from './components/profile';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const profile = useSelector((state) => state.profile.data);

  const pk = user?.id;
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
        if (response.data.isAuthenticated) {
          dispatch(fetchUser()); // Fetch user data if authenticated
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchProfile({ pk, csrfToken }));
    }
  }, [dispatch, user, pk, csrfToken]);

  return (
    <Router>
      <div className="flex h-screen" style={{ backgroundColor: 'transparent' }}>
          <MenuBar csrfToken={csrfToken} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} /> 
          {isLoggedIn && user && <Sidebar csrfToken={csrfToken} pk={user?.id} profile={profile} isLoggedIn={isLoggedIn} />}
          
          <main className="flex-1 overflow-auto ">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/profile/:pk" element={<ProfileUpdate csrfToken={csrfToken} pk={user?.id} profile={profile} />} />
              <Route path="/login" element={<Login csrfToken={csrfToken} setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={<Register csrfToken={csrfToken} />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
      </div>
    </Router>
  );
};

export default App;
