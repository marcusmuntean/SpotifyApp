import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCGiRFvOJDAnvK_vlbsYE2TTknOohYGIsY",
  authDomain: "launch23-swe-week2-team5.firebaseapp.com",
  projectId: "launch23-swe-week2-team5",
  storageBucket: "launch23-swe-week2-team5.appspot.com",
  messagingSenderId: "884858298362",
  appId: "1:884858298362:web:a3d11fa62803853fc8ce43",
  measurementId: "G-Q3XW24ZRPL"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export { db };
