import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWHIrr2PW5G8L8TC27n079ih0OOZRpSZs",
  authDomain: "smart-food-redistributio-a1ad7.firebaseapp.com",
  databaseURL: "https://smart-food-redistributio-a1ad7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-food-redistributio-a1ad7",
  storageBucket: "smart-food-redistributio-a1ad7.firebasestorage.app",
  messagingSenderId: "674410879081",
  appId: "1:674410879081:web:9f543769de4518759c2af8",
  measurementId: "G-D754GZH0N8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Realtime Database
export const realtimeDb = getDatabase(app);

// Initialize Analytics (optional)
try {
  const analytics = getAnalytics(app);
} catch (error) {
  console.log("Analytics not available:", error);
}

export default app;
