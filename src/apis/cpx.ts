import { api } from "./index";

export const getMyCpxResults = async () => {
  const response = await api.get("/cpx/me");
  return response.data;
};

export const getCpxResultDetail = async (resultId: number) => {
  const response = await api.get(`/cpx/${resultId}`);
  return response.data;
};
