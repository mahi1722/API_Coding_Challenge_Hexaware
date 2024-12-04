import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login({ setJwt }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/api/user/signin', { 
        email, 
        password 
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Log the full response for debugging
      console.log('Login response:', response.data);

      // Ensure the JWT is extracted correctly
      const token = response.data.token || response.data.jwt;

      if (!token) {
        throw new Error('No token received');
      }

      // Store the JWT token securely in localStorage
      localStorage.setItem('jwt', token);

      // Set the JWT in the parent component
      setJwt(token);

      // Redirect to the books page after successful login
      navigate('/books');
    } catch (error) {
      // Comprehensive error handling
      console.error('Login error:', error);
      
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Login failed. Please try again.';
      
      setError(errorMessage);
      
      // Additional logging for debugging
      if (error.response) {
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome Back</h1>
          <p className="text-gray-600 text-lg">Login to Your Book Management Account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="block w-full text-center py-3 px-4 bg-blue-600 text-white text-lg font-semibold rounded-lg 
            shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
            transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0l6 6-6 6V8a8 8 0 0 0-8-8z"></path>
              </svg>
            ) : (
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </div>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        </div>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          © 2024 Book Management App. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Login;