import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "fos-recipe-generator.firebaseapp.com",
  projectId: "fos-recipe-generator",
  storageBucket: "fos-recipe-generator.firebasestorage.app",
  messagingSenderId: "66896443310",
  appId: "1:66896443310:web:e27475bc92a9a16b233a3f",
  measurementId: "G-H72VMZ40TQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
