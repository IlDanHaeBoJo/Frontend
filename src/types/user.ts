export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: "student" | "admin";
  student_id?: string;
  major?: string;
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}
