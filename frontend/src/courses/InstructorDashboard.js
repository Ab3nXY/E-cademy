import React, { useState } from 'react';
import CourseList from './CourseList';

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="instructor-dashboard mt-16 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Instractor Dashboard</h1>
      <nav className="mb-6">
        <button 
          className={`mr-4 px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'courses' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`} 
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
        {/* Add buttons for other sections (materials, assessments, etc.) */}
      </nav>
      <div className="content">
        {activeTab === 'courses' && <CourseList isInstructor={true} />}
        {/* Conditionally render other components based on activeTab */}
      </div>
    </div>
  );
};

export default InstructorDashboard;
