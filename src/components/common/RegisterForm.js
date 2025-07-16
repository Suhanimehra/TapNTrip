import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase-config';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { register, signInWithGoogle } from '../../utils/auth';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaPhone, FaBuilding, FaIdCard, FaCar, FaArrowLeft } from 'react-icons/fa';
import { sendEmailVerification } from 'firebase/auth';

const nameRegex = /^[A-Za-z\s]{2,50}$/;
const phoneRegex = /^\d{10,15}$/;
const emailRegex = /^[^\s@]+@[^"]+\.[^\s@]+$/;

const providerLabels = {
  guide_provider: 'Guide Provider',
  hotel_provider: 'Hotel Provider',
  transport_provider: 'Transport Provider',
  package_provider: 'Package Provider',
};

const roleToDashboard = {
  customer: '/customer-dashboard',
  admin: '/admin-dashboard',
  guide_provider: '/service-dashboard',
  hotel_provider: '/service-dashboard',
  transport_provider: '/service-dashboard',
  service_provider: '/service-dashboard',
  package_provider: '/service-dashboard',
};

export default function RegisterForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const role = location.state?.role || 'customer';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [hotelRegistrationId, setHotelRegistrationId] = useState('');
  const [vehicleFleetSize, setVehicleFleetSize] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (user) {
      const dash = roleToDashboard[userRole] || '/customer-dashboard';
      navigate(dash, { replace: true });
    }
  }, [user, userRole, navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    let errors = {};
    if (!nameRegex.test(firstName)) errors.firstName = 'First name must be 2-50 letters or spaces.';
    if (!nameRegex.test(lastName)) errors.lastName = 'Last name must be 2-50 letters or spaces.';
    if (!phoneRegex.test(mobile)) errors.mobile = 'Phone number must be 10-15 digits.';
    if (!emailRegex.test(email)) errors.email = 'Invalid email address.';
    if (role === 'hotel_provider' && !hotelRegistrationId) errors.hotelRegistrationId = 'Hotel registration ID required.';
    if (role === 'guide_provider' && !licenseNumber) errors.licenseNumber = 'License number required.';
    if (role === 'transport_provider' && !licenseNumber) errors.licenseNumber = 'License number required.';
    if (role === 'package_provider' && !licenseNumber) errors.licenseNumber = 'License number required.';
    if (role !== 'customer' && !companyName) errors.companyName = 'Company name required.';
    if (role === 'package_provider' && !website) errors.website = 'Website required.';
    if (role === 'package_provider' && !description) errors.description = 'Description required.';
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      // Check if email is already registered
      const usersQuery = query(collection(db, "users"), where("email", "==", email));
      const usersSnapshot = await getDocs(usersQuery);
      if (!usersSnapshot.empty) {
        setError("User already registered with this email. Please sign in.");
        setLoading(false);
        return;
      }
      const userCredential = await register(email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        role,
        firstName,
        lastName,
        mobile,
        status: role === "admin" ? "active" : "pending",
        ...(role !== 'customer' && { companyName }),
        ...(role === 'hotel_provider' && { hotelRegistrationId }),
        ...(role === 'guide_provider' && { licenseNumber }),
        ...(role === 'transport_provider' && { licenseNumber, vehicleFleetSize }),
        ...(role === 'package_provider' && { licenseNumber, website, description }),
      });
      // Also create service_providers doc if provider
      if (role.endsWith('_provider') || role === 'service_provider') {
        const providerType = role.replace('_provider', '').replace('service_provider', 'service');
        // Set name and businessName for all provider types
        const fullName = `${firstName} ${lastName}`.trim();
        await setDoc(doc(db, 'service_providers', userCredential.user.uid), {
          providerType,
          type: providerType, // for dashboard
          email,
          status: 'pending',
          firstName,
          lastName,
          name: companyName || fullName, // prefer companyName, fallback to full name
          businessName: companyName || hotelRegistrationId || fullName, // prefer companyName, fallback to hotelRegistrationId or full name
          mobile,
          ...(role !== 'customer' && { companyName }),
          ...(role === 'hotel_provider' && { hotelRegistrationId }),
          ...(role === 'guide_provider' && { licenseNumber }),
          ...(role === 'transport_provider' && { licenseNumber, vehicleFleetSize }),
          ...(role === 'package_provider' && { licenseNumber, website, description }),
        });
      }
      await sendEmailVerification(userCredential.user);
      setVerificationSent(true);
      setLoading(false);
      // Redirect after registration
      const dash = roleToDashboard[role] || '/customer-dashboard';
      navigate(dash, { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      // Check if any user with this email already exists
      const usersQuery = query(collection(db, "users"), where("email", "==", result.user.email));
      const usersSnapshot = await getDocs(usersQuery);
      if (!usersSnapshot.empty) {
        setError("User already registered with this email. Please sign in.");
        setLoading(false);
        return;
      }
      const userDocRef = doc(db, "users", result.user.uid);
      let firstName = '';
      let lastName = '';
      if (result.user.displayName) {
        const nameParts = result.user.displayName.split(' ');
        firstName = nameParts[0] || '';
        lastName = nameParts.slice(1).join(' ') || '';
      }
      await setDoc(userDocRef, {
        email: result.user.email,
        role,
        status: role === "admin" ? "active" : "pending",
        firstName,
        lastName,
        mobile: '',
        ...(role !== 'customer' && { companyName }),
        ...(role === 'hotel_provider' && { hotelRegistrationId }),
        ...(role === 'guide_provider' && { licenseNumber }),
        ...(role === 'transport_provider' && { licenseNumber, vehicleFleetSize }),
        ...(role === 'package_provider' && { licenseNumber, website, description }),
      });
      // Also create service_providers doc if provider
      if (role.endsWith('_provider') || role === 'service_provider') {
        const providerType = role.replace('_provider', '').replace('service_provider', 'service');
        const fullName = result.user.displayName || `${firstName} ${lastName}`.trim();
        await setDoc(doc(db, 'service_providers', result.user.uid), {
          providerType,
          type: providerType,
          email: result.user.email,
          status: 'pending',
          firstName,
          lastName,
          name: companyName || fullName,
          businessName: companyName || hotelRegistrationId || fullName,
          mobile: '',
          ...(role !== 'customer' && { companyName }),
          ...(role === 'hotel_provider' && { hotelRegistrationId }),
          ...(role === 'guide_provider' && { licenseNumber }),
          ...(role === 'transport_provider' && { licenseNumber, vehicleFleetSize }),
          ...(role === 'package_provider' && { licenseNumber, website, description }),
        });
      }
      // Send email verification if possible
      if (result.user && !result.user.emailVerified && result.user.sendEmailVerification) {
        await result.user.sendEmailVerification();
      }
      setVerificationSent(true);
      setLoading(false);
      // Redirect after registration
      const dash = roleToDashboard[role] || '/customer-dashboard';
      navigate(dash, { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filterNameInput = (value) => value.replace(/[^A-Za-z\s]/g, '').slice(0, 50);
  const filterMobileInput = (value) => value.replace(/[^\d]/g, '').slice(0, 10);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-xl p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="mb-6 text-blue-500 hover:text-blue-700 focus:outline-none flex items-center">
          <FaArrowLeft className="inline mr-1" /> Back
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Register as {role === 'customer' ? 'Customer' : role === 'admin' ? 'Admin' : providerLabels[role]}
        </h2>
        {verificationSent ? (
          <div className="text-center text-green-600 font-semibold">
            Verification email sent! Please check your inbox and verify your email before logging in.
          </div>
        ) : (
          <>
            <form onSubmit={handleAuth} className="space-y-5">
              <div className="flex gap-4">
                <div className="relative w-1/2">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={firstName}
                    onChange={e => setFirstName(filterNameInput(e.target.value))}
                    onBlur={e => setFirstName(filterNameInput(e.target.value))}
                    placeholder="First Name"
                    type="text"
                    maxLength={50}
                    pattern="[A-Za-z\s]{2,50}"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                    required
                  />
                  {validationErrors.firstName && <div className="text-red-600 text-xs mt-1">{validationErrors.firstName}</div>}
                </div>
                <div className="relative w-1/2">
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={lastName}
                    onChange={e => setLastName(filterNameInput(e.target.value))}
                    onBlur={e => setLastName(filterNameInput(e.target.value))}
                    placeholder="Last Name"
                    type="text"
                    maxLength={50}
                    pattern="[A-Za-z\s]{2,50}"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                    required
                  />
                  {validationErrors.lastName && <div className="text-red-600 text-xs mt-1">{validationErrors.lastName}</div>}
                </div>
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  value={mobile}
                  onChange={e => setMobile(filterMobileInput(e.target.value))}
                  onBlur={e => setMobile(filterMobileInput(e.target.value))}
                  placeholder="Enter 10-digit mobile number"
                  type="tel"
                  maxLength={10}
                  pattern="\d{10}"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                  required
                />
                {validationErrors.mobile && <div className="text-red-600 text-xs mt-1">{validationErrors.mobile}</div>}
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                  required
                />
                {validationErrors.email && <div className="text-red-600 text-xs mt-1">{validationErrors.email}</div>}
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                  required
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                  required
                />
              </div>
              {role !== 'customer' && (
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="Company Name"
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                    required
                  />
                  {validationErrors.companyName && <div className="text-red-600 text-xs mt-1">{validationErrors.companyName}</div>}
                </div>
              )}
              {role === 'hotel_provider' && (
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={hotelRegistrationId}
                    onChange={e => setHotelRegistrationId(e.target.value)}
                    placeholder="Hotel Registration ID"
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                    required
                  />
                  {validationErrors.hotelRegistrationId && <div className="text-red-600 text-xs mt-1">{validationErrors.hotelRegistrationId}</div>}
                </div>
              )}
              {(role === 'guide_provider' || role === 'transport_provider' || (role === 'package_provider')) && (
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={licenseNumber}
                    onChange={e => setLicenseNumber(e.target.value)}
                    placeholder="License Number"
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                    required
                  />
                  {validationErrors.licenseNumber && <div className="text-red-600 text-xs mt-1">{validationErrors.licenseNumber}</div>}
                </div>
              )}
              {role === 'package_provider' && (
                <>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                    <input
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      placeholder="Website"
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                      required
                    />
                    {validationErrors.website && <div className="text-red-600 text-xs mt-1">{validationErrors.website}</div>}
                  </div>
                  <div className="relative">
                    <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      placeholder="Description"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                      required
                    />
                    {validationErrors.description && <div className="text-red-600 text-xs mt-1">{validationErrors.description}</div>}
                  </div>
                </>
              )}
              {role === 'transport_provider' && (
                <div className="relative">
                  <FaCar className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={vehicleFleetSize}
                    onChange={e => setVehicleFleetSize(e.target.value)}
                    placeholder="Vehicle Fleet Size"
                    type="number"
                    min="1"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
                  />
                </div>
              )}
              <div className="mb-2 text-left">
                <Link to="/forgot-password" className="text-blue-600 dark:text-blue-400 underline text-sm font-semibold hover:text-blue-800">Forgot Password?</Link>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-md hover:from-blue-600 hover:to-pink-600 transition"
                disabled={loading}
              >
                {loading ? "Processing..." : "Register"}
              </button>
            </form>
            <button
              onClick={handleGoogleAuth}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              disabled={loading}
            >
              <FaGoogle className="text-red-500 text-xl" />
              Register with Google
            </button>
            {error && <div className="mt-2 text-red-600 text-center">{error}</div>}
          </>
        )}
        {/* Already Signed In link */}
        <div className="mt-6 text-center">
          <AlreadySignedInLink role={role} />
        </div>
      </div>
    </div>
  );
}

// Helper component for the sign-in link
function AlreadySignedInLink({ role }) {
  let loginPath = '/login';
  if (role === 'customer') loginPath = '/customer/login';
  else if (role === 'admin') loginPath = '/admin/login';
  else if (
    role === 'hotel_provider' ||
    role === 'guide_provider' ||
    role === 'transport_provider' ||
    role === 'service_provider' ||
    role === 'package_provider'
  ) loginPath = '/service-provider/login';
  return (
    <Link to={loginPath} className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800">
      Already Signed In? Sign In
    </Link>
  );
} 