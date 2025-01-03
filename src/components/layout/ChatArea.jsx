import React from "react";
import "./ChatArea.css";

function ChatArea() {
  return (
    <div className="chat-area">
      <div className="chat-content">
        <div className="chat-message">
          <div className="bot-icon">🐋</div>
          <div className="message-content">
            <h2>Hi, I'm DeepSeek.</h2>
            <p>How can I help you today?</p>
          </div>
        </div>
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Message DeepSeek"
          className="chat-input"
        />
        <div className="input-buttons">
          <button className="input-button">DeepThink</button>
          <button className="input-button">
            Search
            <span className="new-badge">NEW</span>
          </button>
          <button className="input-button">🎤</button>
          <button className="input-button">➤</button>
        </div>
      </div>

      <div className="ai-notice">AI-generated, for reference only</div>
    </div>
  );
}

export default ChatArea;
