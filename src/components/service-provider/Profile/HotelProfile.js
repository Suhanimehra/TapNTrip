import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileService } from '../../../services/profileService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { FaUserCircle } from 'react-icons/fa';
import { db } from '../../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47

const HotelProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
=======
    console.log('HotelProfile: user', user, 'authLoading:', authLoading);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
    if (!authLoading) {
      if (user && user.uid) {
        loadProfile();
      } else {
<<<<<<< HEAD
=======
          console.warn('HotelProfile: No user logged in after auth loading.');
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
          toast.error('No user logged in. Please log in to view your profile.');
          setIsLoading(false);
      }
    }
  }, [user, authLoading]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
<<<<<<< HEAD
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
=======
      console.log('HotelProfile: Attempting to load profile for userId:', user.uid);
      const profileData = await profileService.getProfile(user.uid, 'hotel');
      // Ensure array fields are arrays, even if they come back as null/undefined from Firestore
      const sanitizedProfileData = {
        ...profileData,
        roomTypes: Array.isArray(profileData.roomTypes) ? profileData.roomTypes : [],
        amenities: Array.isArray(profileData.amenities) ? profileData.amenities : [],
      };
      setProfile(sanitizedProfileData);
    } catch (error) {
      toast.error('Failed to load profile');
      console.error('Error loading profile:', error);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, options } = e.target;
    if (e.target.multiple) {
      const selectedValues = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setProfile(prev => ({
        ...prev,
        [name]: selectedValues
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await profileService.updateProfile(user.uid, profile);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
<<<<<<< HEAD
=======
      console.error('Error updating profile:', error);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        await profileService.deleteProfile(user.uid);
        toast.success('Profile deleted successfully.');
<<<<<<< HEAD
        navigate('/login');
      } catch (error) {
        toast.error('Failed to delete profile.');
=======
        // Optionally, redirect the user after successful deletion
        navigate('/login'); // or a general dashboard
      } catch (error) {
        toast.error('Failed to delete profile.');
        console.error('Error deleting profile:', error);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      } finally {
        setIsLoading(false);
      }
    }
  };

<<<<<<< HEAD
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

=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
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
<<<<<<< HEAD
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
=======
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hotel Profile</h1>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><FaUserCircle /> Personal Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">First Name <span className="text-red-500">*</span></label>
                <input type="text" name="firstName" value={profile.firstName || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Last Name <span className="text-red-500">*</span></label>
                <input type="text" name="lastName" value={profile.lastName || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Mobile <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" value={profile.phone || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={profile.email || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required disabled={!isEditing} />
=======
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Hotel Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Hotel Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Hotel Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="hotelName"
                    value={profile.hotelName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.hotelName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Star Rating
                </label>
                {isEditing ? (
                  <select
                    name="starRating"
                    value={profile.starRating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.starRating} Stars</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Total Rooms
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="totalRooms"
                    value={profile.totalRooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    min="0"
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.totalRooms}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  License Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="licenseNumber"
                    value={profile.licenseNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.licenseNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Room Types
                </label>
                {isEditing ? (
                  <select
                    name="roomTypes"
                    value={profile.roomTypes || []}
                    onChange={handleInputChange}
                    multiple
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Executive">Executive</option>
                    <option value="Standard">Standard</option>
                  </select>
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.roomTypes?.join(', ') || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Amenities
                </label>
                {isEditing ? (
                  <select
                    name="amenities"
                    value={profile.amenities || []}
                    onChange={handleInputChange}
                    multiple
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Pool">Pool</option>
                    <option value="Spa">Spa</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Gym">Gym</option>
                    <option value="Parking">Parking</option>
                    <option value="WiFi">WiFi</option>
                  </select>
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.amenities?.join(', ') || 'N/A'}</p>
                )}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
              </div>
            </div>
          </div>

<<<<<<< HEAD
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
=======
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Owner Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="ownerName"
                    value={profile.ownerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.ownerName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Address
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.address}</p>
                )}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
              </div>
            </div>
          </div>

<<<<<<< HEAD
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
=======
          {/* Bank Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Bank Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Bank Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="bankName"
                    value={profile.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.bankName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Account Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="accountNumber"
                    value={profile.accountNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.accountNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  IFSC Code
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="ifscCode"
                    value={profile.ifscCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.ifscCode}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  GST Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="gstNumber"
                    value={profile.gstNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.gstNumber}</p>
                )}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
              </div>
            </div>
          </div>

          {isEditing && (
<<<<<<< HEAD
            <div className="flex justify-end gap-4 mt-8">
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
=======
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mr-4"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleDeleteProfile}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                disabled={isLoading}
              >
                Delete Profile
              </button>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
            </div>
          )}
        </form>
      </div>
  </div>
);
};

export default HotelProfile; 