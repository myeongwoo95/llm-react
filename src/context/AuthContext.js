import React, { createContext, useEffect, useState } from "react";
import { getToken, getUserInfo } from "../utils/localStorage";

const AuthContext = createContext({
  loggedUser: {
    id: "",
    name: "",
    email: "",
  },
  loggedIn: false, // 로그인 여부
  setLoggedUser: () => {}, // 로그인한 사용자 정보 저장
  setLoggedIn: () => {}, // 로그인 상태로 변경
  setLogout: () => {}, // 로그아웃 상태로 변경
});

export default AuthContext;

export const AuthContextProvider = (props) => {
  useEffect(() => {
    const jwt = getToken();

    // 토큰 존재여부 확인
    if (jwt === undefined || jwt === null || jwt === "") {
      setLogout();
      return;
    }

    const userInfo = getUserInfo();
    setLoggedIn();
    setLoggedUser(userInfo);
  }, []);

  const setLoggedUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      loggedUser: data,
    }));
  };

  const setLoggedIn = () => {
    setState((prevState) => ({
      ...prevState,
      loggedIn: true,
    }));
  };

  const setLogout = () => {
    setState((prevState) => ({
      ...prevState,
      loggedUser: {},
      loggedIn: false,
    }));
  };

  const initialState = {
    loggedUser: {},
    loggedIn: false,
    setLoggedUser,
    setLoggedIn,
    setLogout,
  };

  // 글로벌하게 관리하고 싶은 상태값 지정하고 state값을 value로 넘겨준다.
  const [state, setState] = useState(initialState);

  return (
    <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>
  );
};
