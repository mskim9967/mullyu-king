const axios = require('axios');

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASEURL,
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
