// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNG1qn6ifqFPl51nhw7m1ri8bhbOeTTpI",
  authDomain: "portability-55894.firebaseapp.com",
  projectId: "portability-55894",
  storageBucket: "portability-55894.appspot.com",
  databaseURL: "https://portability-55894-default-rtdb.asia-southeast1.firebasedatabase.app/",
  messagingSenderId: "25950230197",
  appId: "1:25950230197:web:5905b77232c86e3d5cd0fc",
  measurementId: "G-XCFM083G0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db };