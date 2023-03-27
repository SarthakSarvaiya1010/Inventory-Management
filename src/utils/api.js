import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-management-backend.onrender.com",
});

export default api;
