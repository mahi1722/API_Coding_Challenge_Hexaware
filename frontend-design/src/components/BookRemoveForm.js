import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function BookRemoveForm() {
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setIsbn(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      await axios.delete(`http://localhost:8080/api/book/delete/${isbn}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      setSuccess(`Book with ISBN ${isbn} has been successfully removed.`);
      setIsbn('');
      
      // Optional: Redirect to book list after a short delay
      setTimeout(() => {
        navigate('/books');
      }, 2000);
    } catch (err) {
      console.error('Remove book error:', err);
      setError('Error removing book. ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Remove Book
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the ISBN of the book you want to remove
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            {success}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="isbn" className="sr-only">ISBN</label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter ISBN"
                value={isbn}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Remove Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookRemoveForm;