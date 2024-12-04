import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Basic client-side validation
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      // Send the sign-up request to your backend
      const response = await axios.post('http://localhost:8080/api/user/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Assuming your backend returns a JWT and user object
      const { jwt, user } = response.data;

      // Store token securely
      localStorage.setItem('token', jwt);

      // Optional: Store user info
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect to the books page
      navigate('/books');
    } catch (err) {
      // Handle errors with specific messages
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error("Signup error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Create Account</h1>
          <p className="text-gray-600 text-lg">Sign Up for Book Management</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              minLength="6"
              placeholder="Create a password"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="block w-full text-center py-3 px-4 bg-green-600 text-white text-lg font-semibold rounded-lg 
            shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 
            transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0l6 6-6 6V8a8 8 0 0 0-8-8z"></path>
              </svg>
            ) : (
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Sign Up
              </div>
            )}
          </button>
        </form>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </div>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          © 2024 Book Management App. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default SignUp;