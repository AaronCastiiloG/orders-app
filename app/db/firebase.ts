import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDZ6yQ6NbslcU2xr-EQ3Cl2iLLVNRplekw",
  authDomain: "orders-app-28835.firebaseapp.com",
  projectId: "orders-app-28835",
  storageBucket: "orders-app-28835.firebasestorage.app",
  messagingSenderId: "211162647385",
  appId: "1:211162647385:web:8699fd5d437f9ed6305a48",
  measurementId: "G-8SNEE4V5K6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
