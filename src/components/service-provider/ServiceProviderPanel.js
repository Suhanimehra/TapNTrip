<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
<<<<<<< HEAD
import HotelDashboard from './Dashboard/HotelDashboard';
import TransportDashboard from './Dashboard/TransportDashboard';
import TravelGuideDashboard from './Dashboard/TravelGuideDashboard.jsx';
=======
import './Dashboard/Dashboard.css';
import HotelDashboard from './Dashboard/HotelDashboard';
import TransportDashboard from './Dashboard/TransportDashboard';
import TravelGuideDashboard from './Dashboard/TravelGuideDashboard';
import AddService from './Dashboard/AddService';
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
import HotelProfile from './Profile/HotelProfile';
import TransportProfile from './Profile/TransportProfile';
import GuideProfile from './Profile/GuideProfile';
import Settings from './Settings/Settings';
<<<<<<< HEAD
=======
import Reviews from './Dashboard/Reviews';
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
import HotelBookings from './Bookings/HotelBookings';
import TransportBookings from './Bookings/TransportBookings';
import GuideBookings from './Bookings/GuideBookings';
import HotelServices from './Services/HotelServices';
import TransportServices from './Services/TransportServices';
import GuideServices from './Services/GuideServices';
<<<<<<< HEAD
import ProviderBookings from './ProviderBookings';
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { HotelPackages } from './Services/HotelServices';
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47

