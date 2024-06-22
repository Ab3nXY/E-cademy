import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';

const CourseCard = ({ course, isInstructor, enrollCourse, showEnrollButton, unenrollCourse, showUnenrollButton }) => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  useEffect(() => {
    if (isInstructor) {
      const fetchEnrolledStudents = async () => {
        try {
          const response = await axios.get(`/api/courses/${course.id}/enrollments/`);
          setEnrolledStudents(response.data.length);
        } catch (error) {
          console.error('Error fetching enrolled students:', error);
        }
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
          {isInstructor && enrolledStudents !== null && (
            <>
              <div className="text-gray-600 text-sm mt-1">
                <span className="font-medium">Published:</span> {course.published ? 'Yes' : 'No'}
              </div>
              <div className="text-gray-600 text-sm mt-1">
                <span className="font-medium">Enrolled Students:</span> {enrolledStudents}
              </div>
            </>
          )}
        </div>
        <div className="mt-4">
          {showEnrollButton && (
            <button
              onClick={enrollCourse}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Enroll
            </button>
          )}
          {showUnenrollButton && (
            <button
              onClick={unenrollCourse}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Unenroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
