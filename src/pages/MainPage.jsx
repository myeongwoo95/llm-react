import React from "react";
import { Link } from "react-router-dom";
import WhaleIcon from "../components/icons/WhaleIcon";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main-page">
      <header className="main-header">
        <div className="logo">
          <WhaleIcon />
          <h1>DeepThink</h1>
        </div>
        <nav>
          <Link to="/auth/signin" className="signup-button">
            로그인
          </Link>
          <Link to="/auth/signup" className="signup-button">
            회원가입
          </Link>
        </nav>
      </header>
      <main>
        <section className="hero">
          <h2>AI로 더 스마트한 대화를 시작하세요</h2>
          <p>DeepThink와 함께 새로운 대화의 세계를 경험해보세요.</p>
          <Link to="/chat/newchatarea" className="cta-button">
            지금 시작하기
          </Link>
        </section>
        <section className="features">
          <div className="feature">
            <h3>지능형 대화</h3>
            <p>고급 AI 기술을 활용한 자연스러운 대화를 경험하세요.</p>
          </div>
          <div className="feature">
            <h3>다양한 주제</h3>
            <p>일상 대화부터 전문 지식까지, 다양한 주제로 대화를 나눠보세요.</p>
          </div>
          <div className="feature">
            <h3>24/7 이용 가능</h3>
            <p>언제 어디서나 DeepThink와 대화를 나눌 수 있습니다.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
