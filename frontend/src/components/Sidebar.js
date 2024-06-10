import React from 'react';
import axios from './axiosSetup';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ csrfToken, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/rest-auth/logout/', null, {
        headers: {
          'X-CSRFToken': csrfToken,  // Include CSRF token
        },
      });

      // Clear any tokens or local storage items if needed
      localStorage.removeItem('token');

      // Redirect to the home page
      navigate('/');

      // Optionally reload the page if necessary
      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
      // Handle any errors from the logout process
    }
  };

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col">
      <div className="p-4 text-2xl font-semibold">E-cademy</div>
      {isLoggedIn && (
        <>
          <nav className="flex-1 px-4 py-2 space-y-2">
            <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
            <Link to="/courses" className="block px-4 py-2 rounded hover:bg-gray-700">
              Courses
            </Link>
            <Link to="/progress" className="block px-4 py-2 rounded hover:bg-gray-700">
              Progress
            </Link>
            <Link to="/quizzes" className="block px-4 py-2 rounded hover:bg-gray-700">
              Quizzes
            </Link>
            <Link to="/profile" className="block px-4 py-2 rounded hover:bg-gray-700">
              Profile
            </Link>
            <Link to="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
              Settings
            </Link>
          </nav>
          <div className="p-4">
            <button onClick={handleLogout} className="block px-4 py-2 rounded bg-red-600 hover:bg-red-700">
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
