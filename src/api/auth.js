import api from "../utils/axios";

export const auth = {
  login: async (data) => {
    try {
      return await api.post("/login", data);
    } catch (error) {
      return error.response;
    }
  },

  join: async (data) => {
    try {
      return await api.post("/api/users", data);
    } catch (error) {
      return error.response;
    }
  },
};