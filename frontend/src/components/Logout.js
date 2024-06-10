import React from 'react';
import axios from './axiosSetup';
import { useNavigate } from 'react-router-dom';

const Logout = ({ csrfToken, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('auth/logout/', {}, {
        headers: { 'X-CSRFToken': csrfToken },
      });
      console.log('Logout successful');
      setIsLoggedIn(false);  // Update the isLoggedIn state
      navigate('api/auth/login/');  // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Logout
    </button>
  );
};

export default Logout;
