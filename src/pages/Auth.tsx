import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LegalConsent from '../components/LegalConsent';

const Auth: React.FC = () => {
  const { t } = useTranslation();
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
  const [legalConsent, setLegalConsent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check legal consent for registration
    if (!isLogin && !legalConsent) {
      alert(t('legal.consent.required'));
      return;
    }
    
    // Simulate authentication
    const userData = {
      id: '1',
      name: formData.name || 'User',
      email: formData.email,
      type: type as 'breeder' | 'buyer' | 'admin',
      legalConsentTimestamp: !isLogin ? new Date().toISOString() : undefined,
    };
    
    // Special case: if email contains "admin", assign admin role
    if (formData.email.toLowerCase().includes('admin')) {
      userData.type = 'admin';
    }
    
    login(userData);
    
    // Redirect to appropriate dashboard
    if (userData.type === 'admin') {
      navigate('/admin/dashboard');
    } else if (type === 'breeder') {
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
            {isLogin ? t('auth.signIn') : t('auth.createAccount')}
          </h2>
          <p className="mt-2 text-gray-600">
            {isBreeder 
              ? (isLogin ? t('auth.breederLogin') : t('auth.breederRegistration'))
              : (isLogin ? t('auth.buyerLogin') : t('auth.buyerRegistration'))
            }
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {t('auth.fullName')}
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
                    placeholder={t('auth.enterFullName')}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t('auth.emailAddress')}
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
                  placeholder={t('auth.enterEmail')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t('common.password')}
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
                  placeholder={t('auth.enterPassword')}
                />
              </div>
            </div>

            {!isLogin && isBreeder && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  {type === 'breeder' ? t('auth.kennelCatteryName') : t('auth.companyName')}
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                    placeholder={type === 'breeder' ? t('auth.enterKennelName') : t('auth.enterCompanyName')}
                  />
                </div>
              </div>
            )}
          </div>

          {!isLogin && (
            <LegalConsent
              checked={legalConsent}
              onChange={setLegalConsent}
              required={true}
            />
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-[#A8E6CF] hover:bg-[#70C1B3] text-black py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isLogin && !legalConsent}
            >
              {isLogin ? t('auth.signIn') : t('auth.createAccount')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#70C1B3] hover:text-[#A8E6CF] font-medium"
            >
              {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;