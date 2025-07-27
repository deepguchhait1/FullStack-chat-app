import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://chat-app-backend-ef1v.onrender.com/api",
  baseURL: import.meta.env.MODE ==="devlopment"? "http://localhost:3000/api":"/api",

  withCredentials: true,
});
