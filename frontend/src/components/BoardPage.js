import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams, useNavigate } from 'react-router-dom';

function BoardPage() {
    const { boardId } = useParams();
    const [messages, setMessages] = useState([]);
    const [boardName, setBoardName] = useState('');
  
    //this is to display the messages
    useEffect(() => {
        console.log({boardId});
      fetch(`http://localhost:9000/discussions/:${boardId}/messages`)
        .then((response) => response.json())
        .then((data) => setMessages(data.messages))
        .catch((error) => console.error('Error retrieving messages: ', error));
    }, [boardId]);

    //this is to display the title (just board name)
    useEffect(() => {
        
        fetch(`http://localhost:9000/discussions/:${boardId}`)
          .then((response) => response.json())
          .then((data) => setBoardName(data.name))
          .catch((error) => console.error('Error retrieving board name: ', error));
      }, [boardId]);

      const handleLike = (messageId) => {
        console.log({boardId})
        console.log({messageId})
        fetch(`http://localhost:9000/discussions/:${boardId}/messages/:${messageId}/like`, {
          method: 'PUT',
        })
          .then((response) => response.json())
          .then((data) => {
            // Update the messages state with the updated message
            setMessages((prevMessages) =>
              prevMessages.map((message) =>
                message.id === messageId ? { ...message, likes: data.likes } : message
              )
            );
          })
          .catch((error) => console.error('Error liking message: ', error));
      };
  
    return (
      <div>
        <h2>{boardName}</h2>
        {messages && messages.map((message) => (
          <div key={message.id}>
            <p>{message.content}</p>
            <p>Posted by: {message.userID} on: {message.time}</p>
            <p>
            Likes: {message.likes}
            <button onClick={() => handleLike(message.id)}>Like</button>
          </p>
          </div>
        ))}
      </div>
    );
  }

  export default BoardPage;