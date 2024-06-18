import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faUser, faBook, faCog, faChartLine, faChartBar, faTachometer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfile } from '../redux/profileSlice';
import { useAuth } from '../AuthContext'; // Import useAuth hook

const Sidebar = () => {
  const { isLoggedIn, csrfToken } = useAuth(); // Access isLoggedIn, pk, and csrfToken from AuthContext
  
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.data);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchProfile({  csrfToken }));
    }
  }, [dispatch, isLoggedIn, csrfToken]);


  return (
    <div className="bg-black bg-opacity-60 text-white flex justify-between w-48 flex-col mt-14">
      <div className="flex items-center justify-center py-2 mt-5 border-gray-700">
        {profile && (
          <>
            <img
              src={profile.profile_image || '../images/default.jpg'}
              alt="Profile"
              className="w-14 h-14 rounded-full mr-2"
            />
            <span>{profile.user?.first_name}</span>
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
            <Link to={`/profile/`} className="block px-4 py-2 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={faUser} className='mr-2' />Profile
            </Link>
          )}
          <Link to="/settings" className="block px-4 py-2 rounded hover:bg-gray-700">
            <FontAwesomeIcon icon={faCog} className='mr-2' />Settings
          </Link>
        </nav>
      </>
    </div>
  );
};

export default Sidebar;
