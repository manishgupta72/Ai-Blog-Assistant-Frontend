// frontend/lib/api.ts (Updated with Auth Header)
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:4000/api", // direct backend URL
  headers: {
    Authorization: process.env.NEXT_PUBLIC_API_TOKEN || "",
    "Content-Type": "application/json",
  },
});
export default instance;
