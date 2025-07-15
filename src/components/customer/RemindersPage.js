import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const RemindersPage = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const db = getFirestore();
    const q = query(collection(db, 'reminders', user.uid, 'items'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setReminders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user.uid]);

  const handleAddReminder = async () => {
    if (!reminderText.trim()) return;
    setLoading(true);
    const db = getFirestore();
    await addDoc(collection(db, 'reminders', user.uid, 'items'), {
      text: reminderText,
      createdAt: Timestamp.now(),
    });
    setReminderText('');
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-purple-800 via-blue-900 to-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">Travel Reminders</h2>
      <div className="mb-6 flex gap-2">
        <input
          className="flex-1 rounded-xl p-3 bg-gray-800 text-white border border-purple-400 focus:ring-2 focus:ring-purple-500"
          placeholder="Add a reminder..."
          value={reminderText}
          onChange={e => setReminderText(e.target.value)}
          disabled={loading}
        />
        <button
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition"
          onClick={handleAddReminder}
          disabled={loading || !reminderText.trim()}
        >
          + Add Reminder
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center">
        {reminders.length === 0 ? (
          <div className="flex flex-col items-center mt-8">
            <span className="text-5xl mb-2">🔔</span>
            <span className="text-gray-300">No reminders yet. Add your first reminder to get started!</span>
          </div>
        ) : (
          <ul className="w-full space-y-3">
            {reminders.map(reminder => (
              <li key={reminder.id} className="bg-black/30 rounded-xl p-4 text-white flex items-center">
                <span className="flex-1">{reminder.text}</span>
                <span className="text-xs text-gray-400 ml-4">{reminder.createdAt?.toDate().toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RemindersPage; 