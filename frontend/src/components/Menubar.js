import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../AuthContext'; 

const MenuBar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg-black bg-opacity-70 text-white flex justify-between items-center px-4 py-2 fixed w-full z-50">
      <Link to="/dashboard" className="rounded">
        <div className="text-2xl font-semibold px-10 transform hover:scale-105 transition duration-300 ease-in-out">E-cademy</div>
      </Link>
      <nav className="flex space-x-4 px-4">
        <Link to="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">
          Home
        </Link>
        <Link to="/about" className="hover:bg-gray-700 px-3 py-2 rounded">
          About
        </Link>
        <Link to="/contact" className="hover:bg-gray-700 px-3 py-2 rounded">
          Contact
        </Link>
      </nav>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="px-3 py-2">
            Logout <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600 hover:text-red-700" /> 
          </button>
        ) : (
          <>
            <Link to="/login" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
              Login
            </Link>
            <Link to="/register" className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ml-2">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
