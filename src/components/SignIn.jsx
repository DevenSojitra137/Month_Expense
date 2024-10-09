import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../store/useUserStore.js';
import { saveTokens } from '../auth.js';

function SignIn() {
    const navigate = useNavigate();
    const { setUserId } = useUserStore();


    const [formData, setFormData] = useState({
      email: '',
      password: '',
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
        const response = await axios.post('/api/v1/user/login', formData);
        console.log(response);
        console.log(response.data.refreshToken);

        const refreshToken =  response.data.data.refreshToken;
        const accessToken = response.data.data.accessToken;
        
        console.log(refreshToken);
        console.log(accessToken);

        saveTokens(refreshToken, accessToken);
        
        
        const userIdFromResponse = response.data.data.user._id;
        console.log(userIdFromResponse);
        
          setUserId(userIdFromResponse);
        
        navigate('/expense');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-purple-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-purple-700 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to manage your expenses</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-sm text-purple-700 hover:text-purple-800 font-medium"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-700 text-white py-3 px-4 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 font-medium"
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 mt-4">
              Don't have an account?{' '}
              <Link to="/sign-up" className="text-purple-700 hover:text-purple-800 font-medium">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
}

export default SignIn;