import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';
import CourseCard from './CourseCard';

const CourseList = ({ isInstructor, handleViewCourse }) => {
  const [courses, setCourses] = useState([]);

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
      await axios.post('/api/enrollments/', { course_id: courseId }); // Adjust endpoint as per your API
      // Optionally, update local state or re-fetch data
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  return (
    <div className="flex flex-wrap mx-4 mt-10">
      {courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8 flex">
          <CourseCard
            course={course}
            isInstructor={isInstructor}
            enrollCourse={enrollCourse}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
