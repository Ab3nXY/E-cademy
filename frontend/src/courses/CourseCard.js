import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from '../components/axiosSetup';

const CourseCard = ({
  course,
  isInstructor,
  enrollCourse,
  showEnrollButton,
  unenrollCourse,
  showUnenrollButton,
  isEnrolled,
}) => {
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
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
      <img
        src={course.thumbnail ? course.thumbnail : '/default-thumbnail.png'}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 z-10">
        <h3 className="text-l font-semibold text-gray-800">
          <Link to={`/courses/${course.id}`} className="hover:text-blue-500">{course.title}</Link>
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
        <div className="flex flex-col items-center justify-end mt-2">
          {showEnrollButton && !isEnrolled && (
            <button
              onClick={enrollCourse}
              className="bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white border border-blue-500 hover:border-transparent py-1 px-2 rounded-full shadow-md transition duration-300 ease-in-out mt-2 mb-5"
            >
              Enroll
            </button>
          )}
          {showUnenrollButton && isEnrolled && (
            <button
              onClick={unenrollCourse}
              className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 hover:border-transparent py-1 px-2 rounded-full shadow-md transition duration-300 ease-in-out mt-2"
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
