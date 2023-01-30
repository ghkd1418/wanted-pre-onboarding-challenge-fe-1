import axios from "axios";
import { checkToken } from "./check";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(
  (config) => {
    checkToken();
    return config;
  },
  (error) => {
    console.log("애러남");
    return Promise.reject(error);
  }
);
