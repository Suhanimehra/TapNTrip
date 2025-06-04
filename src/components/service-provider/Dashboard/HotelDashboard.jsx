import React, { useState } from 'react';
import { MdHotel, MdPerson, MdDateRange, MdAttachMoney } from 'react-icons/md';
import { BiBookContent } from 'react-icons/bi';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const HotelDashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      title: 'Total Rooms',
      value: '24',
      icon: <MdHotel className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Bookings',
      value: '12',
      icon: <BiBookContent className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Total Guests',
      value: '36',
      icon: <MdPerson className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Revenue',
      value: '₹45,000',
      icon: <MdAttachMoney className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const recentBookings = [
    {
      id: 1,
      guestName: 'John Smith',
      roomType: 'Deluxe Double',
      checkIn: '2024-03-15',
      checkOut: '2024-03-18',
      status: 'Confirmed',
      amount: '₹15,000'
    },
    {
      id: 2,
      guestName: 'Sarah Johnson',
      roomType: 'Suite',
      checkIn: '2024-03-16',
      checkOut: '2024-03-20',
      status: 'Pending',
      amount: '₹25,000'
    },
    {
      id: 3,
      guestName: 'Michael Brown',
      roomType: 'Standard Single',
      checkIn: '2024-03-17',
      checkOut: '2024-03-19',
      status: 'Confirmed',
      amount: '₹8,000'
    }
  ];

  const rooms = [
    {
      type: 'Deluxe Double',
      available: 5,
      total: 8,
      price: '₹5,000',
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar']
    },
    {
      type: 'Suite',
      available: 2,
      total: 4,
      price: '₹8,000',
      amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi', 'City View']
    },
    {
      type: 'Standard Single',
      available: 7,
      total: 12,
      price: '₹3,000',
      amenities: ['WiFi', 'AC', 'TV']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-lg bg-gradient-to-r ${stat.color} text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-80">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex space-x-4 mb-6">
          {['overview', 'rooms', 'bookings'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Recent Bookings
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Guest
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Room Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Check In
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Check Out
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {recentBookings.map((booking) => (
                        <motion.tr
                          key={booking.id}
                          whileHover={{ scale: 1.01 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {booking.guestName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {booking.roomType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {booking.checkIn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {booking.checkOut}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'Confirmed'
                                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {booking.amount}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'rooms' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <motion.div
                    key={room.type}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {room.type}
                    </h4>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Available: {room.available}/{room.total}
                      </p>
                      <p className="text-lg font-bold text-blue-500">{room.price}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    All Bookings
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
                  >
                    Export Data
                  </motion.button>
                </div>
                {/* Add a more detailed bookings table or calendar view here */}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default HotelDashboard;