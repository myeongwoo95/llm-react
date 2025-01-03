import api from '../utils/axios';

export const post = {
  save: async (data) => {
    try {
      return await api.post("/api/posts", data);
    } catch (error) {
      return error.response;
    }
  },

   getList: async (data) => {
    try {
      const { page, size, sort } = data;
      let sortParam = '';
      if (sort && sort.length > 0) {
        sortParam = `&sort=${sort.join(',')}`;
      }
      return await api.get(`/api/posts?page=${page}&size=${size}${sortParam}`);
    } catch (error) {
      return error.response;
    }
  },

  getOne: async (data) => {
    try {
      return await api.get(`/api/posts/${data.postId}`);
    } catch (error) {
      return error.response;
    }
  },

  delete: async (data) => {
    // TODO
    try {
      return await api.get(`/api/posts/${data.postId}`);
    } catch (error) {
      return error.response;
    }
  },

};