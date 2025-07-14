import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { profileService } from '../../../services/profileService';
import { packageServicesDB } from '../../../services/database';
import { toast } from 'react-toastify';

const formatINR = (amount) => `₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

const PackageDashboard = ({ setActiveSection }) => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        try {
          const profileData = await profileService.getProfile(user.uid, 'package');
          setProfile(profileData);
          const pkgs = await packageServicesDB.getPackages(user.uid);
          setPackages(pkgs);
        } catch (err) {
          toast.error('Failed to load dashboard data');
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  if (authLoading || loading) return <div>Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Package Provider Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-blue-600 mb-2">{packages.length}</span>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Packages</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-green-600 mb-2">{formatINR(packages.reduce((sum, p) => sum + Number(p.price || 0), 0))}</span>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Value</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-purple-600 mb-2">{profile?.companyName || '-'}</span>
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Company Name</span>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Packages</h3>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {packages.slice(0, 5).map(pkg => (
            <li key={pkg.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
              <span className="font-semibold text-gray-800 dark:text-gray-100">{pkg.name}</span>
              <span className="text-gray-500 dark:text-gray-400">{pkg.destination}</span>
              <span className="text-blue-600 font-bold">{formatINR(pkg.price)}</span>
            </li>
          ))}
        </ul>
        {packages.length === 0 && <div className="text-gray-400 text-center py-8">No packages found.</div>}
      </div>
    </div>
  );
};

export default PackageDashboard; 