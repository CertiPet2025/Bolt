import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, FileText, Eye, Download, Calendar } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock admin commission data - in real app this would come from API
  const commissionData = {
    totalCommissions: 2340,
    monthlyCommissions: 780,
    totalTransactions: 156,
    activeUsers: 89,
    recentCommissions: [
      { 
        id: 'TXN-001', 
        breeder: 'Marie Dubois', 
        buyer: 'Jean Martin', 
        animal: 'Luna - Golden Retriever', 
        amount: 1200, 
        commission: 60, 
        date: '2024-01-15',
        status: 'completed'
      },
      { 
        id: 'TXN-002', 
        breeder: 'Pierre Laurent', 
        buyer: 'Sophie Durand', 
        animal: 'Max - German Shepherd', 
        amount: 1400, 
        commission: 70, 
        date: '2024-01-12',
        status: 'completed'
      },
      { 
        id: 'TXN-003', 
        breeder: 'Claire Martin', 
        buyer: 'Thomas Petit', 
        animal: 'Bella - Labrador', 
        amount: 1000, 
        commission: 50, 
        date: '2024-01-10',
        status: 'completed'
      },
      { 
        id: 'TXN-004', 
        breeder: 'Antoine Moreau', 
        buyer: 'Emma Rousseau', 
        animal: 'Oliver - British Shorthair', 
        amount: 900, 
        commission: 45, 
        date: '2024-01-08',
        status: 'completed'
      },
      { 
        id: 'TXN-005', 
        breeder: 'Isabelle Blanc', 
        buyer: 'Nicolas Roux', 
        animal: 'Whiskers - Maine Coon', 
        amount: 1500, 
        commission: 75, 
        date: '2024-01-05',
        status: 'completed'
      },
    ]
  };

  const stats = [
    { 
      label: 'Commissions Totales', 
      value: `${commissionData.totalCommissions.toLocaleString()} €`, 
      icon: DollarSign, 
      color: 'text-green-600',
      change: '+12.5%'
    },
    { 
      label: 'Commissions ce Mois', 
      value: `${commissionData.monthlyCommissions.toLocaleString()} €`, 
      icon: TrendingUp, 
      color: 'text-blue-600',
      change: '+8.2%'
    },
    { 
      label: 'Transactions Totales', 
      value: commissionData.totalTransactions.toString(), 
      icon: FileText, 
      color: 'text-purple-600',
      change: '+15.3%'
    },
    { 
      label: 'Utilisateurs Actifs', 
      value: commissionData.activeUsers.toString(), 
      icon: Users, 
      color: 'text-orange-600',
      change: '+5.7%'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportCommissions = () => {
    // In real app, this would generate and download a CSV/Excel file
    console.log('Exporting commission data...', commissionData.recentCommissions);
    alert('Export des commissions en cours... (fonctionnalité simulée)');
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Tableau de Bord Administrateur</h1>
          <p className="text-gray-600">Gestion des commissions et transactions CertiPet</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-green-600 text-xs mt-1">{stat.change} vs mois dernier</p>
                </div>
                <div className={`p-3 rounded-full bg-[#A8E6CF] bg-opacity-20 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commission Overview */}
        <div className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-black">Aperçu des Commissions</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                >
                  <option value="week">Cette Semaine</option>
                  <option value="month">Ce Mois</option>
                  <option value="quarter">Ce Trimestre</option>
                  <option value="year">Cette Année</option>
                </select>
                <button
                  onClick={exportCommissions}
                  className="bg-[#A8E6CF] text-black px-4 py-2 rounded-md hover:bg-[#70C1B3] transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">5%</div>
                <div className="text-gray-600 text-sm">Taux de Commission</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{(commissionData.totalCommissions / commissionData.totalTransactions).toFixed(0)} €</div>
                <div className="text-gray-600 text-sm">Commission Moyenne</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">{((commissionData.totalCommissions / (commissionData.totalCommissions * 20)) * 100).toFixed(1)}%</div>
                <div className="text-gray-600 text-sm">Marge Bénéficiaire</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">Transactions Récentes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Éleveur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acheteur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Animal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commission
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commissionData.recentCommissions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-black">{transaction.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{transaction.breeder}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{transaction.buyer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{transaction.animal}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-black">{transaction.amount.toLocaleString()} €</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">+{transaction.commission} €</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status === 'completed' ? 'Terminé' : transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;