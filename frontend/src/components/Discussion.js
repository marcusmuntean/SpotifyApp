
import {useEffect, useState} from 'react';

function Discussion() {

    const[boards, setBoards] = useState([]);

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
                <button key={board.id}>{board.name}</button>
            ))}
        </div>


    );
}

export default Discussion;