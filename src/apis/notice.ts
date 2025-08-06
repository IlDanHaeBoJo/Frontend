import { api } from ".";

export const getNotices = async () => {
  const response = await api.get("/admin/notices/");
  return response.data;
};

export const createNotice = async (data: {
  title: string;
  content: string;
  important: boolean;
  author_id: number;
}) => {
  const response = await api.post("/admin/notices/", data);
  return response.data;
};
