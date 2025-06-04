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
import './Dashboard.css';

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

  const getSidebarItems = () => {
    const commonItems = [
      { 
        name: 'Dashboard', 
        icon: <MdDashboard className="w-6 h-6" />,
        onClick: () => onTabChange('overview')
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
      commonItems[0],
      ...providerSpecificItems[selectedProvider],
      ...commonItems.slice(1)
    ];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'overview':
      case 'dashboard':
      case 'add-service':
      case 'bookings':
        return children;
      default:
        return children;
    }
  };

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className={`sidebar custom-transition ${!isSidebarOpen ? 'collapsed' : ''}`}
      >
        <div className="sidebar-logo">
          TapNTrip
        </div>
        <nav className="sidebar-nav">
          {getSidebarItems().map((item) => (
            <motion.button
              key={item.name}
              onClick={item.onClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`nav-item ${
                activeTab === (item.name === 'Dashboard' ? 'overview' : item.name.toLowerCase().replace(' ', '-'))
                  ? 'active'
                  : ''
              }`}
            >
              {item.icon}
              <span className="nav-text">{item.name}</span>
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className={`main-content custom-transition ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="header">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="btn"
            >
              <FiMenu className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="welcome-text">Welcome, John Doe!</h1>
              <p className="text-secondary">You are registered as a {selectedProvider}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedProvider}
              onChange={(e) => onProviderChange(e.target.value)}
              className="btn"
            >
              {providerOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="btn"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <FiSun className="w-6 h-6 text-yellow-500" />
              ) : (
                <FiMoon className="w-6 h-6" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="btn btn-primary"
              aria-label="Logout"
            >
              <FiLogOut className="w-6 h-6" />
            </motion.button>
          </div>
        </header>

        {/* Content */}
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
      </main>
    </div>
  );
};

export default Layout; 