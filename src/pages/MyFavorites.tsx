import React, { useState } from 'react';
import { Heart, MapPin, Star, Euro, MessageSquare, Trash2 } from 'lucide-react';

const MyFavorites: React.FC = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: 'Luna',
      breed: 'Golden Retriever',
      age: '8 weeks',
      price: 1200,
      location: 'Paris, France',
      breeder: 'Sunshine Kennels',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.8,
      dateAdded: '2024-01-15',
      available: true,
    },
    {
      id: 2,
      name: 'Milo',
      breed: 'Persian Cat',
      age: '12 weeks',
      price: 800,
      location: 'Lyon, France',
      breeder: 'Elite Cattery',
      image: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.9,
      dateAdded: '2024-01-12',
      available: true,
    },
    {
      id: 3,
      name: 'Bella',
      breed: 'Labrador',
      age: '10 weeks',
      price: 1000,
      location: 'Marseille, France',
      breeder: 'Happy Tails',
      image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400',
      rating: 4.7,
      dateAdded: '2024-01-10',
      available: false,
    },
  ]);

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const FavoriteCard: React.FC<{ favorite: typeof favorites[0] }> = ({ favorite }) => (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-[#A8E6CF] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={favorite.image}
          alt={favorite.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => removeFavorite(favorite.id)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        </button>
        {!favorite.available && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            No Longer Available
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-black">{favorite.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{favorite.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{favorite.breed} • {favorite.age}</p>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {favorite.location}
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          By {favorite.breeder} • Added {new Date(favorite.dateAdded).toLocaleDateString()}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Euro className="w-4 h-4 text-[#70C1B3]" />
            <span className="text-lg font-bold text-[#70C1B3]">{favorite.price.toLocaleString()}</span>
          </div>
          <div className="flex space-x-2">
            <button className="text-[#70C1B3] hover:text-[#A8E6CF] transition-colors p-2">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => removeFavorite(favorite.id)}
              className="text-red-600 hover:text-red-500 transition-colors p-2"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {favorite.available && (
          <button className="w-full mt-3 bg-[#A8E6CF] text-black py-2 rounded-md hover:bg-[#70C1B3] transition-colors font-medium">
            Contact Breeder
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">My Favorites</h1>
          <p className="text-gray-600">Animals you've saved for later</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-black">{favorites.length}</div>
            <div className="text-gray-600 text-sm">Total Favorites</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-green-600">{favorites.filter(f => f.available).length}</div>
            <div className="text-gray-600 text-sm">Still Available</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-[#A8E6CF] shadow-sm">
            <div className="text-2xl font-bold text-red-600">{favorites.filter(f => !f.available).length}</div>
            <div className="text-gray-600 text-sm">No Longer Available</div>
          </div>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <FavoriteCard key={favorite.id} favorite={favorite} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#A8E6CF] bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-[#70C1B3]" />
            </div>
            <h3 className="text-lg font-medium text-black mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">Start browsing animals and save your favorites here</p>
            <button className="bg-[#A8E6CF] text-black px-6 py-3 rounded-lg hover:bg-[#70C1B3] transition-colors">
              Browse Animals
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;