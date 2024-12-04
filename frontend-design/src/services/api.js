import axios from "axios";

// Base URL for your backend API
const API_URL = "http://localhost:8080/api"; 

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set the JWT token in the header
const setAuthHeader = (jwt) => {
  if (jwt) {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${jwt}`;
  } else {
    delete axiosInstance.defaults.headers["Authorization"];
  }
};

// Axios service for authentication
const authService = {
  signUp: (userData) => {
    return axiosInstance.post("/user/signup", userData);
  },
  signIn: (credentials) => {
    return axiosInstance.post("/user/signin", credentials);
  },
};

// Book API service with comprehensive methods
const bookService = {
  getAllBooks: () => {
    return axiosInstance.get("/book/getAll");
  },
  getBookByIsbn: (isbn) => {
    return axiosInstance.get(`/book/get/${isbn}`);
  },
  addBook: (bookData) => {
    return axiosInstance.post("/book/add", bookData);
  },
  updateBook: (isbn, bookData) => {
    return axiosInstance.put(`/book/update/${isbn}`, bookData);
  },
  deleteBook: (isbn) => {
    return axiosInstance.delete(`/book/delete/${isbn}`);
  }
};

// Exporting the services
export { authService, bookService, setAuthHeader };