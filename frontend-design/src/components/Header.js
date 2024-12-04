import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ setJwt }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setJwt(null);
    navigate('/'); // Redirect to the Home page after logout
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/books" 
            className="flex items-center text-2xl font-bold text-gray-800 hover:text-indigo-600 transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.168.477 4.5 1.253v13C19.668 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Book Management
          </Link>
          
          <div className="flex items-center">
            <button 
              onClick={handleLogout} 
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg 
              hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
              transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;