import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

// 보호된 라우트 컴포넌트
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { loggedIn, loggedUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true); // isLoading 상태를 추가하여 AuthContext의 초기화가 완료될 때까지 로딩 상태를 유지

  useEffect(() => {
    const checkAuthStatus = () => {
      if (loggedIn !== undefined) {
        setIsLoading(false);
      }
    };

    // AuthContext의 초기화가 완료되었는지 확인
    checkAuthStatus();
  }, [loggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!loggedIn) {
    return <Navigate to="/SignIn" replace />;
  }

  // allowedRoles가 제공되지 않은 경우, 모든 인증된 사용자에게 접근 허용
  if (!allowedRoles || allowedRoles.length === 0) {
    return children;
  }

  // 사용자가 허용된 역할 중 하나라도 가지고 있는지 확인 (roles)
  // const hasAllowedRole = allowedRoles.some((role) =>
  //   loggedUser.roles.includes(role),
  // );

  // 사용자의 역할이 허용된 역할 목록에 포함되어 있는지 확인 (role)
  const hasAllowedRole = allowedRoles.includes(loggedUser.role);

  // 사용자가 허용된 역할을 가지고 있지 않으면 unauthorized 페이지로 리다이렉트
  if (!hasAllowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
