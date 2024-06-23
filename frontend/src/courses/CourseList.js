import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import CourseCard from './CourseCard';
import { useAuth } from '../AuthContext';

const CourseList = ({ isInstructor, handleViewCourse }) => {
  const { isLoggedIn, csrfToken, setIsEnrolled, user } = useAuth();
  const [courses, setCourses] = useState([]);
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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = isInstructor
          ? await axios.get('api/courses/')
          : await axios.get('api/enrolled-courses/');

        // Filter courses to only include enrolled courses
        const filteredCourses = response.data.filter(course =>
          enrolledCourses.includes(course.id)
        );
        
        setCourses(filteredCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [isInstructor, enrolledCourses]);

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
    <div className="flex flex-wrap mx-4 mt-10">
      {courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8 flex">
          <CourseCard
            course={course}
            isInstructor={isInstructor}
            isEnrolled={isEnrolled(course.id)}
            unenrollCourse={() => unenrollCourse(course.id)}
            showUnenrollButton={isEnrolled(course.id) && isLoggedIn}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
