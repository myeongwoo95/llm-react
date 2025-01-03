import React, { useState } from "react";
import "./Sidebar.css";
import ChatIcon from "../icons/ChatIcon";
import HistoryIcon from "../icons/HistoryIcon";
import NewChatIcon from "../icons/NewChatIcon";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h1 className="brand">deepthink</h1>
        <button
          className="collapse-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>

      <button className="new-chat-button">
        {isCollapsed ? (
          <>
            <NewChatIcon />
          </>
        ) : (
          <>
            <i className="icon-refresh"></i>
            <span className="button-text">New chat</span>
          </>
        )}
      </button>

      <div className="chat-history">
        {isCollapsed ? (
          <div className="collapsed-icons">
            <ChatIcon />
            <HistoryIcon />
          </div>
        ) : (
          <>
            <div className="history-section">
              <h3>Yesterday</h3>
              <ul>
                <li>Using n8n to Earn Money Efficient</li>
                <li>Understanding n8n Usage Inquiry</li>
                <li>n8n Workflow Automation Capabil</li>
                <li>Assistant Offers Helpful Greeting</li>
                <li>Greeting and Offering Assistance</li>
              </ul>
            </div>

            <div className="history-section">
              <h3>7 Days</h3>
              <ul>
                <li>AI Model Pricing Inquiry Response</li>
                <li>Korean Language Proficiency Inqui</li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="profile">
        <img src="/chicken.jpg" alt="Profile" className="profile-avatar" />
        <span className="profile-text">My Profile</span>
      </div>
    </div>
  );
};

export default Sidebar;
