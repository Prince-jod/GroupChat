import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Chat.css";

function Chat() {
const navigate = useNavigate();
const messagesEndRef = useRef(null);

const [messages, setMessages] = useState([]);
const [message, setMessage] = useState("");
const [sending, setSending] = useState(false);

const user = JSON.parse(localStorage.getItem("user") || "null");

useEffect(() => {
messagesEndRef.current?.scrollIntoView({
behavior: "smooth",
});
}, [messages]);

// Send message to the backend and save it in MySQL
async function handleSend(e) {
e.preventDefault();

const text = message.trim();

if (!text || sending) return;

const token = localStorage.getItem("token");

if (!token) {
  navigate("/login");
  return;
}

try {
  setSending(true);

  const response = await fetch("http://localhost:5000/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    throw new Error(result.message || "Failed to send message");
  }

  const savedMessage = result.data;

  // Display the message returned by the backend
  setMessages((prevMessages) => [
    ...prevMessages,
    {
      id: savedMessage.id,
      text: savedMessage.text,
      sender: "me",
      time: new Date(savedMessage.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  setMessage("");
} catch (error) {
  console.error("Send message error:", error);
  alert(error.message || "Could not connect to the server.");
} finally {
  setSending(false);
}

}

function handleLogout() {
localStorage.removeItem("token");
localStorage.removeItem("user");
navigate("/login");
}

return ( <div className="chat-container"> <header className="chat-header"> <div className="chat-profile"> <div className="avatar">G</div>

```
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

  <form className="message-form" onSubmit={handleSend}>
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      aria-label="Type a message"
    />

    <button type="submit" disabled={!message.trim() || sending}>
      {sending ? "Sending..." : "Send ➤"}
    </button>
  </form>
</div>

);
}

export default Chat;
