import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (nombre, email, password) =>
    api.post('/register', { nombre, email, password }),
  
  login: (email, password) => {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    return api.post('/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  getCurrentUser: () => api.get('/me'),
};

export const booksAPI = {
  getBooks: (skip = 0, limit = 10) =>
    api.get('/books', { params: { skip, limit } }),
  
  countBooks: () => api.get('/books/count'),
  
  getBook: (bookId) => api.get(`/books/${bookId}`),
  
  createBook: (nombre, descripcion) =>
    api.post('/books', { nombre, descripcion }),
  
  updateBook: (bookId, nombre, descripcion) =>
    api.put(`/books/${bookId}`, { nombre, descripcion }),
  
  deleteBook: (bookId) => api.delete(`/books/${bookId}`),
};

export default api;