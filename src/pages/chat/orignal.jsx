import React, { useState, useRef, useEffect } from "react";
import "./NewChatArea.css";
import WhaleIcon from "../../components/icons/WhaleIcon";
import ArrowIcon from "../../components/icons/ArrowIcon";

const NewChatArea = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content: "Hi, I'm DeepThink.\nHow can I help you today?",
    },
  ]);
  const textareaRef = useRef(null);
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

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

    const userMessage = { type: "user", content: inputMessage.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userMessage.content }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let botResponse = "";
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", content: "" },
      ]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const content = line.slice(6);
            botResponse += content;
            setMessages((prevMessages) => {
              const newMessages = [...prevMessages];
              newMessages[newMessages.length - 1].content = botResponse;
              return newMessages;
            });
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "bot",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
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
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}-message`}>
            {message.type === "bot" && (
              <div className="message-avatar">
                <WhaleIcon />
              </div>
            )}
            <div className="message-content">
              {message.content.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message bot-message">
            <div className="message-avatar">
              <WhaleIcon />
            </div>
            <div className="message-content">
              <p>Thinking...</p>
            </div>
          </div>
        )}
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
