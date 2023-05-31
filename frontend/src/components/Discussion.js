
import {useEffect, useState} from 'react';
import { Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';


function Discussion() {

    const[boards, setBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:9000/discussions')
        .then((response) => response.json())
        .then((data) => setBoards(data.boards))
        .catch((error) => console.error('Error retrieving boards: ', error));
    }, []);

    

    const handleNewDisc = () => {

    }



    return (

        <div>
            <p>Discussion Boards</p>
            <button onClick={handleNewDisc}>Create New Discussion</button> <br></br>
            {boards.map((board) => (
        <Link to={`/board/${board.id}`} key={board.id}>
          <button>{board.name}</button>
        </Link>
      ))}
        </div>


    );
}

export default Discussion;