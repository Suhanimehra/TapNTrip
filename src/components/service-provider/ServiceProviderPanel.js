import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import HotelDashboard from './Dashboard/HotelDashboard';
import TransportDashboard from './Dashboard/TransportDashboard';
import TravelGuideDashboard from './Dashboard/TravelGuideDashboard.jsx';
import HotelProfile from './Profile/HotelProfile';
import TransportProfile from './Profile/TransportProfile';
import GuideProfile from './Profile/GuideProfile';
import Settings from './Settings/Settings';
import ProviderBookings from './ProviderBookings';
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import HotelServices from './Services/HotelServices';
import TransportServices from './Services/TransportServices';
import GuideServices from './Services/GuideServices';
import PackageDashboard from './Dashboard/PackageDashboard';
import PackageProfile from './Profile/PackageProfile';
import PackageServices from './Services/PackageServices';

const ServiceProviderPanel = () => {
  const navigate = useNavigate();
  const { isDarkMode, zoomLevel, increaseZoom, decreaseZoom } = useTheme();
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [providerType, setProviderType] = useState(null);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'services', label: 'My Services', icon: '🎫' },
    // Add Packages for hotel and package providers
    ...((providerType === 'hotel_provider' || providerType === 'package_provider') ? [{ id: 'packages', label: 'Packages', icon: '📦' }] : []),
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally, display an error message to the user
    }
  };

  useEffect(() => {
    async function fetchProviderType() {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          let type = data.providerType;
          if (!type && ["hotel_provider", "guide_provider", "transport_provider", "package_provider"].includes(data.role)) {
            type = data.role;
          }
          setProviderType(type);
        }
      }
    }
    fetchProviderType();
  }, [user]);

  // Render the correct dashboard/content component based on activeSection and providerType
  const renderContent = () => {
    if (!providerType) {
      return <div className="flex items-center justify-center h-screen text-xl">Loading your provider dashboard...</div>;
    }
    switch (activeSection) {
      case 'dashboard':
        switch (providerType) {
          case 'hotel_provider':
            return <HotelDashboard setActiveSection={setActiveSection} />;
          case 'transport_provider':
            return <TransportDashboard setActiveSection={setActiveSection} />;
          case 'guide_provider':
            return <TravelGuideDashboard setActiveSection={setActiveSection} />;
          case 'package_provider':
            return <PackageDashboard setActiveSection={setActiveSection} />;
          default:
            return <div className="text-center mt-10 text-red-600">Unknown provider type: {providerType}</div>;
        }
      case 'bookings':
        return <ProviderBookings />;
      case 'services':
        switch (providerType) {
          case 'hotel_provider':
            return <HotelServices />;
          case 'transport_provider':
            return <TransportServices />;
          case 'guide_provider':
            return <GuideServices />;
          case 'package_provider':
            return <PackageServices />;
          default:
            return <div className="text-center mt-10 text-red-600">Unknown provider type: {providerType}</div>;
        }
      case 'packages':
        if (providerType === 'hotel_provider') {
          return <HotelServices providerId={user?.uid} />;
        }
        if (providerType === 'package_provider') {
          return <PackageServices />;
        }
        return null;
      case 'profile':
        switch (providerType) {
          case 'hotel_provider':
            return <HotelProfile />;
          case 'transport_provider':
            return <TransportProfile />;
          case 'guide_provider':
            return <GuideProfile />;
          case 'package_provider':
            return <PackageProfile />;
          default:
            return <div className="text-center mt-10 text-red-600">Unknown provider type: {providerType}</div>;
        }
      case 'earnings':
        if (providerType === 'package_provider') {
          return (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Earnings Section</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
                This section is currently blank and can be implemented here for package providers.
              </p>
            </div>
          );
        }
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Earnings Section</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              This section is currently blank and can be implemented here.
            </p>
          </div>
        );
      case 'reviews':
        if (providerType === 'package_provider') {
          return (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Reviews Section</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
                This section is currently blank and can be implemented here for package providers.
              </p>
            </div>
          );
        }
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Reviews Section</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              This section is currently blank and can be implemented here.
            </p>
          </div>
        );
      case 'settings':
        return <Settings providerType={providerType} />;
      default:
        return <div className="text-center mt-10 text-red-600">Unknown section: {activeSection}</div>;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1a1e2e]' : 'bg-white'} text-${isDarkMode ? 'white' : 'gray-800'}`}>
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#1a1e2e] border-r border-[#2d3348] flex flex-col z-40">
        <div className="flex items-center justify-center h-20 border-b border-[#2d3348]">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">TapNTrip</span>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-semibold transition-colors ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-[#23263a] hover:text-white'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area (with header) */}
      <div className="ml-64 min-h-screen">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
          className={`bg-[#1a1e2e] border-b border-[#2d3348] sticky top-0 z-30 flex items-center justify-between px-8 h-20`}
        >
          <div /> {/* Empty for spacing, logo is in sidebar */}
          <div className="flex items-center space-x-4">
              {/* Zoom Controls */}
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={decreaseZoom}
                className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  title="Zoom Out"
                  aria-label="Decrease zoom level"
                >
                  <span className="text-xl">−</span>
                </motion.button>
                <span className="text-sm font-medium">{zoomLevel}%</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={increaseZoom}
                className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  title="Zoom In"
                  aria-label="Increase zoom level"
                >
                  <span className="text-xl">+</span>
                </motion.button>
              </div>
            {/* Profile and Logout */}
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-200">
                {user?.displayName || user?.email}
              </span>
              <img
                src={user?.photoURL || 'https://via.placeholder.com/30'}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
          </div>
        </div>
      </motion.header>
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
              {renderContent()}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default ServiceProviderPanel; 