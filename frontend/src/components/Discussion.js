import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';

function Discussion() {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const [post, setPost] = useState('');
  const [initMessage, setInitMessage] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9000/discussions')
      .then((response) => response.json())
      .then((data) => setBoards(data.boards))
      .catch((error) => console.error('Error retrieving boards: ', error));
  }, []);

  const handleNewDisc = () => {
    setShowInput(true);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleInitChange = (e) => {
    setInitMessage(e.target.value);
  };

  const handleConfirm = () => {
    fetch('http://localhost:9000/discussions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: post, content: initMessage}),
    })
      .then((response) => response.json())
      .then((data) => {
        setPost(''); 
        setInitMessage('');
        window.location.reload();
        
      })
      .catch((error) => console.error('Error creating new discussion: ', error));
  };

  return (
    <div>
      <p>Discussion Boards</p>
      {showInput ? (
        <div>
          <input type="text" value={post} onChange={handlePostChange} placeholder="Enter title" />
          <input type="text" value={initMessage} onChange={handleInitChange} placeholder="Enter title" />
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      ) : (
        <button onClick={handleNewDisc}>Create New Discussion</button>
      )}
      <br></br>
      {boards.map((board) => (
        <Link to={`/board/${board.id}`} key={board.id}>
          <button>{board.name}</button>
        </Link>
      ))}
    </div>
  );
}

export default Discussion;
