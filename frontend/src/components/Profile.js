import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { db } from "./firebase.js";
import {
	getDocs,
	collection,
	addDoc,
	doc,
	deleteDoc,
	where,
	query,
	updateDoc,
} from "firebase/firestore";
import UserContext from "./UserContext.js";

function Profile() {
	const CLIENT_ID = "050284177ebc4d70b2889aff911336cb";
	const REDIRECT_URI = "http://localhost:3000/profile";
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const RESPONSE_TYPE = "token";

	const [token, setToken] = useState("");
	const [searchKey, setSearchKey] = useState("");
	const [artists, setArtists] = useState([]);
	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] = useState("");

	const { globalUser, setGlobalUser } = useContext(UserContext);

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		// getToken()

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
		}

		setToken(token);
	}, []);

	const logout = () => {
		setToken("");
		window.localStorage.removeItem("token");
	};

	const artistInfo = async (e) => {
		e.preventDefault();
		const { data } = await axios.get("https://api.spotify.com/v1/search", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			params: {
				q: searchKey,
				type: "artist",
			},
		});

		setArtists(data.artists.items);
	};

	const renderArtists = () => {
		return artists.map((artist) => (
			<div key={artist.id}>
				{artist.images.length ? (
					<img width={"30%"} src={artist.images[0].url} alt="" />
				) : (
					<div>No Image</div>
				)}
				{artist.name}
			</div>
		));
	};

	const userCollectionRef = collection(db, "Users");

	const getUsername = () => {
		let url = "https://api.spotify.com/v1/me";

		axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((result) => {
				setUsername(result.id);
				setGlobalUser(result.id);
				setDisplayName(result.data.display_name);
				console.log(displayName);
				console.log("The global username has been set: ", globalUser);
			});
	};

	return (
		<div className="App">
			<header className="App-header">
				{token ? (
					<h1 {...getUsername()}>{"Welcome " + displayName}</h1>
				) : (
					<h2>Please Login</h2>
				)}
				{!token ? (
					<a
						href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
					>
						Login to Spotify
					</a>
				) : (
					<button onClick={logout}>Logout</button>
				)}

				{renderArtists()}
			</header>
		</div>
	);
}

export default Profile;

// {token ?

//     <form onSubmit={artistInfo}>
//         <input type="text" onChange={e => setSearchKey(e.target.value)}/>
//         <button type={"submit"}>Search</button>
//     </form>

//     : <h2>Please login</h2>

// }
