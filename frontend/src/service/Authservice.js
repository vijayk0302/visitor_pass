import api from "../api/api";

export const changePassword = async (data) => {
  return await api.post(
    "/api/auth/change-password",
    data,
    { withCredentials: true }
  );
}