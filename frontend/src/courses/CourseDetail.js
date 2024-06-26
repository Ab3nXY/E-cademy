import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import LessonList from './LessonList';
import MaterialList from './MaterialList';
import Tabs from './Tabs';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn, csrfToken, setIsEnrolled: setAuthIsEnrolled, user } = useAuth();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setLocalIsEnrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Course Details');

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/`);
        setCourse(response.data);
        if (isLoggedIn) {
          const enrolledResponse = await axios.get(`/api/enrolled-courses/`);
          const enrolledCourseIds = enrolledResponse.data.map(course => course.id);
          setLocalIsEnrolled(enrolledCourseIds.includes(parseInt(courseId)));
        }
      } catch (error) {
        console.error('Error fetching course detail:', error);
      }
    };

    if (courseId) {
      fetchCourseDetail();
    }
  }, [courseId, isLoggedIn]);

  const enrollCourse = async () => {
    if (!user) {
      console.error('User is not defined');
      navigate('/login');
      return;
    }

    if (isEnrolled) {
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

      setAuthIsEnrolled(courseId, true);
      setLocalIsEnrolled(true);
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

      setAuthIsEnrolled(courseId, false);
      setLocalIsEnrolled(false);
    } catch (error) {
      console.error('Error unenrolling from course:', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  if (!course) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img src="/images/spinner.webp" alt="Loading..." className="w-16 h-16" />
      </div>
    ); // Placeholder for loading state
  }

  const tabs = [
    {
      label: 'Course Details',
      content: (
        <div className="flex flex-col justify-center items-start p-5">
          <h1 className="text-3xl font-semibold text-blue-800 text-start mb-4 md:text-3xl">
            {course.title}
          </h1>
          <img
            src={course.thumbnail ? course.thumbnail : '/default-thumbnail.png'}
            alt={course.title}
            className="w-1/2full h-1/2full object-cover rounded-lg mb-4 md:h-64 hover:opacity-75"
          />
          <p className="text-gray-600 mt-2 text-start leading-loose">
            {course.description}
          </p>
        </div>
      ),
    },
  ];

  if (isLoggedIn) {
    tabs.push(
      {
        label: 'Lessons',
        content: <LessonList />,
      },
      {
        label: 'Materials',
        content: <MaterialList />,
      }
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mt-16 px-5 py-5 flex flex-wrap">
      <div className="w-full md:w-1/2 lg:w-2/3">
        <Tabs tabs={tabs} onTabChange={(label) => setActiveTab(label)} />
      </div>
      {activeTab === 'Course Details' && (
        <div className="w-full md:w-1/2 lg:w-1/3 p-10">
          <div className="bg-gray-50 shadow-inner rounded-lg p-5 space-y-2">
            <div className="text-gray-600 text-md">
              <span className="font-bold">Level:</span> {course.level}
            </div>
            <div className="text-gray-600 text-md">
              <span className="font-bold">Duration:</span> {course.duration} hours
            </div>
            <div className="text-gray-600 text-md">
              <span className="font-bold">Instructor:</span> {course.instructor}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            {isLoggedIn ? (
              isEnrolled ? (
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
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 ease-in-out"
              >
                Log in to Enroll
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
