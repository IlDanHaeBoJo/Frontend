import { api, publicApi } from "./index";
import {
  ChangePassword,
  RequestPasswordReset,
  VerifyPasswordResetCode,
} from "../types/user";

export const getStudents = async () => {
  const response = await api.get("/users/students");
  return response.data;
};

export const changePassword = async (data: ChangePassword) => {
  const response = await api.patch("/auth/change-password", data);
  return response.data;
};

export const requestPasswordReset = async (data: RequestPasswordReset) => {
  const response = await publicApi.post("/auth/request-password-reset", data);
  return response.data;
};

export const verifyPasswordResetCode = async (
  data: VerifyPasswordResetCode
) => {
  const response = await publicApi.post(
    "/auth/verify-password-reset-code",
    data
  );
  return response.data;
};
