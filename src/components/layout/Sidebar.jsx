import React from "react";
import "./Sidebar.css";

function Sidebar() {
  const chatHistory = [
    {
      category: "Yesterday",
      items: [
        "Using n8n to Earn Money Efficient",
        "Understanding n8n Usage Inquiry",
        "n8n Workflow Automation Capabil",
        "Assistant Offers Helpful Greeting",
        "Greeting and Offering Assistance",
      ],
    },
    {
      category: "7 Days",
      items: [
        "AI Model Pricing Inquiry Response",
        "Korean Language Proficiency Inqui",
      ],
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h1>deepseek</h1>
      </div>

      <button className="new-chat">
        <span>New chat</span>
      </button>

      <div className="chat-history">
        {chatHistory.map((section, index) => (
          <div key={index} className="history-section">
            <h3>{section.category}</h3>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="history-item">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="profile">
        <div className="profile-icon">👤</div>
        <span>My Profile</span>
      </div>
    </div>
  );
}

export default Sidebar;
