import axios from "axios";

const api = axios.create({
  baseURL: "https://visitor-pass-api.vercel.app",
  withCredentials: true, 
});

export default api;
