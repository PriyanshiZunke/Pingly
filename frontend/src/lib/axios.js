import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.MODE === "development") return "http://localhost:3000/api";
  const api = import.meta.env.VITE_API_URL || "";
  return api ? `${api.replace(/\/$/, '')}/api` : "/api";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});