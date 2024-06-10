import React from 'react';
import { Link } from 'react-router-dom';

const MenuBar = () => {
  return (
    <div className="bg-gray-800 text-white flex items-center justify-between px-4 py-2">
      <nav className="space-x-4">
        <Link to="/" className="hover:bg-gray-700 px-3 py-2 rounded">
          Home
        </Link>
        <Link to="/about" className="hover:bg-gray-700 px-3 py-2 rounded">
          About
        </Link>
        <Link to="/contact" className="hover:bg-gray-700 px-3 py-2 rounded">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default MenuBar;
