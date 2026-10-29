import { useState } from "react";
import "./styles/Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  function handleSend(e) {
  e.preventDefault();

  const text = message.trim();

  if (!text) return;

  const newMessage = {
    id: Date.now(),
    text: text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setMessages((prevMessages) => [...prevMessages, newMessage]);

  setMessage("");
}

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h2>GroupChat</h2>
      </header>

      <main className="messages-area">
        {messages.length === 0 ? (
          <p className="empty-chat">No messages yet. Start chatting!</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="message">
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>
          ))
        )}
      </main>

      <form className="message-form" onSubmit={handleSend}>
  <input
    type="text"
    placeholder="Type a message..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
  />

  <button type="submit" disabled={!message.trim()}>
    Send
  </button>
</form>
    </div>
  );
}

export default Chat;
