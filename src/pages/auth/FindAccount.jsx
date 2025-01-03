import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FindAccount.css";
import WhaleIcon from "../../components/icons/WhaleIcon";

const FindAccount = () => {
  const [activeTab, setActiveTab] = useState("id");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "id") {
      console.log("아이디 찾기:", { name, phone });
      // 여기에 아이디 찾기 로직 구현
    } else {
      console.log("비밀번호 찾기:", { email });
      // 여기에 비밀번호 찾기 로직 구현
    }
  };

  return (
    <div className="find-account-page">
      <header className="find-account-header">
        <Link to="/" className="logo">
          <WhaleIcon />
          <h1>DeepThink</h1>
        </Link>
      </header>
      <main className="find-account-main">
        <div className="find-account-container">
          <h2>계정 찾기</h2>
          <div className="tabs">
            <button
              className={`tab ${activeTab === "id" ? "active" : ""}`}
              onClick={() => setActiveTab("id")}
            >
              아이디 찾기
            </button>
            <button
              className={`tab ${activeTab === "password" ? "active" : ""}`}
              onClick={() => setActiveTab("password")}
            >
              비밀번호 찾기
            </button>
          </div>
          <form onSubmit={handleSubmit} className="find-account-form">
            {activeTab === "id" ? (
              <>
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">전화번호</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
            <button type="submit" className="submit-button">
              {activeTab === "id" ? "아이디 찾기" : "비밀번호 찾기"}
            </button>
          </form>
          <div className="links">
            <Link to="/auth/signin">로그인</Link>
            <Link to="/auth/signup">회원가입</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindAccount;
