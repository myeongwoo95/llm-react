import React, { useContext, useState } from "react";
import "./ProfileMenu.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "./../../context/AuthContext";
import { removeToken, removeUserInfo } from "../../utils/localStorage";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { setLogout } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();

    if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
      removeToken();
      removeUserInfo();
      setLogout();
      navigate("/");
    }
  };

  return (
    <div className="profile-menu-container">
      <button className="profile-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/chicken.jpg" alt="프로필" className="profile-image" />
        <span>My Profile</span>
      </button>

      {isOpen && (
        <div className="profile-popup">
          <ul className="menu-list">
            <li>
              <i className="menu-icon settings-icon">⚙️</i>
              <span>Settings</span>
            </li>
            <li>
              <i className="menu-icon delete-icon">🗑️</i>
              <span>Delete all chats</span>
            </li>
            <li>
              <i className="menu-icon contact-icon">📧</i>
              <span>Contact us</span>
            </li>
            <li onClick={handleLogout}>
              <i className="menu-icon logout-icon">🚪</i>
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
