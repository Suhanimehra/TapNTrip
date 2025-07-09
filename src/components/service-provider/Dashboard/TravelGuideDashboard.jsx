<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { profileService } from '../../../services/profileService';
import { guideServicesDB } from '../../../services/database';
import { earningsService } from '../../../services/earningsService';
import { reviewsService } from '../../../services/reviewsService';
import { db } from '../../../firebase-config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { toast } from 'react-toastify';

// --- TravelGuideDashboard: Modern dashboard for tour guides ---
const TravelGuideDashboard = ({ setActiveSection }) => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!authLoading && user) {
        setIsLoading(true);
        setError(null);
        try {
          // --- Profile ---
          let fetchedProfile = null;
          try {
            fetchedProfile = await profileService.getProfile(user.uid, 'guide');
          } catch (e) { fetchedProfile = null; }
          setProfile(fetchedProfile);

          // --- Tours (filter by guideId) ---
          let allTours = [];
          try {
            allTours = await guideServicesDB.getTours();
          } catch (e) { allTours = []; }
          const myTours = allTours.filter(t => t.guideId === user.uid);
          setTours(myTours);

          // --- Bookings (filter by guideId) ---
          let myBookings = [];
          try {
            const q = query(collection(db, 'bookings'), where('guideId', '==', user.uid), orderBy('date', 'desc'));
            const snap = await getDocs(q);
            myBookings = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          } catch (e) { myBookings = []; }
          setBookings(myBookings);

          // --- Earnings ---
          let fetchedEarnings = [];
          try {
            fetchedEarnings = await earningsService.getEarnings(user.uid);
          } catch (e) { fetchedEarnings = []; }
          setEarnings(fetchedEarnings);

          // --- Reviews ---
          let fetchedReviews = [];
          try {
            fetchedReviews = await reviewsService.getReviews(user.uid);
          } catch (e) { fetchedReviews = []; }
          setReviews(fetchedReviews);
        } catch (err) {
          setError('A network or permission error occurred. Please try again.');
          toast.error('Failed to load dashboard data.');
        } finally {
          setIsLoading(false);
        }
      } else if (!authLoading && !user) {
        setError('No user logged in. Please log in to view dashboard.');
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user, authLoading]);

  // --- Stats ---
  const totalEarnings = earnings.reduce((sum, record) => sum + (record.amount || 0), 0);
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / totalReviews) : 0;
  const pendingBookingsCount = bookings.filter(b => b.status === 'pending').length;
  const totalTours = tours.length;

  // --- Animation variants ---
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: { scale: 1.02, y: -5, transition: { duration: 0.2 } }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Travel Guide Dashboard</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Welcome back, {profile?.guideName || profile?.firstName || profile?.email || 'Tour Guide'}!
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div variants={cardVariants} whileHover="hover" className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Total Earnings</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">₹{totalEarnings.toLocaleString()}</p>
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover" className="bg-yellow-50 dark:bg-yellow-900/50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Pending Bookings</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingBookingsCount}</p>
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover" className="bg-green-50 dark:bg-green-900/50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Total Tours</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalTours}</p>
          </motion.div>
        </div>

        {/* Recent Bookings */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Recent Bookings</h2>
        {bookings.length > 0 ? (
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-200 dark:bg-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Booking ID</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Tourist</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Tour</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map(booking => (
                  <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{booking.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{booking.touristName || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{booking.tourType || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{booking.date || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">₹{booking.amount?.toLocaleString() || 0}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100 capitalize">{booking.status || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">No recent bookings found.</p>
        )}

        {/* Reviews Summary */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Reviews Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div variants={cardVariants} whileHover="hover" className="bg-purple-50 dark:bg-purple-900/50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-2">Total Reviews</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalReviews}</p>
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover" className="bg-orange-50 dark:bg-orange-900/50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-2">Average Rating</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{averageRating.toFixed(1)} / 5</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.button
            variants={cardVariants}
            whileHover="hover"
            className="bg-indigo-600 text-white p-6 rounded-lg shadow hover:bg-indigo-700 transition-colors"
            onClick={() => setActiveSection && setActiveSection('bookings')}
          >
            View All Bookings
          </motion.button>
          <motion.button
            variants={cardVariants}
            whileHover="hover"
            className="bg-teal-600 text-white p-6 rounded-lg shadow hover:bg-teal-700 transition-colors"
            onClick={() => setActiveSection && setActiveSection('services')}
          >
            Manage Tours
          </motion.button>
          <motion.button
            variants={cardVariants}
            whileHover="hover"
            className="bg-rose-600 text-white p-6 rounded-lg shadow hover:bg-rose-700 transition-colors"
            onClick={() => setActiveSection && setActiveSection('profile')}
          >
            Update Profile
          </motion.button>
        </div>
=======
import React, { useState } from 'react';
import { MdPerson, MdDateRange, MdAttachMoney, MdLocationOn, MdAdd } from 'react-icons/md';
import { BiBookContent } from 'react-icons/bi';
import { FaRoute, FaMapMarkedAlt } from 'react-icons/fa';
import { useTheme } from '../../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const TravelGuideDashboard = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { 
      title: 'Total Tours',
      value: '15',
      icon: <MdLocationOn className="w-8 h-8" />,
    },
    {
      title: 'Active Bookings',
      value: '8',
      icon: <BiBookContent className="w-8 h-8" />,
    },
    {
      title: 'Total Revenue',
      value: '₹35,000',
      icon: <MdAttachMoney className="w-8 h-8" />,
    }
  ];

  const quickActions = [
    {
      title: 'Add New Tour',
      icon: <MdAdd className="w-6 h-6" />,
      onClick: () => {}
    },
    {
      title: 'Manage Bookings',
      icon: <BiBookContent className="w-6 h-6" />,
      onClick: () => {}
    },
    {
      title: 'Update Routes',
      icon: <FaMapMarkedAlt className="w-6 h-6" />,
      onClick: () => {}
    }
  ];

  const recentBookings = [
    {
      id: 1,
      touristName: 'Alice Cooper',
      tourType: 'Heritage Walk',
      date: '2024-03-15',
      duration: '3 hours',
      status: 'Confirmed',
      amount: '₹2,500'
    },
    {
      id: 2,
      touristName: 'Bob Wilson',
      tourType: 'City Tour',
      date: '2024-03-16',
      duration: '6 hours',
      status: 'Pending',
      amount: '₹4,500'
    },
    {
      id: 3,
      touristName: 'Carol Davis',
      tourType: 'Food Trail',
      date: '2024-03-17',
      duration: '4 hours',
      status: 'Confirmed',
      amount: '₹3,000'
    }
  ];

  const tours = [
    {
      type: 'Heritage Walk',
      duration: '3 hours',
      price: '₹2,500',
      maxGroupSize: 10,
      highlights: ['Historical Sites', 'Local Stories', 'Photo Stops', 'Cultural Insights']
    },
    {
      type: 'City Tour',
      duration: '6 hours',
      price: '₹4,500',
      maxGroupSize: 8,
      highlights: ['Major Landmarks', 'Local Markets', 'Lunch Stop', 'Museum Visit']
    },
    {
      type: 'Food Trail',
      duration: '4 hours',
      price: '₹3,000',
      maxGroupSize: 6,
      highlights: ['Street Food', 'Local Restaurants', 'Cooking Demo', 'Food History']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Quick Actions */}
      <div className="quick-actions">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.title}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="action-card custom-transition"
            onClick={action.onClick}
          >
            <div className="flex items-center gap-3">
              {action.icon}
              <span>{action.title}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card custom-transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="stat-label">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex space-x-4 mb-6">
          {['overview', 'tours', 'bookings'].map((tab) => (
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
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Recent Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="bookings-table">
                    <thead>
                      <tr>
                        <th>Tourist</th>
                        <th>Tour Type</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <motion.tr
                          key={booking.id}
                          whileHover={{ scale: 1.01 }}
                        >
                          <td>{booking.touristName}</td>
                          <td>{booking.tourType}</td>
                          <td>{booking.date}</td>
                          <td>{booking.duration}</td>
                          <td>
                            <span className={`status-badge custom-transition ${booking.status.toLowerCase()}`}>
                              {booking.status}
                            </span>
                          </td>
                          <td>{booking.amount}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'tours' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tours.map((tour) => (
                  <motion.div
                    key={tour.type}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                  >
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {tour.type}
                    </h4>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        Duration: {tour.duration}
                      </p>
                      <p className="text-lg font-bold text-blue-500">{tour.price}</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
                      Max Group Size: {tour.maxGroupSize}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tour.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        >
                          {highlight}
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
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      </div>
    </motion.div>
  );
};

export default TravelGuideDashboard; 