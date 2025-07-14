import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import { profileService } from '../../../services/profileService';
import { transportServicesDB } from '../../../services/database';
import { earningsService } from '../../../services/earningsService';
import { reviewsService } from '../../../services/reviewsService';
import { toast } from 'react-toastify';
import { getProviderTransportBookings } from '../../../services/firestoreService';

const formatINR = (amount) => `₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

const TransportDashboard = ({ setActiveSection }) => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]); // This will store combined vehicles and routes
  const [earnings, setEarnings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!authLoading && user) {
        try {
          setIsLoading(true);
          setError(null);

          // Fetch Profile
          const fetchedProfile = await profileService.getProfile(user.uid);
          setProfile(fetchedProfile);

          // Fetch Bookings (real data)
          const fetchedBookings = await getProviderTransportBookings(user.uid);
          setBookings(fetchedBookings);

          // Fetch Services (Vehicles and Routes)
          const [vehiclesData, routesData] = await Promise.all([
            transportServicesDB.getVehicles(),
            transportServicesDB.getRoutes()
          ]);
          setServices([...vehiclesData, ...routesData]);

          // Fetch Earnings
          const fetchedEarnings = await earningsService.getEarnings(user.uid);
          setEarnings(fetchedEarnings);

          // Fetch Reviews
          const fetchedReviews = await reviewsService.getReviews(user.uid);
          setReviews(fetchedReviews);

        } catch (err) {
          console.error('Failed to load dashboard data:', err);
          setError('Failed to load dashboard data. Please try again.');
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

  // Calculate summaries
  const totalEarnings = earnings.reduce((sum, record) => sum + record.amount, 0);
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
  const pendingBookingsCount = bookings.filter(booking => booking.status === 'pending').length;
  const activeServicesCount = services.length;

  // Animation variants
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Transport Dashboard</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Welcome back, {profile?.companyName || 'Transport Provider'}!
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div variants={cardVariants} whileHover="hover" className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Total Earnings</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatINR(totalEarnings)}</p>
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover" className="bg-yellow-50 dark:bg-yellow-900/50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Pending Bookings</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingBookingsCount}</p>
          </motion.div>
          <motion.div variants={cardVariants} whileHover="hover" className="bg-green-50 dark:bg-green-900/50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Active Services</h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{activeServicesCount}</p>
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
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Customer</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Service</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Amount</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-200">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map(booking => (
                  <tr key={booking.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{booking.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{booking.customerName}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{booking.service}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{booking.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100">{formatINR(booking.amount)}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-100 capitalize">{booking.status}</td>
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

        {/* Quick Links / CTAs */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.button
            variants={cardVariants}
            whileHover="hover"
            className="bg-indigo-600 text-white p-6 rounded-lg shadow hover:bg-indigo-700 transition-colors"
            onClick={() => setActiveSection('bookings')}
          >
            View All Bookings
          </motion.button>
          <motion.button
            variants={cardVariants}
            whileHover="hover"
            className="bg-teal-600 text-white p-6 rounded-lg shadow hover:bg-teal-700 transition-colors"
            onClick={() => setActiveSection('services')}
          >
            Manage Vehicles/Routes
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TransportDashboard; 