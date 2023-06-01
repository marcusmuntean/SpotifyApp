import React, { useEffect, useState, useContext } from "react";
import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import UserContext from "./UserContext";

function Discussion() {
	const [boards, setBoards] = useState([]);
	const navigate = useNavigate();
	const [post, setPost] = useState("");
	const [initMessage, setInitMessage] = useState("");
	const [showInput, setShowInput] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [username, setUsername] = useState("tester50013");

	const { testVar, setTestVar } = useContext(UserContext);

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
		<Box sx={{ padding: "16px" }}>
			<h1 style={{ textAlign: "center" }}>Discussion Forum</h1>
			<p>{testVar}</p>

			<TextField
				type="text"
				value={searchText}
				onChange={handleSearchChange}
				placeholder="Search posts..."
				variant="outlined"
				fullWidth
				sx={{ marginBottom: "16px" }}
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
						sx={{ width: "40%", marginLeft: "auto", marginRight: "auto" }}
					/>
					<TextField
						multiline
						rows={4}
						value={initMessage}
						onChange={handleInitChange}
						placeholder="Enter content"
						variant="outlined"
						sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
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
							sx={{ width: "50%", backgroundColor: "#4CAF50", color: "white" }}
						>
							Confirm
						</Button>
						<Button
							variant="contained"
							onClick={handleCancel}
							sx={{ width: "50%", backgroundColor: "red", color: "white" }}
						>
							Cancel
						</Button>
					</Box>
				</Box>
			) : (
				<Button variant="contained" onClick={handleNewDisc}>
					Create New Discussion
				</Button>
			)}

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
						}}
					>
						{board.name}
					</Button>
				</Link>
			))}
		</Box>
	);
}

export default Discussion;
