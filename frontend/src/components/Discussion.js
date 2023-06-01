import React, { useEffect, useState, useContext } from "react";
import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import {
	TextField,
	Button,
	Box,
	Typography,
	createTheme,
	ThemeProvider,
} from "@mui/material";
import UserContext from "./UserContext";

function Discussion() {
	const [boards, setBoards] = useState([]);
	const navigate = useNavigate();
	const [post, setPost] = useState("");
	const [initMessage, setInitMessage] = useState("");
	const [showInput, setShowInput] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [username, setUsername] = useState("tester50013");

	const theme = createTheme({
		typography: {
			fontFamily: "Poppins, sans-serif",
			fontWeightLight: 200,
			fontWeightRegular: 400,
		},
	});

	const fontLink = document.createElement("link");
	fontLink.href =
		"https://fonts.googleapis.com/css?family=Poppins:200i,400&display=swap";
	fontLink.rel = "stylesheet";
	document.head.appendChild(fontLink);

	/*
	const getUsername = () => {
		const url = "https://api.spotify.com/v1/me";
		axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${props.token}`,
				},
			})
			.then((result) => {
				setUsername(result.id);
			});
	};
  */

	useEffect(() => {
		fetch("http://localhost:9000/discussions")
			.then((response) => response.json())
			.then((data) => setBoards(data.boards))
			.catch((error) => console.error("Error retrieving boards: ", error));
	}, []);

	const handleNewDisc = () => {
		setShowInput(true);
	};

	const handleSearchChange = (e) => {
		setSearchText(e.target.value);
	};

	const handlePostChange = (e) => {
		setPost(e.target.value);
	};

	const handleInitChange = (e) => {
		setInitMessage(e.target.value);
	};

	const filteredBoards = boards.filter((board) =>
		board.name.toLowerCase().includes(searchText.toLowerCase())
	);

	const handleCancel = () => {
		setPost("");
		setInitMessage("");
		setShowInput(false);
	};

	const handleConfirm = () => {
		fetch("http://localhost:9000/discussions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: post,
				content: initMessage,
				userID: username,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setPost("");
				setInitMessage("");
				window.location.reload();
			})
			.catch((error) =>
				console.error("Error creating new discussion: ", error)
			);
	};

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ padding: "0px", backgroundColor: "#FFF" }}>
				<Typography
					variant="h1"
					align="center"
					sx={{
						color: "#FFF",
						backgroundColor: "#000",
						margin: 0,
						padding: "16px 0",
					}}
				>
					Discussion Forum
				</Typography>

				<Box />

				<TextField
					type="text"
					value={searchText}
					onChange={handleSearchChange}
					placeholder="Search posts..."
					variant="outlined"
					fullWidth
					sx={{
						marginBottom: "16px",
						marginTop: "16px",
						backgroundColor: "#FFF",
						color: "#000",
						"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
							{
								borderColor: "#000000",
							},
						"& .MuiInputLabel-outlined.Mui-focused": {
							color: "#000000",
						},
						marginLeft: "30px",
						marginRight: "30px",
					}}
					inputProps={{ style: { color: "#000" } }}
					InputLabelProps={{ style: { color: "#000" } }}
				/>

				{showInput ? (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "16px",
							marginBottom: "16px",
						}}
					>
						<TextField
							type="text"
							value={post}
							onChange={handlePostChange}
							placeholder="Enter title"
							variant="outlined"
							sx={{
								width: "40%",
								marginLeft: "auto",
								marginRight: "auto",
								backgroundColor: "#FFF",
								color: "#000",
							}}
							inputProps={{ style: { color: "#000" } }}
							InputLabelProps={{ style: { color: "#000" } }}
						/>
						<TextField
							multiline
							rows={4}
							value={initMessage}
							onChange={handleInitChange}
							placeholder="Enter content"
							variant="outlined"
							sx={{
								width: "80%",
								marginLeft: "auto",
								marginRight: "auto",
								backgroundColor: "#FFF",
								color: "#000",
							}}
							inputProps={{ style: { color: "#000" } }}
							InputLabelProps={{ style: { color: "#000" } }}
						/>
						<Box
							sx={{
								display: "flex",
								gap: "16px",
								width: "30%",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						>
							<Button
								variant="contained"
								onClick={handleConfirm}
								sx={{
									width: "50%",
									backgroundColor: "#1DB954",
									color: "#000",
									outlineColor: "#1DB954",
								}}
							>
								Confirm
							</Button>
							<Button
								variant="contained"
								onClick={handleCancel}
								sx={{
									width: "50%",
									backgroundColor: "#D32F2F",
									color: "#000",
									outlineColor: "#1DB954",
								}}
							>
								Cancel
							</Button>
						</Box>
					</Box>
				) : (
					<Button
						variant="contained"
						onClick={handleNewDisc}
						sx={{
							backgroundColor: "#1DB954",
							color: "#000",
							outlineColor: "#1DB954",
							marginLeft: "30px",
						}}
					>
						Create New Discussion
					</Button>
				)}
				<Box
					sx={{
						marginTop: "20px",
						marginLeft: "30px",
						marginRight: "30px",
					}}
				>
					{filteredBoards.map((board) => (
						<Link to={`/board/${board.id}`} key={board.id}>
							<Button
								variant="outlined"
								fullWidth
								sx={{
									marginBottom: "16px",
									textAlign: "left",
									fontSize: "16px",
									height: "60px",
									textTransform: "none",
									backgroundColor: "#FFF",
									color: "#000",
									"&:hover": {
										backgroundColor: "#1DB954",
										color: "#FFF",
										borderColor: "#000000",
									},
									borderColor: "#1DB954",
								}}
							>
								{board.name}
							</Button>
						</Link>
					))}
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default Discussion;
