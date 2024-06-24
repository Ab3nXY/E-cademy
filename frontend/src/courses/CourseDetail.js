import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import LessonList from './LessonList';
import MaterialList from './MaterialList';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, csrfToken, user } = useAuth();
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

      setEnrolledCourses(prevEnrolled => [...prevEnrolled, courseId]);
      setEnrolledStudents(prevCount => prevCount + 1);
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

      setEnrolledCourses(prevEnrolled => prevEnrolled.filter(id => id !== courseId));
      setEnrolledStudents(prevCount => prevCount - 1);
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
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-16 px-5 py-5 flex flex-wrap">
      <div className="w-full md:w-1/2 lg:w-2/3 flex flex-col justify-center items-start p-10">
        <h1 className="text-3xl font-bold text-blue-800 text-start mb-4">{course.title}</h1>
        <img
          src={course.thumbnail ? course.thumbnail : '/default-thumbnail.png'}
          alt={course.title}
          className="w-full h-full object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mt-2 text-start">{course.description}</p>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-10 flex flex-col justify-between">
        <div className="bg-gray-50 shadow-inner rounded-lg p-10 space-y-2">
          <div className="text-gray-600 text-md">
            <span className="font-bold">Level:</span> {course.level}
          </div>
          <div className="text-gray-600 text-md">
            <span className="font-bold">Duration:</span> {course.duration} hours
          </div>
          <div className="text-gray-600 text-md">
            <span className="font-bold">Instructor:</span> {course.instructor}
          </div>
          <div className="text-gray-600 text-md">
            <span className="font-bold">Published:</span> {course.published ? 'Yes' : 'No'}
          </div>
          <div className="text-gray-600 text-md">
            <span className="font-bold">Enrolled Students:</span> {enrolledStudents}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {isLoggedIn ? (
            isEnrolled(courseId) ? (
              <button
                onClick={unenrollCourse}
                className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 hover:border-transparent py-1 px-2 rounded-full shadow-md transition duration-300 ease-in-out"
              >
                Unenroll
              </button>
            ) : (
              <button
                onClick={enrollCourse}
                className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 hover:border-transparent py-1 px-2 rounded-full shadow-md transition duration-300 ease-in-out"
              >
                Enroll
              </button>
            )
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition duration-300 ease-in-out"
            >
              Log in to Enroll
            </button>
          )}
        </div>
      </div>
      <div className="w-full mt-10">
        <LessonList />
        <MaterialList />
      </div>
    </div>
  );
};

export default CourseDetail;