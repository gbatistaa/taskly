// Api.js
import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  responseType: "json",
});

// Traps errors and tries to convert to JSON
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data && typeof error.response.data === "string") {
      try {
        error.response.data = JSON.parse(error.response.data);
      } catch (e) {
        console.error(e);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
