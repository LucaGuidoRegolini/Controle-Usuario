import axios from "axios";

const api = axios.create({
  baseURL: "http://191.252.113.41:10001/",
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

export default api;
