import { api } from "./index";
import { ChangePasswordRequest } from "../types/user";

export const getStudents = async () => {
  const response = await api.get("/users/students");
  return response.data;
};

export const changePassword = async (data: ChangePasswordRequest) => {
  const response = await api.patch("/auth/change-password", data);
  return response.data;
};
