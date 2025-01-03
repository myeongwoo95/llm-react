const tokenKey = process.env.REACT_APP_TOKEN_KEY;
const userInfoKey = process.env.REACT_APP_USER_INFO_KEY;

export const saveToken = (token) => {
  localStorage.setItem(tokenKey, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenKey);
};

export const removeToken = () => {
  localStorage.removeItem(tokenKey);
};

export const saveUserInfo = (userInfo) => {
  localStorage.setItem(userInfoKey, JSON.stringify(userInfo));
};

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(userInfoKey));
};

export const removeUserInfo = () => {
  localStorage.removeItem(userInfoKey);
};


