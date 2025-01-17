import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WhaleIcon from "../../components/icons/WhaleIcon";
import "./SignIn.css";
import { fastapi } from "../../utils/axios";
import { saveToken, saveUserInfo } from "../../utils/localStorage";
import AuthContext from "../../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setLoggedUser, setLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const formBody = new URLSearchParams();
    formBody.append("username", formData.email);
    formBody.append("password", formData.password);

    fastapi("post", "/api/user/login", formBody, {
      "Content-Type": "application/x-www-form-urlencoded",
    }).then((response) => {
      if (!response.success) {
        alert(response.data.detail);
        return;
      }

      const userInfo = {
        userId: response.data.id,
        name: response.data.name,
        email: response.data.email,
      };

      saveToken(response.data.access_token);
      saveUserInfo(userInfo);

      setLoggedIn();
      setLoggedUser(userInfo);

      navigate("/chat/newchatarea");
    });
  };

  return (
    <div className="signin-page">
      <header className="signin-header">
        <Link to="/" className="logo">
          <WhaleIcon />
          <h1>DeepThink</h1>
        </Link>
      </header>
      <main className="signin-main">
        <div className="signin-container">
          <h2>로그인</h2>
          <form onSubmit={handleSubmit} className="signin-form">
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
            <button type="submit" className="signin-button">
              로그인
            </button>
          </form>
          <div className="signin-options">
            <Link to="/auth/findaccount" className="forgot-password">
              비밀번호를 잊으셨나요?
            </Link>
            <p className="signup-link">
              계정이 없으신가요? <Link to="/auth/signup">회원가입</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
