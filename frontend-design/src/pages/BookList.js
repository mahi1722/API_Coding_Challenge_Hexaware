import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch books from the server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('jwt');
        
        // If no token, redirect to login
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/book/getAll', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch books error:', err);
        setLoading(false);
        
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate('/login');
        } else {
          setError('Failed to fetch books. ' + (err.response?.data?.message || err.message));
        }
      }
    };

    fetchBooks();
  }, [navigate]);

  // Function to handle deleting a book
  const handleDelete = async (isbn) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.delete(`http://localhost:8080/api/book/delete/${isbn}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      setBooks(books.filter((book) => book.isbn !== isbn));
    } catch (err) {
      console.error('Delete book error:', err);
      setError('Error deleting book. ' + (err.response?.data?.message || err.message));
    }
  };

  // Confirm delete dialog
  const confirmDelete = (book) => {
    if (window.confirm(`Are you sure you want to delete the book "${book.title}"?`)) {
      handleDelete(book.isbn);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Book Collection</h2>
          <div className="flex space-x-4">
            <Link 
              to="/books/add" 
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Book
            </Link>
            <Link 
              to="/books/remove" 
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Remove Book
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {books.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div 
                key={book.isbn} 
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-gray-600 mb-1">Author: {book.author}</p>
                  <p className="text-gray-600 mb-3">Publication Year: {book.publicationYear}</p>

                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Link 
                      to={`/books/edit/${book.isbn}`}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Edit Book"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button 
                      onClick={() => confirmDelete(book)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete Book"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-xl">No books available in the collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookList;