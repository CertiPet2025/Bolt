import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LanguageSelector from './LanguageSelector';

const Navbar: React.FC = () => {
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
              <span className="text-xl font-bold text-black">CertiPet</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-black hover:text-[#70C1B3] transition-colors">
              Home
            </Link>
            
            {isAuthenticated && user?.type === 'breeder' && (
              <div className="relative">
                <button
                  onMouseEnter={() => setBreederDropdown(true)}
                  onMouseLeave={() => setBreederDropdown(false)}
                  className="flex items-center text-black hover:text-[#70C1B3] transition-colors"
                >
                  Breeder <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {breederDropdown && (
                  <div
                    onMouseEnter={() => setBreederDropdown(true)}
                    onMouseLeave={() => setBreederDropdown(false)}
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                  >
                    <Link to="/breeder/dashboard" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      Dashboard
                    </Link>
                    <Link to="/breeder/post-animal" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      Post an Animal
                    </Link>
                    <Link to="/breeder/listings" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      My Listings
                    </Link>
                    <Link to="/breeder/buyers" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      My Buyers
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
                  Buyer <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {buyerDropdown && (
                  <div
                    onMouseEnter={() => setBuyerDropdown(true)}
                    onMouseLeave={() => setBuyerDropdown(false)}
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                  >
                    <Link to="/buyer/dashboard" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      Dashboard
                    </Link>
                    <Link to="/buyer/search" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      Search Animals
                    </Link>
                    <Link to="/buyer/favorites" className="block px-4 py-2 text-black hover:bg-[#A8E6CF] hover:text-black">
                      My Favorites
                    </Link>
                  </div>
                )}
              </div>
            )}

            {isAuthenticated && (
              <Link to="/messaging" className="text-black hover:text-[#70C1B3] transition-colors">
                Messaging
              </Link>
            )}

            <Link to="/contact" className="text-black hover:text-[#70C1B3] transition-colors">
              Contact
            </Link>
            <Link to="/about" className="text-black hover:text-[#70C1B3] transition-colors">
              About
            </Link>

            <LanguageSelector />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-black">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/auth/breeder"
                  className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors"
                >
                  Breeder Login
                </Link>
                <Link
                  to="/auth/buyer"
                  className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors"
                >
                  Buyer Login
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
                Home
              </Link>
              
              {isAuthenticated && user?.type === 'breeder' && (
                <>
                  <Link
                    to="/breeder/dashboard"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Breeder Dashboard
                  </Link>
                  <Link
                    to="/breeder/post-animal"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Post an Animal
                  </Link>
                  <Link
                    to="/breeder/listings"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    My Listings
                  </Link>
                  <Link
                    to="/breeder/buyers"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    My Buyers
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
                    Buyer Dashboard
                  </Link>
                  <Link
                    to="/buyer/search"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Search Animals
                  </Link>
                  <Link
                    to="/buyer/favorites"
                    className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    My Favorites
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <Link
                  to="/messaging"
                  className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Messaging
                </Link>
              )}

              <Link
                to="/contact"
                className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-black hover:bg-[#A8E6CF] rounded-md"
                >
                  Logout ({user?.name})
                </button>
              ) : (
                <div className="space-y-2 pt-2">
                  <Link
                    to="/auth/breeder"
                    className="block px-3 py-2 bg-[#A8E6CF] text-black rounded-md hover:bg-[#70C1B3]"
                    onClick={() => setIsOpen(false)}
                  >
                    Breeder Login
                  </Link>
                  <Link
                    to="/auth/buyer"
                    className="block px-3 py-2 bg-[#A8E6CF] text-black rounded-md hover:bg-[#70C1B3]"
                    onClick={() => setIsOpen(false)}
                  >
                    Buyer Login
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