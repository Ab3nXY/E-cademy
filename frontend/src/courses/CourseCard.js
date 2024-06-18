import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';

const CourseCard = ({ course, isInstructor }) => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  useEffect(() => {
    if (isInstructor) {
      const fetchEnrolledStudents = async () => {
        const response = await axios.get(`/api/courses/${course.id}/enrollments/`); // Replace with your API endpoint
        setEnrolledStudents(response.data.length);
      };
      fetchEnrolledStudents();
    }
  }, [course.id, isInstructor]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img 
        src={course.thumbnail ? course.thumbnail : '/default-thumbnail.png'} 
        alt={course.title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          <Link to={`/courses/${course.slug}`}>{course.title}</Link>
        </h3>
        <p className="text-gray-600 mt-2">{course.description.slice(0, 100)}...</p>
        <div className="mt-4">
          <div className="text-gray-600 text-sm">
            <span className="font-medium">Level:</span> {course.level}
          </div>
          <div className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Duration:</span> {course.duration} hours
          </div>
          {isInstructor && enrolledStudents !== null &&(
          <div className="text-gray-600 text-sm mt-1">
            <span className="font-medium">Published:</span> {course.published ? 'Yes' : 'No'}
          </div>
          )}
          {isInstructor && enrolledStudents !== null && (
            <div className="text-gray-600 text-sm mt-1">
              <span className="font-medium">Enrolled Students:</span> {enrolledStudents}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
