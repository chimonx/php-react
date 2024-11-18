import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-IUZeZXmMQ8YcmIpoQqtC3UKXvWZI_OY",
  authDomain: "react-kunkorn.firebaseapp.com",
  databaseURL: "https://react-kunkorn-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-kunkorn",
  storageBucket: "react-kunkorn.firebasestorage.app",
  messagingSenderId: "1057507643472",
  appId: "1:1057507643472:web:1f1a1efd1f2e402bf34155",
  measurementId: "G-776V1X9KHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Set authentication persistence
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { db, auth };
