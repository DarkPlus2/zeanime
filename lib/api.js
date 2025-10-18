// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api"
      : "https://zeanime-backend.vercel.app/api"),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 🔹 Automatically attach tokens
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Global error handler
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
