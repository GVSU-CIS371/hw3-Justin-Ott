import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCk1HgHYwJ2HXj3S-JslW0yEri3ASqQbkA",
  authDomain: "cis371-56c7b.firebaseapp.com",
  projectId: "cis371-56c7b",
  storageBucket: "cis371-56c7b.firebasestorage.app",
  messagingSenderId: "849647882592",
  appId: "1:849647882592:web:3b8bed981ff99d2b260e05",
  measurementId: "G-TRDCVKJMLZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
