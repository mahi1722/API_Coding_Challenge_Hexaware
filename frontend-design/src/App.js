import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './pages/BookList';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Header from './components/Header';

// Import the new book management components
import BookUpdateForm from './components/BookUpdateForm';
import BookRemoveForm from './components/BookRemoveForm';

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem('jwt'));

  return (
    <Router>
      {/* Render Header for authenticated pages */}
      {jwt && <Header setJwt={setJwt} />}
      
      <Routes>
        {/* Home page as the default landing page */}
        <Route path="/" element={<Home />} />
        
        {/* Login and Signup routes */}
        <Route path="/login" element={<Login setJwt={setJwt} />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Book Management Routes */}
        <Route path="/books" element={<BookList />} />
        
        {/* Book Add Route */}
        <Route path="/books/add" element={<BookUpdateForm />} />
        
        {/* Book Edit Route (with ISBN parameter) */}
        <Route path="/books/edit/:isbn" element={<BookUpdateForm />} />
        
        {/* Book Remove Route */}
        <Route path="/books/remove" element={<BookRemoveForm />} />
        
        {/* Add more routes as necessary */}
      </Routes>
    </Router>
  );
}

export default App;