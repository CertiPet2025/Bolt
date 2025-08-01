import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Auth: React.FC = () => {
  const { type } = useParams<{ type: 'breeder' | 'buyer' }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate authentication
    const userData = {
      id: '1',
      name: formData.name || 'User',
      email: formData.email,
      type: type as 'breeder' | 'buyer',
    };
    
    login(userData);
    
    // Redirect to appropriate dashboard
    if (type === 'breeder') {
      navigate('/breeder/dashboard');
    } else {
      navigate('/buyer/dashboard');
    }
  };

  const isBreeder = type === 'breeder';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isBreeder ? 'Breeder' : 'Buyer'} {isLogin ? 'Login' : 'Registration'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={!isLogin}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {!isLogin && isBreeder && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {type === 'breeder' ? 'Kennel/Cattery Name' : 'Company Name'}
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                    placeholder={`Enter your ${type === 'breeder' ? 'kennel/cattery' : 'company'} name`}
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-[#A8E6CF] hover:bg-[#70C1B3] text-black py-3 px-4 rounded-md font-medium transition-colors"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#70C1B3] hover:text-[#A8E6CF] font-medium"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;