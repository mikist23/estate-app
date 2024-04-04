import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext";

function ChatComponent() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const post = useLoaderData();
  const {  currentUser } = useContext(AuthContext);
  const handleSendMessage = () => {
    if (inputValue.trim() !== "") {
      // Create the mailto link with dynamic values
      const mailtoLink = `mailto:?subject=${encodeURIComponent(
        "Regarding: " + post.title 
      )}
        &body="Hi, I'm interested in your product. Can you provide more details?" ${encodeURIComponent(
          inputValue
        )}`;

      // Open the mail client
      window.open(mailtoLink);

      // Optionally, you can also update the state to reflect the sent message
      setMessages([...messages, { text: inputValue, sender: "user" }]);
      setInputValue("");
    }
  };

  return (
    <div className="chat-container" style={styles.container}>
      <div className="chat-messages" style={styles.messages}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender}`}
            style={styles.message}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input" style={styles.input}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.inputField}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;
