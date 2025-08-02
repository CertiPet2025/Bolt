import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Plus, List, Users, MessageSquare, TrendingUp, Eye, CheckCircle, DollarSign, Crown, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BreederDashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  // Mock subscription data - in real app this would come from API
  const subscription = user?.subscription || {
    planId: 'free' as const,
    status: 'active' as const,
    currentPeriodEnd: '2024-02-01T00:00:00Z'
  };

  const isProPlan = subscription.planId === 'pro';
  const maxListings = isProPlan ? 'unlimited' : 2;
  const currentListings = 12; // Mock data

  const stats = [
    { label: t('dashboard.breeder.activeListings'), value: '12', icon: List, color: 'text-blue-600' },
    { label: t('dashboard.breeder.totalViews'), value: '1,234', icon: Eye, color: 'text-green-600' },
    { label: t('dashboard.breeder.interestedBuyers'), value: '45', icon: Users, color: 'text-purple-600' },
    { label: t('dashboard.breeder.messages'), value: '8', icon: MessageSquare, color: 'text-orange-600' },
  ];

  // Mock commission data - in real app this would come from API
  const commissionData = {
    totalEarnings: 15600,
    totalCommissions: 780,
    netEarnings: 14820,
    recentTransactions: [
      { id: 1, animal: 'Luna - Golden Retriever', amount: 1200, commission: 60, date: '2024-01-15' },
      { id: 2, animal: 'Max - German Shepherd', amount: 1400, commission: 70, date: '2024-01-12' },
      { id: 3, animal: 'Bella - Labrador', amount: 1000, commission: 50, date: '2024-01-10' },
    ]
  };

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

        {/* Subscription Status */}
        <div className="mb-8">
          <div className={`p-6 rounded-lg border-2 shadow-sm ${
            isProPlan 
              ? 'border-[#A8E6CF] bg-gradient-to-r from-[#A8E6CF]/10 to-white' 
              : 'border-gray-200 bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {isProPlan ? (
                  <Crown className="w-6 h-6 text-[#70C1B3] mr-3" />
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full mr-3" />
                )}
                <div>
                  <h3 className="text-lg font-bold text-black">
                    {t(`subscription.plans.${subscription.planId}.name`)}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isProPlan 
                      ? t('subscription.nextBilling') + ': ' + new Date(subscription.currentPeriodEnd).toLocaleDateString()
                      : t('subscription.features.maxListings', { count: maxListings })
                    }
                  </p>
                </div>
              </div>
              
              <Link
                to="/breeder/subscription"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isProPlan
                    ? 'bg-white border-2 border-[#A8E6CF] text-black hover:bg-[#A8E6CF]'
                    : 'bg-[#A8E6CF] text-black hover:bg-[#70C1B3]'
                }`}
              >
                {isProPlan ? t('subscription.manage') : t('subscription.upgrade')}
              </Link>
            </div>
            
            {!isProPlan && currentListings >= 2 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-yellow-800 text-sm font-medium">
                    {t('subscription.alerts.limitReached')}
                  </p>
                </div>
                <p className="text-yellow-700 text-sm mt-1">
                  {t('subscription.actions.upgradeToPro')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Commission Summary */}
        <div className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-[#70C1B3]" />
              Résumé des Commissions
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{commissionData.totalEarnings.toLocaleString()} €</div>
                <div className="text-gray-600 text-sm">Ventes Totales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">-{commissionData.totalCommissions.toLocaleString()} €</div>
                <div className="text-gray-600 text-sm">Commissions CertiPet (5%)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{commissionData.netEarnings.toLocaleString()} €</div>
                <div className="text-gray-600 text-sm">Revenus Nets</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-black">Transactions Récentes</h3>
              {commissionData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-black">{transaction.animal}</p>
                    <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">{transaction.amount.toLocaleString()} €</p>
                    <p className="text-sm text-red-600">Commission: -{transaction.commission} €</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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