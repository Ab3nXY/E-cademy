import React from 'react';
import axios from './axiosSetup';
import { Link, useNavigate } from 'react-router-dom';
import { faUser, faBook, faCog, faChartLine, faChartBar,faTachometer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const Sidebar = ({ csrfToken, isLoggedIn, pk, profileData }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);

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
    <div className="h-screen bg-black bg-opacity-50 text-white w-48 flex flex-col">
      <div className="flex items-center justify-center py-4 mt-5 border-gray-700">
        {user && (
          <>
            <img
              src={profileData.profile_image || 'default.jpg'}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{user.first_name}</span>
          </>
        )}
      </div>
        <>
          <nav className="flex-1 mt-2 px-4 py-2 space-y-2">
            <Link to="/dashboard" className="block px-4 py-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faTachometer} className="mr-2" />Dashboard
            </Link>
            <Link to="/courses" className="block px-4 py-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faBook} className='mr-2' />Courses
            </Link>
            <Link to="/progress" className="block px-4 py-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faChartBar} className='mr-2' />Progress
            </Link>
            <Link to="/quizzes" className="block px-4 py-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faChartLine} className='mr-2' />Quizzes
            </Link>
            {isLoggedIn && (
              <Link to={`/profile/${pk}`} className="block px-4 py-2 rounded hover:bg-gray-700">
                <FontAwesomeIcon icon={faUser} className='mr-2' />Profile
              </Link>
            )}
            <Link to="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faCog} className='mr-2' />Settings
            </Link>
          </nav>
          <div className="p-4">
            <button onClick={handleLogout} className="block px-4 py-2 rounded bg-red-600 hover:bg-red-700">
              Logout
            </button>
          </div>
        </>

    </div>
  );
};

export default Sidebar;
