// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "@firebase/auth/dist/rn/index.js";

import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
