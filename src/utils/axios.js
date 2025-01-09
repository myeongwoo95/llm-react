import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
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
  },
);

// axios response 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export async function fastapi(method, url, data = null, headers = null) {
  try {
    const config = headers ? { headers } : {};
    const response = await api[method.toLowerCase()](url, data, config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      data: error.response?.data || error.response,
    };
  }
}
