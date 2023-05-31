import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';

function BoardPage() {
    const { boardId } = useParams();
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:9000/discussions/${boardId}/messages`)
        .then((response) => response.json())
        .then((data) => setMessages(data.messages))
        .catch((error) => console.error('Error retrieving messages: ', error));
    }, [boardId]);
  
    return (
      <div>
        <h2>Discussion Board {boardId}</h2>
        {messages.map((message) => (
          <div key={message.id}>
            <p>{message.text}</p>
            <p>Posted by: {message.author}</p>
          </div>
        ))}
      </div>
    );
  }

  export default BoardPage;