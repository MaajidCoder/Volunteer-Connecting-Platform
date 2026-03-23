import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50 transition-all duration-300">
      <Link to="/" className="text-2xl font-extrabold text-primary-600 tracking-tight transition-transform hover:scale-105">
          Volun<span className="text-gray-900">Connect</span>
      </Link>
      <div className="flex gap-4 items-center">
        <Link to="/events" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Browse</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Dashboard</Link>
            <button onClick={logout} className="btn-outline px-5 py-2 text-sm border-gray-200">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
            <Link to="/register" className="btn-primary px-5 py-2 text-sm shadow-md shadow-primary-500/20">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-[#FAFAFA]">
        <Toaster position="top-center" toastOptions={{
          style: {
             borderRadius: '12px',
             background: '#333',
             color: '#fff',
             padding: '16px',
             fontSize: '15px'
          }
        }}/>
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 animate-fade-in">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
