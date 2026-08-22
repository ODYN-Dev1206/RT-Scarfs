import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAycNiUnD8q47HQMKWLdxbl0XJ9IMv5gCs",
  authDomain: "rt-scarfs.firebaseapp.com",
  projectId: "rt-scarfs",
  storageBucket: "rt-scarfs.firebasestorage.app",
  messagingSenderId: "742650096598",
  appId: "1:742650096598:web:b7b6b975385d3704cf9277"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();