import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
<div class="min-h-screen bg-gray-100 overflow-hidden ">  {/* Hero Section */}
  <section
    class="flex flex-col  items-center justify-center h-screen text-white overflow-hidden"
    style={{ backgroundImage: 'url(images/bg.png)' , backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <Link to="/register" class="bg-white text-blue-500 hover:bg-violet-600 py-3 px-8 rounded-full mt-12 inline-block transition duration-300 ease-in-out">
      Get Started Today
    </Link>
  </section>

  {/* Course Categories Section */}
  <section class="fixed bottom-0 w-full justify-center">  
    <div class="container bottom-0 justify-center">  
    <div class="grid grid-cols-4 bottom-0 mx-10 gap-6">
        {/* Category Card 1 */}
        <div class="bg-white shadow-lg rounded-lg">
          <img
            src="images/ca1.jpeg" // Replace with your category image
            alt="Category 1"
            class="w-full h-25 object-cover rounded opacity-75"
          />
        </div>

        {/* Category Card 2 */}
        <div class="bg-white shadow-lg rounded-lg">
          <img
            src="images/ca2.png" // Replace with your category image
            alt="Category 2"
            class="w-full h-25 object-cover rounded opacity-75"
          />
        </div>

        {/* Category Card 3 */}
        <div class="bg-white shadow-lg rounded-lg">
          <img
            src="images/ca3.png" // Replace with your category image
            alt="Category 3"
            class=" flex w-full h-25 object-cover rounded opacity-75"
          />
        </div>

        {/* Category Card 4 */}
        <div class="bg-white shadow-lg rounded-lg">
          <img
            src="images/ca4.jpeg" // Replace with your category image
            alt="Category 4"
            class="w-full h-25 object-cover rounded opacity-75"
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
