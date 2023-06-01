import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import {
	Card,
	CardContent,
	Typography,
	Button,
	TextField,
	Box,
} from "@mui/material";
import axios from "axios";
function BoardPage() {
	const { boardId } = useParams();
	const [messages, setMessages] = useState([]);
	const [boardName, setBoardName] = useState("");
	const [comment, setComment] = useState("");
	const [showInput, setShowInput] = useState(false);
	const [username, setUsername] = useState("tester50013");
	const [likedMessages, setLikedMessages] = useState([]);
	const [likedButtons, setLikedButtons] = useState([]);

	const navigate = useNavigate();

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

	//this is to display the messages
	useEffect(() => {
		console.log({ boardId });
		fetch(`http://localhost:9000/discussions/:${boardId}/messages`)
			.then((response) => response.json())
			.then((data) => setMessages(data.messages))
			.catch((error) => console.error("Error retrieving messages: ", error));
	}, [boardId, showInput]);

	//this is to display the title (just board name)
	useEffect(() => {
		fetch(`http://localhost:9000/discussions/:${boardId}`)
			.then((response) => response.json())
			.then((data) => setBoardName(data.name))
			.catch((error) => console.error("Error retrieving board name: ", error));
	}, [boardId]);

	const handleLike = (messageId) => {
		if (likedMessages.includes(messageId)) {
			// The message is already liked, do nothing
			return;
		}

		console.log({ boardId });
		console.log({ messageId });
		fetch(
			`http://localhost:9000/discussions/:${boardId}/messages/:${messageId}/like`,
			{
				method: "PUT",
			}
		)
			.then((response) => response.json())
			.then((data) => {
				// Update the messages state with the updated message
				setMessages((prevMessages) =>
					prevMessages.map((message) =>
						message.id === messageId
							? { ...message, likes: data.likes }
							: message
					)
				);
				setLikedMessages((prevLikedMessages) => [
					...prevLikedMessages,
					messageId,
				]);
				setLikedButtons((prevLikedButtons) => [...prevLikedButtons, messageId]);
			})
			.catch((error) => console.error("Error liking message: ", error));
	};

	//NOT TESTED
	const handleConfirm = () => {
		console.log({ comment });
		fetch(`http://localhost:9000/discussions/:${boardId}/messages`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content: comment, userID: username }),
		})
			.then((response) => response.json())
			.then((data) => {
				setComment("");
				console.log("done");
				setShowInput(false);
			})

			.catch((error) =>
				console.error("Error creating new discussion: ", error)
			);
	};

	const handleNewComment = () => {
		setShowInput(true);
	};

	const handleCancel = () => {
		setShowInput(false);
		setComment("");
	};

	const handleCommentChange = (e) => {
		setComment(e.target.value);
	};
	//END NOT TESTED

	return (
		<div>
			<div style={{ textAlign: "left", marginLeft: "16px", marginTop: "16px" }}>
				<Button
					variant="contained"
					onClick={() => navigate("/discussion")}
					sx={{ width: "7%", marginLeft: "auto", marginRight: "auto" }}
				>
					Back
				</Button>
			</div>

			<div style={{ textAlign: "center" }}>
				<h2>{boardName}</h2>
			</div>

			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "16px",
					marginBottom: "32px",
					marginLeft: "20px",
					marginRight: "20px",
				}}
			>
				{messages &&
					messages.map((message) => (
						<Card key={message.id} sx={{ minWidth: 275, maxWidth: 275 }}>
							<CardContent>
								<Typography variant="body1">{message.content}</Typography>
								<Typography variant="body2" color="textSecondary">
									Posted by: {message.userID} on: {message.time}
								</Typography>

								<Button
									variant={
										likedButtons.includes(message.id) ? "contained" : "outlined"
									}
									disabled={likedMessages.includes(message.id)}
									onClick={() => handleLike(message.id)}
								>
									Likes: {message.likes}
								</Button>
							</CardContent>
						</Card>
					))}
			</div>
			{showInput ? (
				<div>
					<TextField
						multiline
						rows={4}
						value={comment}
						onChange={handleCommentChange}
						placeholder="Enter comment"
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
							sx={{ width: "25%" }}
						>
							Confirm
						</Button>

						<Button
							variant="contained"
							onClick={handleCancel}
							sx={{ width: "25%", backgroundColor: "red", color: "white" }}
						>
							Cancel
						</Button>
					</Box>
				</div>
			) : (
				<div style={{ textAlign: "center" }}>
					<Button
						variant="contained"
						onClick={handleNewComment}
						sx={{ width: "15%", marginLeft: "auto", marginRight: "auto" }}
					>
						Add a Comment
					</Button>
				</div>
			)}
		</div>
	);
}

export default BoardPage;