const ServiceProviderPanel = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme, zoomLevel, increaseZoom, decreaseZoom, resetZoom } = useTheme();
<<<<<<< HEAD
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [providerType, setProviderType] = useState(null);
=======
  const [activeSection, setActiveSection] = useState('dashboard');
  const [providerType, setProviderType] = useState('hotel');
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
  const [earnings] = useState({
    total: 25000,
    pending: 5000,
    lastMonth: 12000,
  });

  const [recentBookings] = useState([
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      service: 'City Tour Package',
      date: '2024-03-15',
      amount: 1500,
      status: 'pending',
    },
    {
      id: 2,
      customerName: 'Priya Singh',
      service: 'Heritage Walk',
      date: '2024-03-14',
      amount: 800,
      status: 'confirmed',
    },
  ]);

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'services', label: 'My Services', icon: '🎫' },
<<<<<<< HEAD
    // Add Packages for hotel providers only
    ...(providerType === 'hotel_provider' ? [{ id: 'packages', label: 'Packages', icon: '📦' }] : []),
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      x: 5,
      transition: { duration: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  // Apply zoom level to main content
  const contentStyle = {
    zoom: `${zoomLevel}%`,
  };

<<<<<<< HEAD
  useEffect(() => {
    async function fetchProviderType() {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          let type = data.providerType;
          if (!type && ["hotel_provider", "guide_provider", "transport_provider"].includes(data.role)) {
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
          default:
            return <div className="text-center mt-10 text-red-600">Unknown provider type: {providerType}</div>;
        }
      case 'packages':
        if (providerType === 'hotel_provider') {
          return <HotelPackages providerId={user?.uid} />;
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
          default:
            return <div className="text-center mt-10 text-red-600">Unknown provider type: {providerType}</div>;
=======
  // Render the correct dashboard/content component based on activeSection and providerType
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        switch (providerType) {
          case 'hotel':
            return <HotelDashboard />;
          case 'transport':
            return <TransportDashboard />;
          case 'guide':
            return <TravelGuideDashboard />;
          default:
            return <HotelDashboard />;
        }
      case 'bookings':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Bookings Section</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              This section is currently blank and can be implemented here.
            </p>
          </div>
        );
      case 'services':
        switch (providerType) {
          case 'hotel':
            return <HotelServices />;
          case 'transport':
            return <TransportServices />;
          case 'guide':
            return <GuideServices />;
          default:
            return <HotelServices />;
        }
      case 'profile':
        switch (providerType) {
          case 'hotel':
            return <HotelProfile />;
          case 'transport':
            return <TransportProfile />;
          case 'guide':
            return <GuideProfile />;
          default:
            return <HotelProfile />;
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
        }
      case 'earnings':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Earnings Section</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              This section is currently blank and can be implemented here.
            </p>
          </div>
        );
      case 'reviews':
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
<<<<<<< HEAD
        return <div className="text-center mt-10 text-red-600">Unknown section: {activeSection}</div>;
=======
        return <HotelDashboard />;
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#1a1e2e]' : 'bg-white'} text-${isDarkMode ? 'white' : 'gray-800'}`}>
<<<<<<< HEAD
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
=======
      {/* Header */}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
<<<<<<< HEAD
          className={`bg-[#1a1e2e] border-b border-[#2d3348] sticky top-0 z-30 flex items-center justify-between px-8 h-20`}
        >
          <div /> {/* Empty for spacing, logo is in sidebar */}
          <div className="flex items-center space-x-4">
              {/* Zoom Controls */}
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-1">
=======
        className={`${
          isDarkMode 
            ? 'bg-[#1a1e2e] border-[#2d3348]' 
            : 'bg-white/70 hover:bg-white border-white/20'
        } border-b sticky top-0 z-50 shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex w-full">
            <div className="w-[280px] px-4 py-3">
              <motion.h1 
                whileHover={{ scale: 1.05 }}
                className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text"
              >
                TapNTrip
              </motion.h1>
            </div>
            
            <div className="flex items-center space-x-4 ml-auto">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-2 mr-4 bg-white/20 backdrop-blur-sm rounded-lg p-1">
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={decreaseZoom}
<<<<<<< HEAD
                className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
=======
                  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
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
<<<<<<< HEAD
                className="p-2 rounded-lg hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
=======
                  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                  title="Zoom In"
                  aria-label="Increase zoom level"
                >
                  <span className="text-xl">+</span>
                </motion.button>
<<<<<<< HEAD
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
=======
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetZoom}
                  className={`text-sm px-2 py-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  title="Reset Zoom"
                  aria-label="Reset zoom level to default"
                >
                  Reset
                </motion.button>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#1a1e2e] hover:bg-[#2d3348]' : 'bg-blue-50 hover:bg-blue-100'} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? '🌞' : '🌙'}
              </motion.button>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                aria-label="Logout from your account"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex" style={contentStyle}>
        {/* Left Sidebar Navigation */}
        <motion.nav 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 ${
            isDarkMode 
              ? 'bg-[#1f2937] border-r border-[#2d3348]' 
              : 'bg-white/70 hover:bg-white border-r border-white/20'
          } p-4 overflow-y-auto transition-all duration-300 hover:shadow-xl`} 
          aria-label="Main navigation"
        >
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <motion.li key={item.id} variants={itemVariants}>
                <motion.button
                  onClick={() => setActiveSection(item.id)}
                  whileHover="hover"
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? isDarkMode 
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-[#2d3348] hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <motion.span 
                    className="text-xl" 
                    role="img" 
                    aria-hidden="true"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.label}</span>
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Main Content Area */}
        <main className="ml-64 flex-1 p-8 transition-all duration-300" role="main">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              variants={containerVariants}
              className="space-y-6"
            >
              {/* Header with Provider Type Selector */}
              <motion.header 
                variants={cardVariants}
                className="flex justify-between items-center mb-8"
              >
                <div className="transform transition-transform duration-300 hover:scale-105">
                  <h1 className="text-2xl font-bold" id="page-title">
                    {navigationItems.find(item => item.id === activeSection)?.label}
                  </h1>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Welcome back, Service Provider
                  </p>
                </div>
                
                {/* Provider Type Selector */}
                <div className="flex items-center space-x-4">
                  <select
                    value={providerType}
                    onChange={(e) => setProviderType(e.target.value)}
                    className={`px-4 py-2 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                    aria-label="Select provider type"
                  >
                    <option value="hotel">Hotel Provider</option>
                    <option value="transport">Transport Provider</option>
                    <option value="guide">Tour Guide</option>
                  </select>
                </div>
              </motion.header>

              {/* Render the correct dashboard/content component */}
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg ${
          isDarkMode 
            ? 'bg-[#1f2937] border border-[#2d3348] text-white' 
            : 'bg-white text-gray-800 hover:bg-gray-50'
        } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
        aria-label="Scroll to top"
      >
        ⬆️
      </motion.button>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
    </div>
  );
};

export default ServiceProviderPanel; 