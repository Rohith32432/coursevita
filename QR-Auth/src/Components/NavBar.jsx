import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router
import axios from 'axios'; // For axios routes

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-black font-bold text-2xl">MyApp</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/home" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/login" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
              <Link to="/reg" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              <Link to="/order" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Order</Link>
              <Link to="/payment" className="text-black hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Payment</Link>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-white-300 inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" className="text-black block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/login" className="text-black block px-3 py-2 rounded-md text-base font-medium">Login</Link>
            <Link to="/reg" className="text-black block px-3 py-2 rounded-md text-base font-medium">Register</Link>
            <Link to="/order" className="text-black block px-3 py-2 rounded-md text-base font-medium">Order</Link>
            <Link to="/payment" className="text-black block px-3 py-2 rounded-md text-base font-medium">Payment</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
