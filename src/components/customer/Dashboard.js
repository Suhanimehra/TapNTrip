<<<<<<< HEAD
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { indianCities } from '../../utils/indianCities';
import { useTheme } from '../../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import CustomerProfile from './Profile';
import MyBookings from './MyBookings';
// import FlightFilters from './FlightFilters'; // Commented out - component doesn't exist
import SearchSection from './SearchSection';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../common/LanguageSelector';
import PackagesPage from './packages/PackagesPage';
import ActivitiesPage from './activities/ActivitiesPage';
import ScrollToTop from '../common/ScrollToTop';
import HealthAccessibility from './HealthAccessibility.tsx';
import EmergencyButton from './EmergencyButton';
import AccessibilityFilters from './AccessibilityFilters';
import MyJournal from './MyJournal';
import RealTimeAssistant from '../common/RealTimeAssistant';
import FamilyLocationSharing from './FamilyLocationSharing';
import Reminders from './Reminders';
import EmergencyPage from './EmergencyPage';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { getHotels, getBuses, saveBooking, getUserRewards, updateUserRewards, addRewardHistory } from '../../services/firestoreService';
import TourGuidePage from './TourGuideSection';
import { useAuth } from '../../contexts/AuthContext';

const CustomerDashboard = ({ initialSection = 'dashboard', initialService = 'flights' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme, zoomLevel, increaseZoom, decreaseZoom, resetZoom } = useTheme();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [activeService, setActiveService] = useState(initialService);
  const [tripType, setTripType] = useState('oneWay');
=======
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { signOut } from 'firebase/auth';
import { indianCities } from '../../utils/indianCities';
import { useTheme } from '../../contexts/ThemeContext';
import {
  sampleFlights,
  sampleHotels,
  sampleBuses,
  sampleTrains,
  sampleHomestays,
  sampleCabs,
  sampleInsurance,
  sampleHolidayPackages
} from '../../utils/sampleData';
import { motion, AnimatePresence } from 'framer-motion';
import RightPanel from './RightPanel';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme, zoomLevel, increaseZoom, decreaseZoom, resetZoom } = useTheme();
  const [tripType, setTripType] = useState('oneWay');
  const [activeService, setActiveService] = useState('flights');
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
<<<<<<< HEAD
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const { t } = useTranslation();

  const [showHealthProfile, setShowHealthProfile] = useState(false);
  const [showJournal, setShowJournal] = useState(false);
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [showAccessibilityFilters, setShowAccessibilityFilters] = useState(false);
  const [healthProfile, setHealthProfile] = useState(null);
  const [accessibilityFilters, setAccessibilityFilters] = useState({ wheelchair: false, largeText: false, audioAssistance: false });

  const [emergencyMode, setEmergencyMode] = useState(false);

  const [hotels, setHotels] = useState([]);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const [hotelsError, setHotelsError] = useState(null);

  const [buses, setBuses] = useState([]);
  const [busesLoading, setBusesLoading] = useState(false);
  const [busesError, setBusesError] = useState(null);

  const { user } = useAuth();

  const [userRewards, setUserRewards] = useState(null);
  const [rewardsLoading, setRewardsLoading] = useState(true);
  const [rewardsError, setRewardsError] = useState(null);

  useEffect(() => {
    if (user && user.uid) {
      setRewardsLoading(true);
      getUserRewards(user.uid)
        .then(data => setUserRewards(data))
        .catch(() => setRewardsError('Failed to load rewards'))
        .finally(() => setRewardsLoading(false));
    }
  }, [user]);

  // Add the styles to the document
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Update the services array to use translations
  const services = useMemo(() => [
    { id: 'dashboard', label: t('navbar.dashboard'), icon: '\ud83c\udfe0' },
    { id: 'flights', label: t('navbar.flights'), icon: '\u2708\ufe0f' },
    { id: 'hotels', label: t('navbar.hotels'), icon: '\ud83c\udfe8' },
    { id: 'trains', label: t('navbar.trains'), icon: '\ud83d\ude86' },
    { id: 'buses', label: t('navbar.buses'), icon: '\ud83d\ude8c' },
    { id: 'packages', label: t('navbar.packages'), icon: '\ud83d\udce6' },
    { id: 'activities', label: t('navbar.activities'), icon: '\ud83c\udf0a' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'tour-guides', label: 'Tour Guides', icon: '\ud83e\uddd1\u200d\ud83c\udfeb' },
    { id: 'my-bookings', label: t('navbar.myBookings'), icon: '\ud83e\uddf3' },
    { id: 'rewards', label: t('navbar.rewards'), icon: '\ud83c\udfc6' },
    { id: 'journal', label: 'My Journal', icon: '\ud83d\udcd4' },
    { id: 'health-accessibility', label: 'Health & Accessibility', icon: '\u267f' },
    { id: 'assistant', label: 'Assistant', icon: '\ud83e\udd16' },
    { id: 'family-location', label: 'Family Location', icon: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66' },
    { id: 'reminders', label: 'Reminders', icon: '\u23f0' },
  ], [t]);
=======
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const services = [
    { id: 'flights', icon: '✈️', label: 'Flights' },
    { id: 'hotels', icon: '🏨', label: 'Hotels' },
    { id: 'homestays', icon: '🏠', label: 'Homestays & Villas' },
    { id: 'holiday', icon: '🌴', label: 'Holiday Packages' },
    { id: 'trains', icon: '🚂', label: 'Trains' },
    { id: 'buses', icon: '🚌', label: 'Buses' },
    { id: 'cabs', icon: '🚕', label: 'Cabs' },
    { id: 'insurance', icon: '🛡️', label: 'Travel Insurance' },
  ];
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47

  const fareTypes = [
    { id: 'regular', label: 'Regular', description: 'Regular fares' },
    { id: 'student', label: 'Student', description: 'Extra discounts/baggage', discount: '₹600 off' },
    { id: 'senior', label: 'Senior Citizen', description: 'Up to ₹600 off' },
    { id: 'armed', label: 'Armed Forces', description: 'Up to ₹600 off' },
    { id: 'doctor', label: 'Doctor and Nurses', description: 'Up to ₹600 off' },
  ];

  // Get all airports for suggestions
  const getAllAirports = () => {
    const airports = [];
    indianCities.forEach(city => {
      city.airports.forEach(airport => {
        airports.push({
          cityName: city.city,
          airportName: airport.name,
          code: airport.code,
          state: city.state
        });
      });
    });
    return airports;
  };

  // Filter cities and airports based on query
  const getFilteredCities = (query) => {
    if (!query) return [];
    const lowercaseQuery = query.toLowerCase();
    
    // Get all matching airports
    const allAirports = getAllAirports();
    const matchingResults = allAirports.filter(item => 
      item.cityName.toLowerCase().includes(lowercaseQuery) ||
      item.airportName.toLowerCase().includes(lowercaseQuery) ||
      item.code.toLowerCase().includes(lowercaseQuery)
    );

    return matchingResults.slice(0, 8); // Show top 8 results
  };

  // Handle city/airport selection
  const handleCitySelect = (item, type) => {
    const formattedSelection = `${item.cityName} – ${item.airportName} (${item.code})`;
    if (type === 'from') {
      setFromQuery(formattedSelection);
      setShowFromSuggestions(false);
    } else {
      setToQuery(formattedSelection);
      setShowToSuggestions(false);
    }
  };

  // Handle input changes
  const handleFromInputChange = (e) => {
    const value = e.target.value;
    setFromQuery(value);
    setShowFromSuggestions(true);
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setToQuery(value);
    setShowToSuggestions(true);
  };

  // Handle date changes with validation
  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
    if (returnDate && new Date(returnDate) < new Date(date)) {
      setReturnDate('');
    }
  };

  // Get minimum return date
  const getMinReturnDate = () => {
    return departureDate || new Date().toISOString().split('T')[0];
  };

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

