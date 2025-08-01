import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Heart, MessageSquare, Bell, MapPin, Filter, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BuyerDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { label: t('dashboard.buyer.savedSearches'), value: '5', icon: Search, color: 'text-blue-600' },
    { label: t('dashboard.buyer.favorites'), value: '12', icon: Heart, color: 'text-red-600' },
    { label: t('dashboard.buyer.messages'), value: '3', icon: MessageSquare, color: 'text-green-600' },
    { label: t('dashboard.buyer.alerts'), value: '2', icon: Bell, color: 'text-yellow-600' },
  ];

  const recentListings = [
    { id: 1, name: 'Golden Retriever - Max', location: 'Paris, France', price: '€1,200', image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 2, name: 'Persian Cat - Luna', location: 'Lyon, France', price: '€800', image: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { id: 3, name: 'Labrador - Bella', location: 'Marseille, France', price: '€1,000', image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            {t('dashboard.buyer.welcome', { name: user?.name })}
          </h1>
          <p className="text-gray-600">
            {t('dashboard.buyer.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
              <div className="flex items-center">
                <div className={`p-3 rounded-full bg-[#A8E6CF] bg-opacity-20 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            to="/buyer/search"
            className="bg-[#A8E6CF] hover:bg-[#70C1B3] p-6 rounded-lg text-center transition-colors group"
          >
            <Search className="w-12 h-12 text-black mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-black mb-2">{t('dashboard.buyer.searchAnimals')}</h3>
            <p className="text-black text-opacity-80 text-sm">
              {t('dashboard.buyer.searchAnimalsDesc')}
            </p>
          </Link>

          <Link
            to="/buyer/favorites"
            className="bg-white hover:bg-[#A8E6CF] hover:bg-opacity-20 p-6 rounded-lg text-center border-2 border-[#A8E6CF] transition-colors group"
          >
            <Heart className="w-12 h-12 text-black mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-black mb-2">{t('dashboard.buyer.myFavorites')}</h3>
            <p className="text-gray-600 text-sm">
              {t('dashboard.buyer.myFavoritesDesc')}
            </p>
          </Link>

          <Link
            to="/messaging"
            className="bg-white hover:bg-[#A8E6CF] hover:bg-opacity-20 p-6 rounded-lg text-center border-2 border-[#A8E6CF] transition-colors group"
          >
            <MessageSquare className="w-12 h-12 text-black mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-black mb-2">{t('dashboard.buyer.messaging')}</h3>
            <p className="text-gray-600 text-sm">
              {t('dashboard.buyer.messagingDesc')}
            </p>
          </Link>
        </div>

        {/* Recent Listings */}
        <div className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">{t('dashboard.buyer.newListings')}</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentListings.map((listing) => (
                <div key={listing.id} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-[#A8E6CF] transition-colors">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-black mb-2">{listing.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {listing.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-[#70C1B3]">{listing.price}</span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="bg-[#A8E6CF] text-black px-3 py-1 rounded text-sm hover:bg-[#70C1B3] transition-colors flex items-center">
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          {t('dashboard.buyer.reserve')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;