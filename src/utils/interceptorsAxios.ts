import { APP_TOKEN_KEY } from "@/constants";
import axios from "axios";

const baseURL =
  "https://0fe6-2405-4800-1f14-f800-29e4-ae1c-d412-3561.ngrok-free.app";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(APP_TOKEN_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
