// frontend/lib/api.ts
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach Authorization header from env token
instance.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_API_TOKEN;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default instance;
