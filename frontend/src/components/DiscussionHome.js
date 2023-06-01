import React, { useContext } from "react";
import { useEffect, useState, createContext } from "react";
import {
	BrowserRouter as Router,
	Link,
	Route,
	Routes,
	useParams,
	useNavigate,
} from "react-router-dom";
import Discussion from "./Discussion";
import BoardPage from "./BoardPage";
import UserContext from "./UserContext";

function DiscussionHome() {
	const [testVar, setTestVar] = useState("Big W if this works");

	return (
		<UserContext.Provider value={{ testVar, setTestVar }}>
			<Router>
				<div>
					<Routes>
						<Route path="/discussion" element={<Discussion />} />
						<Route path="/board/:boardId" element={<BoardPage />} />
					</Routes>
				</div>
			</Router>
		</UserContext.Provider>
	);
}

export default DiscussionHome;
