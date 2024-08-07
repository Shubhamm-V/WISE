// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

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

export const CLIENT_ID =
  "999945649944-8he22f9ddebl6n1qbet3uc8lr5hgatdu.apps.googleusercontent.com";
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
