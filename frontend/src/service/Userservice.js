import api from "../api/api";

export const getProfile = async () => {
  return await api.get("/api/users/me");
};