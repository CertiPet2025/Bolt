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
import CGV from './pages/CGV';
import Charter from './pages/Charter';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
            <Route path="/breeder/dashboard" element={
              <ProtectedRoute requiredRole="breeder">
                <BreederDashboard />
              </ProtectedRoute>
            } />
            <Route path="/breeder/post-animal" element={
              <ProtectedRoute requiredRole="breeder">
                <PostAnimal />
              </ProtectedRoute>
            } />
            <Route path="/breeder/listings" element={
              <ProtectedRoute requiredRole="breeder">
                <MyListings />
              </ProtectedRoute>
            } />
            <Route path="/breeder/buyers" element={
              <ProtectedRoute requiredRole="breeder">
                <MyBuyers />
              </ProtectedRoute>
            } />
            <Route path="/buyer/dashboard" element={
              <ProtectedRoute requiredRole="buyer">
                <BuyerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/buyer/search" element={
              <ProtectedRoute requiredRole="buyer">
                <SearchAnimals />
              </ProtectedRoute>
            } />
            <Route path="/buyer/favorites" element={
              <ProtectedRoute requiredRole="buyer">
                <MyFavorites />
              </ProtectedRoute>
            } />
            <Route path="/animal/:id/reserve" element={<AnimalReservation />} />
            <Route path="/messaging" element={
              <ProtectedRoute allowedRoles={['breeder', 'buyer']}>
                <Messaging />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/charter" element={<Charter />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
          <Footer />
          <HelpBot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;