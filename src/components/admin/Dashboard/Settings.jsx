import React from 'react';
<<<<<<< HEAD
import { MdSettings, MdDarkMode, MdLightMode } from 'react-icons/md';
=======
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
import { useTheme } from '../../../contexts/ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
<<<<<<< HEAD
    <div className="space-y-10">
      <div className="glassmorphism bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl flex items-center gap-6 mb-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <MdSettings className="w-10 h-10 text-gray-700 dark:text-gray-200 drop-shadow-lg" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg">Settings</h1>
          <p className="text-lg text-gray-500 dark:text-gray-300 mt-2">Manage your preferences</p>
        </div>
      </div>
      <div className="glassmorphism bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              {isDarkMode ? <MdDarkMode className="w-5 h-5 text-purple-600 dark:text-purple-400" /> : <MdLightMode className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            </div>
            <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Toggle between light and dark mode</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Dark Mode</span>
          <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
              aria-label="Toggle dark mode"
            >
              <span className="sr-only">Toggle dark mode</span>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}></span>
          </button>
            </div>
          </div>
      <div className="flex flex-col items-center justify-center min-h-[150px] text-gray-400">
        <p className="text-base">More settings coming soon.</p>
=======
    <div className="space-y-6">
      {/* Page Title */}
      <div className="border-b pb-4 dark:border-gray-800">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* Theme Settings */}
        <div className="bg-white dark:bg-[#1e2233] rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Dark Mode
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle between light and dark themes
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full
                ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition
                  ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-[#1e2233] rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                  shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                  dark:bg-gray-700 dark:text-white"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 
                  shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm
                  dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>
          <div className="mt-4">
            <button className="inline-flex justify-center rounded-md border border-transparent 
              bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-[#1e2233] rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Email Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications about new bookings and updates
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
              >
                <span className="sr-only">Enable email notifications</span>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  SMS Notifications
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive text messages for urgent updates
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
              >
                <span className="sr-only">Enable SMS notifications</span>
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
              </button>
            </div>
          </div>
        </div>
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
      </div>
    </div>
  );
};

export default Settings;