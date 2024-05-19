import { getApps, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.PUBLIC_FIREBASE_PROJECT_API_KEY,
  authDomain: `${process.env.PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
//const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app);
const googleAuthProvider = new GoogleAuthProvider();

export { googleAuthProvider, storage, firestore, functions };
