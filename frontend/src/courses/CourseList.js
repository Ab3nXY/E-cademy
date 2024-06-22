import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import CourseCard from './CourseCard';
import { useAuth } from '../AuthContext';

const CourseList = ({ isInstructor, handleViewCourse }) => {
  const [courses, setCourses] = useState([]);
  const { enrollments, isLoggedIn, csrfToken, setIsEnrolled } = useAuth(); // Include setIsEnrolled from AuthContext

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = isInstructor
          ? await axios.get('api/courses/') // Replace with your API endpoint for all courses
          : await axios.get('api/enrolled-courses/'); // Replace with your API endpoint for enrolled courses

        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [isInstructor]);

  const enrollCourse = async (courseId) => {
    try {
      await axios.post('/api/enrollments/', { course_id: courseId }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      // Update enrollments in context
      setIsEnrolled(courseId, true);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  // Function to check if a course is enrolled
  const isEnrolled = (courseId) => {
    return enrollments.some(enrollment => enrollment.course.id === courseId);
  };

  return (
    <div className="flex flex-wrap mx-4 mt-10">
      {courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8 flex">
          <CourseCard
            course={course}
            isInstructor={isInstructor}
            enrollCourse={() => enrollCourse(course.id)}
            showEnrollButton={!isEnrolled(course.id) && isLoggedIn} // Show enroll button if not enrolled and user is logged in
          />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
