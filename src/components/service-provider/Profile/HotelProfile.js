import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileService } from '../../../services/profileService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { db } from '../../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

const HotelProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Add validation helpers at the top (after imports)
  const nameRegex = /^[A-Za-z\s]{2,50}$/;
  const phoneRegex = /^\d{10,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [validationErrors, setValidationErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (user && user.uid) {
        loadProfile();
      } else {
          toast.error('No user logged in. Please log in to view your profile.');
          setIsLoading(false);
      }
    }
  }, [user, authLoading]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await profileService.getProfile(user.uid, 'hotel');
      // Prefill from users collection if profile is missing key info
      if (!profileData.firstName || !profileData.lastName || !profileData.phone) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfile(prev => ({
            ...prev,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phone: userData.mobile || '',
            email: userData.email || prev.email || '',
          }));
        } else {
          setProfile(profileData);
        }
      } else {
        setProfile(profileData);
      }
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  const validateField = (field, value) => {
    if (field === 'firstName' || field === 'lastName') {
      if (!nameRegex.test(value)) return 'Name must be 2-50 letters or spaces.';
    }
    if (field === 'phone') {
      if (!phoneRegex.test(value)) return 'Phone must be 10-15 digits.';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if ((touched[name] || formSubmitted) && value) {
      setValidationErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    } else {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const value = profile[name];
    setValidationErrors(prev => ({ ...prev, [name]: value ? validateField(name, value) : '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    let errors = {};
    if (!nameRegex.test(profile.firstName)) errors.firstName = 'Name must be 2-50 letters or spaces.';
    if (!nameRegex.test(profile.lastName)) errors.lastName = 'Name must be 2-50 letters or spaces.';
    if (!phoneRegex.test(profile.phone)) errors.phone = 'Phone must be 10-15 digits.';
    if (!emailRegex.test(profile.email)) errors.email = 'Invalid email address.';
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return; // Prevent save if any errors
    try {
      setIsLoading(true);
      await profileService.updateProfile(user.uid, profile);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get initials for avatar
  const getInitials = () => {
    if (profile?.ownerName) {
      return profile.ownerName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (profile?.companyName) {
      return profile.companyName.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return 'HP';
  };

  const filterNameInput = (value) => value.replace(/[^A-Za-z\s]/g, '').slice(0, 50);
  const filterMobileInput = (value) => value.replace(/[^\d]/g, '').slice(0, 10);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load profile</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400">
              <FaUserCircle className="w-20 h-20 text-gray-400 dark:text-gray-500 absolute" style={{zIndex:0}} />
              <span className="relative z-10">{getInitials()}</span>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Hotel Provider Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">Keep your profile up to date for better trust and payouts.</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><FaUserCircle /> Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">First Name <span className="text-red-500">*</span></label>
                <input
                  value={profile.firstName || ''}
                  onChange={e => handleInputChange({ target: { name: 'firstName', value: filterNameInput(e.target.value) } })}
                  onBlur={e => handleInputChange({ target: { name: 'firstName', value: filterNameInput(e.target.value) } })}
                  placeholder="First Name"
                  type="text"
                  maxLength={50}
                  pattern="[A-Za-z\s]{2,50}"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!isEditing}
                />
                {(touched.firstName || formSubmitted) && validationErrors.firstName && <div className="text-red-600 text-xs mt-1">{validationErrors.firstName}</div>}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Last Name <span className="text-red-500">*</span></label>
                <input
                  value={profile.lastName || ''}
                  onChange={e => handleInputChange({ target: { name: 'lastName', value: filterNameInput(e.target.value) } })}
                  onBlur={e => handleInputChange({ target: { name: 'lastName', value: filterNameInput(e.target.value) } })}
                  placeholder="Last Name"
                  type="text"
                  maxLength={50}
                  pattern="[A-Za-z\s]{2,50}"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!isEditing}
                />
                {(touched.lastName || formSubmitted) && validationErrors.lastName && <div className="text-red-600 text-xs mt-1">{validationErrors.lastName}</div>}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Mobile <span className="text-red-500">*</span></label>
                <input
                  value={profile.phone || ''}
                  onChange={e => handleInputChange({ target: { name: 'phone', value: filterMobileInput(e.target.value) } })}
                  onBlur={e => handleInputChange({ target: { name: 'phone', value: filterMobileInput(e.target.value) } })}
                  placeholder="Enter 10-digit mobile number"
                  type="tel"
                  maxLength={10}
                  pattern="\d{10}"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={!isEditing}
                />
                {(touched.phone || formSubmitted) && validationErrors.phone && <div className="text-red-600 text-xs mt-1">{validationErrors.phone}</div>}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={profile.email || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required disabled={!isEditing} />
                {validationErrors.email && <div className="text-red-600 text-xs mt-1">{validationErrors.email}</div>}
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Company Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Company Name <span className="text-red-500">*</span></label>
                <input type="text" name="companyName" value={profile.companyName || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required={isEditing} disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Owner Name <span className="text-red-500">*</span></label>
                <input type="text" name="ownerName" value={profile.ownerName || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required={isEditing} disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Address <span className="text-red-500">*</span></label>
                <input type="text" name="address" value={profile.address || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required={isEditing} disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">License Number <span className="text-red-500">*</span></label>
                <input type="text" name="licenseNumber" value={profile.licenseNumber || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required={isEditing} disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">GST Number</label>
                <input type="text" name="gstNumber" value={profile.gstNumber || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={!isEditing} />
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Bank Details (for payouts)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Bank Name</label>
                <input type="text" name="bankName" value={profile.bankName || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Account Number</label>
                <input type="text" name="accountNumber" value={profile.accountNumber || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">IFSC Code</label>
                <input type="text" name="ifscCode" value={profile.ifscCode || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={!isEditing} />
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end gap-4 mt-8">
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
  </div>
);
};

export default HotelProfile; 