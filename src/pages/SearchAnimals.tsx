import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Heart, Star, Euro } from 'lucide-react';

const SearchAnimals: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    animalType: '',
    breed: '',
    ageRange: '',
    location: '',
    priceRange: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const mockAnimals = [
    {
      id: 1,
      name: 'Luna',
      breed: 'Golden Retriever',
      age: '8 weeks',
      price: 1200,
      location: 'Paris, France',
      breeder: 'Sunshine Kennels',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      vaccinated: true,
      healthCertificate: true,
      rating: 4.8,
      status: 'available',
      availabilityConfirmed: true,
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
      vaccinated: true,
      healthCertificate: true,
      rating: 4.9,
      status: 'available',
      availabilityConfirmed: true,
      status: 'available',
      availabilityConfirmed: true,
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
      vaccinated: true,
      healthCertificate: true,
      rating: 4.7,
      status: 'available',
      availabilityConfirmed: false,
      status: 'available',
      availabilityConfirmed: false,
    },
    {
      id: 4,
      name: 'Whiskers',
      breed: 'Maine Coon',
      age: '16 weeks',
      price: 1500,
      location: 'Nice, France',
      breeder: 'Royal Cats',
      image: 'https://images.pexels.com/photos/416160/pexels-photo-416160.jpeg?auto=compress&cs=tinysrgb&w=400',
      vaccinated: true,
      healthCertificate: true,
      rating: 5.0,
      status: 'available',
      availabilityConfirmed: true,
      status: 'available',
      availabilityConfirmed: true,
    },
    {
      id: 5,
      name: 'Max',
      breed: 'German Shepherd',
      age: '12 weeks',
      price: 1400,
      location: 'Toulouse, France',
      breeder: 'Guardian Dogs',
      image: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=400',
      vaccinated: true,
      healthCertificate: true,
      rating: 4.6,
      status: 'available',
      availabilityConfirmed: true,
      status: 'available',
      availabilityConfirmed: true,
    },
    {
      id: 6,
      name: 'Oliver',
      breed: 'British Shorthair',
      age: '14 weeks',
      price: 900,
      location: 'Bordeaux, France',
      breeder: 'Premier Cats',
      image: 'https://images.pexels.com/photos/156934/pexels-photo-156934.jpeg?auto=compress&cs=tinysrgb&w=400',
      vaccinated: true,
      healthCertificate: true,
      rating: 4.8,
      status: 'available',
      availabilityConfirmed: true,
      status: 'available',
      availabilityConfirmed: true,
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const AnimalCard: React.FC<{ animal: typeof mockAnimals[0] }> = ({ animal }) => (
    <div className="bg-white rounded-lg border-2 border-gray-200 hover:border-[#A8E6CF] transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
        </button>
        {animal.vaccinated && (
          <div className="absolute top-3 left-3 bg-[#A8E6CF] text-black px-2 py-1 rounded-full text-xs font-medium">
            Vaccinated
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-black">{animal.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{animal.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{animal.breed} • {animal.age}</p>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {animal.location}
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          By {animal.breeder}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Euro className="w-4 h-4 text-[#70C1B3]" />
            <span className="text-lg font-bold text-[#70C1B3]">{animal.price}</span>
          </div>
          <button
            onClick={() => navigate(`/animal/${animal.id}/reserve`)}
            disabled={!animal.availabilityConfirmed}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              animal.availabilityConfirmed 
                ? 'bg-[#A8E6CF] text-black hover:bg-[#70C1B3]' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {animal.availabilityConfirmed ? 'Réserver' : 'En attente de confirmation'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Search Animals</h1>
          <p className="text-gray-600">Find your perfect companion from certified breeders</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by breed, name, or location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 text-gray-600 hover:text-[#70C1B3] transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white border-2 border-[#A8E6CF] rounded-lg">
            <h3 className="text-lg font-semibold text-black mb-4">Filter Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Animal Type</label>
                <select
                  value={filters.animalType}
                  onChange={(e) => handleFilterChange('animalType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                >
                  <option value="">All</option>
                  <option value="dog">Dogs</option>
                  <option value="cat">Cats</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Breed</label>
                <input
                  type="text"
                  value={filters.breed}
                  onChange={(e) => handleFilterChange('breed', e.target.value)}
                  placeholder="Enter breed"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Age Range</label>
                <select
                  value={filters.ageRange}
                  onChange={(e) => handleFilterChange('ageRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                >
                  <option value="">All Ages</option>
                  <option value="puppy">Puppy/Kitten (0-6 months)</option>
                  <option value="young">Young (6-18 months)</option>
                  <option value="adult">Adult (18+ months)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="City or region"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]"
                >
                  <option value="">All Prices</option>
                  <option value="0-500">€0 - €500</option>
                  <option value="500-1000">€500 - €1,000</option>
                  <option value="1000-1500">€1,000 - €1,500</option>
                  <option value="1500+">€1,500+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            {mockAnimals.length} animals found
          </p>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:border-[#A8E6CF]">
            <option>Sort by: Most Recent</option>
            <option>Sort by: Price (Low to High)</option>
            <option>Sort by: Price (High to Low)</option>
            <option>Sort by: Rating</option>
          </select>
        </div>

        {/* Animal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAnimals.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-[#A8E6CF] text-black px-8 py-3 rounded-lg hover:bg-[#70C1B3] transition-colors font-medium">
            Load More Animals
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAnimals;