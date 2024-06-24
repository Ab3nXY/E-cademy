import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import CourseCard from './CourseCard';
import { useAuth } from '../AuthContext';

const Courses = ({ isInstructor, handleViewCourse }) => {
  const { courses, isLoggedIn, csrfToken, setIsEnrolled, user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get('/api/enrolled-courses/');
        setEnrolledCourses(response.data.map(course => course.id));
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    if (isLoggedIn) {
      fetchEnrolledCourses();
    }
  }, [isLoggedIn]);

  const enrollCourse = async (courseId) => {
    if (!user) {
      console.error('User is not defined');
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
    } catch (error) {
      console.error('Error enrolling in course:', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  const unenrollCourse = async (courseId) => {
    if (!user) {
      console.error('User is not defined');
      return;
    }

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

  return (
    <div className="flex flex-wrap px-4 py-4 mx-4 mt-16">
      {courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8 flex">
          <CourseCard
            course={course}
            isInstructor={isInstructor}
            enrollCourse={() => enrollCourse(course.id)}
            unenrollCourse={() => unenrollCourse(course.id)}
            isEnrolled={isEnrolled(course.id)}
            showEnrollButton={!isEnrolled(course.id) && isLoggedIn}
            showUnenrollButton={isEnrolled(course.id) && isLoggedIn}
          />
        </div>
      ))}
    </div>
  );
};

export default Courses;
