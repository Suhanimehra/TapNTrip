import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileService } from '../../../services/profileService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { FaUserCircle } from 'react-icons/fa';
import { db } from '../../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

// --- GuideProfile: Modern, grouped, robust profile for guides ---
=======

>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
const GuideProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

<<<<<<< HEAD
  // --- Load Profile ---
  useEffect(() => {
=======
  useEffect(() => {
    console.log('GuideProfile: user', user, 'authLoading:', authLoading);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
    if (!authLoading) {
      if (user && user.uid) {
        loadProfile();
      } else {
<<<<<<< HEAD
=======
        console.warn('GuideProfile: No user logged in after auth loading.');
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
      const profileData = await profileService.getProfile(user.uid, 'guide');
      let updatedProfile = { ...profileData };
      // Prefill from users collection if profile is missing key info
      if (!profileData.firstName || !profileData.lastName || !profileData.phone) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          updatedProfile = {
            ...updatedProfile,
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phone: userData.mobile || '',
            email: userData.email || updatedProfile.email || '',
          };
        }
      }
      // Prefill guideName if missing
      if (!updatedProfile.guideName && (updatedProfile.firstName || updatedProfile.lastName)) {
        updatedProfile.guideName = `${updatedProfile.firstName || ''} ${updatedProfile.lastName || ''}`.trim();
      }
      // Ensure array fields are arrays
      updatedProfile.languages = Array.isArray(updatedProfile.languages) ? updatedProfile.languages : [];
      updatedProfile.specialties = Array.isArray(updatedProfile.specialties) ? updatedProfile.specialties : [];
      setProfile(updatedProfile);
    } catch (error) {
      toast.error('Failed to load profile');
=======
      console.log('GuideProfile: Attempting to load profile for userId:', user.uid);
      const profileData = await profileService.getProfile(user.uid, 'guide');
      // Ensure array fields are arrays, even if they come back as null/undefined from Firestore
      const sanitizedProfileData = {
        ...profileData,
        languages: Array.isArray(profileData.languages) ? profileData.languages : [],
        specialties: Array.isArray(profileData.specialties) ? profileData.specialties : [],
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

<<<<<<< HEAD
  // --- Input Change Handler ---
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
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

<<<<<<< HEAD
  // --- Save Profile ---
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
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

<<<<<<< HEAD
  // --- Delete Profile ---
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        await profileService.deleteProfile(user.uid);
        toast.success('Profile deleted successfully.');
        navigate('/login');
      } catch (error) {
        toast.error('Failed to delete profile.');
<<<<<<< HEAD
=======
        console.error('Error deleting profile:', error);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      } finally {
        setIsLoading(false);
      }
    }
  };

<<<<<<< HEAD
  // --- Avatar Initials ---
  const getInitials = () => {
    if (profile?.firstName || profile?.lastName) {
      return `${(profile.firstName || '')[0] || ''}${(profile.lastName || '')[0] || ''}`.toUpperCase() || 'TG';
    }
    return 'TG';
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
        {/* Header with Avatar and Edit Button */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-400">
              <FaUserCircle className="w-20 h-20 text-gray-400 dark:text-gray-500 absolute" style={{zIndex:0}} />
              <span className="relative z-10">{getInitials()}</span>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Tour Guide Profile</h1>
            <p className="text-gray-500 dark:text-gray-400">Keep your profile up to date for better trust and payouts.</p>
          </div>
=======
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tour Guide Profile</h1>
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
          {/* --- Personal Info --- */}
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
          {/* Guide Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Guide Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Guide Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="guideName"
                    value={profile.guideName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.guideName}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Years of Experience
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="experience"
                    value={profile.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    min="0"
                  />
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{profile.experience} years</p>
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
                  Languages
                </label>
                {isEditing ? (
                  <select
                    name="languages"
                    value={profile.languages || []}
                    onChange={handleInputChange}
                    multiple
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                  </select>
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{(profile.languages || []).join(', ') || 'N/A'}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-lg font-semibold mb-2">
                  Specialties
                </label>
                {isEditing ? (
                  <select
                    name="specialties"
                    value={profile.specialties || []}
                    onChange={handleInputChange}
                    multiple
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Heritage Tours">Heritage Tours</option>
                    <option value="Food Tours">Food Tours</option>
                    <option value="Adventure Tours">Adventure Tours</option>
                    <option value="Cultural Tours">Cultural Tours</option>
                    <option value="Nature Tours">Nature Tours</option>
                  </select>
                ) : (
                  <p className="text-lg text-gray-900 dark:text-white">{(profile.specialties || []).join(', ') || 'N/A'}</p>
                )}
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* --- Guide Info --- */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Guide Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Experience (years) <span className="text-red-500">*</span></label>
                <input type="number" name="experience" value={profile.experience || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required={isEditing} disabled={!isEditing} min="0" />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">License Number <span className="text-red-500">*</span></label>
                <input type="text" name="licenseNumber" value={profile.licenseNumber || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required={isEditing} disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Languages <span className="text-red-500">*</span></label>
                <select name="languages" value={profile.languages || []} onChange={handleInputChange} multiple className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required={isEditing} disabled={!isEditing}>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="French">French</option>
                  <option value="Spanish">Spanish</option>
                  <option value="German">German</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Arabic">Arabic</option>
                </select>
                {!isEditing && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(profile.languages || []).map((lang, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-md text-sm">{lang}</span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Specialties <span className="text-red-500">*</span></label>
                <select name="specialties" value={profile.specialties || []} onChange={handleInputChange} multiple className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required={isEditing} disabled={!isEditing}>
                  <option value="Heritage Tours">Heritage Tours</option>
                  <option value="Food Tours">Food Tours</option>
                  <option value="Adventure Tours">Adventure Tours</option>
                  <option value="Cultural Tours">Cultural Tours</option>
                  <option value="Nature Tours">Nature Tours</option>
                </select>
                {!isEditing && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(profile.specialties || []).map((spec, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-md text-sm">{spec}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Address</label>
                <input type="text" name="address" value={profile.address || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={!isEditing} />
=======
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {/* --- Bank Details --- */}
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
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">GST Number</label>
                <input type="text" name="gstNumber" value={profile.gstNumber || ''} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" disabled={!isEditing} />
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
<<<<<<< HEAD
    </div>
  );
=======
  </div>
);
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
};

export default GuideProfile; 