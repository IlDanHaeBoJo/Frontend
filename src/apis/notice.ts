import { api } from ".";

export const getAdminNotices = async () => {
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

export const getStudentNotices = async () => {
  const response = await api.get("/student/notices/");
  return response.data;
};

export const updateNotice = async (
  id: number,
  data: {
    title: string;
    content: string;
    important: boolean;
  }
) => {
  const response = await api.patch(`/admin/notices/${id}/`, data);
  return response.data;
};

export const deleteNotice = async (id: number) => {
  const response = await api.delete(`/admin/notices/${id}/`);
  return response.data;
};
