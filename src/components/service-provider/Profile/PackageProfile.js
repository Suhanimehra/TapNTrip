import React, { useState, useEffect } from 'react';
import { profileService } from '../../../services/profileService';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';

const PackageProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(true);
        const data = await profileService.getProfile(user.uid, 'package');
        setProfile(data);
        setForm(data);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await profileService.updateProfile(user.uid, form);
      setProfile(form);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Package Provider Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold mb-1">Company Name</label>
          <input name="companyName" value={form.companyName || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Contact Person</label>
          <input name="contactPerson" value={form.contactPerson || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input name="email" value={form.email || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Address</label>
          <input name="address" value={form.address || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">License Number</label>
          <input name="licenseNumber" value={form.licenseNumber || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Website</label>
          <input name="website" value={form.website || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea name="description" value={form.description || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Bank Name</label>
          <input name="bankName" value={form.bankName || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Account Number</label>
          <input name="accountNumber" value={form.accountNumber || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">IFSC Code</label>
          <input name="ifscCode" value={form.ifscCode || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block font-semibold mb-1">GST Number</label>
          <input name="gstNumber" value={form.gstNumber || ''} onChange={handleChange} disabled={!isEditing} className="w-full px-4 py-2 border rounded-lg" />
        </div>
      </div>
      <div className="flex gap-4 mt-8">
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Edit</button>
        ) : (
          <>
            <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded-lg">Save</button>
            <button onClick={() => { setIsEditing(false); setForm(profile); }} className="px-6 py-2 bg-gray-400 text-white rounded-lg">Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageProfile; 