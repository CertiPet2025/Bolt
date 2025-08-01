import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, List, Users, MessageSquare, TrendingUp, Eye, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BreederDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    { label: t('dashboard.breeder.activeListings'), value: '12', icon: List, color: 'text-blue-600' },
    { label: t('dashboard.breeder.totalViews'), value: '1,234', icon: Eye, color: 'text-green-600' },
    { label: t('dashboard.breeder.interestedBuyers'), value: '45', icon: Users, color: 'text-purple-600' },
    { label: t('dashboard.breeder.messages'), value: '8', icon: MessageSquare, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            {t('dashboard.breeder.welcome', { name: user?.name })}
          </h1>
          <p className="text-gray-600">
            {t('dashboard.breeder.subtitle')}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            to="/breeder/post-animal"
            className="bg-[#A8E6CF] hover:bg-[#70C1B3] p-6 rounded-lg text-center transition-colors group"
          >
            <Plus className="w-12 h-12 text-black mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-black mb-2">{t('dashboard.breeder.postAnimal')}</h3>
            <p className="text-black text-opacity-80 text-sm">
              {t('dashboard.breeder.postAnimalDesc')}
            </p>
          </Link>

          <Link
            to="/breeder/listings"
            className="bg-white hover:bg-[#A8E6CF] hover:bg-opacity-20 p-6 rounded-lg text-center border-2 border-[#A8E6CF] transition-colors group"
          >
            <List className="w-12 h-12 text-black mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-black mb-2">{t('dashboard.breeder.myListings')}</h3>
            <p className="text-gray-600 text-sm">
              {t('dashboard.breeder.myListingsDesc')}
            </p>
          </Link>

          <Link
            to="/breeder/buyers"
            className="bg-white hover:bg-[#A8E6CF] hover:bg-opacity-20 p-6 rounded-lg text-center border-2 border-[#A8E6CF] transition-colors group"
          >
            <Users className="w-12 h-12 text-black mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-black mb-2">{t('dashboard.breeder.myBuyers')}</h3>
            <p className="text-gray-600 text-sm">
              {t('dashboard.breeder.myBuyersDesc')}
            </p>
          </Link>

          <Link
            to="/messaging"
            className="bg-white hover:bg-[#A8E6CF] hover:bg-opacity-20 p-6 rounded-lg text-center border-2 border-[#A8E6CF] transition-colors group"
          >
            <MessageSquare className="w-12 h-12 text-black mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold text-black mb-2">{t('dashboard.breeder.messaging')}</h3>
            <p className="text-gray-600 text-sm">
              {t('dashboard.breeder.messagingDesc')}
            </p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">{t('dashboard.breeder.recentActivity')}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#A8E6CF] rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-black font-medium">{t('dashboard.breeder.newView', { animal: 'Golden Retriever - Luna' })}</p>
                  <p className="text-gray-600 text-sm">{t('dashboard.breeder.hoursAgo', { hours: 2 })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#A8E6CF] rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-black font-medium">{t('dashboard.breeder.newMessage', { name: 'Sarah M.' })}</p>
                  <p className="text-gray-600 text-sm">{t('dashboard.breeder.hoursAgo', { hours: 4 })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-[#A8E6CF] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="text-black font-medium">{t('dashboard.breeder.newReservation')}</p>
                  <p className="text-gray-600 text-sm">{t('dashboard.breeder.dayAgo', { days: 1 })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreederDashboard;