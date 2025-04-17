// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjYjTflM8o8LrKEO4h_iFwI3AiUjCyhi8",
  authDomain: "login-auth-75f9c.firebaseapp.com",
  projectId: "login-auth-75f9c",
  storageBucket: "login-auth-75f9c.firebasestorage.app",
  messagingSenderId: "661920160660",
  appId: "1:661920160660:web:3cabc493cee2289c3fcd81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;