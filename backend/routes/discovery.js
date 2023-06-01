var express = require('express');
var router = express.Router();
const db = require("./firebase");
const { getDocs, collection } = require("firebase/firestore");

/* GET home page. */
router.get('/', async function(req, res, next) {
  allDocData = [];
  const userDocs = await getDocs(collection(db, "UsersTesting"));
  userDocs.forEach((userDoc) => {
    allDocData.push(userDoc.data());
  })
  res.json({result: allDocData});
});

module.exports = router;
