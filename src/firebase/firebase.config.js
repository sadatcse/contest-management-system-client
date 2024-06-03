// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {

  // apiKey: import.meta.env.VITE_apiKey,
  // authDomain: import.meta.env.VITE_authDomain,
  // projectId: import.meta.env.VITE_projectId,
  // storageBucket: import.meta.env.VITE_storageBucket,
  // messagingSenderId: import.meta.env.VITE_messagingSenderId,
  // appId: import.meta.env.VITE_appId

  apiKey: "AIzaSyCaZ6OGzT7YIP4jlhUuBQUPkPFbZk3bSM4",
  authDomain: "contest-management-3d405.firebaseapp.com",
  projectId: "contest-management-3d405",
  storageBucket: "contest-management-3d405.appspot.com",
  messagingSenderId: "402158829433",
  appId: "1:402158829433:web:1ff658c1fb94e341f379a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;