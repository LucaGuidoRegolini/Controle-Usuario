import axios from "axios";
import store from "@/store";

const backend = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Accept: "application/json",
    Content: "application/json",
  },
});

backend.interceptors.request.use(
  (config) => {
    const token = store.state.backend.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (erro) => {
    Promise.reject(erro);
  }
);

export default backend;
