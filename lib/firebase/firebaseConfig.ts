import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjBZhBQUpxH5JL7AJHsh9qEma3yS-CDtI",
  authDomain: "moalv-ac994.firebaseapp.com",
  projectId: "moalv-ac994",
  storageBucket: "moalv-ac994.firebasestorage.app",
  messagingSenderId: "407242862900",
  appId: "1:407242862900:web:62cf78d8a5034a2175b561",
  measurementId: "G-5KWGWTGG7G",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export {
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
};
