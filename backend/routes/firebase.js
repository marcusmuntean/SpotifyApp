// const { initializeApp } = require("firebase/app");
// const { getFirestore } = require("firebase/firestore");

// const serviceAccount = require("../permissions.json");

// const app = initializeApp(serviceAccount);
// const db = getFirestore(app);

// module.exports = db;

const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const serviceAccount = require("../permissions.json");
const app = initializeApp(serviceAccount);
const db = getFirestore(app);
module.exports = db;

/*
const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
};
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

module.exports = db;
*/
