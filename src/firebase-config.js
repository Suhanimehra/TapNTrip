// src/firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
<<<<<<< HEAD
import { getStorage } from 'firebase/storage';


=======

// TODO: Replace with your Firebase configuration
// You can find these values in your Firebase Console:
// 1. Go to console.firebase.google.com
// 2. Select your project
// 3. Click on the gear icon next to "Project Overview"
// 4. Click "Project settings"
// 5. Scroll down to "Your apps" section
// 6. Under the "</>" icon, you'll find these configuration values
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
const firebaseConfig = {
  apiKey: "AIzaSyCvWs7LyadmMf2d9ikHPo8i2ZEu03aq_VY",
  authDomain: "tap-86240.firebaseapp.com",
  projectId: "tap-86240",
  storageBucket: "tap-86240.firebasestorage.app",
  messagingSenderId: "650203684911",
  appId: "1:650203684911:web:48a2bc446cdd4cbb15a6da",
  measurementId: "G-EN6T9ED69N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
<<<<<<< HEAD
const storage = getStorage(app);

export { auth, db, analytics, storage }; 
=======

export { auth, db, analytics }; 
>>>>>>> b15f446a651f1037f18e60021d38902348cc2a47
