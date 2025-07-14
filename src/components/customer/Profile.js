import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdSave, MdCloudUpload } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useTheme } from '../../contexts/ThemeContext';
import MyBookings from './MyBookings';
// import MyJournal from './MyJournal';
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Add validation helpers at the top (after imports)
const nameRegex = /^[A-Za-z\s]{2,50}$/;
const phoneRegex = /^\d{10,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Add these helper functions at the top of the component:
const filterNameInput = (value) => value.replace(/[^A-Za-z\s]/g, '').slice(0, 50);
const filterMobileInput = (value) => value.replace(/[^\d]/g, '').slice(0, 10);

const CustomerProfile = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    preferredLanguage: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    travelPreferences: {
      preferredDestinations: [],
      accommodationType: '',
      travelStyle: '',
      dietaryRestrictions: ''
    },
    idProof: {
      type: '',
      number: ''
    },
    profilePicture: ''
  });
  const [activeTab, setActiveTab] = useState('profile');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          let data = docSnap.exists() ? docSnap.data() : {};
          // Fallback to Google Auth if missing
          if (!data.firstName || !data.lastName) {
            let firstName = data.firstName || '';
            let lastName = data.lastName || '';
            if (user.displayName) {
              const parts = user.displayName.split(' ');
              firstName = firstName || parts[0] || '';
              lastName = lastName || parts.slice(1).join(' ') || '';
            }
            data = { ...data, firstName, lastName };
          }
          setProfileData(prevData => ({
            ...prevData,
            ...data
          }));
        } catch (error) {
          console.error('Error fetching profile:', error);
          toast.error('Failed to load profile data');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const validateField = (field, value) => {
    if (field === 'firstName' || field === 'lastName') {
      if (!nameRegex.test(value)) return 'Name must be 2-50 letters or spaces.';
    }
    if (field === 'phone') {
      if (!phoneRegex.test(value)) return 'Phone must be 10-15 digits.';
    }
    return '';
  };
  const validateEmergencyField = (field, value) => {
    if (field === 'name' || field === 'relationship') {
      if (!nameRegex.test(value)) return 'Must be 2-50 letters or spaces.';
    }
    if (field === 'phone') {
      if (!phoneRegex.test(value)) return 'Phone must be 10-15 digits.';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
      // Validate emergency contact fields if touched or after submit
      if ((touched[`${section}.${field}`] || formSubmitted) && value) {
        setValidationErrors(prev => ({
          ...prev,
          [`${section}.${field}`]: validateEmergencyField(field, value)
        }));
      } else {
        setValidationErrors(prev => ({ ...prev, [`${section}.${field}`]: '' }));
      }
    } else {
      setProfileData(prev => ({ ...prev, [name]: value }));
      // Validate main fields if touched or after submit
      if ((touched[name] || formSubmitted) && value) {
        setValidationErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
      } else {
        setValidationErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    let value;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      value = profileData[section][field];
      setValidationErrors(prev => ({
        ...prev,
        [name]: value ? validateEmergencyField(field, value) : ''
      }));
    } else {
      value = profileData[name];
      setValidationErrors(prev => ({
        ...prev,
        [name]: value ? validateField(name, value) : ''
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      setUploading(true);
      setUploadProgress(0);
      const storage = getStorage();
      const fileRef = storageRef(storage, `profile_pictures/${user.uid}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setUploading(false);
          toast.error('Failed to upload image');
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setProfileData(prev => ({ ...prev, profilePicture: downloadURL }));
          setUploading(false);
          setUploadProgress(0);
          toast.success('Profile picture updated!');
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    let errors = {};
    if (!nameRegex.test(profileData.firstName)) errors.firstName = 'Name must be 2-50 letters or spaces.';
    if (!nameRegex.test(profileData.lastName)) errors.lastName = 'Name must be 2-50 letters or spaces.';
    if (!phoneRegex.test(profileData.phone)) errors.phone = 'Phone must be 10-15 digits.';
    if (!emailRegex.test(profileData.email)) errors.email = 'Invalid email address.';
    // Emergency contact validation
    if (profileData.emergencyContact) {
      if (!nameRegex.test(profileData.emergencyContact.name)) errors['emergencyContact.name'] = 'Must be 2-50 letters or spaces.';
      if (!phoneRegex.test(profileData.emergencyContact.phone)) errors['emergencyContact.phone'] = 'Phone must be 10-15 digits.';
      if (!nameRegex.test(profileData.emergencyContact.relationship)) errors['emergencyContact.relationship'] = 'Must be 2-50 letters or spaces.';
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return; // Prevent save if any errors
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), profileData, { merge: true });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  const tabs = [
    { id: 'profile', label: 'Profile Details', icon: '👤' },
    { id: 'bookings', label: 'My Bookings', icon: '🎫' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' },
    { id: 'journal', label: 'My Journal', icon: '📓' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bookings':
        return <MyBookings />;
      case 'profile':
        return (
          <div className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} rounded-lg shadow-md p-6`}>
            <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h2>
              <div className="flex gap-2">
                <button
                  type="submit"
                  form="profile-form"
                  className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                  <MdSave className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            <form id="profile-form" className="space-y-6" onSubmit={handleSubmit}>
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
                  {profileData.profilePicture ? (
                    <img
                      src={profileData.profilePicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-300" />
                  )}
                  <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700">
                    <MdCloudUpload className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {uploading && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-sm font-bold rounded-full">
                      {Math.round(uploadProgress)}%
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={e => setProfileData(prev => ({ ...prev, firstName: filterNameInput(e.target.value) }))}
                    onBlur={e => setProfileData(prev => ({ ...prev, firstName: filterNameInput(e.target.value) }))}
                    placeholder="First Name"
                    type="text"
                    maxLength={50}
                    pattern="[A-Za-z\s]{2,50}"
                    className={inputClasses}
                    required
                  />
                  {(touched.firstName || formSubmitted) && validationErrors.firstName && <div className="text-red-600 text-xs mt-1">{validationErrors.firstName}</div>}
                </div>
                <div>
                  <label className={labelClasses}>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={e => setProfileData(prev => ({ ...prev, lastName: filterNameInput(e.target.value) }))}
                    onBlur={e => setProfileData(prev => ({ ...prev, lastName: filterNameInput(e.target.value) }))}
                    placeholder="Last Name"
                    type="text"
                    maxLength={50}
                    pattern="[A-Za-z\s]{2,50}"
                    className={inputClasses}
                    required
                  />
                  {(touched.lastName || formSubmitted) && validationErrors.lastName && <div className="text-red-600 text-xs mt-1">{validationErrors.lastName}</div>}
                </div>
                <div>
                  <label className={labelClasses}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className={inputClasses}
                    readOnly
                  />
                  {validationErrors.email && <div className="text-red-600 text-xs mt-1">{validationErrors.email}</div>}
                </div>
                <div>
                  <label className={labelClasses}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={e => setProfileData(prev => ({ ...prev, phone: filterMobileInput(e.target.value) }))}
                    onBlur={e => setProfileData(prev => ({ ...prev, phone: filterMobileInput(e.target.value) }))}
                    placeholder="Enter 10-digit mobile number"
                    type="tel"
                    maxLength={10}
                    pattern="\d{10}"
                    className={inputClasses}
                    required
                  />
                  {(touched.phone || formSubmitted) && validationErrors.phone && <div className="text-red-600 text-xs mt-1">{validationErrors.phone}</div>}
                </div>

                <div>
                  <label className={labelClasses}>Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Preferred Language</label>
                  <select
                    name="preferredLanguage"
                    value={profileData.preferredLanguage}
                    onChange={handleInputChange}
                    className={inputClasses}
                  >
                    <option value="">Select Language</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="tamil">Tamil</option>
                    <option value="telugu">Telugu</option>
                    <option value="malayalam">Malayalam</option>
                    <option value="kannada">Kannada</option>
                    <option value="bengali">Bengali</option>
                    <option value="marathi">Marathi</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className={labelClasses}>Address</label>
                <textarea
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  rows="3"
                  className={inputClasses}
                />
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClasses}>Contact Name</label>
                    <input
                      type="text"
                      name="emergencyContact.name"
                      value={profileData.emergencyContact.name}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClasses}
                    />
                    {(touched['emergencyContact.name'] || formSubmitted) && validationErrors['emergencyContact.name'] && <div className="text-red-600 text-xs mt-1">{validationErrors['emergencyContact.name']}</div>}
                  </div>
                  <div>
                    <label className={labelClasses}>Contact Phone</label>
                    <input
                      type="tel"
                      name="emergencyContact.phone"
                      value={profileData.emergencyContact.phone}
                      onChange={e => setProfileData(prev => ({ ...prev, emergencyContact: { ...prev.emergencyContact, phone: filterMobileInput(e.target.value) } }))}
                      onBlur={e => setProfileData(prev => ({ ...prev, emergencyContact: { ...prev.emergencyContact, phone: filterMobileInput(e.target.value) } }))}
                      placeholder="Enter 10-digit mobile number"
                      type="tel"
                      maxLength={10}
                      pattern="\d{10}"
                      className={inputClasses}
                    />
                    {(touched['emergencyContact.phone'] || formSubmitted) && validationErrors['emergencyContact.phone'] && <div className="text-red-600 text-xs mt-1">{validationErrors['emergencyContact.phone']}</div>}
                  </div>
                  <div>
                    <label className={labelClasses}>Relationship</label>
                    <input
                      type="text"
                      name="emergencyContact.relationship"
                      value={profileData.emergencyContact.relationship}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={inputClasses}
                    />
                    {(touched['emergencyContact.relationship'] || formSubmitted) && validationErrors['emergencyContact.relationship'] && <div className="text-red-600 text-xs mt-1">{validationErrors['emergencyContact.relationship']}</div>}
                  </div>
                </div>
              </div>

              {/* ID Proof */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">ID Proof</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>ID Type</label>
                    <select
                      name="idProof.type"
                      value={profileData.idProof.type}
                      onChange={handleInputChange}
                      className={inputClasses}
                    >
                      <option value="">Select ID Type</option>
                      <option value="aadhar">Aadhar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="passport">Passport</option>
                      <option value="driving">Driving License</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>ID Number</label>
                    <input
                      type="text"
                      name="idProof.number"
                      value={profileData.idProof.number}
                      onChange={handleInputChange}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>

              {/* Travel Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Travel Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Accommodation Type</label>
                    <select
                      name="travelPreferences.accommodationType"
                      value={profileData.travelPreferences.accommodationType}
                      onChange={handleInputChange}
                      className={inputClasses}
                    >
                      <option value="">Select Accommodation Type</option>
                      <option value="budget">Budget Hotel</option>
                      <option value="luxury">Luxury Hotel</option>
                      <option value="resort">Resort</option>
                      <option value="homestay">Homestay</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Travel Style</label>
                    <select
                      name="travelPreferences.travelStyle"
                      value={profileData.travelPreferences.travelStyle}
                      onChange={handleInputChange}
                      className={inputClasses}
                    >
                      <option value="">Select Travel Style</option>
                      <option value="adventure">Adventure</option>
                      <option value="leisure">Leisure</option>
                      <option value="business">Business</option>
                      <option value="cultural">Cultural</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Dietary Restrictions</label>
                    <input
                      type="text"
                      name="travelPreferences.dietaryRestrictions"
                      value={profileData.travelPreferences.dietaryRestrictions}
                      onChange={handleInputChange}
                      placeholder="e.g., Vegetarian, Vegan, Gluten-free"
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        );
      case 'preferences':
        return (
          <div className={`${isDarkMode ? 'bg-[#1a1e2e] text-white' : 'bg-white'} rounded-lg shadow-md p-6`}>
            <h2 className="text-2xl font-bold mb-6">Preferences</h2>
            {/* Add preferences content here */}
          </div>
        );
      case 'journal':
        return null; // Remove or comment out any usage of <MyJournal /> in the Profile component
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : isDarkMode
                  ? 'bg-[#2d3348] text-gray-300 hover:bg-[#3d4358]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
};

export default CustomerProfile; 