import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
				{/* <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/products' component={Products} />
          <Route path='/sign-up' component={SignUp} />
        </Switch> */}
			</Router>
		</>
	);
}

export default App;

// import {useEffect, useState} from "react";
// import './App.css';
// import axios from 'axios';

// function App() {
//     const CLIENT_ID = "050284177ebc4d70b2889aff911336cb"
//     const REDIRECT_URI = "http://localhost:3000"
//     const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
//     const RESPONSE_TYPE = "token"

//     const [token, setToken] = useState("")
//     const [searchKey, setSearchKey] = useState("")
//     const [artists, setArtists] = useState([])

//     useEffect(() => {
//         const hash = window.location.hash
//         let token = window.localStorage.getItem("token")

//         // getToken()

//         if (!token && hash) {
//             token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

//             window.location.hash = ""
//             window.localStorage.setItem("token", token)
//         }

//         setToken(token)

//     }, [])

//     const logout = () => {
//         setToken("")
//         window.localStorage.removeItem("token")
//     }

//     const artistInfo = async (e) => {
//         e.preventDefault()
//         const {data} = await axios.get("https://api.spotify.com/v1/search", {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             },
//             params: {
//                 q: searchKey,
//                 type: "artist"
//             }
//         })

//         setArtists(data.artists.items)
//     }

//     const renderArtists = () => {
//         return artists.map(artist => (
//             <div key={artist.id}>
//                 {artist.images.length ? <img width={"30%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
//                 {artist.name}
//             </div>
//         ))
//     }

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>Log-in Sample</h1>
//                 {!token ?
//                     <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
//                         to Spotify</a>
//                     : <button onClick={logout}>Logout</button>}

//                 {token ?
//                     <form onSubmit={artistInfo}>
//                         <input type="text" onChange={e => setSearchKey(e.target.value)}/>
//                         <button type={"submit"}>Search</button>
//                     </form>

//                     : <h2>Please login</h2>
//                 }

//                 {renderArtists()}

//             </header>
//         </div>
//     );
// }

// export default App;

// import logo from './logo.svg';
// import './App.css';
// import Login from "./components/Login";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import CssBaseline from "@mui/material/CssBaseline";
// import Button from "@mui/material/Button";

// function App() {
//   return (
//   <div>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route
//               path="*"
//               element={
//                 <div style={{ textAlign: "center" }}>
//                   <h1
//                     style={{
//                       fontWeight: "bold",
//                       fontSize: "50px",
//                     }}
//                   >
//                     Page Not Found
//                   </h1>
//                   <Link to="/">
//                     <Button variant="contained">Home Page</Button>
//                   </Link>
//                 </div>
//               }
//             />
//           </Routes>
//         </BrowserRouter>
//       </div>
//   );
// }

// export default App;
