import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_KEY,
  apiKey: 'AIzaSyD55osyhXcr95xXvUx7SnhO20LKRfRAsiU',
  authDomain: 'chat-66fd8.firebaseapp.com',
  projectId: 'chat-66fd8',
  storageBucket: 'chat-66fd8.appspot.com',
  messagingSenderId: '489196980013',
  appId: '1:489196980013:web:d7e7bbf59b6680a91ef5a4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
