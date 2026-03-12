import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BooksPage from './pages/BooksPage';
import biblioteca from './assets/biblioteca.jpg';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{
          minHeight: '100vh',
          backgroundImage: `url(${biblioteca})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          position: 'relative',
        }}>
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(18,10,5,0.72) 0%, rgba(30,16,8,0.80) 100%)',
            zIndex: 0,
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Navbar />
            <Routes>
              <Route path="/"         element={<Home />} />
              <Route path="/login"    element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/books" element={
                <PrivateRoute><BooksPage /></PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;