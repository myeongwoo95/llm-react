import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WhaleIcon from "../../components/icons/WhaleIcon";
import "./SignUp.css";
import { fastapi } from "../../utils/axios";

const SignUp = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    fastapi("post", "/api/user/create", formData).then((response) => {
      if (!response.success) {
        alert(response.data.detail);
        return;
      }

      alert("회원가입이 완료되었습니다.");
      Navigate("/auth/signin");
    });
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
              <label htmlFor="name">사용자 이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
