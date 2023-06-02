import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCx8lbgkL4DwpDBvVPf8ojRhIAo5OvASCc",
  authDomain: "spotify-app-b28c5.firebaseapp.com",
  projectId: "spotify-app-b28c5",
  storageBucket: "spotify-app-b28c5.appspot.com",
  messagingSenderId: "245598879533",
  appId: "1:245598879533:web:b6ccebc89ca16253ca1da4",
  measurementId: "G-ZKXCHMR5YZ"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export { db };