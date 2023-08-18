// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "book-catalogue-reader.firebaseapp.com",
  projectId: "book-catalogue-reader",
  storageBucket: "book-catalogue-reader.appspot.com",
  messagingSenderId: "526832605597",
  appId: "1:526832605597:web:fa0f934d050640cbddf774",
  measurementId: "G-WPS9Y26K1Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
