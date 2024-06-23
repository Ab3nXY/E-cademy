import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, csrfToken, setIsEnrolled, user } = useAuth();
  const [course, setCourse] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  
  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course detail:', error);
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get('/api/enrolled-courses/');
        setEnrolledCourses(response.data.map(course => course.id));
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    const fetchEnrolledStudents = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/enrollments/`);
        setEnrolledStudents(response.data.length);
      } catch (error) {
        console.error('Error fetching enrolled students:', error);
      }
    };

    if (courseId) {
      fetchCourseDetail();
      fetchEnrolledStudents();
      if (isLoggedIn) {
        fetchEnrolledCourses();
      }
    }
  }, [courseId, isLoggedIn]);

  const enrollCourse = async () => {
    if (!user) {
      console.error('User is not defined');
      navigate('/login'); 
      return;
    }

    if (isEnrolled(courseId)) {
      console.error('User is already enrolled in this course.');
      return;
    }

    const payload = { 
      course: courseId,
    };

    try {
      await axios.post('/api/enrollments/', payload, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      setIsEnrolled(courseId, true);
      setEnrolledCourses(prevEnrolled => [...prevEnrolled, courseId]);
      setEnrolledStudents((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error enrolling in course:', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  const unenrollCourse = async () => {
    const payload = { 
      course: courseId,
    };

    try {
      await axios.delete('/api/unenroll/', {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        data: payload,
      });

      setIsEnrolled(courseId, false);
      setEnrolledCourses(prevEnrolled => prevEnrolled.filter(id => id !== courseId));
      setEnrolledStudents((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Error unenrolling from course:', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.includes(courseId);
  };

  if (!course) {
    return <p>Loading...</p>; // Placeholder for loading state
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-16 px-5 py-5">
      <img
        src={course.thumbnail ? course.thumbnail : '/default-thumbnail.png'}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 z-10">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <p className="text-gray-600 mt-2">{course.description}</p>
        <div className="mt-4">
          <div className="text-gray-600 text-sm">
            <span className="font-medium">Level:</span> {course.level}
          </div>
          <div className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Duration:</span> {course.duration} hours
          </div>
          <div className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Instructor:</span> {course.instructor}
          </div>
          <div className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Published:</span> {course.published ? 'Yes' : 'No'}
          </div>
          <div className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Enrolled Students:</span> {enrolledStudents}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {isLoggedIn ? (
            isEnrolled(courseId) ? (
              <button
                onClick={unenrollCourse}
                className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 hover:border-transparent py-1 px-2 rounded-full shadow-md transition duration-300 ease-in-out mt-2"
              >
                Unenroll
              </button>
            ) : (
              <button
                onClick={enrollCourse}
                className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 hover:border-transparent py-1 px-2 rounded-full shadow-md transition duration-300 ease-in-out mt-2 mb-5"
              >
                Enroll
              </button>
            )
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-gray-400 text-white px-4 py-2 rounded-md mr-4 hover:bg-gray-500 transition duration-300 ease-in-out"
            >
              Log in to Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
