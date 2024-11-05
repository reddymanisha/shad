import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Reuse existing validation functions
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return '';
};

const validatePassword = (password: string) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
  return '';
};

const validateName = (name: string) => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  return '';
};

// FormInput component can be reused from the original code
const FormInput = ({ 
  label, 
  type, 
  name, 
  value, 
  error, 
  onChange, 
  placeholder,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword
}: {
  label: string;
  type: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        id={name}
        type={showPassword ? 'text' : type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Signup Component
const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: formData.password !== formData.confirmPassword 
        ? 'Passwords do not match' 
        : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Add your signup API call here
      console.log('Signing up:', { 
        name: formData.name,
        email: formData.email, 
        password: formData.password 
      });
      
      // Reset form or navigate after successful signup
    } catch (error) {
      console.error('Signup Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          error={errors.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          error={errors.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          error={errors.password}
          onChange={handleChange}
          placeholder="Create a password"
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