<<<<<<< HEAD
  // Helper function to check if a flight's departure time falls within a time slot
  const isInTimeSlot = (departure, timeSlot) => {
    const hour = parseInt(departure.split(':')[0]);
    switch (timeSlot) {
      case 'morning':
        return hour >= 6 && hour < 12;
      case 'afternoon':
        return hour >= 12 && hour < 18;
      case 'evening':
        return hour >= 18 && hour < 24;
      case 'night':
        return hour >= 0 && hour < 6;
      default:
        return false;
    }
  };

  // Filter flights based on selected filters
  const getFilteredFlights = () => [];

=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
  // Render sample data based on active service
  const renderServiceData = () => {
    switch (activeService) {
      case 'flights':
        return (
<<<<<<< HEAD
          <div className="space-y-6">
            {/* Trips You May Like */}
            <div className={`${
              isDarkMode 
                ? 'bg-[#1a1e2e] border-[#2d3348]' 
                : 'bg-white/70 hover:bg-white border-white/20'
            } rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border mb-6`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('trips.tripsYouMayLike')}
                </h2>
                <button className={`text-sm font-medium px-3 py-1 rounded-lg ${
                  isDarkMode ? 'bg-[#2d3348] hover:bg-[#3a4056] text-blue-400' : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
                } transition-all duration-200`}>
                  {t('trips.viewAll')} →
                </button>
              </div>
              
              <div className="flex overflow-x-auto pb-4 hide-scrollbar space-x-4">
                {/* ... existing recommended trips data ... */}
              </div>
            </div>

            {/* Flight Results */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 gap-4"
            >
              {/* ... existing flight results ... */}
            </motion.div>
          </div>
=======
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mt-6 grid grid-cols-1 gap-4"
          >
            {sampleFlights.map(flight => (
              <motion.div 
                key={flight.id} 
                variants={cardVariants}
                whileHover="hover"
                className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} p-4 rounded-lg shadow hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <motion.p 
                      whileHover={{ scale: 1.02 }}
                      className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      {flight.airline}
                    </motion.p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {flight.flightNo} • {flight.aircraft}
                    </p>
                  </div>
                  <div className="text-right">
                    <motion.p 
                      whileHover={{ scale: 1.05 }}
                      className="font-bold text-xl text-blue-500"
                    >
                      ₹{flight.price}
                    </motion.p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {flight.duration}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-3">
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <span className="font-medium">{flight.from}</span> → <span className="font-medium">{flight.to}</span>
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {flight.departure} - {flight.arrival}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {flight.amenities.map((amenity, index) => (
                    <motion.span 
                      key={index} 
                      whileHover={{ scale: 1.05 }}
                      className={`text-xs px-2 py-1 rounded ${
                        isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {amenity}
                    </motion.span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <motion.span 
                    whileHover={{ scale: 1.1 }}
                    className="text-yellow-400"
                  >
                    {'★'.repeat(Math.floor(flight.rating))}
                  </motion.span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {flight.rating} ({flight.reviews} reviews)
                  </span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform transition-all duration-200"
                >
                  Book Now
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
        );
      case 'hotels':
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
<<<<<<< HEAD
            {hotelsLoading && <div>Loading hotels...</div>}
            {hotelsError && <div className="text-red-500">{hotelsError}</div>}
            {!hotelsLoading && !hotelsError && hotels.length === 0 && <div>No hotels found.</div>}
            {!hotelsLoading && !hotelsError && hotels.map(hotel => (
              <motion.div
                key={hotel.id}
                variants={cardVariants}
                whileHover="hover"
                className="border rounded-lg shadow-md p-4 bg-white dark:bg-[#1a1e2e]"
              >
                {hotel.image && (
                  <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover rounded-md mb-3" />
                )}
                <h3 className="text-lg font-bold mb-1">{hotel.name || 'Unnamed Room'}</h3>
                <div className="text-sm text-gray-500 mb-1">Type: {hotel.type || 'N/A'}</div>
                <div className="text-blue-600 font-semibold mb-1">₹{hotel.price} / night</div>
                <div className="text-sm mb-1">Capacity: {hotel.capacity || '-'} | Beds: {hotel.beds || '-'} | Size: {hotel.size || '-'} sqft</div>
                <div className="text-sm mb-1">Floor: {hotel.floor || '-'} | Room #: {hotel.roomNumber || '-'}</div>
                <div className="text-sm mb-1">Status: <span className={hotel.status === 'available' ? 'text-green-600' : 'text-red-600'}>{hotel.status}</span></div>
                {hotel.description && (
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-1">{hotel.description}</div>
                )}
                {hotel.amenities && hotel.amenities.length > 0 && (
                  <div className="text-sm mt-2">
                    <span className="font-semibold">Amenities:</span>
                    <ul className="list-disc pl-5">
                      {Array.isArray(hotel.amenities)
                        ? hotel.amenities.map((a, i) => <li key={i}>{a}</li>)
                        : hotel.amenities.split(',').map((a, i) => <li key={i}>{a.trim()}</li>)}
                    </ul>
                  </div>
                )}
                <button
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:from-blue-600 hover:to-purple-700 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => {
                    setSelectedHotel(hotel);
                    setShowHotelBooking(true);
                    setHotelBookingData({ name: '', contact: '', checkin: '', checkout: '' });
                    setHotelBookingStatus('');
                  }}
                  disabled={hotel.status !== 'available'}
                >
                  Book Now
                </button>
              </motion.div>
            ))}
            {/* Booking Modal */}
            {showHotelBooking && selectedHotel && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-[#1a1e2e] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                  {/* Title Bar with Close Button */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Book: {selectedHotel.name}</h3>
                    <button
                      type="button"
                      className="text-2xl text-gray-400 hover:text-gray-700 dark:hover:text-white focus:outline-none"
                      onClick={() => setShowHotelBooking(false)}
                    >
                      &times;
                    </button>
                  </div>
                  <form onSubmit={async e => {
                    e.preventDefault();
                    if (!user) {
                      setHotelBookingStatus('You must be logged in to book.');
                      return;
                    }
                    try {
                      await saveBooking({
                        userId: user.uid,
                        type: 'hotel',
                        hotelId: selectedHotel.id,
                        hotelName: selectedHotel.name,
                        hotelProviderId: selectedHotel.providerId || '',
                        bookingData: hotelBookingData,
                      });
                      setHotelBookingStatus('Booking submitted successfully!');
                      setTimeout(() => setShowHotelBooking(false), 1500);
                    } catch (err) {
                      setHotelBookingStatus('Failed to submit booking.');
                    }
                  }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={hotelBookingData.name}
                        onChange={e => setHotelBookingData({ ...hotelBookingData, name: e.target.value })}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Contact Info</label>
                      <input
                        type="text"
                        name="contact"
                        placeholder="Contact Info"
                        value={hotelBookingData.contact}
                        onChange={e => setHotelBookingData({ ...hotelBookingData, contact: e.target.value })}
                        className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Check-in</label>
                        <input
                          type="date"
                          name="checkin"
                          value={hotelBookingData.checkin}
                          onChange={e => setHotelBookingData({ ...hotelBookingData, checkin: e.target.value })}
                          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Check-out</label>
                        <input
                          type="date"
                          name="checkout"
                          value={hotelBookingData.checkout}
                          onChange={e => setHotelBookingData({ ...hotelBookingData, checkout: e.target.value })}
                          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                        onClick={() => setShowHotelBooking(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Confirm Booking
                      </button>
                    </div>
                    {hotelBookingStatus && <div className="text-green-700 bg-green-100 border border-green-300 rounded p-2 mt-2 text-center font-semibold">{hotelBookingStatus}</div>}
                  </form>
                </div>
              </div>
            )}
=======
            {sampleHotels.map(hotel => (
              <motion.div 
                key={hotel.id} 
                variants={cardVariants}
                whileHover="hover"
                className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} p-4 rounded-lg shadow hover:shadow-md transition-shadow`}
              >
                <motion.h3 
                  whileHover={{ scale: 1.02 }}
                  className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {hotel.name}
                </motion.h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{hotel.city}</p>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="text-yellow-400"
                    >
                      {'★'.repeat(hotel.rating)}
                    </motion.span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      ({hotel.reviews})
                    </span>
                  </div>
                  <motion.p 
                    whileHover={{ scale: 1.05 }}
                    className="font-bold text-lg text-blue-500 mt-2"
                  >
                    Starting from ₹{hotel.price}
                  </motion.p>
                  <div className="mt-2">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Room Types:
                    </p>
                    <div className="grid grid-cols-1 gap-1 mt-1">
                      {hotel.roomTypes.map((room, index) => (
                        <motion.div 
                          key={index} 
                          whileHover={{ scale: 1.02 }}
                          className="flex justify-between text-sm"
                        >
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                            {room.type}
                          </span>
                          <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            ₹{room.price}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {hotel.amenities.map((amenity, index) => (
                      <motion.span 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`text-xs px-2 py-1 rounded ${
                          isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {amenity}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform transition-all duration-200"
                >
                  Book Now
                </motion.button>
              </motion.div>
            ))}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
          </motion.div>
        );
      case 'buses':
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
<<<<<<< HEAD
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {busesLoading && <div>Loading buses...</div>}
            {busesError && <div className="text-red-500">{busesError}</div>}
            {!busesLoading && !busesError && buses.length === 0 && <div>No buses found.</div>}
            {!busesLoading && !busesError && buses.map(bus => (
              <motion.div
                key={bus.id}
                variants={cardVariants}
                whileHover="hover"
                className="border rounded-lg shadow-md p-4 bg-white dark:bg-[#1a1e2e]"
              >
                {bus.image && (
                  <img src={bus.image} alt={bus.name} className="w-full h-40 object-cover rounded-md mb-3" />
                )}
                <h3 className="text-lg font-bold mb-1">{bus.name || 'Unnamed Bus'}</h3>
                <div className="text-sm text-gray-500 mb-1">Type: {bus.type || 'N/A'}</div>
                <div className="text-sm mb-1">Capacity: {bus.capacity || '-'} | Make: {bus.make || '-'} | Model: {bus.model || '-'}</div>
                <div className="text-sm mb-1">Year: {bus.year || '-'} | License Plate: {bus.licensePlate || '-'}</div>
                <div className="text-sm mb-1">Fuel: {bus.fuelType || '-'} | Transmission: {bus.transmission || '-'}</div>
                <div className="text-sm mb-1">Mileage: {bus.mileage || '-'}</div>
                <div className="text-sm mb-1">Status: <span className={bus.status === 'active' ? 'text-green-600' : 'text-red-600'}>{bus.status}</span></div>
                {bus.description && (
                  <div className="text-sm text-gray-700 dark:text-gray-400 mb-1">{bus.description}</div>
                )}
                {bus.features && bus.features.length > 0 && (
                  <div className="text-sm mt-2">
                    <span className="font-semibold">Features:</span>
                    <ul className="list-disc pl-5">
                      {Array.isArray(bus.features)
                        ? bus.features.map((f, i) => <li key={i}>{f}</li>)
                        : bus.features.split(',').map((f, i) => <li key={i}>{f.trim()}</li>)}
                    </ul>
                  </div>
                )}
=======
            className="mt-6 grid grid-cols-1 gap-4"
          >
            {sampleBuses.map(bus => (
              <motion.div 
                key={bus.id} 
                variants={cardVariants}
                whileHover="hover"
                className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} p-4 rounded-lg shadow hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <motion.p 
                      whileHover={{ scale: 1.02 }}
                      className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                    >
                      {bus.operator}
                    </motion.p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {bus.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <motion.p 
                      whileHover={{ scale: 1.05 }}
                      className="font-bold text-xl text-blue-500"
                    >
                      ₹{bus.price}
                    </motion.p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {bus.seats}
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    <span className="font-medium">{bus.from}</span> → <span className="font-medium">{bus.to}</span>
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {bus.departure} - {bus.arrival}
                  </p>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <motion.span 
                      whileHover={{ scale: 1.1 }}
                      className="text-yellow-400"
                    >
                      {'★'.repeat(Math.floor(bus.rating))}
                    </motion.span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      ({bus.rating})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {bus.amenities.map((amenity, index) => (
                      <motion.span 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`text-xs px-2 py-1 rounded ${
                          isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {amenity}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform transition-all duration-200"
                >
                  Book Now
                </motion.button>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
              </motion.div>
            ))}
          </motion.div>
        );
      case 'trains':
        return (
          <div className="mt-6 grid grid-cols-1 gap-4">
<<<<<<< HEAD
            {/* Train results will be displayed here. Add your train data rendering logic. */}
=======
            {sampleTrains.map(train => (
              <div key={train.id} className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} p-4 rounded-lg shadow hover:shadow-md transition-shadow`}>
                {/* Header with Train Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{train.thumbnail}</span>
                    <div>
                      <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {train.name}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Train No: {train.number} • {train.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {train.duration}
                    </p>
                  </div>
                </div>

                {/* Journey Details */}
                <div className="mt-4">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    <span className="font-medium">{train.from}</span> → <span className="font-medium">{train.to}</span>
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {train.departure} - {train.arrival}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-yellow-400">{'★'.repeat(Math.floor(train.rating))}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {train.rating} ({train.reviews} reviews)
                  </span>
                </div>

                {/* Classes and Prices */}
                <div className="mt-4">
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Available Classes:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {train.classes.map((cls, index) => (
                      <div key={index} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">{cls.type}</span>
                        <div className="flex justify-between items-center">
                          <span>₹{cls.price}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            cls.seats === 'Available' 
                              ? 'bg-green-100 text-green-700' 
                              : cls.seats === 'RAC'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {cls.seats}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-4">
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Amenities & Features:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {train.amenities.map((amenity, index) => (
                      <span key={index} className={`text-xs px-2 py-1 rounded ${
                        isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Meals */}
                <div className="mt-4">
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Included Meals:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {train.meals.map((meal, index) => (
                      <span key={index} className={`text-xs px-2 py-1 rounded ${
                        isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {meal}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Now Button */}
                <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200">
                  Book Now
                </button>
              </div>
            ))}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
          </div>
        );
      case 'homestays':
        return (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
<<<<<<< HEAD
            {/* ... existing homestay data ... */}
=======
            {sampleHomestays.map(homestay => (
              <div key={homestay.id} className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} p-4 rounded-lg shadow hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{homestay.name}</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{homestay.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-blue-500">₹{homestay.price}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>per night</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400">{'★'.repeat(Math.floor(homestay.rating))}</span>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>({homestay.rating})</span>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {homestay.rooms} Rooms • Up to {homestay.maxGuests} Guests • {homestay.type}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {homestay.amenities.map((amenity, index) => (
                      <span key={index} className={`text-xs px-2 py-1 rounded ${
                        isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200">
                  Book Now
                </button>
              </div>
            ))}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
          </div>
        );
      case 'cabs':
        return (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
<<<<<<< HEAD
            {/* ... existing cab data ... */}
=======
            {sampleCabs.map(cab => (
              <div key={cab.id} className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} p-4 rounded-lg shadow hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cab.type}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cab.provider}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-blue-500">{cab.price}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>ETA: {cab.eta}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{cab.capacity} • {cab.ac ? 'AC' : 'Non-AC'}</p>
                  <div className="mt-2">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Available Cars:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {cab.carModels.map((model, index) => (
                        <span key={index} className={`text-xs px-2 py-1 rounded ${
                          isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200">
                  Book Now
                </button>
              </div>
            ))}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
          </div>
        );
      case 'insurance':
        return (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
<<<<<<< HEAD
            {/* ... existing insurance data ... */}
          </div>
        );
      case 'packages':
        return <PackagesPage />;
      case 'activities':
        return <ActivitiesPage />;
      case 'holiday':
        return (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ... existing holiday package data ... */}
          </div>
        );
      case 'health-accessibility':
        return <HealthAccessibility />;
      case 'emergency':
        return <EmergencyPage />;
      case 'journal':
        return <MyJournal />;
      case 'accessibility':
        return <AccessibilityFilters filters={accessibilityFilters} onChange={e => setAccessibilityFilters({ ...accessibilityFilters, [e.target.name]: e.target.checked })} />;
      case 'assistant':
        return <RealTimeAssistant />;
      case 'family-location':
        return <FamilyLocationSharing />;
      case 'reminders':
        return <Reminders />;
      case 'tour-guides':
        return <TourGuidePage />;
=======
            {sampleInsurance.map(insurance => (
              <div key={insurance.id} className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} p-4 rounded-lg shadow hover:shadow-md transition-shadow`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{insurance.provider}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{insurance.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-blue-500">₹{insurance.price}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{insurance.duration}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Coverage: {insurance.coverage}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Claim Process: {insurance.claimProcess}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {insurance.benefits.map((benefit, index) => (
                      <span key={index} className={`text-xs px-2 py-1 rounded ${
                        isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        );
      case 'holiday':
        return (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleHolidayPackages.map(holidayPackage => (
              <div key={holidayPackage.id} className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}>
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{holidayPackage.thumbnail}</span>
                      <h3 className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {holidayPackage.name}
                      </h3>
                    </div>
                    <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {holidayPackage.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-blue-500">₹{holidayPackage.price}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>per person</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-yellow-400">{'★'.repeat(Math.floor(holidayPackage.rating))}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {holidayPackage.rating} ({holidayPackage.reviews} reviews)
                  </span>
                </div>

                {/* Locations */}
                <div className="mt-4">
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Destinations:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {holidayPackage.locations.map((location, index) => (
                      <span
                        key={index}
                        className={`text-sm px-2 py-1 rounded ${
                          isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4">
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Package Highlights:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {holidayPackage.highlights.map((highlight, index) => (
                      <p key={index} className={`text-sm flex items-center gap-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span>✓</span> {highlight}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div className="mt-4">
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Activities:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {holidayPackage.activities.map((activity, index) => (
                      <span
                        key={index}
                        className={`text-sm px-2 py-1 rounded ${
                          isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Start Dates */}
                <div className="mt-4">
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Upcoming Dates:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {holidayPackage.startDates.map((date, index) => (
                      <span
                        key={index}
                        className={`text-sm px-2 py-1 rounded ${
                          isDarkMode ? 'bg-[#2d3348] text-white' : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {new Date(date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Book Now Button */}
                <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        );
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      default:
        return null;
    }
  };

  // Apply zoom level to main content
  const contentStyle = {
    zoom: `${zoomLevel}%`,
  };

  // Add animation variants
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
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.2 }
    }
  };

<<<<<<< HEAD
  // Function to determine if search section should be shown
  const shouldShowSearchSection = () => {
    const path = location.pathname;
    const currentPath = path.split('/').pop();
    // Show on flights, trains pages only (not buses)
    if (path.includes('/flights') || currentPath === 'flights') {
      return true;
    }
    if (path.includes('/trains') || currentPath === 'trains') {
      return true;
    }
    // For internal navigation using activeSection/activeService
    if (activeSection === 'service' && (activeService === 'flights' || activeService === 'trains')) {
      return true;
    }
    return false;
  }

  // Render dashboard view with welcome message and service cards
  const renderDashboardView = () => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              isDarkMode 
                ? 'bg-[#1a1e2e] border-[#2d3348]' 
                : 'bg-white/70 hover:bg-white border-white/20'
            } rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border`}
          >
            <div className="text-center">
              <h1 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Welcome to TapNTrip
              </h1>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Your one-stop destination for all your travel needs
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.slice(1).map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.05 }}
                    className={`${
                      isDarkMode 
                        ? 'bg-gray-800 hover:bg-gray-700' 
                        : 'bg-white hover:bg-gray-50'
                    } p-6 rounded-xl shadow-md cursor-pointer`}
                    onClick={() => {
                      if (service.id === 'dashboard') {
                        navigate('/customer-dashboard');
                        setActiveSection('dashboard');
                      } else if (service.id === 'my-bookings') {
                        navigate('/my-bookings');
                        setActiveSection('my-bookings');
                      } else if (service.id === 'profile') {
                        navigate('/profile');
                        setActiveSection('profile');
                      } else if (service.id === 'rewards') {
                        navigate('/rewards');
                        setActiveSection('rewards');
                      } else if (service.id === 'health-accessibility') {
                        setActiveSection('health-accessibility');
                      } else if (service.id === 'journal') {
                        setActiveSection('journal');
                      } else if (service.id === 'assistant') {
                        setActiveSection('assistant');
                      } else if (service.id === 'family-location') {
                        setActiveSection('family-location');
                      } else if (service.id === 'reminders') {
                        setActiveSection('reminders');
                      } else if (service.id === 'tour-guides') {
                        setActiveSection('tour-guides');
                      } else if ([
                        'emergency',
                        'trip-planner',
                        'accessibility',
                      ].includes(service.id)) {
                        setActiveSection(service.id);
                      } else {
                        navigate(`/${service.id}`);
                        setActiveService(service.id);
                        setActiveSection('service');
                      }
                    }}
                  >
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {service.label}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Browse {service.label.toLowerCase()} and book your journey
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
  };

  // Render rewards view
  const renderRewardsView = () => {
    if (rewardsLoading) return <div>Loading rewards...</div>;
    if (rewardsError) return <div className="text-red-500">{rewardsError}</div>;
    if (!userRewards) return <div>No rewards data found.</div>;
        return (
            <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Rewards Header */}
        <div className={`${
                isDarkMode 
                  ? 'bg-[#1a1e2e] border-[#2d3348]' 
                  : 'bg-white/70 hover:bg-white border-white/20'
        } rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-3xl">
                🏆
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {t('rewards.myRewards')}
                </h2>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('rewards.earnPoints')}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => setShowRewardsModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md"
              >
                {t('rewards.howRewardsWork')}
              </button>
            </div>
          </div>
        </div>

        {/* Points and Tier Card */}
        <div className={`${
          isDarkMode 
            ? 'bg-[#1a1e2e] border-[#2d3348]' 
            : 'bg-white/70 hover:bg-white border-white/20'
        } rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Points Card */}
            <motion.div 
                      whileHover={{ scale: 1.02 }}
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-blue-50'
              } p-6 rounded-xl shadow-md`}
            >
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('rewards.yourPoints')}
              </h3>
              <div className="flex items-end space-x-2">
                <span className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userRewards.points}
                </span>
                <span className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('rewards.points')}
                </span>
                </div>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {userRewards.pointsToNextTier} more points to reach {userRewards.nextTier}
              </p>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${(userRewards.points / (userRewards.points + userRewards.pointsToNextTier)) * 100}%` }}
                ></div>
              </div>
            </motion.div>

            {/* Tier Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`${
                isDarkMode ? 'bg-gray-800' : 'bg-blue-50'
              } p-6 rounded-xl shadow-md`}
            >
              <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t('rewards.yourTier')}
              </h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white text-xl">
                  {userRewards.tier === 'Silver' ? '🥈' : '🥇'}
                </div>
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userRewards.tier}
                </span>
              </div>
              <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('rewards.nextTier')}: {userRewards.nextTier}
              </p>
            </motion.div>
                                </div>
                              </div>

        {/* Benefits */}
        <div className={`${
          isDarkMode 
            ? 'bg-[#1a1e2e] border-[#2d3348]' 
            : 'bg-white/70 hover:bg-white border-white/20'
        } rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border`}>
          <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('rewards.yourBenefits')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRewards.benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg ${
                  benefit.locked 
                    ? isDarkMode ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-100 text-gray-500' 
                    : isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                } relative`}
              >
                {benefit.locked && (
                  <div className="absolute top-2 right-2">
                    <span className="text-lg">🔒</span>
                        </div>
                      )}
                <div className="flex items-center space-x-2">
                  <span className={`text-sm px-2 py-1 rounded ${
                    benefit.tier === 'Silver' 
                      ? 'bg-gray-200 text-gray-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {benefit.tier}
                  </span>
                </div>
                <p className="mt-2">{benefit.benefit}</p>
              </motion.div>
            ))}
          </div>
                    </div>

        {/* Recent Activity */}
        <div className={`${
                          isDarkMode 
            ? 'bg-[#1a1e2e] border-[#2d3348]' 
            : 'bg-white/70 hover:bg-white border-white/20'
        } rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border`}>
          <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {t('rewards.recentActivity')}
          </h3>
          <div className="space-y-3">
            {userRewards.history.map(item => (
              <motion.div 
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className={`${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } p-4 rounded-lg shadow-sm flex justify-between items-center`}
              >
                                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item.description}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(item.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                                  </p>
                                </div>
                <div className={`text-lg font-bold ${item.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.points > 0 ? '+' : ''}{item.points}
                              </div>
              </motion.div>
                          ))}
                    </div>
                  </div>

        {/* Rewards Modal */}
        {showRewardsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`${
                isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white text-gray-900'
              } rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">How Rewards Work</h2>
                <button 
                  onClick={() => setShowRewardsModal(false)}
                  className="text-2xl hover:text-gray-500 transition-colors"
                >
                  &times;
                </button>
                  </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Earning Points</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Earn points with every booking you make on TapNTrip:
                  </p>
                  <ul className={`list-disc pl-5 mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>Flights: 10 points per ₹100 spent</li>
                    <li>Hotels: 5 points per ₹100 spent</li>
                    <li>Trains & Buses: 3 points per ₹100 spent</li>
                    <li>Special promotions: Bonus points during sales</li>
                  </ul>
                    </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Tier Benefits</h3>
                  <div className="space-y-3">
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl">🥈</span>
                        <h4 className="font-bold">Silver Tier (0-3,000 points)</h4>
                      </div>
                      <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li>Priority check-in</li>
                        <li>10% discount on hotel bookings</li>
                        <li>Extra baggage allowance</li>
                      </ul>
                </div>

                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xl">🥇</span>
                        <h4 className="font-bold">Gold Tier (3,000+ points)</h4>
                </div>
                      <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <li>All Silver benefits</li>
                        <li>Lounge access</li>
                        <li>15% discount on all bookings</li>
                        <li>Free cancellation</li>
                      </ul>
              </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Redeeming Points</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    You can redeem your points for:
                  </p>
                  <ul className={`list-disc pl-5 mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <li>Flight discounts</li>
                    <li>Hotel stays</li>
                    <li>Seat upgrades</li>
                    <li>Exclusive experiences</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setShowRewardsModal(false)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                >
                  Got it
                </button>
              </div>
                  </motion.div>
              </div>
        )}
            </motion.div>
    );
  };

  // Render the main content based on active section
  const renderMainContent = () => {
    if (activeSection === 'dashboard') {
      return renderDashboardView();
    }
    switch (activeSection) {
      case 'profile':
        return <CustomerProfile />;
      case 'my-bookings':
        return <MyBookings />;
      case 'rewards':
        return renderRewardsView();
      case 'service':
        return (
          <div className="space-y-6">
            {/* Search Section - conditionally rendered */}
            {shouldShowSearchSection() && (
              <SearchSection
                tripType={tripType}
                setTripType={setTripType}
                fromQuery={fromQuery}
                setFromQuery={setFromQuery}
                toQuery={toQuery}
                setToQuery={setToQuery}
                departureDate={departureDate}
                setDepartureDate={setDepartureDate}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                showFromSuggestions={showFromSuggestions}
                setShowFromSuggestions={setShowFromSuggestions}
                showToSuggestions={showToSuggestions}
                setShowToSuggestions={setShowToSuggestions}
                getFilteredCities={getFilteredCities}
                handleCitySelect={handleCitySelect}
                handleFromInputChange={handleFromInputChange}
                handleToInputChange={handleToInputChange}
                handleDepartureDateChange={handleDepartureDateChange}
                getMinReturnDate={getMinReturnDate}
                fromRef={fromRef}
                toRef={toRef}
                cardVariants={cardVariants}
              />
            )}

            {/* Service Data */}
            {renderServiceData()}
          </div>
        );
      case 'health-accessibility':
        return <HealthAccessibility />;
      case 'emergency':
        return <EmergencyPage />;
      case 'journal':
        return <MyJournal />;
      case 'accessibility':
        return <AccessibilityFilters filters={accessibilityFilters} onChange={e => setAccessibilityFilters({ ...accessibilityFilters, [e.target.name]: e.target.checked })} />;
      case 'assistant':
        return <RealTimeAssistant />;
      case 'family-location':
        return <FamilyLocationSharing />;
      case 'reminders':
        return <Reminders />;
      case 'tour-guides':
        return <TourGuidePage />;
      default:
        return null;
    }
  };

  // Handler to trigger emergency mode from floating button
  const handleShowEmergency = () => setEmergencyMode(true);
  const handleCloseEmergency = () => setEmergencyMode(false);

  // Add logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    if (activeService === 'hotels') {
      setHotelsLoading(true);
      setHotelsError(null);
      getHotels()
        .then(data => setHotels(data))
        .catch(() => setHotelsError('Failed to load hotels.'))
        .finally(() => setHotelsLoading(false));
    }
  }, [activeService]);

  useEffect(() => {
    if (activeService === 'buses') {
      setBusesLoading(true);
      setBusesError(null);
      getBuses()
        .then(data => setBuses(data))
        .catch(() => setBusesError('Failed to load buses.'))
        .finally(() => setBusesLoading(false));
    }
  }, [activeService]);

  // Add state for booking modal
  const [showHotelBooking, setShowHotelBooking] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelBookingData, setHotelBookingData] = useState({ name: '', contact: '', checkin: '', checkout: '' });
  const [hotelBookingStatus, setHotelBookingStatus] = useState('');

=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#1a1e2e]' : 'bg-white'}`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
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
            <div className="flex-1 px-4 flex justify-end">
              <div className="flex items-center space-x-4">
<<<<<<< HEAD
                {/* Language Selector */}
                <LanguageSelector isDarkMode={isDarkMode} />
                
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                {/* Zoom Controls */}
                <div className="flex items-center space-x-2 mr-4 bg-white/20 backdrop-blur-sm rounded-lg p-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={decreaseZoom}
                    className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-colors duration-200`}
<<<<<<< HEAD
                    title={t('common.zoomOut')}
=======
                    title="Zoom Out"
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                  >
                    <span className="text-xl">−</span>
                  </motion.button>
                  <span className="text-sm font-medium">{zoomLevel}%</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={increaseZoom}
                    className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-colors duration-200`}
<<<<<<< HEAD
                    title={t('common.zoomIn')}
=======
                    title="Zoom In"
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                  >
                    <span className="text-xl">+</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetZoom}
                    className={`text-sm px-2 py-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-colors duration-200`}
<<<<<<< HEAD
                    title={t('common.reset')}
                  >
                    {t('common.reset')}
=======
                    title="Reset Zoom"
                  >
                    Reset
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                  </motion.button>
                </div>
                
                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg ${isDarkMode ? 'bg-[#1a1e2e] hover:bg-[#2d3348]' : 'bg-blue-50 hover:bg-blue-100'} transition-all duration-200`}
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {isDarkMode ? '🌞' : '🌙'}
                </motion.button>
<<<<<<< HEAD
                {/* Logout Button */}
                <button
=======
                
                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
<<<<<<< HEAD
                </button>
=======
                </motion.button>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex">
<<<<<<< HEAD
        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-64 min-h-screen bg-white/30 dark:bg-[#23263a]/60 backdrop-blur-xl rounded-2xl m-4 shadow-2xl border border-white/20 dark:border-[#2d3348] flex flex-col items-stretch transition-all duration-300`}
        >
          <div className="p-4">
            <h2 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Navigation
            </h2>
            
            {/* Navigation Menu */}
            <nav className="space-y-2">
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                  whileHover={{ scale: 1.04, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                    setActiveSection(service.id);
                        if (service.id === 'dashboard') {
                          setActiveSection('dashboard');
                        } else if (service.id === 'my-bookings') {
                          setActiveSection('my-bookings');
                        } else if (service.id === 'profile') {
                          setActiveSection('profile');
                        } else if (service.id === 'rewards') {
                          setActiveSection('rewards');
                        } else if (service.id === 'health-accessibility') {
                          setActiveSection('health-accessibility');
                        } else if (service.id === 'journal') {
                          setActiveSection('journal');
                        } else if (service.id === 'assistant') {
                          setActiveSection('assistant');
                        } else if (service.id === 'family-location') {
                          setActiveSection('family-location');
                        } else if (service.id === 'reminders') {
                          setActiveSection('reminders');
                        } else if (service.id === 'tour-guides') {
                          setActiveSection('tour-guides');
                    } else if ([
                      'flights', 'hotels', 'trains', 'buses', 'packages', 'activities'
                    ].includes(service.id)) {
                          setActiveService(service.id);
                          setActiveSection('service');
                        }
                      }}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left text-lg font-semibold transition-all duration-200 relative overflow-hidden group
                    ${activeSection === service.id || (activeSection === 'service' && activeService === service.id)
                      ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-[#2d3348]/60 hover:text-blue-700 dark:hover:text-blue-300'}
                  `}
                >
                  {/* Active indicator bar */}
                  <span className={`absolute left-0 top-2 bottom-2 w-1 rounded-full transition-all duration-300
                    ${activeSection === service.id || (activeSection === 'service' && activeService === service.id)
                      ? 'bg-gradient-to-b from-blue-400 to-pink-400 opacity-100'
                      : 'opacity-0'}
                  `}></span>
                  <span className="text-2xl flex-shrink-0">{service.icon}</span>
                  <span className="truncate">{service.label}</span>
                    </motion.button>
                  ))}
            </nav>
                    </div>
        </motion.aside>

              {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {renderMainContent()}
                    </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
      {activeSection !== 'emergency' && !emergencyMode && (
        <EmergencyButton onShowEmergency={handleShowEmergency} />
      )}
      {emergencyMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20000, background: 'rgba(0,0,0,0.7)' }}>
          <EmergencyPage onClose={handleCloseEmergency} />
        </div>
      )}
=======
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 py-6" style={contentStyle}>
            <div className="flex gap-6">
              {/* Left Sidebar */}
              <div className="w-[280px]">
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className={`w-full ${
                    isDarkMode 
                      ? 'bg-[#1a1e2e] border-[#2d3348]' 
                      : 'bg-white/70 hover:bg-white border-white/20'
                  } rounded-2xl p-4 h-fit shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border`}
                >
                  {services.map((service) => (
                    <motion.button
                      key={service.id}
                      variants={itemVariants}
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveService(service.id)}
                      className={`w-full flex items-center p-3 rounded-xl mb-2 transition-all duration-200 ${
                        activeService === service.id 
                          ? isDarkMode 
                            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white' 
                            : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-purple-200'
                          : isDarkMode
                            ? 'text-gray-300 hover:bg-[#2d3348]'
                            : 'text-gray-600 hover:bg-white/90'
                      }`}
                    >
                      <motion.span 
                        className="text-2xl mr-3"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        {service.icon}
                      </motion.span>
                      <span className="text-sm font-medium">{service.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Main Content Area */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex-1 min-w-0 space-y-6"
              >
                {/* Search Section */}
                <motion.div 
                  variants={cardVariants}
                  className={`${
                    isDarkMode 
                      ? 'bg-[#1a1e2e] border-[#2d3348]' 
                      : 'bg-white/70 hover:bg-white border-white/20'
                  } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border p-6 relative`}
                >
                  {/* Background decoration */}
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#1a1e2e]' : 'bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50'} pointer-events-none`}></div>
                  
                  {/* Content wrapper */}
                  <div className="relative z-10">
                    {/* Trip Type Selection */}
                    <div className={`flex gap-6 mb-8 p-2 ${isDarkMode ? 'bg-[#1a1e2e]' : 'bg-white/50'} backdrop-blur-sm rounded-xl inline-block`}>
                      {['oneWay', 'roundTrip', 'multiCity'].map((type) => (
                        <motion.label
                          key={type}
                          whileHover={{ scale: 1.02 }}
                          className={`flex items-center gap-2 cursor-pointer ${
                            tripType === type 
                              ? 'text-purple-600 font-medium' 
                              : isDarkMode ? 'text-white' : 'text-gray-600'
                          }`}
                        >
                          <input
                            type="radio"
                            checked={tripType === type}
                            onChange={() => setTripType(type)}
                            className="form-radio text-purple-500 focus:ring-purple-500"
                          />
                          <span className="capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </motion.label>
                      ))}
                    </div>

                    {/* Search Fields */}
                    <div className="relative">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* From Field */}
                        <div ref={fromRef} className="relative">
                          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            From
                          </label>
                          <input
                            type="text"
                            value={fromQuery}
                            onChange={handleFromInputChange}
                            onFocus={() => setShowFromSuggestions(true)}
                            placeholder="City or Airport"
                            className={`w-full p-3 rounded-lg ${
                              isDarkMode 
                                ? 'bg-[#2d3348] text-white placeholder-gray-400 border-[#3d4458]' 
                                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                            } border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                          />
                          {/* From Suggestions */}
                          {showFromSuggestions && fromQuery && (
                            <div className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg ${
                              isDarkMode ? 'bg-[#2d3348] border-[#3d4458]' : 'bg-white border-gray-200'
                            } border overflow-hidden`}>
                              {getFilteredCities(fromQuery).map((item, index) => (
                                <motion.button
                                  key={`${item.code}-${index}`}
                                  whileHover={{ backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)' }}
                                  onClick={() => handleCitySelect(item, 'from')}
                                  className={`w-full text-left p-3 ${
                                    isDarkMode ? 'text-white hover:bg-blue-900/10' : 'text-gray-900 hover:bg-blue-50'
                                  } transition-colors duration-150`}
                                >
                                  <div className="flex items-start">
                                    <span className="text-lg mr-2">✈️</span>
                                    <div>
                                      <p className="font-medium">{item.cityName}</p>
                                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {item.airportName} ({item.code})
                                      </p>
                                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {item.state}
                                      </p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* To Field */}
                        <div ref={toRef} className="relative">
                          <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            To
                          </label>
                          <input
                            type="text"
                            value={toQuery}
                            onChange={handleToInputChange}
                            onFocus={() => setShowToSuggestions(true)}
                            placeholder="City or Airport"
                            className={`w-full p-3 rounded-lg ${
                              isDarkMode 
                                ? 'bg-[#2d3348] text-white placeholder-gray-400 border-[#3d4458]' 
                                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                            } border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                          />
                          {/* To Suggestions */}
                          {showToSuggestions && toQuery && (
                            <div className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg ${
                              isDarkMode ? 'bg-[#2d3348] border-[#3d4458]' : 'bg-white border-gray-200'
                            } border overflow-hidden`}>
                              {getFilteredCities(toQuery).map((item, index) => (
                                <motion.button
                                  key={`${item.code}-${index}`}
                                  whileHover={{ backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)' }}
                                  onClick={() => handleCitySelect(item, 'to')}
                                  className={`w-full text-left p-3 ${
                                    isDarkMode ? 'text-white hover:bg-blue-900/10' : 'text-gray-900 hover:bg-blue-50'
                                  } transition-colors duration-150`}
                                >
                                  <div className="flex items-start">
                                    <span className="text-lg mr-2">✈️</span>
                                    <div>
                                      <p className="font-medium">{item.cityName}</p>
                                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {item.airportName} ({item.code})
                                      </p>
                                      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                        {item.state}
                                      </p>
                                    </div>
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Date Fields */}
                      <div className="relative">
                        <label className={`block text-sm font-medium ${
                          isDarkMode ? 'text-white' : 'text-gray-600'
                        } mb-2`}>
                          Departure
                        </label>
                        <motion.div
                          whileFocus={{ scale: 1.02 }}
                          className="relative"
                        >
                          <input
                            type="date"
                            value={departureDate}
                            onChange={(e) => handleDepartureDateChange(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className={`w-full p-4 rounded-xl ${
                              isDarkMode 
                                ? 'bg-[#1a1e2e] border-[#2d3348] text-white' 
                                : 'bg-white/70 border-transparent focus:bg-white'
                            } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-[0_2px_10px_rgb(0,0,0,0.04)]`}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">📅</div>
                        </motion.div>
                      </div>

                      {tripType === 'roundTrip' && (
                        <div className="relative">
                          <label className={`block text-sm font-medium ${
                            isDarkMode ? 'text-white' : 'text-gray-600'
                          } mb-2`}>
                            Return
                          </label>
                          <motion.div
                            whileFocus={{ scale: 1.02 }}
                            className="relative"
                          >
                            <input
                              type="date"
                              value={returnDate}
                              onChange={(e) => setReturnDate(e.target.value)}
                              min={getMinReturnDate()}
                              className={`w-full p-4 rounded-xl ${
                                isDarkMode 
                                  ? 'bg-[#1a1e2e] border-[#2d3348] text-white' 
                                  : 'bg-white/70 border-transparent focus:bg-white'
                              } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-[0_2px_10px_rgb(0,0,0,0.04)]`}
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">📅</div>
                          </motion.div>
                        </div>
                      )}
                    </div>

                    {/* Search Button */}
                    <div className="mt-8 flex justify-center">
                      <motion.button
                        whileHover={{ 
                          scale: 1.02,
                          boxShadow: '0 8px 30px rgba(147, 51, 234, 0.2)'
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white px-12 py-4 rounded-xl text-lg font-medium transform transition-all duration-200 shadow-lg hover:shadow-xl overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center">
                          <span>Search</span>
                          <span className="ml-2">🔍</span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Results Section */}
                <motion.div 
                  variants={cardVariants}
                  className={`${
                    isDarkMode 
                      ? 'bg-[#1a1e2e] border-[#2d3348]' 
                      : 'bg-white/70 hover:bg-white border-white/20'
                  } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border p-6 relative`}
                >
                  {/* Background decoration */}
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-[#1a1e2e]' : 'bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50'} pointer-events-none`}></div>
                  
                  {/* Content wrapper */}
                  <div className="relative z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeService}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {renderServiceData()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <RightPanel />
      </div>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
    </div>
  );
};

export default CustomerDashboard; 