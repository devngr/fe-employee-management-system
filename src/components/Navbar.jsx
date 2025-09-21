import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 shadow-lg w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/employees"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200"
            >
              Employees
            </Link>
            <Link 
              to="/tasks"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-white hover:text-gray-300 transition-colors duration-200"
            >
              Tasks
            </Link>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
