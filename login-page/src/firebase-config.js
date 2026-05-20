import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyAsk0Hl2UttRbbOajGO0LaAc3pOfaSBqwM",
  authDomain: "login-page-5a171.firebaseapp.com",
  projectId: "login-page-5a171",
  storageBucket: "login-page-5a171.firebasestorage.app",
  messagingSenderId: "686570569705",
  appId: "1:686570569705:web:4872d034196cc411c6d578",
  measurementId: "G-1LYRMSJ7RD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);