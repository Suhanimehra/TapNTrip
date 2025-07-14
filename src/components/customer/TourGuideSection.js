import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { saveBooking } from '../../services/firestoreService';
import { useAuth } from '../../contexts/AuthContext';

const TourGuidePage = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [bookingData, setBookingData] = useState({ name: '', contact: '', date: '' });
  const { user } = useAuth();

  useEffect(() => {
    async function fetchTours() {
      try {
        const snap = await getDocs(collection(db, 'guide_tours'));
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTours(data);
      } catch (err) {
        setError('Failed to load tours');
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  if (loading) return <div>Loading tours...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Available Tours</h2>
      {tours.length === 0 ? (
        <div>No tours available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tours.map(tour => (
            <div key={tour.id} className="border rounded-lg p-4 shadow-md bg-white dark:bg-[#1a1e2e]">
              {tour.image && tour.image !== '' && (
                <img src={tour.image} alt={tour.name} className="w-full h-40 object-cover rounded mb-2" />
              )}
              <h3 className="text-lg font-semibold mb-1">{tour.name}</h3>
              <div className="text-sm mb-1">Description: {tour.description}</div>
              <div className="text-sm mb-1">Location: {tour.location}</div>
              <div className="text-sm mb-1">Type: {tour.type}</div>
              <div className="text-sm mb-1">Duration: {tour.duration} {tour.duration ? 'hours' : ''}</div>
              <div className="text-sm mb-1">Price: ₹{tour.price}</div>
              <div className="text-sm mb-1">Status: <span className={tour.status === 'active' ? 'text-green-600' : 'text-red-600'}>{tour.status}</span></div>
              {tour.inclusions && Array.isArray(tour.inclusions) && tour.inclusions.length > 0 && (
                <div className="text-sm mt-2">
                  <span className="font-semibold">Inclusions:</span>
                  <ul className="list-disc pl-5">
                    {tour.inclusions.map((inc, i) => <li key={i}>{inc}</li>)}
                  </ul>
                </div>
              )}
              {/* Removed Book Now button and booking modal */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TourGuidePage; 