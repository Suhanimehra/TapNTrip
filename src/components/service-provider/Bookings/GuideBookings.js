<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaSearch, FaFilter, FaMapMarkedAlt } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase-config';
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

// --- GuideBookings: Real data bookings for tour guides ---
const GuideBookings = () => {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch Bookings ---
  useEffect(() => {
    const fetchBookings = async () => {
      if (!authLoading && user) {
        setIsLoading(true);
        setError(null);
        try {
          const q = query(
            collection(db, 'bookings'),
            where('guideId', '==', user.uid),
            orderBy('date', 'desc')
          );
          const snap = await getDocs(q);
          const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBookings(data);
        } catch (err) {
          setError('Failed to load bookings.');
          toast.error('Failed to load bookings.');
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchBookings();
  }, [user, authLoading]);

  // --- Tab & Search Filtering ---
  const now = new Date();
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return activeTab === 'upcoming' ? bookingDate >= now : bookingDate < now;
  }).filter(booking => {
    const q = searchQuery.toLowerCase();
    return (
      (booking.customerName || '').toLowerCase().includes(q) ||
      (booking.tourType || '').toLowerCase().includes(q) ||
      (booking.meetingPoint || '').toLowerCase().includes(q)
    );
  });

  // --- Status Update Handler ---
  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { status: newStatus });
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
      toast.success('Booking status updated.');
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

=======
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaSearch, FaFilter, FaMapMarkedAlt } from 'react-icons/fa';

const GuideBookings = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const bookings = [
    {
      id: 1,
      customerName: 'Sonia Mehra',
      tourType: 'City Heritage Walk',
      date: '2024-03-15',
      duration: '3 hours',
      meetingPoint: 'City Center Square',
      status: 'confirmed',
      amount: '₹2,000',
      participants: 4,
      specialRequests: 'English speaking guide'
    },
    {
      id: 2,
      customerName: 'Vikram Joshi',
      tourType: 'Nature Trail',
      date: '2024-03-16',
      duration: '5 hours',
      meetingPoint: 'Forest Park Entrance',
      status: 'pending',
      amount: '₹1,500',
      participants: 2,
      specialRequests: 'Photography tour'
    },
    {
      id: 3,
      customerName: 'Priya Sharma',
      tourType: 'Cultural Experience',
      date: '2024-03-17',
      duration: '4 hours',
      meetingPoint: 'Temple Complex',
      status: 'confirmed',
      amount: '₹3,000',
      participants: 6,
      specialRequests: 'Local food tasting included'
    }
  ];

  const handleStatusChange = (bookingId, newStatus) => {
    // Implement status change logic
    console.log(`Changing booking ${bookingId} status to ${newStatus}`);
  };

>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
  return (
    <div className="space-y-6">
      {/* Header with Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <FaFilter />
            <span>Filter</span>
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'upcoming'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'past'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
<<<<<<< HEAD
        {filteredBookings.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">No bookings found.</div>
        ) : filteredBookings.map((booking) => (
=======
        {bookings.map((booking) => (
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaMapMarkedAlt className="text-green-500" />
<<<<<<< HEAD
                  <h3 className="text-lg font-semibold">{booking.customerName || 'N/A'}</h3>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <FaCalendarAlt />
                  <span>{booking.date || 'N/A'} ({booking.duration || 'N/A'})</span>
                </div>
                <p className="text-sm">Tour: {booking.tourType || 'N/A'}</p>
                <p className="text-sm">Participants: {booking.participants || 'N/A'}</p>
                <p className="text-sm">Meeting Point: {booking.meetingPoint || 'N/A'}</p>
=======
                  <h3 className="text-lg font-semibold">{booking.customerName}</h3>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <FaCalendarAlt />
                  <span>{booking.date} ({booking.duration})</span>
                </div>
                <p className="text-sm">Tour: {booking.tourType}</p>
                <p className="text-sm">Participants: {booking.participants}</p>
                <p className="text-sm">Meeting Point: {booking.meetingPoint}</p>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                {booking.specialRequests && (
                  <p className="text-sm text-blue-500">Special Request: {booking.specialRequests}</p>
                )}
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
<<<<<<< HEAD
                    : booking.status === 'cancelled'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {booking.status || 'N/A'}
                </span>
                <p className="font-semibold">{booking.amount ? `₹${booking.amount}` : 'N/A'}</p>
=======
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {booking.status}
                </span>
                <p className="font-semibold">{booking.amount}</p>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusChange(booking.id, 'confirmed')}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusChange(booking.id, 'cancelled')}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GuideBookings; 