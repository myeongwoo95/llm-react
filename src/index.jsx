import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>는 의도적으로 컴포넌트를 두 번 렌더링함 -> 그로인해 side effect를 쉽게 발견할 수 있음
  // <React.StrictMode> 빌드시 자동적으로 제거됨
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
