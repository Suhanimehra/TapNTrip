import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiLogOut, FiMenu } from 'react-icons/fi';
import { MdDashboard, MdPerson, MdSettings, MdHotel, MdDirectionsCar } from 'react-icons/md';
import { BiBookContent } from 'react-icons/bi';
import { AiOutlineShop } from 'react-icons/ai';
import { FaRoute } from 'react-icons/fa';
import { auth } from '../../../firebase-config';
import { signOut } from 'firebase/auth';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Profile from './Profile';
import Settings from './Settings';

const Layout = ({ children, selectedProvider, onProviderChange, activeTab, onTabChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const providerOptions = ['Hotel Provider', 'Travel Guide', 'Transport Provider'];

  // Define sidebar items based on provider type
  const getSidebarItems = () => {
    const commonItems = [
      { 
        name: 'Dashboard', 
        icon: <MdDashboard className="w-6 h-6" />,
        onClick: () => onTabChange('dashboard')
      },
      { 
        name: 'Profile', 
        icon: <MdPerson className="w-6 h-6" />,
        onClick: () => onTabChange('profile')
      },
      { 
        name: 'Settings', 
        icon: <MdSettings className="w-6 h-6" />,
        onClick: () => onTabChange('settings')
      }
    ];

    const providerSpecificItems = {
      'Hotel Provider': [
        { 
          name: 'Add Hotel', 
          icon: <MdHotel className="w-6 h-6" />,
          onClick: () => onTabChange('add-service')
        },
        { 
          name: 'Hotel Bookings', 
          icon: <BiBookContent className="w-6 h-6" />,
          onClick: () => onTabChange('bookings')
        }
      ],
      'Travel Guide': [
        { 
          name: 'Add Tour', 
          icon: <FaRoute className="w-6 h-6" />,
          onClick: () => onTabChange('add-service')
        },
        { 
          name: 'Tour Bookings', 
          icon: <BiBookContent className="w-6 h-6" />,
          onClick: () => onTabChange('bookings')
        }
      ],
      'Transport Provider': [
        { 
          name: 'Add Vehicle', 
          icon: <MdDirectionsCar className="w-6 h-6" />,
          onClick: () => onTabChange('add-service')
        },
        { 
          name: 'Vehicle Bookings', 
          icon: <BiBookContent className="w-6 h-6" />,
          onClick: () => onTabChange('bookings')
        }
      ]
    };

    return [
      commonItems[0], // Dashboard
      ...providerSpecificItems[selectedProvider],
      ...commonItems.slice(1) // Profile and Settings
    ];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      case 'add-service':
      case 'bookings':
        return children;
      default:
        return children;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}
    >
      {/* Header */}
      <header className="fixed w-full bg-white dark:bg-gray-800 shadow-sm z-50">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiMenu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </motion.button>
            <motion.h1 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
            >
              Welcome, John Doe!
            </motion.h1>
          </div>

          <div className="flex items-center space-x-4">
            <motion.select
              whileHover={{ scale: 1.02 }}
              value={selectedProvider}
              onChange={(e) => onProviderChange(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border-none focus:ring-2 focus:ring-blue-500"
            >
              {providerOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </motion.select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <FiSun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <FiMoon className="w-6 h-6 text-gray-600" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white"
            >
              <FiLogOut className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          className={`fixed left-0 top-16 h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          <nav className="mt-8 px-4">
            <motion.ul className="space-y-2">
              {getSidebarItems().map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={item.onClick}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.name.toLowerCase().replace(' ', '-')
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    {isSidebarOpen && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-lg"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`pt-20 pb-8 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <div className="px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedProvider}-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default Layout; 