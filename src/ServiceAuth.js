import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { FaEnvelope, FaLock, FaArrowLeft, FaGoogle } from 'react-icons/fa';
import { signInWithGoogle } from './utils/auth';

export default function ServiceProviderLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
      // Check role
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists() && (
        userDoc.data().role === 'hotel_provider' ||
        userDoc.data().role === 'guide_provider' ||
        userDoc.data().role === 'transport_provider' ||
        userDoc.data().role === 'service_provider' ||
        userDoc.data().role === 'package_provider'
      )) {
                  navigate('/service-dashboard');
      } else {
        setError('Not a service provider account.');
      }
    } catch (err) {
      setError('Invalid email or password.');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const userId = result.user.uid;
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists() && (
        userDoc.data().role === 'hotel_provider' ||
        userDoc.data().role === 'guide_provider' ||
        userDoc.data().role === 'transport_provider' ||
        userDoc.data().role === 'service_provider' ||
        userDoc.data().role === 'package_provider'
      )) {
        navigate('/service-dashboard');
          } else {
        setError('Not a service provider account.');
      }
    } catch (err) {
      setError('Google sign-in failed.');
    }
    setLoading(false);
  };

    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-xl p-10 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="mb-6 text-blue-500 hover:text-blue-700 focus:outline-none flex items-center">
          <FaArrowLeft className="inline mr-1" /> Back
        </button>
        <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Sign In as Service Provider
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
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
          <div className="mb-2 text-left">
            <Link to="/forgot-password" className="text-blue-600 dark:text-blue-400 underline text-sm font-semibold hover:text-blue-800">Forgot Password?</Link>
          </div>
          {error && <div className="text-red-600 text-center text-sm mb-2">{error}</div>}
              <button
                type="submit"
            className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-md hover:from-blue-600 hover:to-pink-600 transition"
                disabled={loading}
              >
            {loading ? 'Signing In...' : 'Sign In'}
              </button>
          </form>
            <button
          className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          disabled={loading}
          onClick={handleGoogleSignIn}
        >
          <FaGoogle className="text-red-500 text-xl" />
          Sign In with Google
            </button>
        <div className="mt-6 text-center">
          <Link to="/register" className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-800">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
} 