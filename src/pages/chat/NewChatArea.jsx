import React, { useState, useRef } from "react";
import "./NewChatArea.css";
import WhaleIcon from "../../components/icons/WhaleIcon";
import ArrowIcon from "../../components/icons/ArrowIcon";
import api from "../../utils/axios";

const NewChatArea = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "0px";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleChange = (e) => {
    setInputMessage(e.target.value);
    adjustHeight();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    console.log("Sending message:", inputMessage);
    setIsLoading(true);

    try {
      // const response = await api.post(
      //   "/chat",
      //   { content: inputMessage },
      //   {
      //     responseType: "stream",
      //     onDownloadProgress: (progressEvent) => {
      //       const text = progressEvent.event.target.response;
      //       console.log("Received chunk:", text);
      //     },
      //   },
      // );

      // console.log("Final response:", response.data);

      const response = await api.get("/hello");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
      setInputMessage("");
      adjustHeight();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="chat-area">
      <div className="chat-messages">
        <div className="message bot-message">
          <div className="message-avatar">
            <WhaleIcon />
          </div>
          <div className="message-content">
            <h2>Hi, I'm DeepThink.</h2>
            <p>How can I help you today?</p>
          </div>
        </div>
      </div>

      <div className="chat-input-container">
        <form onSubmit={handleSubmit} className="chat-input-wrapper">
          <textarea
            ref={textareaRef}
            placeholder="Message DeepThink..."
            className="chat-input"
            value={inputMessage}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isLoading}
          />
          <div className="input-buttons">
            <button type="button" className="input-button">
              <span className="button-icon">🤔</span>
              DeepThink
            </button>
            <button type="button" className="input-button">
              <span className="button-icon">🌐</span>
              Web Search
            </button>
            <button type="button" className="input-button">
              <span className="button-icon">📂</span>
              RAG
            </button>
            <button type="button" className="input-button">
              <span className="button-icon">🖼️</span>
              Image
            </button>
            <button type="button" className="input-button">
              <span className="button-icon">🎥</span>
              Video
            </button>
            <button type="button" className="input-button">
              <span className="button-icon">🤖</span>
              Agent
              <span className="new-badge">NEW</span>
            </button>
          </div>
          <div className="action-buttons">
            <button type="button" className="action-button send-button">
              <i className="icon-send"></i>
              <span>🔗</span>
            </button>
            <button
              type="submit"
              className="action-button send-button"
              disabled={isLoading}
            >
              <i className="icon-send"></i>
              <ArrowIcon direction="up" isActive={!isLoading} />
            </button>
          </div>
        </form>
        <div className="disclaimer">AI-generated, for reference only</div>
      </div>
    </div>
  );
};

export default NewChatArea;
