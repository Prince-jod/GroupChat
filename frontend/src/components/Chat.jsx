import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/Chat.css";

function Chat() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Automatically scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send a message (temporary frontend implementation)
  function handleSend(e) {
    e.preventDefault();

    const text = message.trim();

    if (!text) return;

    const newMessage = {
      id: Date.now(),
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div className="chat-container">
      {/* Header */}
      <header className="chat-header">
        <div className="chat-profile">
          <div className="avatar">G</div>

          <div>
            <h2>GroupChat</h2>
            <p>Group conversation</p>
          </div>
        </div>

        <div className="header-actions">
          <span className="welcome-user">
            Hi, {user?.name || "User"}
          </span>

          <button
            className="logout-button"
            onClick={handleLogout}
            type="button"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="messages-area">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>No messages yet</p>
            <span>Start the conversation!</span>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${
                msg.sender === "me" ? "sent-row" : "received-row"
              }`}
            >
              <div className="message">
                <p>{msg.text}</p>
                <span>{msg.time}</span>
              </div>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Message input */}
      <form className="message-form" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-label="Type a message"
        />

        <button type="submit" disabled={!message.trim()}>
          Send ➤
        </button>
      </form>
    </div>
  );
}

export default Chat;
