import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
<div class="min-h-screen bg-gray-100 overflow-hidden ">  {/* Hero Section */}
  <section
    class="flex flex-col  items-center justify-center h-screen text-white overflow-hidden"
    style={{ backgroundImage: 'url(images/bg.png)' , backgroundSize: 'cover', backgroundPosition: 'center' }}
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
      {/* Category Card 1 */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
        <img
          src="images/ca1.jpeg" // Replace with your category image
          alt="Category 1"
          className="w-full h-25 object-cover rounded"
        />
      </div>

      {/* Category Card 2 */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
        <img
          src="images/ca2.png" // Replace with your category image
          alt="Category 2"
          className="w-full h-25 object-cover rounded"
        />
      </div>

      {/* Category Card 3 */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
        <img
          src="images/ca3.png" // Replace with your category image
          alt="Category 3"
          className="w-full h-25 object-cover rounded"
        />
      </div>

      {/* Category Card 4 */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out">
        <img
          src="images/ca4.jpeg" // Replace with your category image
          alt="Category 4"
          className="w-full h-25 object-cover rounded"
        />
      </div>
      {/* Repeat for other category cards */}
    </div>
  </div>
</section>

</div>

  );
};

export default LandingPage;
