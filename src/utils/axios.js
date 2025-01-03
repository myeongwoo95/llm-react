import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// axios request 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios response 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
