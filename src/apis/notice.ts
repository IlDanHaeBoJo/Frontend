import { api } from ".";

export const createNotice = async (data: {
  title: string;
  content: string;
  important: boolean;
  author_id: number;
}) => {
  const response = await api.post("/admin/notices/", data);
  return response.data;
};
