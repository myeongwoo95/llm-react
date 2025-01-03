import React, { useState } from "react";
import { Link } from "react-router-dom";
import WhaleIcon from "../../components/icons/WhaleIcon";
import "./SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 회원가입 로직을 구현합니다.
    console.log("회원가입 데이터:", formData);
  };

  return (
    <div className="signup-page">
      <header className="signup-header">
        <Link to="/" className="logo">
          <WhaleIcon />
          <h1>DeepThink</h1>
        </Link>
      </header>
      <main className="signup-main">
        <div className="signup-container">
          <h2>회원가입</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label htmlFor="username">사용자 이름</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="signup-button">
              가입하기
            </button>
          </form>
          <p className="login-link">
            이미 계정이 있으신가요? <Link to="/auth/signin">로그인</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
