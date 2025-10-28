import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://modern-caterpillar-dubailab-84e4f794.koyeb.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach Bearer token automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
