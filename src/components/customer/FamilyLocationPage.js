import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, setDoc, getDocs, Timestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const mockFamily = [
  { name: 'Mom', city: 'Delhi, India', lastSeen: '2 min ago', color: 'bg-green-600' },
  { name: 'Dad', city: 'Mumbai, India', lastSeen: '5 min ago', color: 'bg-blue-600' },
  { name: 'Sister', city: 'Bangalore, India', lastSeen: '1 hour ago', color: 'bg-purple-600' },
];

const FamilyLocationPage = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [sharing, setSharing] = useState(false);
  const [family, setFamily] = useState(mockFamily);
  const [location, setLocation] = useState('');

  // Placeholder for getting user location
  useEffect(() => {
    setLocation('Share your real-time location with family');
  }, []);

  const handleStartSharing = async () => {
    setSharing(true);
    // In real app, get geolocation and update Firestore
    const db = getFirestore();
    await setDoc(doc(db, 'familyLocations', user.uid), {
      userId: user.uid,
      location: 'Your current location',
      updatedAt: Timestamp.now(),
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-blue-900 via-purple-800 to-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Family Location Sharing</h2>
      <div className="bg-black/30 rounded-xl p-4 flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📍</span>
          <span className="font-semibold">Your Location</span>
        </div>
        <div className="text-sm text-gray-300">{location}</div>
        <div className="mt-2 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl p-4 text-center">Interactive Map</div>
        <button
          className="mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition"
          onClick={handleStartSharing}
          disabled={sharing}
        >
          {sharing ? 'Sharing...' : 'Start Sharing'}
        </button>
      </div>
      <div className="bg-black/30 rounded-xl p-4 mb-4">
        <h3 className="font-semibold mb-2">Family Members</h3>
        <ul className="space-y-2">
          {family.map((member, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${member.color}`}>{member.name[0]}</span>
              <span className="flex-1">
                <span className="font-semibold">{member.name}</span>
                <span className="block text-xs text-gray-400">{member.city}</span>
              </span>
              <span className="text-xs text-gray-400">{member.lastSeen}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 text-xs text-gray-300">
        <div className="bg-black/30 rounded-xl p-4">
          <span className="font-bold text-green-400">Privacy & Security</span><br />
          End-to-End Encryption<br />
          All location data is encrypted in transit and at rest.
        </div>
        <div className="bg-black/30 rounded-xl p-4">
          <span className="font-bold text-blue-400">Real-Time Updates</span><br />
          Location updates every 30 seconds when sharing.
        </div>
        <div className="bg-black/30 rounded-xl p-4">
          <span className="font-bold text-purple-400">Family Only</span><br />
          Location is only shared with approved family members.
        </div>
      </div>
    </div>
  );
};

export default FamilyLocationPage; 