import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Phone, Mail, Calendar, User, Heart } from 'lucide-react';

const MyBuyers: React.FC = () => {
  const { t } = useTranslation();
  const [buyers] = useState([
    {
      id: 1,
      name: 'Sarah Martinez',
      email: 'sarah.martinez@email.com',
      phone: '+33 6 12 34 56 78',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      interestedAnimal: 'Luna - Golden Retriever',
      inquiryDate: '2024-01-15',
      status: 'active',
      lastContact: '2 hours ago',
      messages: 8,
    },
    {
      id: 2,
      name: 'Thomas Dubois',
      email: 'thomas.dubois@email.com',
      phone: '+33 6 98 76 54 32',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      interestedAnimal: 'Max - German Shepherd',
      inquiryDate: '2024-01-12',
      status: 'pending',
      lastContact: '1 day ago',
      messages: 5,
    },
    {
      id: 3,
      name: 'Emma Laurent',
      email: 'emma.laurent@email.com',
      phone: '+33 6 45 67 89 12',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      interestedAnimal: 'Bella - Labrador',
      inquiryDate: '2024-01-10',
      status: 'completed',
      lastContact: '3 days ago',
      messages: 12,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active Inquiry';
      case 'pending':
        return 'Pending Response';
      case 'completed':
        return 'Sale Completed';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">{t('myBuyers.title')}</h1>
          <p className="text-gray-600">{t('myBuyers.subtitle')}</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-green-600">{buyers.filter(b => b.status === 'active').length}</div>
            <div className="text-gray-600 text-sm">{t('myBuyers.activeInquiries')}</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{buyers.filter(b => b.status === 'pending').length}</div>
            <div className="text-gray-600 text-sm">{t('myBuyers.pendingResponses')}</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{buyers.filter(b => b.status === 'completed').length}</div>
            <div className="text-gray-600 text-sm">{t('myBuyers.completedSales')}</div>
          </div>
        </div>

        {/* Buyers List */}
        <div className="space-y-6">
          {buyers.map((buyer) => (
            <div key={buyer.id} className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={buyer.avatar}
                    alt={buyer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-black">{buyer.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Heart className="w-4 h-4 mr-1" />
                      {t('myBuyers.interestedIn', { animal: buyer.interestedAnimal })}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {t('myBuyers.inquiryDate', { date: new Date(buyer.inquiryDate).toLocaleDateString() })}
                    </div>
                  </div>
                </div>
                
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(buyer.status)}`}>
                  {getStatusText(buyer.status)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  <span className="text-sm">{buyer.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm">{buyer.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span className="text-sm">{t('myBuyers.messagesCount', { count: buyer.messages })}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {t('myBuyers.lastContact', { time: buyer.lastContact })}
                </span>
                <div className="flex space-x-3">
                  <button className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors text-sm font-medium flex items-center">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    {t('myBuyers.message')}
                  </button>
                  <button className="border-2 border-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#A8E6CF] hover:bg-opacity-20 transition-colors text-sm font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {t('myBuyers.call')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {buyers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#A8E6CF] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-[#70C1B3]" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">{t('myBuyers.noBuyers')}</h3>
            <p className="text-gray-600 mb-6">{t('myBuyers.noBuyersDesc')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBuyers;