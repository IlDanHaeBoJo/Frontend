import { api } from "./index";

export const getStudents = async () => {
  const response = await api.get("/users/students");
  return response.data;
};
