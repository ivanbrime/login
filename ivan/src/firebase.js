// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDLa7k_avxCvzgjzJoEdPpcadBq73ijrYI",
  authDomain: "react-5e25d.firebaseapp.com",
  projectId: "react-5e25d",
  storageBucket: "react-5e25d.firebasestorage.app",
  messagingSenderId: "470392501877",
  appId: "1:470392501877:web:69bad5eb391a15ec90aa3c"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };