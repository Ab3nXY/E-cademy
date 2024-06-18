import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup'; // Assuming you use axios for API calls
import CourseCard from './CourseCard';

const Course = ({ isInstructor }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('api/courses/'); // Replace with your API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="flex flex-wrap mx-4 mt-16">
      {courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8 flex">
          <CourseCard
            course={course}
            isInstructor={isInstructor}
          />
        </div>
      ))}
    </div>
  );
};

export default Course;
