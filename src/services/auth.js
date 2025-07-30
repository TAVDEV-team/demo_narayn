import { api } from "./api";

export const registerUser = (data) => api.post("users/register/", data);

export const loginUser = (data) => api.post("users/login/", data);

export const isAuthenticated = () => !!localStorage.getItem("Token");

export const getToken = () => localStorage.getItem("token");

export const setAuthData = (token, userId) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
};

export const clearAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};





