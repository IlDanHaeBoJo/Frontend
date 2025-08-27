import { api } from "./index";

export const getAdminCpxResults = async () => {
  const response = await api.get("/admin/cpx/");
  return response.data;
};

export const getMyCpxResults = async () => {
  const response = await api.get("/cpx/me");
  return response.data;
};

export const getCpxResultDetail = async (resultId: number) => {
  const response = await api.get(`/cpx/${resultId}`);
  return response.data;
};

export const getAdminCpxResultDetail = async (resultId: number) => {
  const response = await api.get(`/admin/cpx/${resultId}`);
  return response.data;
};

export const getStudentCpxResults = async (studentId: number) => {
  const response = await api.get(`/admin/cpx/students/${studentId}/results`);
  return response.data;
};

export const saveCpxFeedback = async (
  resultId: number,
  feedback: {
    overall_score: number;
    detailed_feedback: string;
    evaluation_status: "피드백 완료";
  }
) => {
  const response = await api.put(`/admin/cpx/${resultId}/evaluate`, feedback);
  return response.data;
};

export const saveCpxMemo = async (resultId: number, memo: { memo: string }) => {
  const response = await api.put(`/cpx/${resultId}/details`, memo);
  return response.data;
};
