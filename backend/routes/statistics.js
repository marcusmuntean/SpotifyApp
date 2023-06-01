const express = require("express");
const router = express.Router();
//const db = require("./firebase");
const axios = require("axios");

// const {
//   getDocs,
//   collection,
//   getDoc,
//   doc,
//   addDoc,
//   deleteDoc,
//   updateDoc,
// } = require("firebase/firestore");

// router.get("/statistics/:token", async (req, res, next) => {
//   axios
//     .get("https://api.spotify.com/v1/me/top/tracks", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//     .then((result) => res.json(result));
// });

router.get("/likes/:token", async (req, res, next) => {
  let url = "https://api.spotify.com/v1/me/tracks?limit=50";
  const token = req.params.token;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      res.json(result.data.items);
    });
});

router.get("/likes/:offset/:token", async (req, res, next) => {
  const token = req.params.token;
  const offset = req.params.offset;
  let url = "https://api.spotify.com/v1/me/tracks?limit=50&offset=" + offset;

  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((result) => {
      res.json(result.data);
    });
});

module.exports = router;
