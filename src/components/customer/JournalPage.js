import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const JournalPage = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [photos, setPhotos] = useState([]);
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const db = getFirestore();
      const q = collection(db, 'journals');
      const snapshot = await getDocs(q);
      const userEntries = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(entry => entry.userId === user.uid)
        .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setEntries(userEntries);
    };
    if (user?.uid) fetchEntries();
  }, [user]);

  const handlePhotoChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setPhotos([...photos, ...Array.from(e.dataTransfer.files)]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    setUploading(true);
    setError('');
    setSuccess(false);
    try {
      const storage = getStorage();
      const db = getFirestore();
      let photoUrls = [];
      for (const file of photos) {
        const storageRef = ref(storage, `journals/${user.uid}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        photoUrls.push(url);
      }
      await addDoc(collection(db, 'journals'), {
        userId: user.uid,
        notes,
        photos: photoUrls,
        createdAt: Timestamp.now(),
      });
      setSuccess(true);
      setPhotos([]);
      setNotes('');
    } catch (err) {
      setError('Failed to save journal.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-purple-800 via-blue-900 to-gray-900 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">My Travel Journal</h2>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Photos</label>
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-purple-400 rounded-xl p-6 bg-black/30 cursor-pointer mb-2"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="photo-upload"
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo-upload" className="flex flex-col items-center cursor-pointer">
              <span className="text-4xl mb-2">📷</span>
              <span>Click to upload photos or drag and drop</span>
            </label>
            {photos.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {photos.map((file, idx) => (
                  <span key={idx} className="bg-purple-700 text-white px-2 py-1 rounded text-xs">{file.name}</span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Trip Notes</label>
          <textarea
            className="w-full rounded-xl p-3 bg-gray-800 text-white border border-purple-400 focus:ring-2 focus:ring-purple-500 min-h-[100px]"
            placeholder="Write about your trip experiences, memories, and thoughts..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>
        <button
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition mb-2"
          onClick={handleSave}
          disabled={uploading}
        >
          {uploading ? 'Saving...' : 'Save Journal'}
        </button>
        {success && <div className="text-green-400 mt-2 text-center">Journal saved!</div>}
        {error && <div className="text-red-400 mt-2 text-center">{error}</div>}
        <div className="mt-6 text-center text-sm text-gray-300">
          <span>🔒 Coming soon: Share your journal with travel companions</span>
        </div>
      </div>
      {/* Previous Journal Entries */}
      <div className="w-full max-w-xl mx-auto space-y-6">
        {entries.length > 0 && <h3 className="text-xl font-bold mb-2 text-center">Previous Journals</h3>}
        {entries.map(entry => (
          <div key={entry.id} className="bg-black/30 rounded-xl p-4 shadow mb-4">
            <div className="mb-2 text-sm text-gray-400">{entry.createdAt?.toDate().toLocaleString()}</div>
            {entry.photos && entry.photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {entry.photos.map((url, idx) => (
                  <img key={idx} src={url} alt="journal" className="w-20 h-20 object-cover rounded" />
                ))}
              </div>
            )}
            <div className="whitespace-pre-line text-gray-200">{entry.notes}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default JournalPage; 