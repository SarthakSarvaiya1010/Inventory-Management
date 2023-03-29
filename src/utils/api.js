import axios from "axios";

const api = axios.create({
  // baseURL: "https://inventory-management-backend.onrender.com",
  baseURL: "http://localhost:3200",
});

export default api;
