// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require("firebase/firestore");

// const serviceAccount = require("../permissions.json");

// const app = initializeApp(serviceAccount);
// const db = getFirestore(app);

// module.exports = db;
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export { db };

