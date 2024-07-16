import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB33TsU052_1UNq_kv2cERuSUDwU1NnL8A",
  authDomain: "women-health-empowerment.firebaseapp.com",
  projectId: "women-health-empowerment",
  storageBucket: "women-health-empowerment.appspot.com",
  messagingSenderId: "999945649944",
  appId: "1:999945649944:web:a08d1c532f09ff23dd286d",
  measurementId: "G-ZQ2Y56SXK2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const usersRef = collection(db, "users");
const roomRef = collection(db, "hospitals");

// Initialize Auth
const auth = getAuth(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set");
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });

export { auth, db, usersRef, roomRef };
