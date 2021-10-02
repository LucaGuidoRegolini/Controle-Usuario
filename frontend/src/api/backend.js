import axios from "axios";

const backend = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

export default backend;
