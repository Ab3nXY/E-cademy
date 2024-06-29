import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  { id: 1, title: 'Course 1', image: 'images/ca1.jpeg' },
  { id: 2, title: 'Course 2', image: 'images/ca2.png' },
  { id: 3, title: 'Course 3', image: 'images/ca3.png' },
  { id: 4, title: 'Course 4', image: 'images/ca4.jpeg' },
  // Add more courses as needed
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <section
        className="flex flex-col items-center justify-center h-screen text-white overflow-hidden"
        style={{ backgroundImage: 'url(images/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <Link
          to="/register"
          className="
            bg-slate-700
            text-white 
            hover:bg-green-600 
            hover:text-white 
            py-3 
            px-8 
            rounded-full 
            mt-12 
            inline-block 
            transition 
            duration-300 
            ease-in-out 
            shadow-md 
            hover:shadow-lg 
            focus:outline-none 
            focus:ring-2 
            focus:ring-green-600 
            focus:ring-opacity-50
            transform 
            hover:scale-105
          "
        >
          Get Started Today
        </Link>
      </section>

      {/* Course Categories Section */}
      <section className="fixed bottom-0 w-full flex justify-center">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Link to={`/courses/${course.id}`} key={course.id}>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-25 object-cover rounded"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
