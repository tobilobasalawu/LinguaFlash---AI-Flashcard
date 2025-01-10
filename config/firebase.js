import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaQgSuNEog6wvws1C4i1Vs310Vl066X2I",
  authDomain: "lingua-flash.firebaseapp.com",
  projectId: "lingua-flash",
  storageBucket: "lingua-flash.firebasestorage.app",
  messagingSenderId: "321585421235",
  appId: "1:321585421235:web:753b7211efe63ec92009c6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
