import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="flex flex-col items-center justify-center py-16 bg-cover bg-center bg-gradient-to-b from-blue-500 to-green-500 text-white"
      >
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Unlock Your Potential. Learn Anything, Anytime.
        </h1>
        <p className="text-lg text-center max-w-lg">
          Master in-demand skills with our interactive courses and expert instructors.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-500 hover:bg-blue-600 py-3 px-8 rounded-full mt-8 inline-block transition duration-300 ease-in-out"
        >
          Get Started Today
        </Link>
      </section>

      {/* Course Categories Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Explore Course Categories
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Category Card 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <img
                src="images/ca 1.png" // Replace with your category image
                alt="Category 1"
                className="w-full h-60 mb-4 object-cover rounded"
              />
              <h3 className="text-lg font-medium mb-2">Web Development</h3>
              <p className="text-gray-700">
                Learn essential web development skills like HTML, CSS, and JavaScript.
              </p>
            </div>

            {/* Category Card 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <img
                src="images/ca 2.png" // Replace with your category image
                alt="Category 2"
                className="w-full h-60 mb-4 object-cover rounded"
              />
              <h3 className="text-lg font-medium mb-2">Data Science</h3>
              <p className="text-gray-700">
                Master data analysis and manipulation with Python and R.
              </p>
            </div>

            {/* Repeat for other category cards */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8 text-white">
            Get Started Today!
          </h2>
          <Link
            to="/register"
            className="bg-white text-blue-500 hover:bg-blue-600 py-3 px-8 rounded-full inline-block transition duration-300 ease-in-out"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
