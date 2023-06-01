const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/songs/:term/:token", async (req, res, next) => {
	const token = req.params.token;
	const term = req.params.term;
	let url =
		"https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=" + term;

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

router.get("/artists/:term/:token", async (req, res, next) => {
	const token = req.params.token;
	const term = req.params.term;
	let url =
		"https://api.spotify.com/v1/me/top/artists?limit=50&time_range=" + term;

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

router.get("/name/:token", async (req, res, next) => {
	let url = "https://api.spotify.com/v1/me";
	const token = req.params.token;

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

module.exports = router;
