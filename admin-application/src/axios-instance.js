const axios = require('axios');

export default axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  headers: {
    post: {
      Authorization: localStorage.getItem('Authorization'),
    },
    get: {
      Authorization: localStorage.getItem('Authorization'),
    },
    patch: {
      Authorization: localStorage.getItem('Authorization'),
    },
    delete: {
      Authorization: localStorage.getItem('Authorization'),
    },
  },
});
