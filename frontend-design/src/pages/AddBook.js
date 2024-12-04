import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookService, setAuthHeader } from './api';

function AddBook() {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { isbn: bookIsbn } = useParams();
  const navigate = useNavigate();

  // Ensure the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate('/login');
    } else {
      setAuthHeader(token); // Set the Authorization header for all requests
    }
  }, [navigate]);

  // Fetch book data for editing if bookIsbn is provided
  useEffect(() => {
    if (bookIsbn) {
      const fetchBookData = async () => {
        try {
          const response = await bookService.getBookByIsbn(bookIsbn);
          const book = response.data;
          setIsbn(book.isbn);
          setTitle(book.title);
          setAuthor(book.author);
          setPublicationYear(book.publicationYear.toString());
        } catch (err) {
          setError('Failed to fetch book data.');
          console.error(err);
        }
      };

      fetchBookData();
    }
  }, [bookIsbn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const bookData = {
        isbn,
        title,
        author,
        publicationYear: parseInt(publicationYear, 10),
      };

      if (bookIsbn) {
        // Update existing book
        await bookService.updateBook(isbn, bookData);
        setSuccessMessage('Book updated successfully!');
      } else {
        // Add new book
        await bookService.addBook(bookData);
        setSuccessMessage('Book added successfully!');
      }
    } catch (err) {
      console.error('Error details:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Error saving book.';
      setError(errorMessage);

      if (err.response?.status === 403 || err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleSuccessConfirm = () => {
    setSuccessMessage('');
    navigate('/books');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Success Modal */}
        {successMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center">
              <h2 className="text-2xl font-bold mb-4">Success</h2>
              <p className="mb-6">{successMessage}</p>
              <button
                onClick={handleSuccessConfirm}
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                OK
              </button>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-6 text-center">
          {bookIsbn ? 'Edit Book' : 'Add Book'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="ISBN"
            required
            className="p-2 border border-gray-300 w-full rounded"
            disabled={!!bookIsbn} // Disable ISBN editing if updating an existing book
          />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="p-2 border border-gray-300 w-full rounded"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
            className="p-2 border border-gray-300 w-full rounded"
          />
          <input
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            placeholder="Publication Year"
            required
            className="p-2 border border-gray-300 w-full rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
          >
            {bookIsbn ? 'Update Book' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
