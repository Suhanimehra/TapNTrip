import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-xl p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800">
          <button onClick={() => navigate(-1)} className="mb-6 text-blue-500 hover:text-blue-700 focus:outline-none flex items-center">
            <FaArrowLeft className="inline mr-1" /> Back
          </button>
          <div className="text-center">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Check Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Click the link in the email to reset your password. The link will expire in 1 hour.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
              If you don't see the email in your inbox, please check your spam, junk, or promotions folder.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-md hover:from-blue-600 hover:to-pink-600 transition"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-xl p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="mb-6 text-blue-500 hover:text-blue-700 focus:outline-none flex items-center">
          <FaArrowLeft className="inline mr-1" /> Back
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Reset Your Password
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white text-base transition"
              required
            />
          </div>
          {error && <div className="text-red-600 text-center text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-md hover:from-blue-600 hover:to-pink-600 transition"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/register" className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
} 