// frontend/lib/api.ts
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: process.env.NEXT_PUBLIC_API_TOKEN || "",
    "Content-Type": "application/json",
  },
});

export default instance;
