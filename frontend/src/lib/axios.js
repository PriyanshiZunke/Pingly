import axios from "axios";
import { getToken } from "./tokenService";

const getBaseURL = () => {
  if (import.meta.env.MODE === "development") return "http://localhost:3000/api";
  const api = import.meta.env.VITE_API_URL || "";
  return api ? `${api.replace(/\/$/, '')}/api` : "/api";
};

export const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

// On 401, attempt to get a fresh Clerk token via registered getToken and retry once.
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config;

    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const freshToken = await getToken();
        if (freshToken) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${freshToken}`;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers["Authorization"] = `Bearer ${freshToken}`;
          return axiosInstance.request(originalRequest);
        }
      } catch (e) {
        // fallthrough to reject
      }
    }

    return Promise.reject(error);
  }
);