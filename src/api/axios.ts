import axios from "axios";

const API_URL = (import.meta.env.VITE_API_URL || "https://modern-caterpillar-dubailab-84e4f794.koyeb.app").replace(/\/$/, '');

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token to requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
