import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MdDashboard,
  MdPeople,
  MdStore,
  MdBookOnline,
  MdPayment,
  MdContentPaste,
  MdSettings,
  MdLogout,
  MdMenu,
  MdNotifications,
  MdPerson,
  MdLightMode,
  MdDarkMode,
} from 'react-icons/md';
import { useTheme } from '../../../contexts/ThemeContext';
import { auth } from '../../../firebase-config';
import { signOut } from 'firebase/auth';

const Layout = ({ children, activeTab, onTabChange }) => {
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

  const navItems = [
    {
      name: 'Dashboard',
      icon: <MdDashboard className="w-6 h-6" />,
      path: 'overview'
    },
    {
      name: 'User Management',
      icon: <MdPeople className="w-6 h-6" />,
      path: 'users'
    },
    {
      name: 'Service Management',
      icon: <MdStore className="w-6 h-6" />,
      path: 'services'
    },
    {
      name: 'Booking Management',
      icon: <MdBookOnline className="w-6 h-6" />,
      path: 'bookings'
    },
    {
      name: 'Payment Management',
      icon: <MdPayment className="w-6 h-6" />,
      path: 'payments'
    },
    {
      name: 'Content Management',
      icon: <MdContentPaste className="w-6 h-6" />,
      path: 'content'
    },
    {
<<<<<<< HEAD
      name: 'Admin Management',
      icon: <MdPerson className="w-6 h-6" />,
      path: 'admins'
    },
    {
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      name: 'Settings',
      icon: <MdSettings className="w-6 h-6" />,
      path: 'settings'
    }
  ];

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
=======
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg-primary">
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
<<<<<<< HEAD
        className={`fixed left-0 top-0 h-full glassmorphism dark:bg-dark-bg-secondary shadow-2xl border-r border-gray-200 dark:border-dark-border transition-all duration-300 z-50 ${isSidebarOpen ? 'w-72' : 'w-20'}`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-100 dark:border-dark-border flex items-center justify-between">
          <h1 className={`text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text transition-all duration-300 ${!isSidebarOpen && 'scale-0 opacity-0'}`}>TapNTrip Admin</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors ml-2"
            aria-label="Toggle sidebar"
          >
            <MdMenu className="w-6 h-6" />
          </button>
        </div>
        {/* Navigation Items */}
        <nav className="mt-8 px-2 flex flex-col gap-2">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onTabChange(item.path)}
              className={`flex items-center gap-4 px-5 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeTab === item.path ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' : 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-hover'}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className={`ml-1 transition-all duration-300 ${!isSidebarOpen && 'hidden'}`}>{item.name}</span>
=======
        className={`fixed left-0 top-0 h-full bg-white dark:bg-dark-bg-secondary shadow-xl border-r 
          dark:border-dark-border transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Logo Section */}
        <div className="p-4 border-b dark:border-dark-border">
          <h1 className={`text-2xl font-bold text-gradient transition-transform ${!isSidebarOpen && 'scale-0'}`}>
            TapNTrip Admin
          </h1>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6 px-2">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onTabChange(item.path)}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors
                ${activeTab === item.path 
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-hover'}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className={`ml-3 font-medium ${!isSidebarOpen && 'hidden'}`}>
                {item.name}
              </span>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
            </motion.button>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
<<<<<<< HEAD
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}> 
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark-bg-secondary/80 backdrop-blur-lg border-b border-gray-200 dark:border-dark-border shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-20 px-6">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">TapNTrip</h1>
=======
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Header */}
        <header className="bg-white dark:bg-dark-bg-secondary border-b dark:border-dark-border sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-16 px-4">
              {/* Left Section */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                    dark:hover:bg-dark-hover transition-colors"
                >
                  <MdMenu className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
                    TapNTrip
                  </h1>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                  <span className="text-sm text-gray-500 dark:text-gray-400">Admin Panel</span>
                </div>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {navItems.find(item => item.path === activeTab)?.name || 'Dashboard'}
                </h2>
              </div>
<<<<<<< HEAD
              {/* Right Section */}
              <div className="flex items-center gap-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <MdLightMode className="w-6 h-6" /> : <MdDarkMode className="w-6 h-6" />}
                </button>
                {/* Notifications */}
                <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors relative" aria-label="Notifications">
                  <MdNotifications className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {/* Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300 font-semibold focus:outline-none">
                    <MdPerson className="w-6 h-6" />
                    <span className="hidden sm:inline">Admin</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg border border-gray-100 dark:border-dark-border opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-dark-border">
                      <span className="block text-gray-800 dark:text-gray-200 font-bold">Admin</span>
                      <span className="block text-xs text-gray-500 dark:text-gray-400">admin@tapntrip.com</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-dark-hover rounded-b-xl transition-colors"
                    >
                      <MdLogout className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </div>
=======

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                    dark:hover:bg-dark-hover transition-colors"
                >
                  {isDarkMode ? (
                    <MdLightMode className="w-6 h-6" />
                  ) : (
                    <MdDarkMode className="w-6 h-6" />
                  )}
                </button>

                {/* Notifications */}
                <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 
                  dark:hover:bg-dark-hover transition-colors relative">
                  <MdNotifications className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-100 
                  dark:bg-dark-bg-tertiary text-gray-700 dark:text-gray-300">
                  <MdPerson className="w-6 h-6" />
                  <span className="font-medium">Admin</span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500 text-white 
                    hover:bg-red-600 transition-colors"
                >
                  <MdLogout className="w-5 h-5" />
                  <span>Logout</span>
                </button>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
              </div>
            </div>
          </div>
        </header>
<<<<<<< HEAD
        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
=======

        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 