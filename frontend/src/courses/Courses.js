import React from 'react';
import axios from '../components/axiosSetup';
import { useAuth } from '../AuthContext';
import CourseCard from './CourseCard';

const Courses = ({ isInstructor, handleViewCourse }) => {
  const { courses, enrollments, isLoggedIn, csrfToken, setIsEnrolled, user } = useAuth();

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
    } catch (error) {
      console.error('Error unenrolling from course:', error);
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data);
      }
    }
  };

  const isEnrolled = (courseId) => {
    return enrollments.some(enrollment => enrollment.course.id === courseId);
  };

  return (
    <div className="flex flex-wrap mx-4 mt-16">
      {courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8 flex">
          <CourseCard
            course={course}
            isInstructor={isInstructor}
            enrollCourse={() => enrollCourse(course.id)}
            unenrollCourse={() => unenrollCourse(course.id)}
            isEnrolled={isEnrolled(course.id)}
            showEnrollButton={isLoggedIn && !isEnrolled(course.id)}
            showUnenrollButton={isLoggedIn && isEnrolled(course.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Courses;
