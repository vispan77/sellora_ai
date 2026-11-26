// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "selloraai-423cf.firebaseapp.com",
  projectId: "selloraai-423cf",
  storageBucket: "selloraai-423cf.firebasestorage.app",
  messagingSenderId: "601755686952",
  appId: "1:601755686952:web:56ac3fe2fdb29b207cfd1d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provoder = new GoogleAuthProvider();

export { auth, provoder };