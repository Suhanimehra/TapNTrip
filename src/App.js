import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.js';
import { AuthProvider, useAuth } from './contexts/AuthContext.js';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { ToastProvider } from './contexts/ToastContext';
import './App.css';
import './styles/theme.css';
import { sendEmailVerification } from "firebase/auth";

// Import components
import CustomerDashboard from './components/customer/Dashboard';
import ServiceProviderPanel from './components/service-provider/ServiceProviderPanel';
import AdminApp from './AdminApp';
import LandingPage from './LandingPage';
import HotelsPage from './components/customer/HotelsPage';

import RegisterRoleSelect from './components/common/RegisterRoleSelect';
import RegisterProviderType from './components/common/RegisterProviderType';
import RegisterForm from './components/common/RegisterForm';
import ForgotPassword from './components/common/ForgotPassword';
import CustomerLogin from './CustomerAuth';
import AdminLogin from './AdminAuth';
import ServiceProviderLogin from './ServiceAuth';
import JournalPage from './components/customer/JournalPage';
import AssistantPage from './components/customer/AssistantPage';
import FamilyLocationPage from './components/customer/FamilyLocationPage';
import RemindersPage from './components/customer/RemindersPage';

function AppRoutes() {
  const { user, emailVerified, userRole } = useAuth();
  const [showLanding, setShowLanding] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [resent, setResent] = useState(false);

  // Effect to handle the initial landing page display
  useEffect(() => {
    if (initialLoad) {
      setShowLanding(true);
      const timer = setTimeout(() => {
        setShowLanding(false);
        setInitialLoad(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [initialLoad]);

  // Effect to reset initial load state on page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      setInitialLoad(true);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Helper: Blocked for unverified users
  const UnverifiedBlock = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Email Not Verified</h2>
        <p className="mb-4">Please verify your email address to access your dashboard.</p>
        <button
          className="px-6 py-2 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition mb-2"
          onClick={async () => {
            if (user) {
              await sendEmailVerification(user);
              setResent(true);
            }
          }}
        >
          Resend Verification Email
        </button>
        {resent && <div className="text-green-400 mt-2">Verification email resent!</div>}
      </div>
    </div>
  );

  // Always show landing page first on initial load or refresh
  if (showLanding) {
    return <LandingPage />;
  }

  // If not logged in, show new registration flow
  if (!user) {
    return (
      <Routes>
        <Route path="/register" element={<RegisterRoleSelect />} />
        <Route path="/register/service-provider" element={<RegisterProviderType />} />
        <Route path="/register/form" element={<RegisterForm />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/service-provider/login" element={<ServiceProviderLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    );
  }

  // If logged in, block access to registration routes and redirect to dashboard
  return (
    <Routes>
      <Route path="/register" element={<Navigate to={userRole === 'admin' ? '/admin-dashboard' : userRole === 'customer' ? '/customer-dashboard' : '/service-dashboard'} replace />} />
      <Route path="/register/service-provider" element={<Navigate to={userRole === 'admin' ? '/admin-dashboard' : userRole === 'customer' ? '/customer-dashboard' : '/service-dashboard'} replace />} />
      <Route path="/register/form" element={<Navigate to={userRole === 'admin' ? '/admin-dashboard' : userRole === 'customer' ? '/customer-dashboard' : '/service-dashboard'} replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* Customer Routes */}
      <Route path="/customer-dashboard" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard />} />
      <Route path="/flights" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard initialSection="service" initialService="flights" />} />
      <Route path="/trains" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard initialSection="service" initialService="trains" />} />
      <Route path="/buses" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard initialSection="service" initialService="buses" />} />
      <Route path="/hotels" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard initialSection="service" initialService="hotels" />} />
      <Route path="/hotels-list" element={user && !emailVerified ? <UnverifiedBlock /> : <HotelsPage />} />
      <Route path="/packages" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard initialSection="service" initialService="packages" />} />
      <Route path="/activities" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard initialSection="service" initialService="activities" />} />
      <Route path="/my-bookings" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard initialSection="my-bookings" />} />
      <Route path="/profile" element={<CustomerDashboard initialSection="profile" />} />
      <Route path="/rewards" element={user && !emailVerified ? <UnverifiedBlock /> : <CustomerDashboard initialSection="rewards" />} />
      {/* Service Provider Routes */}
      <Route path="/service-dashboard" element={user && !emailVerified ? <UnverifiedBlock /> : <ServiceProviderPanel />} />
      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={user && !emailVerified ? <UnverifiedBlock /> : <AdminApp />} />
      <Route path="/admin/*" element={user && !emailVerified ? <UnverifiedBlock /> : <AdminApp />} />
      {/* Catch all - redirect to dashboard if logged in, else to landing */}
      <Route path="*" element={
        user ? (
          emailVerified ? (
            <Navigate to={userRole === 'admin' ? '/admin-dashboard' : userRole === 'customer' ? '/customer-dashboard' : '/service-dashboard'} replace />
          ) : (
            <UnverifiedBlock />
          )
        ) : (
          <Navigate to="/" replace />
        )
      } />
    </Routes>
  );
}

function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <Router>
              <AppRoutes />
            </Router>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
