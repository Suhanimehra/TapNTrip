import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdAnnouncement,
  MdHelp,
  MdGavel,
  MdPublish,
  MdUnpublished,
} from 'react-icons/md';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('announcements');
  const [showEditor, setShowEditor] = useState(false);
  const [editingContent, setEditingContent] = useState(null);

  const announcements = [
    {
      id: 1,
      title: 'Platform Maintenance Notice',
      content: 'Scheduled maintenance on March 25th, 2024, from 2 AM to 4 AM IST.',
      status: 'scheduled',
      publishDate: '2024-03-25',
      audience: 'all',
    },
    {
      id: 2,
      title: 'New Feature Release',
      content: 'Introducing instant booking confirmation for all services.',
      status: 'published',
      publishDate: '2024-03-15',
      audience: 'users',
    },
    {
      id: 3,
      title: 'Special Offer Alert',
      content: 'Get 10% off on all hotel bookings this weekend.',
      status: 'draft',
      publishDate: null,
      audience: 'customers',
    },
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I book a service?',
      answer: 'You can book a service by...',
      category: 'General',
      status: 'published',
    },
    {
      id: 2,
      question: 'What is your cancellation policy?',
      answer: 'Our cancellation policy allows...',
      category: 'Bookings',
      status: 'published',
    },
    {
      id: 3,
      question: 'How do I become a service provider?',
      answer: 'To become a service provider...',
      category: 'Services',
      status: 'draft',
    },
  ];

  const policies = [
    {
      id: 1,
      title: 'Terms of Service',
      lastUpdated: '2024-02-15',
      status: 'published',
      type: 'legal',
    },
    {
      id: 2,
      title: 'Privacy Policy',
      lastUpdated: '2024-02-15',
      status: 'published',
      type: 'legal',
    },
    {
      id: 3,
      title: 'Refund Policy',
      lastUpdated: '2024-03-01',
      status: 'draft',
      type: 'service',
    },
  ];

  const handleEdit = (content) => {
    setEditingContent(content);
    setShowEditor(true);
  };

  const handleDelete = (id, type) => {
    // Implement delete logic
    console.log(`Deleting ${type} with id ${id}`);
  };

  const handlePublish = (id, type) => {
    // Implement publish logic
    console.log(`Publishing ${type} with id ${id}`);
  };

  const handleUnpublish = (id, type) => {
    // Implement unpublish logic
    console.log(`Unpublishing ${type} with id ${id}`);
  };

  const renderEditor = () => {
    if (!showEditor) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {editingContent ? 'Edit Content' : 'Add New Content'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white 
                    dark:bg-gray-700 text-gray-900 dark:text-white"
                  defaultValue={editingContent?.title}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white 
                    dark:bg-gray-700 text-gray-900 dark:text-white h-40"
                  defaultValue={editingContent?.content}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowEditor(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 
                    dark:hover:text-gray-100"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                    transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Content Type Tabs */}
      <div className="flex space-x-4">
        {['announcements', 'faqs', 'policies'].map((tab) => (
          <motion.button
            key={tab}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </motion.button>
        ))}
      </div>

      {/* Add New Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          setEditingContent(null);
          setShowEditor(true);
        }}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
          transition-colors"
      >
        <MdAdd className="w-5 h-5 mr-2" />
        Add New {activeTab.slice(0, -1)}
      </motion.button>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'announcements' &&
          announcements.map((announcement) => (
            <motion.div
              key={announcement.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <MdAnnouncement className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {announcement.title}
                  </h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  announcement.status === 'published'
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                    : announcement.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {announcement.status}
                </span>
              </div>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {announcement.content}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {announcement.publishDate || 'Not scheduled'}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-900 
                      dark:hover:text-blue-300"
                  >
                    <MdEdit className="w-5 h-5" />
                  </button>
                  {announcement.status === 'published' ? (
                    <button
                      onClick={() => handleUnpublish(announcement.id, 'announcement')}
                      className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 
                        dark:hover:text-yellow-300"
                    >
                      <MdUnpublished className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePublish(announcement.id, 'announcement')}
                      className="p-1 text-green-600 dark:text-green-400 hover:text-green-900 
                        dark:hover:text-green-300"
                    >
                      <MdPublish className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(announcement.id, 'announcement')}
                    className="p-1 text-red-600 dark:text-red-400 hover:text-red-900 
                      dark:hover:text-red-300"
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

        {activeTab === 'faqs' &&
          faqs.map((faq) => (
            <motion.div
              key={faq.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <MdHelp className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </h3>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 
                  dark:bg-gray-700 dark:text-gray-300">
                  {faq.category}
                </span>
              </div>

              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>

              <div className="mt-4 flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleEdit(faq)}
                  className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-900 
                    dark:hover:text-blue-300"
                >
                  <MdEdit className="w-5 h-5" />
                </button>
                {faq.status === 'published' ? (
                  <button
                    onClick={() => handleUnpublish(faq.id, 'faq')}
                    className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 
                      dark:hover:text-yellow-300"
                  >
                    <MdUnpublished className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublish(faq.id, 'faq')}
                    className="p-1 text-green-600 dark:text-green-400 hover:text-green-900 
                      dark:hover:text-green-300"
                  >
                    <MdPublish className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(faq.id, 'faq')}
                  className="p-1 text-red-600 dark:text-red-400 hover:text-red-900 
                    dark:hover:text-red-300"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}

        {activeTab === 'policies' &&
          policies.map((policy) => (
            <motion.div
              key={policy.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <MdGavel className="w-6 h-6 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {policy.title}
                  </h3>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  policy.type === 'legal'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                }`}>
                  {policy.type}
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Last updated: {policy.lastUpdated}
              </p>

              <div className="mt-4 flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleEdit(policy)}
                  className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-900 
                    dark:hover:text-blue-300"
                >
                  <MdEdit className="w-5 h-5" />
                </button>
                {policy.status === 'published' ? (
                  <button
                    onClick={() => handleUnpublish(policy.id, 'policy')}
                    className="p-1 text-yellow-600 dark:text-yellow-400 hover:text-yellow-900 
                      dark:hover:text-yellow-300"
                  >
                    <MdUnpublished className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublish(policy.id, 'policy')}
                    className="p-1 text-green-600 dark:text-green-400 hover:text-green-900 
                      dark:hover:text-green-300"
                  >
                    <MdPublish className="w-5 h-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(policy.id, 'policy')}
                  className="p-1 text-red-600 dark:text-red-400 hover:text-red-900 
                    dark:hover:text-red-300"
                >
                  <MdDelete className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Content Editor Modal */}
      {renderEditor()}
    </div>
  );
};

export default ContentManagement; 