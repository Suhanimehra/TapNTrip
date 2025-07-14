import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaHotel, FaUserShield, FaArrowLeft } from 'react-icons/fa';

const roles = [
  { value: 'customer', label: 'Customer', icon: <FaUser className="text-3xl mr-2" /> },
  { value: 'service_provider', label: 'Service Provider', icon: <FaHotel className="text-3xl mr-2" /> },
  { value: 'admin', label: 'Admin', icon: <FaUserShield className="text-3xl mr-2" /> },
];

const roleToDashboard = {
  customer: '/customer-dashboard',
  admin: '/admin-dashboard',
  guide_provider: '/service-dashboard',
  hotel_provider: '/service-dashboard',
  transport_provider: '/service-dashboard',
  service_provider: '/service-dashboard',
};

export default function RegisterRoleSelect() {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();

  useEffect(() => {
    if (user) {
      // Redirect authenticated users to their dashboard
      const dash = roleToDashboard[userRole] || '/customer-dashboard';
      navigate(dash, { replace: true });
    }
  }, [user, userRole, navigate]);

  const handleSelect = (role) => {
    if (role === 'service_provider') {
      navigate('/register/service-provider', { state: { role } });
    } else {
      navigate('/register/form', { state: { role } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-lg p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="mb-6 text-blue-500 hover:text-blue-700 focus:outline-none flex items-center">
          <FaArrowLeft className="inline mr-1" /> Back
        </button>
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Register for TapNTrip
        </h2>
        <div className="flex flex-col gap-6">
          {roles.map(r => (
            <button
              key={r.value}
              onClick={() => handleSelect(r.value)}
              className="flex items-center justify-start px-6 py-5 rounded-xl font-semibold text-lg shadow-md bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white hover:scale-[1.03] transition-all border-2 border-transparent hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {r.icon} {r.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 