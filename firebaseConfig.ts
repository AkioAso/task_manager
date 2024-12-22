import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7S-zXSYqY2-0Y2BnXUlCEteLaTRDT_Lg",
  authDomain: "task-manager-aso-personal.firebaseapp.com",
  projectId: "task-manager-aso-personal",
  storageBucket: "task-manager-aso-personal.firebasestorage.app",
  messagingSenderId: "512085887318",
  appId: "1:512085887318:web:bbcef6de892dc85676eef7",
  measurementId: "G-DGGZCGHH8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
  
export { db, auth };