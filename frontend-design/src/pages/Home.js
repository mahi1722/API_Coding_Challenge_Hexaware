import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Book Management</h1>
          <p className="text-gray-600 text-lg">Organize and Manage Your Library</p>
        </div>

        <div className="space-y-6">
          <Link
            to="/login"
            className="block w-full text-center py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg 
            shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
            transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </div>
          </Link>

          <Link
            to="/signup"
            className="block w-full text-center py-3 px-4 bg-green-600 text-white text-lg font-semibold rounded-lg 
            shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 
            transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            <div className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Sign Up
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          © 2024 Book Management App. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Home;