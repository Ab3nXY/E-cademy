import React, { useState, useEffect } from 'react';
import axios from './components/axiosSetup';
import './styles/tailwind.css'; // Assuming Tailwind CSS for styling
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/userSlice';
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
  const pk = user?.id;
  const [csrfToken, setCsrfToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    role: '',
    bio: '',
    profile_image: '',
    date_of_birth: '',
    location: '',
    website: '',
    social_media_linkedin: '',
    social_media_twitter: '',
    interests: '',
  });

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

  console.log('PK:', pk);

  return (
    <Router>
      <div className="flex h-screen">
        {isLoggedIn && user && <Sidebar csrfToken={csrfToken} pk={pk} isLoggedIn={isLoggedIn} profileData={profileData} />}
        <div className="flex-1 flex flex-col">
          <MenuBar csrfToken={csrfToken} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route path="/profile/:pk" element={<ProfileUpdate csrfToken={csrfToken} profileData={profileData} setProfileData={setProfileData}/>} />
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
