import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from './axiosSetup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const MenuBar = ({ isLoggedIn, csrfToken, setIsLoggedIn }) => {
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      await axios.post('/rest-auth/logout/', null, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/');
      window.location.reload();

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg-black bg-opacity-50 text-white flex  justify-between px-4 py-2">
      <div className="text-2xl font-semibold">E-cademy</div>
      <nav className="flex space-x-4 px-4">
        <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">
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
          <FontAwesomeIcon icon={faSignOutAlt} className="text-red-600 hover:text-red-700" />
        </button>
        ) : (
          <>
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded">
              Login
            </Link>
            <Link to="/register" className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded ml-2">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuBar;
