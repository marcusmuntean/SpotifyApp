import React, { useEffect, useState } from 'react';
import './Inbox.css';
import axios from 'axios';

function Inbox() {
  const [username, setUsername] = useState("Harry");
  // const [otherUsername, setOtherUsername] = useState("Mohammed");
  const [chatsData, setChatsData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/inboxes/" + username)
    .then((res) => {
      setChatsData(res.data.result);
    })
    .catch((err) => console.log(err))
  }, []);

  const addChat = (otherUsername) => {
    axios.post("http://localhost:9000/inboxes/add_channel", {
      username: username,
      otherUsername: otherUsername,
    })
    const chatNames = document.getElementById("chat-names");
    const div = document.createElement("div");
    const button = document.createElement("button");
    button.innerHTML = otherUsername;
    button.onclick = () => viewChat(otherUsername);
    div.appendChild(button);
    chatNames.appendChild(div);

    document.getElementById("add-chat-input").value = ""
  }

  const viewChats = () => {
  // useEffect(() => {
    const chats = document.getElementById("chats")
    chats.innerHTML = "";
    const chatNames = document.createElement("div");
    chatNames.id = "chat-names"
    chats.appendChild(chatNames);
    for (let i = 0; i < chatsData.length; i++) {
      const div = document.createElement("div");
      const button = document.createElement("button");
      let otherUsername = null;
      for (let j = 0; j < chatsData[i].data.users.length; j++) {
        if (chatsData[i].data.users[j] != username) {
          otherUsername = chatsData[i].data.users[j];
          // setOtherUsername(chatsData[i].data.users[j])
        }
      }
      button.innerHTML = otherUsername;
      button.onclick = () => viewChat(otherUsername);
      div.appendChild(button);
      chatNames.appendChild(div);
    }

      const addChatDiv = document.createElement("div");
      addChatDiv.id = "add-chat-div";
      const addChatInput = document.createElement("input");
      addChatInput.id = "add-chat-input"
      const addChatButton = document.createElement("button");
      addChatButton.innerHTML = "+";
      addChatButton.onclick = () => addChat(addChatInput.value);
      addChatDiv.appendChild(addChatInput);
      addChatDiv.appendChild(addChatButton);
      chats.appendChild(addChatDiv);
  };

  useEffect(() => {
    viewChats()
  }, [chatsData])

  const sendMessage = (content, otherUsername) => {
    const d = new Date();
    axios.post("http://localhost:9000/inboxes/add_message", {
      username: username,
      otherUsername: otherUsername,
      content: content,
      time: d.getTime()
    })
    viewChat(otherUsername)
  }

  const viewChat = (otherUsername) => {
    // axios.get("http://localhost:9000/inboxes/" + username + "&" + otherUsername)
    
    axios.post("http://localhost:9000/inboxes/get_inbox", {
      username: username,
      otherUsername: otherUsername
    })
    .then((res) => {
      const current_chat = document.getElementById("current-chat");
      current_chat.innerHTML= "";
      const messages = document.createElement("div");
      messages.id = "messages"
      current_chat.appendChild(messages);
      res.data.result.sort((a, b) => {
        return a.time - b.time;
      })
      for (let i = 0; i < res.data.result.length; i++) {
        const message = document.createElement("div");
        message.innerHTML = res.data.result[i].user + ": " + res.data.result[i].content;
        messages.appendChild(message);
      }

      const addMessageDiv = document.createElement("div");
      addMessageDiv.id = "add-message-div"
      const addMessageInput = document.createElement("input");
      const addMessageButton = document.createElement("button");
      addMessageButton.innerHTML = "Send";
      addMessageButton.onclick = () => sendMessage(addMessageInput.value, otherUsername);
      addMessageDiv.appendChild(addMessageInput);
      addMessageDiv.appendChild(addMessageButton);
      current_chat.appendChild(addMessageDiv);
      console.log(res.data.result)
    })
    .catch((err) => console.log(err))
  }

  return (
    <>
        <header className="title">
          <h1>Inbox</h1>
          {/* <button onClick={addChats}>Chats</button> */}
        </header>
        <main>
          <div id="chats" className="chats"></div>
          <div id="current-chat" className="current-chat"></div>
        </main>
    </>
  );
}

export default Inbox;
