"use client";

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center mb-4">
          <ArrowLeft className="h-6 w-6 cursor-pointer" onClick={() => window.history.back()} />
          <h2 className="text-2xl font-bold ml-4">Forgot Password</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          // Add your password reset logic here
          console.log('Reset password for:', email);
        }}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Send Reset Instructions
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;