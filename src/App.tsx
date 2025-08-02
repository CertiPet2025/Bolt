import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import BreederDashboard from './pages/BreederDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import PostAnimal from './pages/PostAnimal';
import MyListings from './pages/MyListings';
import MyBuyers from './pages/MyBuyers';
import SearchAnimals from './pages/SearchAnimals';
import MyFavorites from './pages/MyFavorites';
import Messaging from './pages/Messaging';
import Contact from './pages/Contact';
// import About from './pages/About';
import AnimalReservation from './pages/AnimalReservation';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import HelpBot from './components/HelpBot';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/:type" element={<Auth />} />
            <Route path="/breeder/dashboard" element={<BreederDashboard />} />
            <Route path="/breeder/post-animal" element={<PostAnimal />} />
            <Route path="/breeder/listings" element={<MyListings />} />
            <Route path="/breeder/buyers" element={<MyBuyers />} />
            <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
            <Route path="/buyer/search" element={<SearchAnimals />} />
            <Route path="/buyer/favorites" element={<MyFavorites />} />
            <Route path="/animal/:id/reserve" element={<AnimalReservation />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
          <HelpBot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;