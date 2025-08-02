import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [breederDropdown, setBreederDropdown] = useState(false);
  const [buyerDropdown, setBuyerDropdown] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const PawLogo = () => (
    <div className="w-10 h-10 bg-[#A8E6CF] rounded-full flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-black">
        <path d="M12 2C10.9 2 10 2.9 10 4S10.9 6 12 6 14 5.1 14 4 13.1 2 12 2M21 9C19.9 9 19 9.9 19 11S19.9 13 21 13 23 12.1 23 11 22.1 9 21 9M3 9C1.9 9 1 9.9 1 11S1.9 13 3 13 5 12.1 5 11 4.1 9 3 9M15.5 6C14.4 6 13.5 6.9 13.5 8S14.4 10 15.5 10 17.5 9.1 17.5 8 16.6 6 15.5 6M8.5 6C7.4 6 6.5 6.9 6.5 8S7.4 10 8.5 10 10.5 9.1 10.5 8 9.6 6 8.5 6M12 22C16 20 21 16 21 11.5C21 8.5 18.5 6 15.5 6S10 8.5 10 11.5C10 16 12 20 12 22Z"/>
      </svg>
    </div>
  );

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <PawLogo />
              <span className="text-xl font-bold text-black">{t('navbar.certipet')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-black hover:text-[#70C1B3] transition-colors">
              {t('common.home')}
            </Link>
            
            {isAuthenticated && user?.type === 'breeder' && (
              <div className="relative">
                <button
                  onMouseEnter={() => setBreederDropdown(true)}
                  onMouseLeave={() => setBreederDropdown(false)}
                  className="flex items-center text-black hover:text-[#70C1B3] transition-colors"
                >
                  {t('navbar.breeder')} <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {breederDropdown && (
                  <div
                    onMouseEnter={() => setBreederDropdown(true)}
                    onMouseLeave={() => setBreederDropdown(false)}
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                  >
                    <Link to="/breeder/dashboard" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      {t('navbar.dashboard')}
                    </Link>
                    <Link to="/breeder/post-animal" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      {t('navbar.postAnimal')}
                    </Link>
                    <Link to="/breeder/listings" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      {t('navbar.myListings')}
                    </Link>
                    <Link to="/breeder/buyers" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      {t('navbar.myBuyers')}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {isAuthenticated && user?.type === 'buyer' && (
              <div className="relative">
                <button
                  onMouseEnter={() => setBuyerDropdown(true)}
                  onMouseLeave={() => setBuyerDropdown(false)}
                  className="flex items-center text-black hover:text-[#70C1B3] transition-colors"
                >
                  {t('navbar.buyer')} <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {buyerDropdown && (
                  <div
                    onMouseEnter={() => setBuyerDropdown(true)}
                    onMouseLeave={() => setBuyerDropdown(false)}
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                  >
                    <Link to="/buyer/dashboard" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      {t('navbar.dashboard')}
                    </Link>
                    <Link to="/buyer/search" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      {t('navbar.searchAnimals')}
                    </Link>
                    <Link to="/buyer/favorites" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      {t('navbar.myFavorites')}
                    </Link>
                  </div>
                )}
              </div>
            )}

            {isAuthenticated && (
              <Link to="/messaging" className="text-black hover:text-[#70C1B3] transition-colors">
                {t('navbar.messaging')}
              </Link>
            )}

            <Link to="/contact" className="text-black hover:text-[#70C1B3] transition-colors">
              {t('common.contact')}
            </Link>
            <Link to="/about" className="text-black hover:text-[#70C1B3] transition-colors">
              {t('common.about')}
            </Link>

            <LanguageSelector />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-black">{t('common.welcome')}, {user?.name}</span>
                {user?.type === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors"
                >
                  {t('common.logout')}
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/auth/breeder"
                  className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors"
                >
                  {t('navbar.breederLogin')}
                </Link>
                <Link
                  to="/auth/buyer"
                  className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors"
                >
                  {t('navbar.buyerLogin')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-[#70C1B3] transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                to="/"
                className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {t('common.home')}
              </Link>
              
              {isAuthenticated && user?.type === 'breeder' && (
                <>
                  <Link
                    to="/breeder/dashboard"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.dashboard')}
                  </Link>
                  <Link
                    to="/breeder/post-animal"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.postAnimal')}
                  </Link>
                  <Link
                    to="/breeder/listings"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.myListings')}
                  </Link>
                  <Link
                    to="/breeder/buyers"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.myBuyers')}
                  </Link>
                </>
              )}

              {isAuthenticated && user?.type === 'buyer' && (
                <>
                  <Link
                    to="/buyer/dashboard"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.dashboard')}
                  </Link>
                  <Link
                    to="/buyer/search"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.searchAnimals')}
                  </Link>
                  <Link
                    to="/buyer/favorites"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.myFavorites')}
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <Link
                  to="/messaging"
                  className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {t('navbar.messaging')}
                </Link>
              )}

              <Link
                to="/contact"
                className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {t('common.contact')}
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {t('common.about')}
              </Link>

              {isAuthenticated ? (
                {user?.type === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                >
                  {t('common.logout')} ({user?.name})
                </button>
              ) : (
                <div className="space-y-2 pt-2">
                  <Link
                    to="/auth/breeder"
                    className="block px-3 py-2 bg-[#A8E6CF] text-black rounded-md hover:bg-[#70C1B3]"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.breederLogin')}
                  </Link>
                  <Link
                    to="/auth/buyer"
                    className="block px-3 py-2 bg-[#A8E6CF] text-black rounded-md hover:bg-[#70C1B3]"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('navbar.buyerLogin')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;