import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function BookUpdateForm() {
  const [book, setBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publicationYear: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isbn } = useParams();

  // Fetch book details when the component mounts
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/book/${isbn}`);
        setBook(response.data);
      } catch (err) {
        console.error('Fetch book error:', err);
        setError('Failed to fetch book details. ' + (err.response?.data?.message || err.message));
      }
    };

    if (isbn) {
      fetchBookDetails();
    }
  }, [isbn]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isbn) {
        // Update existing book
        await axios.put(`http://localhost:8080/api/book/updateBook/${isbn}`, book, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Add a new book
        await axios.post(`http://localhost:8080/api/book/add`, book, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
      navigate('/books');
    } catch (err) {
      console.error('Save book error:', err);
      setError('Error saving book. ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isbn ? 'Update Book' : 'Add New Book'}
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="isbn" className="sr-only">
                ISBN
              </label>
              <input
                id="isbn"
                name="isbn"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="ISBN"
                value={book.isbn}
                onChange={handleChange}
                disabled={!!isbn} // Disable editing ISBN if updating an existing book
              />
            </div>
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Title"
                value={book.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="author" className="sr-only">
                Author
              </label>
              <input
                id="author"
                name="author"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Author"
                value={book.author}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="publicationYear" className="sr-only">
                Publication Year
              </label>
              <input
                id="publicationYear"
                name="publicationYear"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Publication Year"
                value={book.publicationYear}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isbn ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookUpdateForm;
