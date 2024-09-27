import React from 'react';
import { useAuth } from '../Context/UserContext';

function Landing() {
  const {user}=useAuth()
  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center text-center m-10 ">
      {/* Hero Section */}
      <div className="bg-gray-300 text-black py-20 w-full">
        <h1 className="text-4xl font-bold mb-4"> {user?  'Welcome to Our Project':'Please Login'}</h1>
        <p className="text-lg mb-6">Simplifying your work with innovative solutions.</p>
        <a href="#about" className="bg-white text-black-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-200">
          Learn More
        </a>
      </div>

    
    </div>
  );
}

export default Landing;
