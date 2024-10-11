import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, Mail, Lock, Phone, User } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
 

  const [formData, setFormData] = useState({
    username: '',
    FullName: '',
    email: '',
    password: '',
    mobile: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/v1/user/register", formData);
      
      navigate('/sign-in');
    } catch (error) {
      console.error("Registration failed:", error);
      
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-purple-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Create Account</h2>
          <p className="text-gray-600">Join MonthExpense to manage your finances</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-purple-500" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                className="pl-10 w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          
          <div className="relative">
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserPlus className="h-5 w-5 text-purple-500" />
              </div>
              <input
                type="text"
                id="FullName"
                name="FullName"
                value={formData.FullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="pl-10 w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-purple-500" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="pl-10 w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

         
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-purple-500" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="pl-10 w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

         
          <div className="relative">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
              Mobile
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-purple-500" />
              </div>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
                className="pl-10 w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 font-medium"
          >
            Create Account
          </button>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-purple-700 hover:text-purple-800 font-medium">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;