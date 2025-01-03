import React, { createContext, useEffect, useState } from "react";
import { getToken, getUserInfo } from "../utils/localStorage";

// ★ 결국 상태는 AuthContextProvider에서 생성한 useState를 통해 관리한다.
// 왜냐하면 <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>에서 value에 useState값을 넘겨주기 때문이다.
// ★ AuthContext는 다른 컴포넌트에서 전역적으로 접근할 수 있도록 도와주는것 (useContext를 통해 접근)
// ★ 결론: 상태는 useState로 관리하고 이걸 전역적으로 사용할 수 있도록 도와주는게 createContext이다.
const AuthContext = createContext({
  loggedUser: {
    userId: "",
    name: "",
    email: "",
    // roles: [],
    role: "",
  },
  loggedIn: false, // 로그인 여부
  setLoggedUser: () => {}, // 로그인한 사용자 정보 저장
  setLoggedIn: () => {}, // 로그인 상태로 변경
  setLogout: () => {}, // 로그아웃 상태로 변경
});

export default AuthContext;

// 이 AuthContextProvider를 App.js에서 사용하면, 전역적으로 사용할 수 있는 상태값을 관리할 수 있다.
export const AuthContextProvider = (props) => {
  useEffect(() => {
    const jwt = getToken();

    // 토큰 존재여부 확인
    if (jwt === undefined || jwt === null || jwt === "") {
      setLogout();
      return;
    }

    // localStorage에 저장된 사용자 정보를 전역적으로 사용할 수 있도록 설정
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
