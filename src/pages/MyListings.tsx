import React, { useState } from 'react';
import { Edit, Trash2, Eye, MessageSquare, Euro, MapPin } from 'lucide-react';

const MyListings: React.FC = () => {
  const [listings] = useState([
    {
      id: 1,
      name: 'Luna',
      breed: 'Golden Retriever',
      age: '8 weeks',
      price: 1200,
      location: 'Paris, France',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'active',
      views: 145,
      inquiries: 8,
      dateCreated: '2024-01-15',
      availabilityConfirmed: true,
    },
    {
      id: 2,
      name: 'Max',
      breed: 'German Shepherd',
      age: '12 weeks',
      price: 1400,
      location: 'Lyon, France',
      image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'pending',
      views: 98,
      inquiries: 5,
      dateCreated: '2024-01-10',
      availabilityConfirmed: false,
    },
    {
      id: 3,
      name: 'Bella',
      breed: 'Labrador',
      age: '10 weeks',
      price: 1000,
      location: 'Marseille, France',
      image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300',
      status: 'sold',
      views: 234,
      inquiries: 12,
      dateCreated: '2024-01-05',
      availabilityConfirmed: true,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'pending':
        return 'Under Review';
      case 'sold':
        return 'Sold';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">My Listings</h1>
          <p className="text-gray-600">Manage your animal listings</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-black">{listings.length}</div>
            <div className="text-gray-600 text-sm">Total Listings</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-green-600">{listings.filter(l => l.status === 'active').length}</div>
            <div className="text-gray-600 text-sm">Active</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">{listings.filter(l => l.status === 'pending').length}</div>
            <div className="text-gray-600 text-sm">Under Review</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-gray-600">{listings.filter(l => l.status === 'sold').length}</div>
            <div className="text-gray-600 text-sm">Sold</div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-lg border-2 border-[#A8E6CF] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-black">All Listings</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Animal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inquiries
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-16 w-16 rounded-lg object-cover"
                          src={listing.image}
                          alt={listing.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-black">{listing.name}</div>
                          <div className="text-sm text-gray-600">{listing.breed} • {listing.age}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {listing.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(listing.status)}`}>
                        {getStatusText(listing.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-medium text-black">
                        <Euro className="w-4 h-4 mr-1" />
                        {listing.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Eye className="w-4 h-4 mr-1" />
                        {listing.views}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        {listing.inquiries}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {!listing.availabilityConfirmed && listing.status === 'active' && (
                          <button className="bg-[#A8E6CF] text-black px-3 py-1 rounded text-xs hover:bg-[#70C1B3] transition-colors">
                            Confirmer Disponibilité
                          </button>
                        )}
                        <button className="text-[#70C1B3] hover:text-[#A8E6CF] transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State (when no listings) */}
        {listings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#A8E6CF] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <List className="w-8 h-8 text-[#70C1B3]" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-6">Start by creating your first animal listing</p>
            <button className="bg-[#A8E6CF] text-black px-6 py-3 rounded-lg hover:bg-[#70C1B3] transition-colors">
              Create First Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;