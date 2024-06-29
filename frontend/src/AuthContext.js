import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from './components/axiosSetup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './redux/userSlice';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [csrfToken, setCsrfToken] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);

  const setIsEnrolled = (courseId, isEnrolled) => {
    if (isEnrolled) {
      setEnrollments((prevEnrollments) => [...prevEnrollments, { course: { id: courseId } }]);
    } else {
      setEnrollments((prevEnrollments) => prevEnrollments.filter((enrollment) => enrollment.course.id !== courseId));
    }
  };

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('get_csrf_token/', { withCredentials: true });
        setCsrfToken(response.data.csrftoken);
        document.cookie = `csrftoken=${response.data.csrftoken}; path=/; secure`;
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
          dispatch(fetchUser());
          await fetchCourses();
          await fetchEnrollments();
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === 'admin');
    }
  }, [user]);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('/api/enrollments', { withCredentials: true });
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('api/courses/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post('rest-auth/login/', credentials, { withCredentials: true });
      setIsLoggedIn(true);
      dispatch(fetchUser());
      await fetchCourses();
      await fetchEnrollments();
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/rest-auth/logout/', {}, { withCredentials: true });
      setIsLoggedIn(false);
      setEnrollments([]);
      setCourses([]);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, setIsLoggedIn, csrfToken, enrollments, courses, setIsEnrolled, user, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext }; // Export AuthContext
