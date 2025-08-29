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
// export async function getAuthHeaders() {
//   const token = localStorage.getItem('token');
//   return {
//     Authorization: `Token ${token}`,
//   };
// }

// src/services/api.js
// src/services/api.js
import axios from "axios";

// Base API URL
const BASE = "https://narayanpur-high-school.onrender.com/api";

// decode JWT safely
function decodeJWT(token) {
  try {
    const parts = token.split(".");
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch (e) {
    return null;
  }
}

// Refresh token if needed
export async function refreshTokenIfNeeded() {
  let token = localStorage.getItem("token"); // access token
  if (!token) return null;

  const payload = decodeJWT(token);

  // token still valid → return it
  if (payload && payload.exp * 1000 > Date.now()) return token;

  // otherwise, refresh
  const refresh = localStorage.getItem("refreshToken"); // use your actual key
  if (!refresh) return null;

  try {
    const res = await axios.post(`${BASE}/user/token/refresh/`, { refresh });
    localStorage.setItem("token", res.data.access); // update access token
    return res.data.access;
  } catch (err) {
    console.error("Refresh failed:", err);
    return null;
  }
}

// Get headers with valid token
export async function getAuthHeaders() {
  const token = await refreshTokenIfNeeded();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// Optional: you can also export an axios instance
export const api = axios.create({
  baseURL: BASE,
  headers: {
    "Content-Type": "application/json",
  },
});




