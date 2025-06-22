import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyAkeVfRN3jS7lHVYm1YyggiMlVBs6u5YSs",
  authDomain: "next-trip-app-edc9a.firebaseapp.com",
  projectId: "next-trip-app-edc9a",
  storageBucket: "next-trip-app-edc9a.firebasestorage.app",
  messagingSenderId: "1044757966040",
  appId: "1:1044757966040:web:d1d854c25dd2f3a5cebbad",
  measurementId: "G-D3QE8GM661"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // ADD THIS LINE ✅

export { app, analytics };
