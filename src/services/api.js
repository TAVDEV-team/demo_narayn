// // src/services/api.js

// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Token ${token}`;
//   return config;
// });

export async function getAuthHeaders() {
  const token = localStorage.getItem('token'); // or wherever you store it
  return {
    Authorization: `Bearer ${token}`,
  };
}



